import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLocation } from "wouter";
import { MagneticButton } from "@/app/components/ui/MagneticButton";

export function Contact() {
  const { language } = useLanguage();
  const lang = language as "en" | "pl";
  const [, setLocation] = useLocation();

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

      {/* ─── 2-Path Choice — Brief (primary) vs Direct mail (secondary) ─── */}
      <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

            {/* PATH A — PRIMARY: Brief */}
            <Reveal>
              <div className="relative pt-10 lg:pt-12 lg:pr-12 lg:border-r border-neutral-200 dark:border-white/10">
                <span className="absolute top-0 left-0 inline-block text-[10px] font-display uppercase tracking-[0.25em] text-[#D4FF00] bg-[#D4FF00]/10 dark:bg-[#D4FF00]/10 border border-[#D4FF00]/40 px-2 py-1">
                  {copy.pathA.badge}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-6 leading-[1.0]">
                  {copy.pathA.title}
                </h2>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 max-w-xl">
                  {copy.pathA.body}
                </p>
                <ul className="flex flex-col gap-2 mb-10 max-w-xl">
                  {copy.pathA.bullets.map((b, i) => (
                    <li key={i} className="flex items-baseline gap-3 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                      <span className="text-[#D4FF00] shrink-0">·</span>
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
                <MagneticButton
                  onClick={() => setLocation("/brief")}
                  className="bg-[#D4FF00] text-black border-none hover:bg-white rounded-none"
                  glowColor="rgba(212, 255, 0, 0.3)"
                >
                  <span className="text-sm font-display uppercase tracking-widest">
                    {copy.pathA.cta}
                  </span>
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                </MagneticButton>
              </div>
            </Reveal>

            {/* PATH B — SECONDARY: Direct mail */}
            <Reveal delay={0.1}>
              <div className="pt-10 lg:pt-12">
                <span className="inline-block text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-500 border border-neutral-300 dark:border-white/20 px-2 py-1 mb-8">
                  {copy.pathB.badge}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-700 dark:text-neutral-300 mb-6 leading-[1.05]">
                  {copy.pathB.title}
                </h2>
                <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 max-w-xl">
                  {copy.pathB.body}
                </p>
                <a
                  href="mailto:hello@r352.com?subject=r352%20—%20hello"
                  className="group/link inline-flex items-center gap-3 text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-white hover:text-[#D4FF00] dark:hover:text-[#D4FF00] transition-colors duration-500"
                >
                  <span className="border-b-2 border-neutral-900 dark:border-white group-hover/link:border-[#D4FF00] transition-colors duration-500 pb-1">
                    hello@r352.com
                  </span>
                  <span className="inline-block transition-transform duration-500 group-hover/link:translate-x-2 text-xl">→</span>
                </a>
                <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-500 mt-6 leading-relaxed max-w-xl italic">
                  {copy.pathB.steer}
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

    </PageTransition>
  );
}

// ─── Copy ─────────────────────────────────────────────────────────────

const COPY_EN = {
  hero: {
    label: "Contact",
    title: "Let's talk.",
    intro:
      "Two ways to start: a structured brief if you want depth, or a direct line if you already know us.",
    subline:
      "Whichever you choose, we respond within 48 hours. Every conversation starts with understanding — not pitching.",
  },
  pathA: {
    badge: "Primary · 5–18 min",
    title: "Start a structured brief.",
    body: "The brief adapts to your engagement type — from a 5-min diagnostic prompt to an 18-min strategic onboarding. You answer only the questions that fit your case.",
    bullets: [
      "Structured context — we arrive at the call already understanding your situation",
      "48-hour written response with positioning, scope direction, and next step",
      "Free, no commitment — refer-out to network if we're not the right fit",
    ],
    cta: "Start a brief",
  },
  pathB: {
    badge: "Secondary · 30 sec",
    title: "Or write directly.",
    body: "For warm referrals, quick chats, or if you'd rather start with a sentence than a form. We read every email within 24 hours.",
    steer: "If you want a precise scope read from us, the brief gives us 10× more context than email — and you'll get a more meaningful first response.",
  },
};

const COPY_PL = {
  hero: {
    label: "Kontakt",
    title: "Porozmawiajmy.",
    intro:
      "Dwie drogi startu: ustrukturyzowany brief jeśli chcesz głębi, albo bezpośredni kontakt jeśli już nas znasz.",
    subline:
      "Niezależnie od wyboru — odpowiadamy w 48 godzin. Każda rozmowa zaczyna się od zrozumienia, nie od pitcha.",
  },
  pathA: {
    badge: "Główna · 5–18 min",
    title: "Wypełnij ustrukturyzowany brief.",
    body: "Brief dopasowuje się do typu współpracy — od 5-minutowej diagnozy po 18-minutowe strategiczne onboarding. Odpowiadasz tylko na pytania pasujące do Twojego case'u.",
    bullets: [
      "Ustrukturyzowany kontekst — wchodzimy na rozmowę już rozumiejąc Twoją sytuację",
      "Pisemna odpowiedź w 48h: pozycjonowanie, kierunek zakresu, następny krok",
      "Bezpłatnie, bez zobowiązań — polecimy kogoś z sieci jeśli nie pasujemy",
    ],
    cta: "Wypełnij brief",
  },
  pathB: {
    badge: "Alternatywna · 30 sek",
    title: "Albo napisz bezpośrednio.",
    body: "Dla relacji warm, poleconych, quick chat'u, albo gdy wolisz zacząć od jednego zdania niż od formularza. Czytamy każdy mail w ciągu 24 godzin.",
    steer: "Jeśli chcesz precyzyjnej odpowiedzi co do zakresu — brief daje nam 10× więcej kontekstu niż mail, a Ty dostaniesz dużo bardziej trafny first response.",
  },
};
