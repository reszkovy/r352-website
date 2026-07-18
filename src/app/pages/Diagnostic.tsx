import { useState, useEffect, useMemo, FormEvent } from "react";
import { track } from "@/app/lib/track";
import { useSearch } from "wouter";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";

// ─── Industry segment provenance ─────────────────────────────────────
// When a user clicks "Start a project" from /industries/{slug} we propagate
// the segment via ?segment= so we can (a) show a subtle provenance pill
// at the top of the brief and (b) push an analytics event for funnel
// attribution. Display labels are bilingual - Polish copy lands when
// the user has selected PL.
const SEGMENT_LABELS_EN: Record<string, string> = {
  "fitness-wellness": "Fitness & Wellness Networks",
  "real-estate": "Real Estate Developers",
  "retail-franchise": "Retail & Franchise Operators",
  "health-service-networks": "Health & Service Networks",
};

const SEGMENT_LABELS_PL: Record<string, string> = {
  "fitness-wellness": "Sieci fitness i wellness",
  "real-estate": "Deweloperzy nieruchomości",
  "retail-franchise": "Sieci retail i franczyza",
  "health-service-networks": "Sieci zdrowia i usług",
};

function parseSegmentFromSearch(search: string): string | null {
  // useSearch in wouter returns the query string WITHOUT the leading "?".
  // URLSearchParams is happy either way, but we normalize defensively.
  const normalized = search.startsWith("?") ? search : `?${search}`;
  try {
    const params = new URLSearchParams(normalized);
    const seg = params.get("segment");
    if (seg && Object.prototype.hasOwnProperty.call(SEGMENT_LABELS_EN, seg)) {
      return seg;
    }
    return null;
  } catch {
    return null;
  }
}

// ─── Briefly intake config ───────────────────────────────────────────
// API endpoint — canonical production domain (www, apex 307s on API calls).
// briefly-five-plum.vercel.app was the pre-r3loop deployment alias.
const BRIEFLY_BASE_URL = "https://www.r3loop.app";
const BRIEFLY_INTAKE_URL = `${BRIEFLY_BASE_URL}/api/public/intake`;

// Wizard landing — www to avoid the apex→www redirect hop for end users.
const WIZARD_BASE_URL = "https://www.r3loop.app";

const INTAKE_BRANDING = {
  logo_url: "https://www.r352.com/logo.svg",
  accent_color: "#D4FF00",
  accent_color_2: "#0A0A0A",
  font_family: "Inter",
};

// Defaults sent to API - real routing values are captured inside the wizard.
// NO budget_signal default: a fake bracket used to seed every r352 lead with
// a low budget and skewed the MACS pre-qualification before the client even
// opened the wizard. The wizard asks for the real amount.
const ROUTING_DEFAULTS = {
  vertical: "other" as const,
  scale: "1" as const,
};

interface FormState {
  name: string;
  company: string;
  email: string;
  context: string;
}

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  context: "",
};

export function Brief() {
  const { language } = useLanguage();
  const lang = language as "en" | "pl";

  // Read ?segment=… so we can preserve industry context across the
  // /industries/{slug} → /brief jump. Memoized so we don't re-parse on
  // every render of the (heavy) form section.
  const search = useSearch();
  const segment = useMemo(() => parseSegmentFromSearch(search), [search]);
  const segmentLabel = segment
    ? (lang === "pl" ? SEGMENT_LABELS_PL[segment] : SEGMENT_LABELS_EN[segment])
    : null;

  // Fire analytics event once on mount when a valid segment is present.
  // We push to GTM's dataLayer if present (the canonical channel on
  // r352.com); silent no-op otherwise. Guarded for SSR + try/catch so a
  // misbehaving consumer never breaks the brief flow.
  useEffect(() => {
    if (!segment) return;
    if (typeof window === "undefined") return;
    try {
      const w = window as any;
      if (w.dataLayer && typeof w.dataLayer.push === "function") {
        w.dataLayer.push({
          event: "industry_brief_start",
          segment,
          source_page: `/industries/${segment}`,
        });
      }
    } catch {
      /* analytics must never break the page */
    }
  }, [segment]);

  // Funnel: count every /brief landing (the diagnostic is the cold-lead step).
  useEffect(() => {
    track("brief_view", { referrer: typeof document !== "undefined" ? document.referrer || "direct" : "ssr" });
  }, []);

  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.company.trim() || !form.email.trim()) {
      setError(lang === "pl" ? "Wypełnij imię, firmę i email." : "Please fill in name, company and email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError(
        lang === "pl"
          ? "Sprawdź adres email - powinien mieć format: imie@firma.com"
          : "Check the email address - it should look like: name@company.com"
      );
      return;
    }

    setSubmitting(true);

    const payload = {
      name: form.name.trim(),
      company: form.company.trim(),
      email: form.email.trim(),
      ...ROUTING_DEFAULTS,
      lang,
      source: "r352_brief",
      context: form.context.trim() || undefined,
      intake_branding: INTAKE_BRANDING,
    };

    // Helper: attempt POST with given payload, return parsed result
    // 15s timeout per attempt - without it a hanging intake API leaves the
    // button on "Submitting…" forever with no way out for the user.
    const attemptIntake = async (body: object): Promise<{ ok: boolean; status: number; data: any; raw: string }> => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15_000);
      try {
        const res = await fetch(BRIEFLY_INTAKE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        const raw = await res.text();
        let data: any = null;
        try { data = JSON.parse(raw); } catch { /* not JSON */ }
        return { ok: res.ok, status: res.status, data, raw };
      } finally {
        clearTimeout(timeout);
      }
    };

    try {
      // First attempt - full payload
      let result = await attemptIntake(payload);

      // Fallback retry - drop intake_branding (in case logo_url 404 trips validation)
      if (!result.ok) {
        console.warn("[brief] First attempt failed, retrying without intake_branding", result);
        const { intake_branding: _drop, ...minimal } = payload;
        result = await attemptIntake(minimal);
      }

      // Second fallback - drop context too
      if (!result.ok) {
        console.warn("[brief] Second attempt failed, retrying minimal", result);
        const minimal = {
          name: payload.name,
          company: payload.company,
          email: payload.email,
          ...ROUTING_DEFAULTS,
          lang,
          source: "r352_brief",
        };
        result = await attemptIntake(minimal);
      }

      if (!result.ok) {
        // All retries failed - surface actual API error to user + console
        console.error("[brief] All intake attempts failed", result);
        const apiErr = result.data?.error || result.data?.message || result.raw?.slice(0, 200) || `HTTP ${result.status}`;
        throw new Error(`API ${result.status}: ${apiErr}`);
      }

      const wizardUrl = result.data?.wizard_url;
      if (!wizardUrl) {
        console.error("[brief] Missing wizard_url in response", result);
        throw new Error(`Server response missing wizard_url. Raw: ${result.raw?.slice(0, 200)}`);
      }

      // Defensive: Briefly API may return relative path OR absolute URL on either briefly-vercel or r3loop.app.
      // Always rewrite host to r3loop.app - that's the productized wizard landing for end users.
      let finalUrl: string;
      if (/^https?:\/\//i.test(wizardUrl)) {
        // Absolute URL - replace host with r3loop.app, preserve path/query/hash
        try {
          const parsed = new URL(wizardUrl);
          finalUrl = `${WIZARD_BASE_URL}${parsed.pathname}${parsed.search}${parsed.hash}`;
        } catch {
          finalUrl = wizardUrl; // fallback if URL parsing fails
        }
      } else {
        // Relative path - prefix with r3loop.app
        finalUrl = `${WIZARD_BASE_URL}${wizardUrl.startsWith("/") ? "" : "/"}${wizardUrl}`;
      }

      console.log("[brief] Redirecting to wizard:", finalUrl);

      try {
        track("brief_submitted");
      } catch { /* noop */ }

      window.location.href = finalUrl;
    } catch (err: any) {
      console.error("[brief] Submit error:", err);
      setSubmitting(false);
      // Show actual error message to user - they can screenshot and send
      const isTimeout = err?.name === "AbortError";
      const userMsg = isTimeout
        ? lang === "pl"
          ? "Serwer nie odpowiada. Spróbuj za chwilę lub napisz na hello@r352.com - odpowiemy tak samo szybko."
          : "The server is not responding. Try again in a moment or email hello@r352.com - we'll reply just as fast."
        : lang === "pl"
          ? `Błąd: ${err?.message || "nieznany"}. Spróbuj jeszcze raz lub napisz na hello@r352.com`
          : `Error: ${err?.message || "unknown"}. Try again or email hello@r352.com`;
      setError(userMsg);
    }
  };

  const copy = lang === "pl" ? COPY_PL : COPY_EN;

  return (
    <PageTransition>
      {/* ─── Hero with inline form - above-the-fold action ─── */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-8 md:px-12">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">

            {/* LEFT: positioning + intro + warm lead microcopy */}
            <Reveal>
              <div className="lg:sticky lg:top-32">
                {/* Industry provenance pill - only renders when arriving from
                    /industries/{slug}. Subtle: small lime-bordered chip above
                    the page eyebrow so the user knows context was preserved
                    without dominating the hero. */}
                {segmentLabel && (
                  <div className="mb-6">
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#D4FF00]/40 text-[11px] font-display uppercase tracking-[0.2em] text-neutral-700 dark:text-[#D4FF00] rounded-full"
                      data-segment={segment ?? undefined}
                    >
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4FF00]" aria-hidden="true" />
                      {lang === "pl" ? "Przychodzisz z" : "Coming from"}: {segmentLabel}
                    </span>
                  </div>
                )}
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-8">
                  {copy.hero.label}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95] mb-8">
                  {lang === "pl" ? (
                    <>Zacznij od briefu.<br className="hidden md:inline" /> Ustrukturyzowany punkt startu.</>
                  ) : (
                    <>Brief us.<br className="hidden md:inline" /> Structured starting point.</>
                  )}
                </h1>
                <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-snug font-medium tracking-tight mb-8 max-w-xl">
                  {copy.hero.intro}
                </p>
                <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 max-w-xl">
                  {copy.hero.subline}
                </p>
                {/* Warm-lead microcopy - steers referrals */}
                <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed italic border-l-2 border-[#D4FF00]/40 pl-4 max-w-xl">
                  {copy.form.warmLead}
                </p>
              </div>
            </Reveal>

            {/* RIGHT: form - above the fold, no scroll needed */}
            <Reveal delay={0.15}>
              <div className="lg:pl-8 lg:border-l border-neutral-200 dark:border-white/10">
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  {copy.form.label}
                </span>
                <h2 className="text-2xl md:text-3xl font-normal tracking-tight text-neutral-900 dark:text-white leading-snug mb-3">
                  {copy.form.title}
                </h2>
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md mb-8">
                  {copy.form.subtitle}
                </p>

                <form id="form" onSubmit={handleSubmit} className="flex flex-col gap-8 scroll-mt-24" noValidate>
                  <FormText
                    label={copy.form.fields.name}
                    name="name"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    required
                    autoComplete="name"
                  />
                  <FormText
                    label={copy.form.fields.company}
                    name="company"
                    value={form.company}
                    onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                    required
                    autoComplete="organization"
                  />
                  <FormText
                    label={copy.form.fields.email}
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    required
                    autoComplete="email"
                  />
                  <FormTextarea
                    label={copy.form.fields.context}
                    name="context"
                    value={form.context}
                    onChange={(v) => setForm((f) => ({ ...f, context: v }))}
                    placeholder={copy.form.contextPlaceholder}
                  />

                  {error && (
                    <div className="border-l-2 border-red-400 dark:border-red-400 pl-4 py-2">
                      <p className="text-sm md:text-base text-red-400 dark:text-red-400 font-medium leading-snug" role="alert">
                        {error}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="self-start inline-flex items-center gap-3 px-8 py-4 bg-[#D4FF00] text-black font-display uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? copy.form.submitting : copy.form.cta}
                    <span className="inline-block">→</span>
                  </button>

                  <p className="text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-md">
                    {copy.form.privacy}
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Selection Criteria - Phase 1.2.
           Filter toxic leads + signal premium selectivity. Paradoxically raises conversion.
           "I take projects that..." - sets the bar publicly. ─── */}
      <section className="py-24 md:py-32 border-t border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            <Reveal>
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  {lang === "pl" ? "Filtr" : "Filter"}
                </span>
                <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 dark:text-white leading-[1.05] mb-6">
                  {lang === "pl" ? (
                    <>Bierzemy<br className="hidden md:inline" /> projekty, które...</>
                  ) : (
                    <>We take<br className="hidden md:inline" /> projects that...</>
                  )}
                </h2>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  {lang === "pl"
                    ? "Premium pricing wymaga premium ścieżki. Cztery filtry - dla tych, którzy chcą wiedzieć z góry, czy to dopasowanie."
                    : "Premium pricing requires a premium fit. Four filters - for those who want to know up-front whether this is a match."}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-white/10">
                {[
                  {
                    num: "01",
                    en: { title: "Are systemic, not aesthetic-only.", desc: "If the brief reads \"make it look nicer\" with no metric or system thinking behind it - we're the wrong fit." },
                    pl: { title: "Są systemowe, nie tylko wizualne.", desc: "Jeśli brief brzmi „zróbmy żeby ładniej wyglądało\" bez metryki i myślenia systemowego - to nie nasza działka." },
                  },
                  {
                    num: "02",
                    en: { title: "Move real metrics, not vanity.", desc: "Conversion, retention, ops throughput, cost-per-asset, brief-to-ship time. Not impressions or \"engagement\"." },
                    pl: { title: "Poprawiają realne metryki, nie vanity.", desc: "Konwersja, retention, ops throughput, cost-per-asset, brief-to-ship time. Nie impressions czy „engagement\"." },
                  },
                  {
                    num: "03",
                    en: { title: "Have a decision owner who'll decide.", desc: "One person on your side who can say yes or no in 48 hours. No \"let me check with five people\" loops." },
                    pl: { title: "Mają decision ownera, który decyduje.", desc: "Jedna osoba po waszej stronie, która powie tak lub nie w 48 godzin. Bez pętli „muszę sprawdzić z pięcioma osobami\"." },
                  },
                  {
                    num: "04",
                    en: { title: "Are interesting enough to take at half-price.", desc: "Energy currency matters. If the work is dull, our best work isn't in it - and you'd feel it. Better we don't start." },
                    pl: { title: "Są interesujące na tyle, żeby wziąć je za pół ceny.", desc: "Waluta energii też się liczy. Jeśli praca jest nudna, nasze najlepsze rzeczy nie wpadną - i to widać. Lepiej żebyśmy nie zaczynali." },
                  },
                ].map((c, i) => (
                  <li key={c.num} className="flex items-baseline gap-5 py-5 group/item">
                    <span className="font-display text-base md:text-lg text-[#D4FF00] shrink-0 leading-none w-10">
                      {c.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-medium tracking-tight text-neutral-900 dark:text-white leading-tight mb-1.5 group-hover/item:text-[#D4FF00] transition-colors">
                        {lang === "pl" ? c.pl.title : c.en.title}
                      </h3>
                      <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-snug">
                        {lang === "pl" ? c.pl.desc : c.en.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── What you'll cover - 8 brief sections preview ─── */}
      <section className="py-24 md:py-32 border-t border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            <Reveal>
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  {copy.preview.label}
                </span>
                {/* Explicit 3-line break on the brief preview title - typographic rhythm */}
                <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 dark:text-white leading-[1.05] mb-6">
                  {lang === "pl" ? (
                    <>
                      Adaptacyjny wizard.<br />
                      7-12 sekcji.<br />
                      10-18 minut.
                    </>
                  ) : (
                    <>
                      Adaptive wizard.<br />
                      7-12 sections.<br />
                      10-18 minutes.
                    </>
                  )}
                </h2>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  {copy.preview.subtitle}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-white/10">
                {copy.preview.sections.map((s, i) => (
                  <li key={i} className="flex items-baseline gap-5 py-5 group/item">
                    <span className="font-display text-base md:text-lg text-[#D4FF00] shrink-0 leading-none w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-medium tracking-tight text-neutral-900 dark:text-white leading-tight mb-1 group-hover/item:text-[#D4FF00] transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-snug">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="py-24 md:py-32 border-t border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
              {copy.howItWorks.label}
            </span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 dark:text-white mb-16 leading-[1.05] max-w-3xl">
              {lang === "pl" ? (
                <>Trzy kroki.<br className="hidden md:inline" /> Uczciwe zakończenie.</>
              ) : (
                <>Three steps.<br className="hidden md:inline" /> Honest finish.</>
              )}
            </h2>
          </Reveal>
          {/* 3 steps - gap-px on a lighter parent creates hair-line dividers without chunky borders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-200 dark:bg-white/[0.06]">
            {copy.howItWorks.steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="p-8 md:p-10 h-full flex flex-col gap-4 bg-white dark:bg-[#0a0a0a]">
                  <span className="font-display text-base md:text-lg text-[#D4FF00] leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight text-neutral-900 dark:text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  );
}

// ─── Primitives ───────────────────────────────────────────────────────

function FormText({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-display uppercase tracking-[0.2em] text-neutral-500 dark:text-[#D4FF00]">
        {label}
        {required && <span className="ml-1 text-[#D4FF00] dark:text-[#D4FF00]/70">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-b border-neutral-300 dark:border-white/20 pb-3 text-lg md:text-xl text-neutral-900 dark:text-white font-medium tracking-tight outline-none focus:border-[#D4FF00] dark:focus:border-[#D4FF00] transition-colors placeholder:text-neutral-400"
      />
    </label>
  );
}

function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-display uppercase tracking-[0.2em] text-neutral-500 dark:text-[#D4FF00]">
        {label}
      </span>
      <textarea
        name={name}
        value={value}
        rows={3}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-b border-neutral-300 dark:border-white/20 pb-3 text-base md:text-lg text-neutral-900 dark:text-white font-medium tracking-tight outline-none focus:border-[#D4FF00] dark:focus:border-[#D4FF00] transition-colors placeholder:text-neutral-500 resize-none"
      />
    </label>
  );
}

// ─── Copy ─────────────────────────────────────────────────────────────

const COPY_EN = {
  hero: {
    label: "Briefing tool",
    title: "Brief us. Structured starting point.",
    intro:
      "Every project with r352 starts with a structured brief. The wizard adapts to your engagement - around ten minutes for a diagnostic, up to twenty for full enterprise scope - and you get one clean response from us within 48 hours.",
    subline:
      "Whether you need a campaign toolkit or a full operating system implementation, this is the entry. We route every brief to the right engagement model.",
  },
  preview: {
    label: "What you'll cover",
    title: "Adaptive wizard. 7-12 sections. 10-18 minutes.",
    subtitle:
      "The wizard asks only what applies to your engagement model - a diagnostic takes ~8 minutes, a sprint 12-15, a full enterprise transformation ~18. Your answers feed our strategy engine, so the first response you get is substance, not a scheduling email.",
    sections: [
      { title: "Engagement model", desc: "What are you coming with? The wizard adapts everything below to it." },
      { title: "Project overview", desc: "Which r352 product, what scope, what goals." },
      { title: "Strategic context", desc: "Why now, what the status quo costs, what success looks like in 12 months." },
      { title: "Scope & decision ownership", desc: "Locations, markets, brand architecture - and who says yes." },
      { title: "Competitive positioning", desc: "Named competitors, brands you admire, what you refuse to be." },
      { title: "Brand & visual identity", desc: "Existing brand, references, visual character." },
      { title: "Audience & message", desc: "Who you serve and what they need to hear." },
      { title: "Technical requirements", desc: "Platforms, integrations, constraints." },
      { title: "Budget & timeline", desc: "A real number, not a bracket - it drives an honest scope." },
    ],
  },
  howItWorks: {
    label: "How it works",
    title: "Three steps. Honest finish.",
    steps: [
      {
        title: "Fill the brief",
        desc: "Four fields here to start, then the adaptive wizard - 10-18 minutes depending on scope. Strategic context, not technical specs.",
      },
      {
        title: "We respond",
        desc: "Initial read within 48 hours by email - engagement model, scope direction, next step.",
      },
      {
        title: "We decide together",
        desc: "If we're a fit - discovery call to scope. If not - we'll refer you in our network.",
      },
    ],
  },
  form: {
    label: "Start a project",
    title: "Four fields. ~30 seconds.",
    subtitle:
      "We only need contact and one line of context here. The structured wizard that follows is where the real conversation happens.",
    warmLead:
      "Were you referred by someone? Mention them in the 'What's bringing you here?' field below - we'll fast-track your read.",
    fields: {
      name: "Your name",
      company: "Company",
      email: "Work email",
      context: "What's bringing you here? (optional)",
    },
    contextPlaceholder: "One line - campaign, brand system, audit, full transformation…",
    cta: "Begin the brief",
    submitting: "Submitting…",
    privacy:
      "We treat every submission as confidential. Your data routes only to Reszek for review and is never shared. By submitting you agree to receive our first response by email within 48 hours.",
  },
};

const COPY_PL = {
  hero: {
    label: "Narzędzie briefingowe",
    title: "Zacznij od briefu. Ustrukturyzowany punkt startu.",
    intro:
      "Każdy projekt z r352 zaczyna się od ustrukturyzowanego briefu. Wizard dopasowuje się do modelu współpracy - około dziesięciu minut przy diagnostyce, do dwudziestu przy pełnym zakresie enterprise - a od nas dostajesz jedną konkretną odpowiedź w 48 godzin.",
    subline:
      "Czy potrzebujesz pakietu kampanijnego, czy pełnego wdrożenia operating systemu - to jest punkt wejścia. Każdy brief routujemy do właściwego modelu współpracy.",
  },
  preview: {
    label: "Co przejdziesz",
    title: "Adaptacyjny wizard. 7-12 sekcji. 10-18 minut.",
    subtitle:
      "Wizard pyta tylko o to, co dotyczy Twojego modelu współpracy - diagnostyka zajmuje ~8 minut, sprint 12-15, pełna transformacja enterprise ~18. Twoje odpowiedzi zasilają nasz silnik strategiczny, więc pierwsza odpowiedź od nas to konkret, a nie mail z terminem calla.",
    sections: [
      { title: "Model współpracy", desc: "Z czym przychodzisz? Wizard dopasowuje do tego wszystko poniżej." },
      { title: "Przegląd projektu", desc: "Który produkt r352, jaki zakres, jakie cele." },
      { title: "Kontekst strategiczny", desc: "Dlaczego teraz, ile kosztuje status quo, jak wygląda sukces za 12 miesięcy." },
      { title: "Zakres i decyzyjność", desc: "Lokalizacje, rynki, architektura marki - i kto mówi „tak”." },
      { title: "Pozycjonowanie konkurencyjne", desc: "Konkurenci z nazwy, marki które podziwiasz, czym nie chcesz być." },
      { title: "Brand i tożsamość wizualna", desc: "Istniejący brand, referencje, charakter wizualny." },
      { title: "Publiczność i przekaz", desc: "Komu służysz i co ta grupa musi usłyszeć." },
      { title: "Wymagania techniczne", desc: "Platformy, integracje, ograniczenia." },
      { title: "Budżet i harmonogram", desc: "Konkretna kwota, nie przedział - to ona napędza uczciwy zakres." },
    ],
  },
  howItWorks: {
    label: "Jak to działa",
    title: "Trzy kroki. Uczciwe zakończenie.",
    steps: [
      {
        title: "Rozpocznij projekt",
        desc: "Cztery pola na start, potem adaptacyjny wizard - 10-18 minut zależnie od zakresu. Strategiczny kontekst, nie spec techniczny.",
      },
      {
        title: "Odpowiadamy",
        desc: "Pierwsza odpowiedź mailem w 48 godzin - model współpracy, kierunek zakresu, następny krok.",
      },
      {
        title: "Decydujemy razem",
        desc: "Jeśli pasujemy - discovery call do doprecyzowania zakresu. Jeśli nie - polecimy kogoś z naszej sieci.",
      },
    ],
  },
  form: {
    label: "Rozpocznij projekt",
    title: "Cztery pola. ~30 sekund.",
    subtitle:
      "Potrzebujemy tylko kontaktu i jednej linijki kontekstu. Ustrukturyzowany wizard, który zaczyna się po wysłaniu, to miejsce prawdziwej rozmowy.",
    warmLead:
      "Polecił Cię ktoś? Wpisz to w polu 'Z czym przychodzisz?' poniżej - przyspieszymy Twój feedback.",
    fields: {
      name: "Imię i nazwisko",
      company: "Firma",
      email: "Email służbowy",
      context: "Z czym przychodzisz? (opcjonalnie)",
    },
    contextPlaceholder: "Jedna linijka - kampania, system marki, audyt, pełna transformacja…",
    cta: "Rozpocznij brief",
    submitting: "Wysyłam…",
    privacy:
      "Każde zgłoszenie traktujemy jako poufne. Twoje dane trafiają wyłącznie do Reszka do review i nie są nigdzie udostępniane. Wysyłając formularz akceptujesz otrzymanie naszej pierwszej odpowiedzi na email w ciągu 48 godzin.",
  },
};
