import { useLanguage } from "@/app/context/LanguageContext";
import { Reveal } from "@/app/components/ui/Reveal";

export function EngagementModels() {
  const { language } = useLanguage();

  const models = [
    {
      number: "01",
      title: language === "pl" ? "Sprint" : "Sprint",
      priceFrom: language === "pl" ? "od 25 000 PLN" : "from €6,000",
      positioning: language === "pl"
        ? "Skoncentrowane zadanie z jasnym początkiem, zakresem i końcem."
        : "A focused engagement with a clear start, scope, and finish.",
      howItWorks: language === "pl" ? [
        "Definiujemy problem i oczekiwane rezultaty z góry",
        "Stały zakres, stały harmonogram - bez otwartych umów",
        "Otrzymujecie gotowy produkt na końcu, a nie prezentację",
        "Przekazanie obejmuje wszystko, czego wasz zespół potrzebuje do dalszego działania"
      ] : [
        "We define the problem and deliverables upfront",
        "Fixed scope, fixed timeline - no open-ended retainers",
        "You get a complete deliverable at the end, not a pitch deck",
        "Handoff includes everything your team needs to run it forward"
      ],
      timeline: language === "pl" ? "2-6 tygodni w zależności od zakresu" : "2-6 weeks depending on scope",
      idealWhen: language === "pl" ? [
        "Potrzebujecie systemu marki, pakietu kampanii lub strony internetowej - i wiecie, czego chcecie",
        "Macie datę premiery i musicie zdążyć na czas",
        "Chcecie przetestować współpracę z nami przed długoterminowym zaangażowaniem"
      ] : [
        "You need a brand system, campaign toolkit, or website - and you know what you need",
        "You have a launch date and need to ship on time",
        "You want to test working with us before committing long-term"
      ],
      successMetric: language === "pl"
        ? "Dostawa w 4-6 tygodni vs typowe 12-16 w in-house"
        : "Delivery in 4-6 weeks vs typical 12-16 in-house",
      startsWith: language === "pl"
        ? "Rozmowa określająca zakres, harmonogram i osoby decyzyjne."
        : "A scoping call where we define deliverables, timeline, and decision owners.",
      products: language === "pl"
        ? "System marki, pakiet kampanii, wdrożenie strony, UX produktu cyfrowego"
        : "Brand System, Campaign Toolkit, Website Launch, Digital Product UX"
    },
    {
      number: "02",
      title: language === "pl" ? "Abonament" : "Retainer",
      priceFrom: language === "pl" ? "od 12 000 PLN / mies." : "from €3,000 / mo",
      positioning: language === "pl"
        ? "Stała wydajność projektowa i produkcyjna w przewidywalnym, miesięcznym rytmie."
        : "Ongoing design and production capacity on a predictable monthly rhythm.",
      howItWorks: language === "pl" ? [
        "Miesięczna pula godzin zarezerwowana dla waszego zespołu",
        "Pracujemy ze wspólnego backlogu - wy briefujecie, my produkujemy, testujemy i dostarczamy",
        "Przewidywalne tempo: cotygodniowe lub dwutygodniowe dostawy, zależnie od ilości",
        "Obejmuje zarządzanie zgłoszeniami, kontrolę jakości i iteracje - nie tylko realizację"
      ] : [
        "Monthly capacity reserved for your team",
        "We work from a shared backlog - you brief, we produce, QA, deliver",
        "Predictable cadence: weekly or biweekly drops, depending on volume",
        "Includes intake management, QA, and iteration - not just execution"
      ],
      timeline: language === "pl" ? "Odnawiany co miesiąc - zalecane minimum 3 miesiące" : "Monthly rolling - minimum 3 months recommended for system benefits to kick in",
      idealWhen: language === "pl" ? [
        "Macie stałe potrzeby produkcyjne we wszystkich kanałach (social media, reklamy, e-maile, druk)",
        "Chcecie partnera projektowego włączonego w wasz rytm, a nie podwykonawcę wdrażanego co kwartał",
        "Potrzebujecie spójności i szybkości bez zatrudniania pełnego zespołu in-house"
      ] : [
        "You have constant production needs across channels (social, ads, email, print)",
        "You want a design partner embedded in your rhythm, not a vendor you re-onboard every quarter",
        "You need consistency and speed without hiring a full in-house team"
      ],
      successMetric: language === "pl"
        ? "70% briefów ready przy pierwszym złożeniu, 60% szybsze akceptacje"
        : "70% of briefs ready on first submission, 60% faster approvals",
      startsWith: language === "pl"
        ? "Sprint diagnostyczny (1-2 tygodnie), podczas którego sprawdzamy obecny obieg pracy, proces zgłoszeń i ustalamy rytm dostaw."
        : "A diagnostic sprint (1-2 weeks) where we audit your current workflow, set up intake, and define the delivery cadence.",
      products: language === "pl"
        ? "Komunikacja always-on, wielolokalizacyjny system zasobów, pakiet kampanii (stały)"
        : "Always-On Communication, Multi-Location Asset System, Campaign Toolkit (ongoing)"
    },
    {
      number: "03",
      title: language === "pl" ? "Diagnostyka" : "Diagnostic",
      priceFrom: language === "pl" ? "od 8 000 PLN" : "from €2,000",
      positioning: language === "pl"
        ? "Krótki, ustrukturyzowany audyt, który pokazuje dokładnie, gdzie zawodzi proces — zanim zaangażujecie się w budowanie czegokolwiek. Pełen zwrot kosztów, jeśli rekomendacje nie są wdrażalne w ciągu 60 dni."
        : "A short, structured audit that shows you exactly where delivery breaks down — before you commit to building anything. Money back if the recommendations are not actionable within 60 days.",
      howItWorks: language === "pl" ? [
        "Mapujemy obecny proces dostarczania od początku do końca: brief → akceptacja → produkcja → publikacja",
        "Identyfikujemy wąskie gardła, niejasne kompetencje, braki w kontroli jakości i zbędne iteracje",
        "Otrzymujecie pisemny raport z głównymi przyczynami i priorytetowym planem działania",
        "Brak zobowiązań do wdrożeń - możecie wprowadzić poprawki samodzielnie lub zaangażować nas w kolejną fazę"
      ] : [
        "We map your current delivery workflow end-to-end: brief → approval → production → publish",
        "We identify bottlenecks, unclear ownership, QA gaps, and wasted loops",
        "You get a written report with root causes and a prioritized action plan",
        "No commitment to build - you can run the fixes yourself or engage us for the next phase"
      ],
      timeline: language === "pl" ? "1-2 tygodnie" : "1-2 weeks",
      idealWhen: language === "pl" ? [
        "Czujecie, że dostarczanie jest powolne, ale nie wiecie dlaczego",
        "Planujecie skalowanie i chcecie naprawić system, zanim ulegnie awarii",
        "Potrzebujecie danych przed podjęciem decyzji o zatrudnianiu, narzędziach lub outsourcingu"
      ] : [
        "You feel delivery is slow but can't pinpoint why",
        "You're about to scale (new markets, more locations, bigger team) and want to fix the system before it breaks",
        "You want data before making a decision about hiring, tooling, or outsourcing"
      ],
      successMetric: language === "pl"
        ? "5-7 priorytetyzowanych wąskich gardeł + 60-dniowy plan działania"
        : "5-7 prioritized bottlenecks + 60-day action plan",
      startsWith: language === "pl"
        ? "60-minutowe spotkanie inicjujące, podczas którego przeprowadzamy wywiady z kluczowymi osobami i prosimy o dostęp do waszych narzędzi."
        : "A 60-minute kickoff where we interview key stakeholders and request access to your current workflows.",
      deliverable: language === "pl"
        ? "Audyt procesu dostarczania — mapa wąskich gardeł, analiza przyczyn i priorytetowe rekomendacje."
        : "Delivery Workflow Audit — bottleneck map, root cause analysis, and prioritized recommendations."
    }
  ];

  const enterpriseModels = [
    {
      number: "04",
      title: language === "pl" ? "Wdrożenie Enterprise" : "Enterprise Sprint",
      priceFrom: language === "pl" ? "od 120 000 PLN" : "from €28,000",
      positioning: language === "pl"
        ? "Pełne wdrożenie Creative Operating System dla organizacji wielolokalizacyjnej — od diagnozy po działający system z wytrenowanym zespołem."
        : "Full Creative Operating System implementation for a multi-location organization — from diagnosis to a running system with a trained team.",
      howItWorks: language === "pl" ? [
        "Pełny cykl: diagnoza, mapa popytu, standardy, ownership decyzji, budowa systemu, miary i rytm review",
        "Seniorski zespół osadzony w organizacji przez 12-16 tygodni",
        "Cotygodniowe checkpointy z leadership + warsztaty z zespołami operacyjnymi",
        "Przekazanie obejmuje pełną dokumentację systemu, training i 90-dniowy hand-over",
      ] : [
        "Full cycle: diagnosis, demand mapping, standards, decision ownership, system build, measurement and review rhythm",
        "Senior team embedded in the organization for 12-16 weeks",
        "Weekly checkpoints with leadership + workshops with operational teams",
        "Handoff includes complete system documentation, training, and a 90-day transition plan",
      ],
      timeline: language === "pl" ? "12-16 tygodni + 90 dni hand-over" : "12-16 weeks + 90-day handover",
      idealWhen: language === "pl" ? [
        "Wielolokalizacyjna organizacja (5+ lokalizacji lub marek) potrzebująca pełnej transformacji operacyjnej",
        "Wewnętrzny zespół designu/marketingu jest przeciążony, ale budżet i ambicja są na transformację, nie patch",
        "Leadership rozumie, że system jest aktywem długoterminowym — i jest gotowy go finansować",
      ] : [
        "A multi-location organization (5+ locations or brands) needing full operational transformation",
        "Internal design/marketing team is overloaded but budget and ambition are for transformation, not a patch",
        "Leadership understands the system is a long-term asset — and is willing to fund it accordingly",
      ],
      successMetric: language === "pl"
        ? "Pełen Operating System w 12-16 tyg vs typowe in-house 12-18 miesięcy"
        : "Full Operating System in 12-16 weeks vs typical in-house 12-18 months",
      startsWith: language === "pl"
        ? "Tygodniowy alignment-workshop z C-suite, podczas którego definiujemy zakres, kluczowe metryki sukcesu i punkty decyzyjne."
        : "A 1-week alignment workshop with the C-suite where we define scope, key success metrics, and decision gates.",
      products: language === "pl"
        ? "Pełen Creative Operating System: standardy briefów, scoring, governance, biblioteki, dashboard, AI workflow, training"
        : "Full Creative Operating System: brief standards, scoring, governance, libraries, dashboard, AI workflow, training"
    },
    {
      number: "05",
      title: language === "pl" ? "Partner Operacyjny" : "Operating Partner",
      priceFrom: language === "pl" ? "od 18 000 PLN / mies." : "from €4,500 / mo",
      positioning: language === "pl"
        ? "Strategiczna rola partnera operacyjnego — opiekun ewolucji systemu, doradca przy strategicznych decyzjach designu i komunikacji, obecność przy stole leadership."
        : "Strategic operating partner role — custodian of system evolution, advisor on strategic design and communication decisions, present at the leadership table.",
      howItWorks: language === "pl" ? [
        "Miesięczny executive review z leadership — kondycja systemu, trendy, decyzje strategiczne",
        "Kwartalne planowanie strategiczne + roadmapa ewolucji systemu",
        "Continuous coaching wewnętrznych zespołów + on-call dla kluczowych decyzji",
        "Rozszerzenia systemu (nowe lokalizacje, marki, kanały) — projektowane razem",
      ] : [
        "Monthly executive review with leadership — system health, trends, strategic decisions",
        "Quarterly strategic planning + roadmap for system evolution",
        "Continuous coaching for internal teams + on-call for major decisions",
        "System extensions (new locations, brands, channels) — designed together",
      ],
      timeline: language === "pl" ? "Kontrakt roczny, rytm miesięczny" : "Annual contract, monthly cadence",
      idealWhen: language === "pl" ? [
        "System jest zbudowany — potrzebuje opiekuna, który go rozwija i broni przed degradacją",
        "C-suite chce mieć strategicznego partnera designu przy stole decyzyjnym",
        "Horyzont transformacji jest wieloletni i obejmuje ekspansję organizacji",
      ] : [
        "The system is built — it needs a custodian to evolve it and protect it from decay",
        "C-suite wants a strategic design partner at the decision table",
        "Multi-year transformation horizon, including organizational expansion",
      ],
      successMetric: language === "pl"
        ? "Spadek revision loops o 50%+ rok-do-roku, system ewoluuje a nie wraca do zera"
        : "50%+ year-over-year reduction in revision loops, system evolves instead of resetting",
      startsWith: language === "pl"
        ? "Strategic alignment workshop z C-suite, podczas którego mapujemy 12-miesięczny horyzont i punkty kontrolne."
        : "A strategic alignment workshop with the C-suite where we map the 12-month horizon and check-in points.",
      products: language === "pl"
        ? "Opieka strategiczna nad całym Operating System: ewolucja, ekspansja, coaching, rozszerzenia"
        : "Strategic stewardship of the full Operating System: evolution, expansion, coaching, extensions"
    }
  ];

  return (
    <section id="engagement-models" className="pt-24 md:pt-32 mb-32 scroll-mt-32">
      <div className="flex flex-col mb-16">
        <Reveal>
          <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-4 block">
            {language === "pl" ? "Modele współpracy" : "Engagement Models"}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            {language === "pl" ? "Jak pracujemy" : "How we work together"}
          </h2>
          <p className="text-[15px] text-neutral-600 dark:text-[#888888] max-w-[600px] leading-relaxed">
            {language === "pl"
              ? "Pięć modeli — od krótkiej diagnozy po wieloletnie partnerstwo operacyjne. Wybierz w zależności od dojrzałości problemu i ambicji transformacji."
              : "Five models — from a short diagnosis to a multi-year operating partnership. Choose based on the maturity of the problem and the ambition of the transformation."}
          </p>
        </Reveal>
      </div>

      {/* Cards Grid — divider-only layout, no boxy frames */}
      <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-b border-neutral-200 dark:border-white/10 mb-16">
        {models.map((model, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className={`p-8 lg:p-10 h-full flex flex-col group ${i > 0 ? 'border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-white/10' : ''}`}>
              {/* Header */}
              <div className="mb-6">
                <span className="font-display text-sm text-neutral-400 group-hover:text-neutral-900 dark:text-[#D4FF00] transition-colors mb-2 block">
                  {model.number}
                </span>
                <h3 className="text-[22px] font-semibold text-neutral-900 dark:text-[#e5e5e5] mb-1">
                  {model.title}
                </h3>
                {(model as any).priceFrom && (
                  <span className="block text-[12px] font-mono uppercase tracking-[0.15em] text-neutral-900 dark:text-[#D4FF00] mb-2">
                    {(model as any).priceFrom}
                  </span>
                )}
                {(model as any).successMetric && (
                  <div className="flex items-start gap-3 mb-4 pt-1">
                    <span className="w-6 h-px bg-[#D4FF00] mt-[10px] shrink-0" />
                    <p className="text-[13px] text-neutral-900 dark:text-white font-medium leading-snug">
                      {(model as any).successMetric}
                    </p>
                  </div>
                )}
                <p className="text-[14px] text-neutral-500 dark:text-[#888888] leading-relaxed">
                  {model.positioning}
                </p>
              </div>

              {/* How it works */}
              <div className="mb-6 flex-1">
                <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-3">
                  {language === "pl" ? "Jak to działa" : "How it works"}
                </h4>
                <ul className="space-y-3">
                  {model.howItWorks.map((item, idx) => (
                    <li key={idx} className="text-[14px] text-neutral-700 dark:text-[#e5e5e5] flex items-start gap-3">
                      <span className="w-1 h-1 rounded-none bg-neutral-900 dark:bg-[#D4FF00] mt-[8px] shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="border-neutral-200 dark:border-white/10 mb-6" />

              {/* Details */}
              <div className="space-y-5">
                <div>
                  <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-1">
                    {language === "pl" ? "Harmonogram" : "Timeline"}
                  </h4>
                  <p className="text-[14px] text-neutral-700 dark:text-[#e5e5e5]">{model.timeline}</p>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-2">
                    {language === "pl" ? "Idealne, gdy" : "Ideal when"}
                  </h4>
                  <ul className="space-y-2">
                    {model.idealWhen.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="text-[13px] text-neutral-500 dark:text-[#888888] flex items-start gap-2">
                        <span className="text-neutral-400 dark:text-neutral-600 mt-[-1px]">—</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial Quote */}
                <div className="mt-8 pt-5 border-t border-black/10 dark:border-white/10">
                  <p className="text-[13px] italic text-neutral-500 dark:text-[#888888] mb-2 leading-relaxed">
                    {i === 0 && (language === "pl" ? '"Praca z r352 to przyjemność. Są proaktywni, transparentni i naprawdę zależy im na efektach. Niezawodny partner w każdej skali."' : '"Working with r352 is a pleasure. They are proactive, transparent, and truly care about the outcome. A reliable partner for any scale."')}
                    {i === 1 && (language === "pl" ? '"Mamy poczucie, jakby byli częścią naszego zespołu. Elastyczni, responsywni i zawsze skupieni na dostarczaniu największej wartości."' : '"It feels like they are part of our internal team. Flexible, responsive, and always focused on delivering the best possible impact."')}
                    {i === 2 && (language === "pl" ? '"Profesjonalizm i świetna energia. Rozumieją kontekst biznesowy i dostarczają rozwiązania, które realnie wpływają na wyniki."' : '"Professionalism and great energy. They understand the business context and deliver work that actually moves the needle."')}
                  </p>
                  <p className="text-[12px] text-neutral-600 dark:text-[#666666]">
                    {i === 0 && <>— Alina Sztoch, <span className="text-neutral-500 dark:text-[#888888]">CEO, Kubota Store</span></>}
                    {i === 1 && <>— Lidia Kołucka, <span className="text-neutral-500 dark:text-[#888888]">Marketing Director, Orlen / ex. Pelion</span></>}
                    {i === 2 && <>— Filip Mazurkiewicz, <span className="text-neutral-500 dark:text-[#888888]">Marketing Manager, Sonova Group</span></>}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Comparison Strip */}
      <Reveal>
        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-white/10">
                <th className="py-3 pr-4 font-normal text-[13px] text-neutral-400"></th>
                <th className="py-3 px-4 font-medium text-[13px] text-neutral-900 dark:text-[#D4FF00]">Sprint</th>
                <th className="py-3 px-4 font-medium text-[13px] text-neutral-900 dark:text-[#D4FF00]">{language === "pl" ? "Abonament" : "Retainer"}</th>
                <th className="py-3 pl-4 font-medium text-[13px] text-neutral-900 dark:text-[#D4FF00]">{language === "pl" ? "Diagnostyka" : "Diagnostic"}</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-neutral-600 dark:text-[#888888]">
              <tr className="border-b border-neutral-100 dark:border-white/5">
                <td className="py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-500">{language === "pl" ? "Najlepsze do" : "Best for"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Dostarczenie projektu" : "Ship one thing"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Stała produkcja" : "Ongoing production"}</td>
                <td className="py-3 pl-4">{language === "pl" ? "Znalezienie problemu" : "Find the problem"}</td>
              </tr>
              <tr className="border-b border-neutral-100 dark:border-white/5">
                <td className="py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-500">{language === "pl" ? "Zaczynamy od" : "Entry point"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Rozmowa o zakresie" : "Scoping call"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Sprint diagnostyczny" : "Diagnostic sprint"}</td>
                <td className="py-3 pl-4">{language === "pl" ? "60-min spotkanie" : "60-min kickoff"}</td>
              </tr>
              <tr className="border-b border-neutral-100 dark:border-white/5">
                <td className="py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-500">{language === "pl" ? "Harmonogram" : "Timeline"}</td>
                <td className="py-3 px-4">{language === "pl" ? "2-6 tygodni" : "2-6 weeks"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Co miesiąc" : "Monthly rolling"}</td>
                <td className="py-3 pl-4">{language === "pl" ? "1-2 tygodnie" : "1-2 weeks"}</td>
              </tr>
              <tr className="border-b border-neutral-100 dark:border-white/5">
                <td className="py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-500">{language === "pl" ? "Zakres" : "Scope"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Stały" : "Fixed"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Elastyczny" : "Flexible"}</td>
                <td className="py-3 pl-4">{language === "pl" ? "Stały" : "Fixed"}</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-500">{language === "pl" ? "Typ zaangażowania" : "Engagement"}</td>
                <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-[#D4FF00]">{language === "pl" ? "Stały zakres" : "Fixed-scope project"}</td>
                <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-[#D4FF00]">{language === "pl" ? "Ciągła współpraca" : "Ongoing partnership"}</td>
                <td className="py-3 pl-4 font-semibold text-neutral-900 dark:text-[#D4FF00]">{language === "pl" ? "Audyt jednorazowy" : "One-time audit"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* ─── Enterprise tier — for multi-location organizations ─── */}
      <div className="mt-24 md:mt-32">
        <Reveal>
          <div className="border-t border-neutral-200 dark:border-white/10 pt-16 mb-12">
            <span className="block text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-4">
              {language === "pl" ? "Tier Enterprise" : "Enterprise tier"}
            </span>
            <h3 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
              {language === "pl"
                ? "Dla organizacji wielolokalizacyjnych."
                : "For multi-location organizations."}
            </h3>
            <p className="text-[15px] text-neutral-600 dark:text-[#888888] max-w-[640px] leading-relaxed">
              {language === "pl"
                ? "Gdy budżet i ambicja są na pełną transformację operacyjną — a nie kosmetyczny patch. Pełne wdrożenie systemu lub strategiczne partnerstwo na lata."
                : "When budget and ambition are for full operational transformation — not a cosmetic patch. Full system implementation or multi-year strategic partnership."}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-neutral-200 dark:border-white/10 mb-12">
          {enterpriseModels.map((model, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`p-8 lg:p-10 h-full flex flex-col group ${i > 0 ? 'border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-white/10' : ''}`}>
                {/* Header */}
                <div className="mb-6">
                  <span className="font-display text-sm text-neutral-400 group-hover:text-neutral-900 dark:text-[#D4FF00] transition-colors mb-2 block">
                    {model.number}
                  </span>
                  <h3 className="text-2xl md:text-[28px] font-semibold tracking-tight text-neutral-900 dark:text-[#e5e5e5] mb-2">
                    {model.title}
                  </h3>
                  {(model as any).priceFrom && (
                    <span className="block text-[13px] font-mono uppercase tracking-[0.15em] text-neutral-900 dark:text-[#D4FF00] mb-3">
                      {(model as any).priceFrom}
                    </span>
                  )}
                  {(model as any).successMetric && (
                    <div className="flex items-start gap-3 mb-5 pt-2">
                      <span className="w-6 h-px bg-[#D4FF00] mt-[10px] shrink-0" />
                      <p className="text-[14px] text-neutral-900 dark:text-white font-medium leading-snug">
                        {(model as any).successMetric}
                      </p>
                    </div>
                  )}
                  <p className="text-[15px] text-neutral-600 dark:text-[#888888] leading-relaxed">
                    {model.positioning}
                  </p>
                </div>

                {/* How it works */}
                <div className="mb-6 flex-1">
                  <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-3">
                    {language === "pl" ? "Jak to działa" : "How it works"}
                  </h4>
                  <ul className="space-y-3">
                    {model.howItWorks.map((item, idx) => (
                      <li key={idx} className="text-[14px] text-neutral-700 dark:text-[#e5e5e5] flex items-start gap-3">
                        <span className="w-1 h-1 rounded-none bg-neutral-900 dark:bg-[#D4FF00] mt-[8px] shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="border-neutral-200 dark:border-white/10 mb-6" />

                {/* Details */}
                <div className="space-y-5">
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-1">
                      {language === "pl" ? "Harmonogram" : "Timeline"}
                    </h4>
                    <p className="text-[14px] text-neutral-700 dark:text-[#e5e5e5]">{model.timeline}</p>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-2">
                      {language === "pl" ? "Idealne, gdy" : "Ideal when"}
                    </h4>
                    <ul className="space-y-2">
                      {model.idealWhen.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="text-[13px] text-neutral-500 dark:text-[#888888] flex items-start gap-2">
                          <span className="text-neutral-400 dark:text-neutral-600 mt-[-1px]">—</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA — flat, divider-only */}
      <Reveal>
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-neutral-200 dark:border-white/10 pt-12">
          <p className="text-lg md:text-xl text-neutral-900 dark:text-white font-medium tracking-tight text-center sm:text-left m-0 max-w-2xl">
            {language === "pl"
              ? "Nie jesteście pewni, który model pasuje? Zacznijcie od rozmowy — pomożemy wam to ustalić."
              : "Not sure which model fits? Start with a conversation — we'll help you figure it out."}
          </p>
          <a
            href="mailto:hello@r352.com"
            className="inline-block shrink-0 bg-neutral-900 dark:bg-[#D4FF00] hover:bg-black dark:hover:bg-[#bce600] text-white dark:text-black font-display uppercase tracking-widest text-xs px-8 py-4 rounded-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-[#D4FF00] focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141414]"
          >
            {language === "pl" ? "Umów spotkanie" : "Schedule a call"}
          </a>
        </div>
      </Reveal>
    </section>
  );
}