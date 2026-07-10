import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { ArrowRight } from "lucide-react";

/**
 * Careers - open roles at r352. Positions the studio as a growing operation (not a
 * solo shop) and invites senior operators into the curated network. r352 brand,
 * indexable, bilingual. Linked from the footer.
 */
type Role = {
  id: string;
  title: string;
  type: { en: string; pl: string };
  tags: string[];
  desc: { en: string; pl: string };
};

const ROLES: Role[] = [
  {
    id: "senior-product-designer",
    title: "Senior Product Designer",
    type: { en: "Remote · EU hours · Rolling", pl: "Zdalnie · strefa EU · nabór ciągły" },
    tags: ["UX/UI", "Design systems", "Product"],
    desc: {
      en: "You lead product design across client engagements - flows, interfaces, design systems - inside the r3loop operating system. Senior, self-directed, systems-minded. You ship polished work on a steady cadence, not one heroic sprint.",
      pl: "Prowadzisz product design w projektach klientów - flowy, interfejsy, design systemy - wewnątrz operacyjnego systemu r3loop. Senior, samodzielny, myślący systemowo. Dowozisz dopracowaną robotę w stałym rytmie, nie jednym heroicznym zrywem.",
    },
  },
  {
    id: "freelance-cmo",
    title: "Freelance CMO",
    type: { en: "Partnership · Remote · EU hours", pl: "Partnerstwo · zdalnie · strefa EU" },
    tags: ["Strategy", "Growth", "Partnership"],
    desc: {
      en: "This is a partnership, not a hire. You are a fractional CMO with your own clients and point of view - we plug r352 in as your design and delivery engine, you plug in as the strategic marketing layer on ours. Shared engagements, shared upside.",
      pl: "To partnerstwo, nie rekrutacja. Jesteś fractional CMO z własnymi klientami i własnym zdaniem - my podpinamy r352 jako Twój silnik designu i delivery, Ty wchodzisz jako warstwa strategii marketingowej w naszych projektach. Wspólne wdrożenia, wspólny upside.",
    },
  },
  {
    id: "marketing-performance-manager",
    title: "Marketing & Performance Manager",
    type: { en: "Remote · EU hours · Rolling", pl: "Zdalnie · strefa EU · nabór ciągły" },
    tags: ["Performance", "Paid media", "Analytics"],
    desc: {
      en: "You run the performance layer on top of our creative output - paid campaigns, funnels, tracking, reporting. You close the loop between what we ship and what it earns, and feed the numbers back into the creative system.",
      pl: "Prowadzisz warstwę performance nad naszą kreacją - kampanie paid, funnele, tracking, raportowanie. Domykasz pętlę między tym, co dowozimy, a tym, co to zarabia, i oddajesz liczby z powrotem do systemu kreatywnego.",
    },
  },
  {
    id: "brand-creative-designer",
    title: "Brand & Creative Designer",
    type: { en: "Remote · EU hours · Rolling", pl: "Zdalnie · strefa EU · nabór ciągły" },
    tags: ["Brand systems", "Campaign", "Production"],
    desc: {
      en: "You shape brand systems and campaign work that hold across many locations and formats - from key visuals to full asset packs, delivered on a steady production rhythm without drifting off-brand.",
      pl: "Tworzysz systemy brandowe i kampanie, które trzymają się w wielu lokalizacjach i formatach - od key visuali po pełne pakiety assetów, dostarczane w stałym rytmie produkcji, bez dryfowania od marki.",
    },
  },
  {
    id: "mid-digital-designer",
    title: "Mid Digital Designer",
    type: { en: "Remote · EU hours · Rolling", pl: "Zdalnie · strefa EU · nabór ciągły" },
    tags: ["Web / Landing", "Social", "Production"],
    desc: {
      en: "You produce digital design across web, landing pages, social and campaign - fast, on-brand, to spec. You work inside clear standards and the r3loop system, turning briefs into production-ready assets at a steady pace, and grow toward owning your own area.",
      pl: "Produkujesz digital design - web, landing page, social, kampanie - szybko, on-brand, zgodnie ze specyfikacją. Pracujesz w jasnych standardach i systemie r3loop, zamieniając briefy w gotowe do produkcji assety w stałym tempie, i rośniesz w stronę własnego obszaru.",
    },
  },
];

export function Careers() {
  const { language } = useLanguage();
  const pl = language === "pl";

  const principles = [
    {
      k: pl ? "Zdalnie, kotwica w EU" : "Remote-first, EU-anchored",
      v: pl
        ? "Pracujemy zdalnie w strefie europejskiej. Liczy się efekt, nie godziny w biurze."
        : "We work remotely across European hours. Output matters, not desk time.",
    },
    {
      k: pl ? "Tylko seniorzy" : "Senior only",
      v: pl
        ? "Bez juniorów do pilnowania. Dołączasz jako samodzielny operator, nie para rąk."
        : "No juniors to babysit. You join as a self-directed operator, not a pair of hands.",
    },
    {
      k: pl ? "System, nie godziny" : "System, not hours",
      v: pl
        ? "Pracujemy metodologią r3loop. Budujesz rzeczy, które działają dalej beze mnie."
        : "We run on the r3loop methodology. You build things that keep working without us.",
    },
    {
      k: pl ? "Realny ownership" : "Real ownership",
      v: pl
        ? "Bierzesz odpowiedzialność za obszar, nie za kolejkę tasków. Decydujesz i dowozisz."
        : "You own an area, not a task queue. You decide and you deliver.",
    },
  ];

  const applyHref = (title: string) =>
    `mailto:hello@r352.com?subject=${encodeURIComponent("Careers - " + title)}`;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="max-w-[1800px] mx-auto px-8 md:px-12 pt-40 md:pt-52 pb-16 md:pb-24">
          <Reveal>
            <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-6">
              {pl ? "Kariera" : "Careers"}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.95] max-w-4xl">
              {pl
                ? "Buduj operating system stojący za dobrym designem."
                : "Build the operating system behind great design."}
            </h1>
            <p className="mt-8 max-w-2xl text-base md:text-xl text-neutral-400 leading-relaxed [text-wrap:pretty]">
              {pl
                ? "r352 to operator, nie agencja - design operations dla marek działających w skali. Rośniemy przez wąską sieć seniorów, nie przez etaty. Poniżej role otwarte w trybie ciągłym."
                : "r352 is an operator, not an agency - design operations for brands delivering at scale. We grow through a tight network of senior operators, not headcount. The roles below are open on a rolling basis."}
            </p>
          </Reveal>
        </section>

        {/* How we work */}
        <section className="max-w-[1800px] mx-auto px-8 md:px-12 py-16 md:py-24 border-t border-white/10">
          <Reveal>
            <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-10 md:mb-14">
              {pl ? "Jak pracujemy" : "How we work"}
            </span>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {principles.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="border-t border-white/15 pt-5">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2">{p.k}</h3>
                  <p className="text-base text-neutral-400 leading-relaxed [text-wrap:pretty]">{p.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Open roles */}
        <section className="max-w-[1800px] mx-auto px-8 md:px-12 py-16 md:py-24 border-t border-white/10">
          <Reveal>
            <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-10 md:mb-14">
              {pl ? "Otwarte role" : "Open roles"}
            </span>
          </Reveal>
          <div>
            {ROLES.map((role, i) => (
              <Reveal key={role.id} delay={i * 0.06}>
                <a
                  href={applyHref(role.title)}
                  className="group block border-t border-white/10 py-8 md:py-10 transition-colors duration-300 hover:bg-white/[0.02]"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                        <h3 className="text-2xl md:text-4xl font-bold tracking-tighter text-white group-hover:text-[#D4FF00] transition-colors duration-300">
                          {role.title}
                        </h3>
                        <span className="text-[11px] font-display uppercase tracking-[0.18em] text-neutral-500">
                          {pl ? role.type.pl : role.type.en}
                        </span>
                      </div>
                      <p className="max-w-2xl text-base md:text-lg text-neutral-400 leading-relaxed [text-wrap:pretty]">
                        {pl ? role.desc.pl : role.desc.en}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {role.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/12 px-3 py-1 text-[11px] font-display uppercase tracking-wide text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-neutral-400 group-hover:text-[#D4FF00] transition-colors duration-300 md:pt-3 whitespace-nowrap">
                      {pl ? "Aplikuj" : "Apply"}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
            <div className="border-t border-white/10" />
          </div>
        </section>

        {/* Talent network / speculative */}
        <section className="max-w-[1800px] mx-auto px-8 md:px-12 py-24 md:py-32 border-t border-white/10">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
              <div className="col-span-12 md:col-span-7">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-[0.98]">
                  {pl ? "Nie widzisz swojej roli?" : "Don't see your role?"}
                </h2>
              </div>
              <div className="col-span-12 md:col-span-5 md:justify-self-end max-w-md space-y-6">
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                  {pl
                    ? "Jeśli jesteś seniorem, który myśli systemowo i dowozi - napisz. Trzymamy sieć na przyszłe projekty."
                    : "If you're a senior who thinks in systems and ships - reach out. We keep a network warm for future work."}
                </p>
                <a
                  href="mailto:hello@r352.com?subject=Careers%20-%20talent%20network"
                  className="group inline-flex items-center gap-3 bg-[#D4FF00] text-black font-display uppercase tracking-widest text-sm px-7 py-4 hover:bg-white transition-colors duration-300"
                >
                  {pl ? "Napisz do nas" : "Get in touch"}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </PageTransition>
  );
}
