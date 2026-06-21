import { Link } from "wouter";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { ArrowRight } from "lucide-react";

/**
 * ForAgencies — the white-label / project-consultant track.
 *
 * Audience: agency owners, creative directors, heads of delivery — NOT the
 * end brand. Positioning: end-to-end consulting — r352 is the integrated
 * strategy + creative + execution team an agency embeds on a client, white-
 * labeled. The agency delegates client-leading and account ownership; r352 does
 * what it does best (think + make + ship as one accountable unit). NOT overflow
 * hands-for-hire, and deliberately NO r3loop framing here — this track is sold
 * as senior end-to-end consulting, not the productized methodology.
 *
 * Footer-only entry by design (kept out of top-nav so it doesn't compete with
 * the primary brand-direct narrative). Also surfaced contextually from /services.
 */
export function ForAgencies() {
  const { language } = useLanguage();
  const pl = language === "pl";

  // ── How it works — four steps, agency keeps the front, r352 runs the system ──
  const steps = [
    {
      id: "01",
      en: { t: "You win the work", d: "You keep the pitch, the relationship, the brand on the deck. Nothing about the client-facing front changes." },
      pl: { t: "Wygrywasz projekt", d: "Pitch, relacja i logo na decku zostają Twoje. Nic po stronie kontaktu z klientem się nie zmienia." },
    },
    {
      id: "02",
      en: { t: "We embed as one team", d: "Strategy, creative direction and execution — one integrated unit on your account. No briefing three vendors, no stitching the work together. One partner, accountable end to end." },
      pl: { t: "Wchodzimy jako jeden zespół", d: "Strategia, kierunek kreatywny i egzekucja — jeden zintegrowany zespół na Twoim koncie. Bez briefowania trzech wykonawców, bez zszywania efektów. Jeden partner, odpowiedzialny end to end." },
    },
    {
      id: "03",
      en: { t: "We deliver, white-labeled", d: "Senior craft and AI-elevated production ship under your name. We stay invisible to the client unless you want us in the room." },
      pl: { t: "Dowozimy, white-label", d: "Senioralny warsztat i produkcja wzmocniona AI wychodzą pod Twoją marką. Dla klienta jesteśmy niewidzialni — chyba że chcesz nas przy stole." },
    },
    {
      id: "04",
      en: { t: "You keep the credit", d: "The work, the case study, the renewal — yours. We measure ourselves on time-to-ship and approval cycles, not on logo placement." },
      pl: { t: "Zatrzymujesz zasługi", d: "Praca, case study, odnowienie — Twoje. Mierzymy się czasem dostawy i liczbą rund akceptacji, nie miejscem na logo." },
    },
  ];

  // ── Clear split of ownership — removes the "are they replacing us?" fear ──
  const weHandle = pl
    ? ["Strategię i kierunek kreatywny", "Senioralny design i produkcję", "Egzekucję end-to-end — jeden zespół", "Produkcję wzmocnioną AI", "Jakość i przewidywalny rytm dostaw"]
    : ["Strategy & creative direction", "Senior design & production craft", "End-to-end execution — one team", "AI-elevated production", "Quality & a predictable shipping cadence"];

  const youKeep = pl
    ? ["Prowadzenie klienta i relację", "Markę na deckach i w komunikacji", "Pitch i relację handlową", "Case study i odnowienia", "Marżę — bez etatów na pokładzie"]
    : ["The client lead & relationship", "Your brand on decks & comms", "The pitch & commercial relationship", "The case study & renewals", "Your margin — without adding headcount"];

  // ── Who it's for ──
  const fits = [
    {
      en: { t: "Agencies winning above their capacity", d: "You're closing work your current team can't ship at the standard you sold. Plug in a senior team, not freelancers." },
      pl: { t: "Agencje wygrywające ponad swoją moc", d: "Domykasz projekty, których obecny zespół nie dowiezie na sprzedanym poziomie. Wepnij senioralny zespół, nie freelancerów." },
    },
    {
      en: { t: "Agencies strong on ideas, stretched on delivery", d: "Great creative, chaotic execution — revision loops, unclear ownership, slipping deadlines. We take the work from concept to shipped." },
      pl: { t: "Agencje mocne w pomysłach, słabsze w realizacji", d: "Świetna kreacja, chaotyczna egzekucja — pętle poprawek, niejasna odpowiedzialność, ślizgające się terminy. Bierzemy pracę od koncepcji po dowiezienie." },
    },
    {
      en: { t: "Agencies that need strategy through execution", d: "You want one senior partner who can think it, design it and ship it — not a chain of freelancers you have to direct and stitch together." },
      pl: { t: "Agencje, które potrzebują strategii i egzekucji naraz", d: "Chcesz jednego senioralnego partnera, który to wymyśli, zaprojektuje i dowiezie — zamiast łańcucha freelancerów do kierowania i zszywania." },
    },
  ];

  // ── How we engage — three shapes, all priced from a brief (premium, no rate card) ──
  const engage = [
    {
      en: { t: "Per project", d: "One won pitch, one defined scope — start to shipped. The cleanest way to try the partnership." },
      pl: { t: "Per projekt", d: "Jeden wygrany pitch, jeden zdefiniowany zakres — od startu po dowiezienie. Najczystszy sposób, by przetestować współpracę." },
    },
    {
      en: { t: "Retained capacity", d: "A standing senior team on call across your accounts, monthly. Predictable cost, no hiring, no idle bench." },
      pl: { t: "Retainer", d: "Stały senioralny zespół na zawołanie na Twoich klientach, miesięcznie. Przewidywalny koszt, bez rekrutacji, bez przestoju." },
    },
    {
      en: { t: "Embedded for a launch", d: "We sit inside your team for a campaign or launch window — strategy through execution, end to end, then hand back." },
      pl: { t: "Embedded na launch", d: "Wchodzimy do Twojego zespołu na okno kampanii lub launchu — strategia po egzekucję, end to end, potem oddajemy ster." },
    },
  ];

  // ── The retainer — fixed monthly capacity, deliberately non-invasive process ──
  const retainerSteps = [
    {
      en: { t: "One way in", d: "A single point of contact, in the tools you already use — Slack, Notion, email. Nothing new for your team to learn." },
      pl: { t: "Jedno wejście", d: "Jeden punkt kontaktu, w narzędziach, których już używasz — Slack, Notion, mail. Twój zespół nie uczy się niczego nowego." },
    },
    {
      en: { t: "Fixed monthly scope", d: "A set capacity each month at a flat fee. Predictable cost, predictable output — no surprise invoices, no re-scoping every task." },
      pl: { t: "Stały miesięczny zakres", d: "Ustalona moc co miesiąc w stałej stawce. Przewidywalny koszt i output — bez niespodzianek na fakturze, bez wyceniania każdego zadania." },
    },
    {
      en: { t: "Your rhythm, not ours", d: "We slot into your cadence, briefs and approvals. We adapt to how your team works — we don't make you adopt our process." },
      pl: { t: "Twój rytm, nie nasz", d: "Wchodzimy w Twój rytm, briefy i akceptacje. To my dopasowujemy się do Twojego zespołu — nie odwrotnie." },
    },
    {
      en: { t: "Quiet by default", d: "Async-first, light reporting. We surface only what needs a decision — no standing meetings, no overhead added to your week." },
      pl: { t: "Cicho z domysłu", d: "Async-first, lekki reporting. Pokazujemy tylko to, co wymaga decyzji — bez stałych spotkań, bez dociążania Twojego tygodnia." },
    },
  ];

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      {/* ── Hero ── */}
      <section className="mb-32 md:mb-48">
        <Reveal>
          <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-8 block">
            {pl ? "Dla agencji" : "For Agencies"}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.92] mb-10 max-w-5xl">
            {pl ? (
              <>Wygrywasz pitch.<br />My dostarczamy.</>
            ) : (
              <>Win the pitch.<br />We run the delivery.</>
            )}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-3xl mb-12">
            {pl
              ? "White-label, end-to-end konsultant dla agencji. Strategia, kreacja i egzekucja w jednym miejscu — wchodzimy na Twojego klienta jako zintegrowany zespół, pod Twoją marką. Ty prowadzisz relację, my robimy to, co umiemy najlepiej."
              : "A white-label, end-to-end consultant for agencies. Strategy, creative and execution in one place — we embed on your client as one integrated team, under your name. You lead the relationship, we do what we do best."}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/brief"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#D4FF00] text-black font-display uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300"
            >
              {pl ? "Złóż brief" : "Start a brief"}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="https://calendly.com/p-reszkovy/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white font-display uppercase tracking-widest text-sm hover:border-white/60 hover:text-[#D4FF00] transition-colors duration-300"
            >
              {pl ? "Umów rozmowę" : "Book a call"}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── Proof line — quiet credibility band. CONFIRM/ADJUST WORDING with the
            client before relying on it publicly (currently a true but unnamed claim). ── */}
      <Reveal>
        <div className="mb-32 md:mb-40 border-l-2 border-[#D4FF00] pl-6 md:pl-8">
          <p className="text-lg md:text-2xl text-neutral-300 leading-relaxed max-w-3xl">
            {pl
              ? "Już to robimy — embedded w jednej z większych polskich agencji, na żywej pracy klienckiej."
              : "We already run this — embedded with one of Poland's larger agencies, on live client work."}
          </p>
          {/* NDA note — turns the unnamed claim into a feature: discretion IS the
              white-label product. Also why this page shows no logos/case detail. */}
          <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-2xl mt-4">
            {pl
              ? "Bez nazw, bez szczegółów — każda współpraca działa pod NDA. Ta dyskrecja to część usługi: white-label znaczy, że Twój klient nigdy nas nie widzi, a Twoja przewaga zostaje Twoja."
              : "No names, no details — every engagement runs under NDA. The discretion is the product: white-label means your client never sees us, and your edge stays yours."}
          </p>
        </div>
      </Reveal>

      {/* ── The tension ── */}
      <section className="mb-32 md:mb-48 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="text-xs font-display uppercase tracking-widest text-neutral-500 mb-6 block">
              {pl ? "Napięcie" : "The tension"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.05]">
              {pl
                ? "Wygrywasz na kreacji. Wycieka na realizacji."
                : "You win on creative. It leaks on delivery."}
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:pt-2">
          <Reveal delay={0.15}>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl">
              {pl
                ? "Pitch zamknięty, klient na pokładzie — a potem trzy rundy poprawek, niejasna odpowiedzialność i rwany rytm zjadają marżę i reputację. Nie potrzebujesz kolejnych rąk. Potrzebujesz systemu, który dowozi przewidywalnie — i specjalisty, który nim steruje."
                : "Pitch closed, client onboarded — then three revision rounds, unclear ownership, and a broken cadence eat the margin and the reputation. You don't need more hands. You need a system that ships predictably — and a specialist who runs it."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="mb-32 md:mb-48">
        <Reveal>
          <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-12 block">
            {pl ? "Jak to działa" : "How it works"}
          </span>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {steps.map((step, i) => {
            const c = pl ? step.pl : step.en;
            return (
              <Reveal key={step.id} delay={0.1 + i * 0.08} width="100%">
                <div className="bg-[#0A0A0A] p-8 md:p-12 h-full hover:bg-[#151515] transition-colors duration-500 group">
                  <span className="font-display text-sm text-[#D4FF00] block mb-6">{step.id}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#D4FF00] transition-colors">
                    {c.t}
                  </h3>
                  <p className="text-lg text-neutral-400 leading-relaxed">{c.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Ownership split: We handle / You keep ── */}
      <section className="mb-32 md:mb-48">
        <Reveal>
          <span className="text-xs font-display uppercase tracking-widest text-neutral-500 mb-12 block">
            {pl ? "Kto co trzyma" : "Who owns what"}
          </span>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <Reveal delay={0.1}>
            <div>
              <h3 className="text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-8">
                {pl ? "My ogarniamy" : "We handle"}
              </h3>
              <ul className="space-y-5">
                {weHandle.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-lg text-neutral-300 leading-snug">
                    <span className="text-[#D4FF00] mt-1.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <h3 className="text-xs font-display uppercase tracking-[0.2em] text-white mb-8">
                {pl ? "Ty zatrzymujesz" : "You keep"}
              </h3>
              <ul className="space-y-5">
                {youKeep.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-lg text-neutral-300 leading-snug">
                    <span className="text-white mt-1.5 shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Who it's for ── */}
      <section className="mb-32 md:mb-40">
        <Reveal>
          <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-12 block">
            {pl ? "Dla kogo" : "Who it's for"}
          </span>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fits.map((fit, i) => {
            const c = pl ? fit.pl : fit.en;
            return (
              <Reveal key={i} delay={0.1 + i * 0.1} width="100%">
                <div className="border-t border-white/15 pt-6 h-full">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug">{c.t}</h3>
                  <p className="text-base text-neutral-400 leading-relaxed">{c.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── How we engage ── */}
      <section className="mb-32 md:mb-40">
        <Reveal>
          <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-4 block">
            {pl ? "Jak współpracujemy" : "How we engage"}
          </span>
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mb-12">
            {pl
              ? "Trzy kształty współpracy. Bez cennika — każdy zaczyna się od briefu i wyceny dopasowanej do zakresu."
              : "Three shapes. No rate card — each one starts from a brief, scoped and priced to fit."}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {engage.map((m, i) => {
            const c = pl ? m.pl : m.en;
            return (
              <Reveal key={i} delay={0.1 + i * 0.08} width="100%">
                <div className="bg-[#0A0A0A] p-8 md:p-10 h-full hover:bg-[#151515] transition-colors duration-500 group">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[#D4FF00] transition-colors">{c.t}</h3>
                  <p className="text-base text-neutral-400 leading-relaxed">{c.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── The retainer — fixed capacity, non-invasive process ── */}
      <section className="mb-32 md:mb-40 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-6 block">
              {pl ? "Stały retainer" : "Fixed retainer"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.05] mb-6">
              {pl ? "Stała moc. Zero zamieszania." : "Fixed capacity. Zero disruption."}
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-md">
              {pl
                ? "Stały miesięczny retainer, który działa po cichu wewnątrz Twojego procesu — przewidywalny koszt, bez narzucania narzędzi, spotkań i biurokracji."
                : "A fixed monthly retainer that runs quietly inside your existing flow — predictable cost, no imposed tools, meetings or process."}
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <div className="flex flex-col">
            {retainerSteps.map((step, i) => {
              const c = pl ? step.pl : step.en;
              return (
                <Reveal key={i} delay={0.1 + i * 0.08} width="100%">
                  <div className="flex gap-6 md:gap-8 py-6 border-t border-white/10 last:border-b">
                    <span className="font-display text-sm text-[#D4FF00] pt-1 shrink-0 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{c.t}</h3>
                      <p className="text-base text-neutral-400 leading-relaxed max-w-xl">{c.d}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <Reveal delay={0.1}>
        <div className="pt-24 border-t border-white/10 flex flex-col items-center text-center gap-8">
          <span className="text-xs font-display uppercase tracking-widest text-neutral-500">
            {pl ? "Masz projekt, który trzeba dowieźć?" : "Got work that needs to ship?"}
          </span>
          <Link href="/brief" className="group relative inline-block cursor-pointer">
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white transition-colors duration-300 group-hover:text-[#D4FF00]">
              {pl ? "Porozmawiajmy white-label" : "Let's talk white-label"}
            </span>
          </Link>
          <p className="text-sm text-neutral-500 max-w-md leading-relaxed">
            {pl
              ? "Krótki brief, pierwsza odpowiedź w 48h z modelem współpracy i zakresem. Traktujemy każde zgłoszenie poufnie."
              : "A short brief, first response in 48h with engagement model and scope. Every submission treated as confidential."}
          </p>
        </div>
      </Reveal>
    </PageTransition>
  );
}
