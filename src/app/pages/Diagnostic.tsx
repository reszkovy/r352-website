import { useState, FormEvent } from "react";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";

// ─── Briefly intake config ───────────────────────────────────────────
const BRIEFLY_INTAKE_URL = "https://briefly-five-plum.vercel.app/api/public/intake";

const INTAKE_BRANDING = {
  logo_url: "https://r352.com/logo.svg",
  accent_color: "#D4FF00",
  accent_color_2: "#0A0A0A",
  font_family: "Inter",
};

type Vertical = "fitness" | "wellness" | "health" | "retail" | "other";
type Scale = "1" | "2-5" | "5-15" | "15-50" | "50+";
type Budget = "under_30k" | "30k-100k" | "100k-250k" | "over_250k";

interface FormState {
  name: string;
  company: string;
  email: string;
  vertical: Vertical | "";
  scale: Scale | "";
  budget_signal: Budget | "";
}

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  vertical: "",
  scale: "",
  budget_signal: "",
};

export function Diagnostic() {
  const { language } = useLanguage();
  const lang = language as "en" | "pl";

  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine source from URL hash or default to hero
  const getSource = () => {
    if (typeof window === "undefined") return "r352_diagnostic_direct";
    const hash = window.location.hash.replace("#", "");
    if (hash === "form") return "r352_diagnostic_hero";
    const ref = document.referrer || "";
    if (ref.includes("/")) return "r352_diagnostic_direct";
    return "r352_diagnostic_direct";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic client-side validation
    if (!form.name || !form.company || !form.email) {
      setError(lang === "pl" ? "Wypełnij imię, firmę i email." : "Please fill in name, company and email.");
      return;
    }
    if (!form.vertical || !form.scale || !form.budget_signal) {
      setError(lang === "pl" ? "Zaznacz odpowiedzi we wszystkich sekcjach." : "Select an option in every section.");
      return;
    }

    setSubmitting(true);

    const payload = {
      ...form,
      lang,
      source: getSource(),
      intake_branding: INTAKE_BRANDING,
    };

    try {
      const res = await fetch(BRIEFLY_INTAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = (await res.json()) as { wizard_url?: string };
      if (!data.wizard_url) throw new Error("Missing wizard_url in response");

      // Optional analytics (no-op if not present)
      try {
        (window as any).plausible?.("intake_submitted");
      } catch { /* noop */ }

      window.location.href = data.wizard_url;
    } catch (err) {
      console.error("Briefly intake failed", err);
      setSubmitting(false);
      setError(
        lang === "pl"
          ? "Coś poszło nie tak. Spróbuj jeszcze raz lub napisz na hello@r352.com"
          : "Something went wrong. Please try again or email hello@r352.com"
      );
    }
  };

  // ─── i18n copy ──────────────────────────────────────────────────────
  const copy = lang === "pl" ? COPY_PL : COPY_EN;

  return (
    <PageTransition>
      {/* ─── Hero — Strategic Diagnostic · 48h ─── */}
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
                  {copy.hero.fit}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── What you get ─── */}
      <section className="py-24 md:py-32 border-t border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            <Reveal>
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  {copy.whatYouGet.label}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95]">
                  {copy.whatYouGet.title}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-white/10">
                {copy.whatYouGet.items.map((item, i) => (
                  <li key={i} className="flex items-baseline gap-5 py-5 group/item">
                    <span className="font-display text-base md:text-lg text-[#D4FF00] shrink-0 leading-none w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base md:text-lg text-neutral-800 dark:text-neutral-200 leading-snug font-medium group-hover/item:text-neutral-900 dark:group-hover/item:text-white transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── How it works — 4 steps ─── */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-200 dark:border-white/10">
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

      {/* ─── Not for everyone — filter ─── */}
      <section className="py-20 md:py-24 border-t border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="max-w-4xl">
              <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-500 mb-6">
                {copy.notForEveryone.label}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-700 dark:text-neutral-400 leading-snug mb-6">
                {copy.notForEveryone.title}
              </h2>
              <ul className="space-y-3 mb-8">
                {copy.notForEveryone.criteria.map((c, i) => (
                  <li key={i} className="flex items-baseline gap-4 text-base md:text-lg text-neutral-700 dark:text-neutral-300">
                    <span className="text-[#D4FF00] shrink-0">·</span>
                    <span className="leading-snug">{c}</span>
                  </li>
                ))}
              </ul>
              <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-3xl">
                {copy.notForEveryone.refer}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Intake form ─── */}
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
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  {copy.form.subtitle}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-10" noValidate>
                {/* Name */}
                <FormText
                  label={copy.form.fields.name}
                  name="name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                  autoComplete="name"
                />
                {/* Company */}
                <FormText
                  label={copy.form.fields.company}
                  name="company"
                  value={form.company}
                  onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                  required
                  autoComplete="organization"
                />
                {/* Email */}
                <FormText
                  label={copy.form.fields.email}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  required
                  autoComplete="email"
                />

                {/* Vertical */}
                <RadioGroup
                  legend={copy.form.fields.vertical}
                  name="vertical"
                  value={form.vertical}
                  onChange={(v) => setForm((f) => ({ ...f, vertical: v as Vertical }))}
                  options={[
                    { value: "fitness", label: copy.form.verticals.fitness },
                    { value: "wellness", label: copy.form.verticals.wellness },
                    { value: "health", label: copy.form.verticals.health },
                    { value: "retail", label: copy.form.verticals.retail },
                    { value: "other", label: copy.form.verticals.other },
                  ]}
                />

                {/* Scale */}
                <RadioGroup
                  legend={copy.form.fields.scale}
                  name="scale"
                  value={form.scale}
                  onChange={(v) => setForm((f) => ({ ...f, scale: v as Scale }))}
                  options={[
                    { value: "1", label: "1" },
                    { value: "2-5", label: "2–5" },
                    { value: "5-15", label: "5–15" },
                    { value: "15-50", label: "15–50" },
                    { value: "50+", label: "50+" },
                  ]}
                />

                {/* Budget */}
                <RadioGroup
                  legend={copy.form.fields.budget}
                  name="budget_signal"
                  value={form.budget_signal}
                  onChange={(v) => setForm((f) => ({ ...f, budget_signal: v as Budget }))}
                  options={[
                    { value: "under_30k", label: copy.form.budgets.under },
                    { value: "30k-100k", label: copy.form.budgets.low },
                    { value: "100k-250k", label: copy.form.budgets.mid },
                    { value: "over_250k", label: copy.form.budgets.high },
                  ]}
                />

                {error && (
                  <p className="text-sm md:text-base text-red-400 font-medium" role="alert">
                    {error}
                  </p>
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

// ─── Small primitives ─────────────────────────────────────────────────

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

function RadioGroup({
  legend,
  name,
  value,
  onChange,
  options,
}: {
  legend: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-xs font-display uppercase tracking-[0.2em] text-neutral-500 dark:text-[#D4FF00] mb-2">
        {legend}
        <span className="ml-1 text-[#D4FF00] dark:text-[#D4FF00]/70">*</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`
              cursor-pointer px-5 py-3 border text-sm md:text-base font-medium tracking-tight
              transition-all duration-300
              ${value === opt.value
                ? "border-[#D4FF00] bg-[#D4FF00] text-black"
                : "border-neutral-300 dark:border-white/20 text-neutral-700 dark:text-neutral-300 hover:border-[#D4FF00] dark:hover:border-[#D4FF00] hover:text-neutral-900 dark:hover:text-white"
              }
            `}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

// ─── Copy ─────────────────────────────────────────────────────────────

const COPY_EN = {
  hero: {
    label: "Strategic Diagnostic · 48h",
    title: "A strategic scope read in 48 hours.",
    intro:
      "Initial positioning, scope and pricing read — before any project commitment. Built for multi-location fitness, wellness, health and retail brands.",
    fit: "For projects above 50 000 PLN with 3+ locations. Money back if recommendations are not actionable within 60 days.",
  },
  whatYouGet: {
    label: "What you get",
    title: "Four deliverables. One PDF. 48 hours.",
    items: [
      "Competitive positioning analysis tailored to your vertical",
      "Initial scope with rough cost estimate (range, not quote)",
      "Three strategic paths with prioritization rationale",
      "Written feedback in PDF + optional 30-min call",
    ],
  },
  howItWorks: {
    label: "How it works",
    title: "Four steps. Defined upfront. Honest finish.",
    steps: [
      {
        title: "Fill the brief",
        desc: "8–12 minutes through a guided wizard. Strategic context, not technical specs.",
      },
      {
        title: "We analyze",
        desc: "Senior-level read against your vertical, scale and budget. 24 hours.",
      },
      {
        title: "You receive feedback",
        desc: "PDF in your inbox with positioning, scope, paths. Optional 30-min call attached.",
      },
      {
        title: "We decide together",
        desc: "Whether we play, refer you in our network, or you take the playbook in-house.",
      },
    ],
  },
  notForEveryone: {
    label: "Not for everyone",
    title: "We say no more often than we say yes. The Diagnostic fits when:",
    criteria: [
      "Your organization has 3+ locations, brands or stakeholders",
      "Project budget is north of 50 000 PLN",
      "You operate in fitness, wellness, health or retail",
    ],
    refer:
      "If your project doesn't fit — we'll tell you in the feedback and refer you to someone in our network who's better positioned. No upsell pressure.",
  },
  form: {
    label: "Begin the diagnostic",
    title: "60 seconds to start.",
    subtitle:
      "We need just enough context to route your brief correctly. The wizard that follows is where the real conversation happens.",
    fields: {
      name: "Your name",
      company: "Company",
      email: "Work email",
      vertical: "Vertical",
      scale: "Number of locations",
      budget: "Budget range",
    },
    verticals: {
      fitness: "Fitness",
      wellness: "Wellness / Spa",
      health: "Health / Medical",
      retail: "Retail",
      other: "Other",
    },
    budgets: {
      under: "Under 30K PLN",
      low: "30–100K PLN",
      mid: "100–250K PLN",
      high: "250K+ PLN",
    },
    cta: "Begin diagnostic",
    submitting: "Submitting…",
    privacy:
      "We treat every submission as confidential. Your data routes only to Reszek for review and is never shared. By submitting you agree to receive the strategic diagnostic by email within 48 hours.",
  },
};

const COPY_PL = {
  hero: {
    label: "Strategic Diagnostic · 48h",
    title: "Strategiczny scope read w 48 godzin.",
    intro:
      "Wstępne pozycjonowanie, zakres i widełki cenowe — zanim podejmiesz commitment projektowy. Dla marek wielolokalizacyjnych w fitness, wellness, health i retail.",
    fit: "Dla projektów powyżej 50 000 PLN z 3+ lokalizacjami. Pełen zwrot kosztów, jeśli rekomendacje nie są wdrażalne w 60 dni.",
  },
  whatYouGet: {
    label: "Co dostajesz",
    title: "Cztery deliverables. Jeden PDF. 48 godzin.",
    items: [
      "Analiza pozycjonowania konkurencyjnego dla Twojej branży",
      "Wstępny zakres z widełkową estymacją kosztów (range, nie wycena)",
      "Trzy strategiczne ścieżki z priorytetyzacją",
      "Feedback w PDF + opcjonalny call 30 min",
    ],
  },
  howItWorks: {
    label: "Jak to działa",
    title: "Cztery kroki. Zdefiniowane z góry. Uczciwe zakończenie.",
    steps: [
      {
        title: "Wypełnij brief",
        desc: "8–12 minut przez prowadzony wizard. Strategiczny kontekst, nie spec techniczny.",
      },
      {
        title: "Analizujemy",
        desc: "Seniorski read pod kątem branży, skali i budżetu. 24 godziny.",
      },
      {
        title: "Dostajesz feedback",
        desc: "PDF w skrzynce z pozycjonowaniem, zakresem, ścieżkami. Opcjonalny call 30 min w pakiecie.",
      },
      {
        title: "Decydujemy razem",
        desc: "Czy gramy, kierujemy Cię do kogoś z naszej sieci, czy bierzesz playbook in-house.",
      },
    ],
  },
  notForEveryone: {
    label: "Nie dla każdego",
    title: "Mówimy „nie” częściej niż „tak”. Diagnostic pasuje, gdy:",
    criteria: [
      "Organizacja ma 3+ lokalizacji, marek lub stakeholderów",
      "Budżet projektu powyżej 50 000 PLN",
      "Działasz w fitness, wellness, health albo retail",
    ],
    refer:
      "Jeśli Twój projekt nie pasuje — powiemy Ci to w feedbacku i polecimy kogoś z naszej sieci kto lepiej odpowiada na Twoją potrzebę. Bez upsell pressure.",
  },
  form: {
    label: "Zacznij Diagnostic",
    title: "60 sekund na start.",
    subtitle:
      "Potrzebujemy minimum kontekstu, żeby właściwie wyrouterować Twój brief. Prawdziwa rozmowa dzieje się w wizardzie który zaczniesz po wysłaniu.",
    fields: {
      name: "Imię i nazwisko",
      company: "Firma",
      email: "Email służbowy",
      vertical: "Branża",
      scale: "Liczba lokalizacji",
      budget: "Budżet",
    },
    verticals: {
      fitness: "Fitness",
      wellness: "Wellness / Spa",
      health: "Health / Medical",
      retail: "Retail",
      other: "Inne",
    },
    budgets: {
      under: "Poniżej 30K PLN",
      low: "30–100K PLN",
      mid: "100–250K PLN",
      high: "250K+ PLN",
    },
    cta: "Zacznij Diagnostic",
    submitting: "Wysyłam…",
    privacy:
      "Każde zgłoszenie traktujemy jako poufne. Twoje dane trafiają wyłącznie do Reszka do review i nie są nigdzie udostępniane. Wysyłając formularz akceptujesz otrzymanie strategicznego diagnostic'a na email w ciągu 48 godzin.",
  },
};
