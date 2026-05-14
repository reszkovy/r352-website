import { useState, FormEvent } from "react";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";

// ─── Briefly intake config ───────────────────────────────────────────
const BRIEFLY_BASE_URL = "https://briefly-five-plum.vercel.app";
const BRIEFLY_INTAKE_URL = `${BRIEFLY_BASE_URL}/api/public/intake`;

const INTAKE_BRANDING = {
  logo_url: "https://r352.com/logo.svg",
  accent_color: "#D4FF00",
  accent_color_2: "#0A0A0A",
  font_family: "Inter",
};

// Defaults sent to API — real routing values are captured inside the wizard
const ROUTING_DEFAULTS = {
  vertical: "other" as const,
  scale: "1" as const,
  budget_signal: "under_30k" as const,
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
    const attemptIntake = async (body: object): Promise<{ ok: boolean; status: number; data: any; raw: string }> => {
      const res = await fetch(BRIEFLY_INTAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const raw = await res.text();
      let data: any = null;
      try { data = JSON.parse(raw); } catch { /* not JSON */ }
      return { ok: res.ok, status: res.status, data, raw };
    };

    try {
      // First attempt — full payload
      let result = await attemptIntake(payload);

      // Fallback retry — drop intake_branding (in case logo_url 404 trips validation)
      if (!result.ok) {
        console.warn("[brief] First attempt failed, retrying without intake_branding", result);
        const { intake_branding: _drop, ...minimal } = payload;
        result = await attemptIntake(minimal);
      }

      // Second fallback — drop context too
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
        // All retries failed — surface actual API error to user + console
        console.error("[brief] All intake attempts failed", result);
        const apiErr = result.data?.error || result.data?.message || result.raw?.slice(0, 200) || `HTTP ${result.status}`;
        throw new Error(`API ${result.status}: ${apiErr}`);
      }

      const wizardUrl = result.data?.wizard_url;
      if (!wizardUrl) {
        console.error("[brief] Missing wizard_url in response", result);
        throw new Error(`Server response missing wizard_url. Raw: ${result.raw?.slice(0, 200)}`);
      }

      // Defensive: Briefly API may return relative path (/brief/[token]) instead of absolute URL.
      // Resolve to full URL against Briefly origin so browser doesn't navigate to r352.com/brief/[token] → 404.
      const finalUrl = /^https?:\/\//i.test(wizardUrl)
        ? wizardUrl
        : `${BRIEFLY_BASE_URL}${wizardUrl.startsWith("/") ? "" : "/"}${wizardUrl}`;

      console.log("[brief] Redirecting to wizard:", finalUrl);

      try {
        (window as any).plausible?.("brief_submitted");
      } catch { /* noop */ }

      window.location.href = finalUrl;
    } catch (err: any) {
      console.error("[brief] Submit error:", err);
      setSubmitting(false);
      // Show actual error message to user — they can screenshot and send
      const userMsg =
        lang === "pl"
          ? `Błąd: ${err?.message || "nieznany"}. Spróbuj jeszcze raz lub napisz na hello@r352.com`
          : `Error: ${err?.message || "unknown"}. Try again or email hello@r352.com`;
      setError(userMsg);
    }
  };

  const copy = lang === "pl" ? COPY_PL : COPY_EN;

  return (
    <PageTransition>
      {/* ─── Hero ─── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-8 md:px-12">
        <div className="max-w-[1800px] mx-auto">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-8">
                  {copy.hero.label}
                </span>
                <h1 className="text-5xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95] mb-8">
                  {copy.hero.title}
                </h1>
                <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-snug font-medium tracking-tight max-w-2xl">
                  {copy.hero.intro}
                </p>
              </div>
              <div className="md:justify-self-end max-w-md">
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {copy.hero.subline}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── What you'll cover — 8 brief sections preview ─── */}
      <section className="py-24 md:py-32 border-t border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            <Reveal>
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  {copy.preview.label}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95] mb-6">
                  {copy.preview.title}
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
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight mb-1 group-hover/item:text-[#D4FF00] transition-colors">
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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-16 leading-[0.95] max-w-3xl">
              {copy.howItWorks.title}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-neutral-200 dark:border-white/10">
            {copy.howItWorks.steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="p-8 md:p-10 border-r border-b border-neutral-200 dark:border-white/10 h-full flex flex-col gap-4">
                  <span className="font-display text-base md:text-lg text-[#D4FF00] leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-snug">
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

      {/* ─── Lead-capture form — minimal 4 fields, premium contact-style ─── */}
      <section id="form" className="py-24 md:py-32 border-t border-neutral-200 dark:border-white/10 scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            <Reveal>
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  {copy.form.label}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95] mb-6">
                  {copy.form.title}
                </h2>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md mb-6">
                  {copy.form.subtitle}
                </p>
                {/* Warm-lead microcopy — steers referrals to use brief without losing relationship */}
                <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-md italic border-l-2 border-[#D4FF00]/40 pl-4">
                  {copy.form.warmLead}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-2xl" noValidate>
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

                <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-2xl">
                  {copy.form.privacy}
                </p>
              </form>
            </Reveal>
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
      "Every project with r352 starts with a structured brief. Eight sections, around ten minutes, one clean response from us — whatever the scope.",
    subline:
      "Whether you need a campaign toolkit or a full operating system implementation, this is the entry. We route every brief to the right engagement model.",
  },
  preview: {
    label: "What you'll cover",
    title: "8 sections. ~26 questions. ~10 minutes.",
    subtitle:
      "The briefing wizard guides you through structured sections — covering everything we need to give you a meaningful first response within 48 hours.",
    sections: [
      { title: "Project overview", desc: "Tell us the essentials: what, scope, when." },
      { title: "Brand & visual identity", desc: "Show us your brand identity." },
      { title: "Target audience", desc: "Who are your target users?" },
      { title: "Format & specifications", desc: "Specific formats, sizes, technical requirements." },
      { title: "Content & message", desc: "What do you want to say to your users?" },
      { title: "Technical requirements", desc: "What are the technical conditions?" },
      { title: "Budget & timeline", desc: "When and how much can you spend?" },
      { title: "Additional notes", desc: "Anything else we should know?" },
    ],
  },
  howItWorks: {
    label: "How it works",
    title: "Three steps. Honest finish.",
    steps: [
      {
        title: "Fill the brief",
        desc: "Four fields here to start, then ~10 minutes through the wizard. Strategic context, not technical specs.",
      },
      {
        title: "We respond",
        desc: "Initial read within 48 hours by email — engagement model, scope direction, next step.",
      },
      {
        title: "We decide together",
        desc: "If we're a fit — discovery call to scope. If not — we'll refer you in our network.",
      },
    ],
  },
  form: {
    label: "Start a brief",
    title: "Four fields. ~30 seconds.",
    subtitle:
      "We only need contact and one line of context here. The structured wizard that follows is where the real conversation happens.",
    warmLead:
      "Were you referred by someone? Mention their name in the first wizard question — we'll fast-track your read.",
    fields: {
      name: "Your name",
      company: "Company",
      email: "Work email",
      context: "What's bringing you here? (optional)",
    },
    contextPlaceholder: "One line — campaign, brand system, audit, full transformation…",
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
      "Każdy projekt z r352 zaczyna się od ustrukturyzowanego briefu. Osiem sekcji, około dziesięciu minut, jedna czysta odpowiedź od nas — niezależnie od zakresu.",
    subline:
      "Czy potrzebujesz pakietu kampanijnego, czy pełnego wdrożenia operating systemu — to jest punkt wejścia. Każdy brief routujemy do właściwego modelu współpracy.",
  },
  preview: {
    label: "Co przejdziesz",
    title: "8 sekcji. ~26 pytań. ~10 minut.",
    subtitle:
      "Wizard prowadzi Cię przez ustrukturyzowane sekcje — obejmuje wszystko czego potrzebujemy, żeby dać Ci sensowną pierwszą odpowiedź w 48 godzin.",
    sections: [
      { title: "Przegląd projektu", desc: "Powiedz nam najważniejsze: co, jaki zakres, kiedy." },
      { title: "Brand i tożsamość wizualna", desc: "Pokaż nam swoją tożsamość brandową." },
      { title: "Docelowa publiczność", desc: "Kto to twoi docelowi użytkownicy?" },
      { title: "Format i specyfikacje", desc: "Konkretne formaty, rozmiary, wymagania techniczne." },
      { title: "Treść i przesłanie", desc: "Co chcesz powiedzieć swoim użytkownikom?" },
      { title: "Wymagania techniczne", desc: "Jakie są warunki techniczne?" },
      { title: "Budżet i harmonogram", desc: "Kiedy i ile możesz wydać?" },
      { title: "Dodatkowe uwagi", desc: "Czy jest coś jeszcze, co powinniśmy wiedzieć?" },
    ],
  },
  howItWorks: {
    label: "Jak to działa",
    title: "Trzy kroki. Uczciwe zakończenie.",
    steps: [
      {
        title: "Wypełnij brief",
        desc: "Cztery pola na start, potem ~10 minut przez wizard. Strategiczny kontekst, nie spec techniczny.",
      },
      {
        title: "Odpowiadamy",
        desc: "Pierwsza odpowiedź mailem w 48 godzin — model współpracy, kierunek zakresu, następny krok.",
      },
      {
        title: "Decydujemy razem",
        desc: "Jeśli pasujemy — discovery call do doprecyzowania zakresu. Jeśli nie — polecimy kogoś z naszej sieci.",
      },
    ],
  },
  form: {
    label: "Zacznij brief",
    title: "Cztery pola. ~30 sekund.",
    subtitle:
      "Potrzebujemy tylko kontaktu i jednej linijki kontekstu. Ustrukturyzowany wizard, który zaczyna się po wysłaniu, to miejsce prawdziwej rozmowy.",
    warmLead:
      "Polecił Cię ktoś? Wpisz nazwisko w pierwszym pytaniu wizarda — przyspieszymy Twój feedback.",
    fields: {
      name: "Imię i nazwisko",
      company: "Firma",
      email: "Email służbowy",
      context: "Z czym przychodzisz? (opcjonalnie)",
    },
    contextPlaceholder: "Jedna linijka — kampania, system marki, audyt, pełna transformacja…",
    cta: "Rozpocznij brief",
    submitting: "Wysyłam…",
    privacy:
      "Każde zgłoszenie traktujemy jako poufne. Twoje dane trafiają wyłącznie do Reszka do review i nie są nigdzie udostępniane. Wysyłając formularz akceptujesz otrzymanie naszej pierwszej odpowiedzi na email w ciągu 48 godzin.",
  },
};
