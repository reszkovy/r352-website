import { useLanguage } from "@/app/context/LanguageContext";
import { Reveal } from "@/app/components/ui/Reveal";

export function EngagementModels() {
  const { language } = useLanguage();

  const models = [
    {
      number: "01",
      title: language === "pl" ? "Sprint" : "Sprint",
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
      pricing: language === "pl" ? "od 8 000 €" : "from 8 000 €",
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
      pricing: language === "pl" ? "od 4 000 € / msc" : "from 4 000 € / mo",
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
      positioning: language === "pl"
        ? "Krótki, ustrukturyzowany audyt, który pokazuje dokładnie, gdzie zawodzi proces - zanim zaangażujecie się w budowanie czegokolwiek."
        : "A short, structured audit that shows you exactly where delivery breaks down - before you commit to building anything.",
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
      pricing: language === "pl" ? "od 3 500 €" : "from 3 500 €",
      startsWith: language === "pl"
        ? "60-minutowe spotkanie inicjujące, podczas którego przeprowadzamy wywiady z kluczowymi osobami i prosimy o dostęp do waszych narzędzi."
        : "A 60-minute kickoff where we interview key stakeholders and request access to your current workflows.",
      deliverable: language === "pl"
        ? "Audyt procesu dostarczania - mapa wąskich gardeł, analiza przyczyn i priorytetowe rekomendacje."
        : "Delivery Workflow Audit - bottleneck map, root cause analysis, and prioritized recommendations."
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
              ? "Trzy sposoby na współpracę - w zależności od tego, gdzie jesteście i czego potrzebujecie." 
              : "Three ways to engage - depending on where you are and what you need."}
          </p>
        </Reveal>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {models.map((model, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="bg-white dark:bg-[#141414] border border-neutral-200 dark:border-white/10 rounded-none p-8 h-full hover:border-black/20 dark:hover:border-[#D4FF00]/30 transition-colors flex flex-col group">
              {/* Header */}
              <div className="mb-6">
                <span className="text-[13px] font-mono text-neutral-400 group-hover:text-neutral-900 dark:text-[#D4FF00] transition-colors mb-2 block">
                  {model.number}
                </span>
                <h3 className="text-[22px] font-semibold text-neutral-900 dark:text-[#e5e5e5] mb-1">
                  {model.title}
                </h3>
                <span className="block text-[18px] font-bold text-neutral-900 dark:text-[#D4FF00] tracking-tight mb-3">
                  {model.pricing}
                </span>
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
                    {model.idealWhen.map((item, idx) => (
                      <li key={idx} className="text-[13px] text-neutral-500 dark:text-[#888888] flex items-start gap-2">
                        <span className="text-neutral-400 dark:text-neutral-600 mt-[-1px]">-</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-1">
                    {language === "pl" ? "Zaczynamy od" : "Starts with"}
                  </h4>
                  <p className="text-[13px] text-neutral-600 dark:text-[#888888] leading-snug">{model.startsWith}</p>
                </div>

                {model.deliverable && (
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-1">
                      {language === "pl" ? "Rezultat" : "Deliverable"}
                    </h4>
                    <p className="text-[13px] text-neutral-600 dark:text-[#888888] leading-snug">{model.deliverable}</p>
                  </div>
                )}
                
                {model.products && (
                  <div>
                    <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-1">
                      {language === "pl" ? "Modele wspierane przez" : "Products that fit this model"}
                    </h4>
                    <p className="text-[13px] text-neutral-600 dark:text-[#888888] leading-snug">{model.products}</p>
                  </div>
                )}

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
                <td className="py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-500">{language === "pl" ? "Cena" : "Pricing"}</td>
                <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-[#D4FF00]">{language === "pl" ? "od 8 000 €" : "from 8 000 €"}</td>
                <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-[#D4FF00]">{language === "pl" ? "od 4 000 € / msc" : "from 4 000 € / mo"}</td>
                <td className="py-3 pl-4 font-semibold text-neutral-900 dark:text-[#D4FF00]">{language === "pl" ? "od 3 500 €" : "from 3 500 €"}</td>
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
              <tr className="border-b border-neutral-100 dark:border-white/5">
                <td className="py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-500">{language === "pl" ? "Najlepsze do" : "Best for"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Dostarczenie projektu" : "Ship one thing"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Stała produkcja" : "Ongoing production"}</td>
                <td className="py-3 pl-4">{language === "pl" ? "Znalezienie problemu" : "Find the problem"}</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-neutral-500 dark:text-neutral-500">{language === "pl" ? "Zaczynamy od" : "Entry point"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Rozmowa o zakresie" : "Scoping call"}</td>
                <td className="py-3 px-4">{language === "pl" ? "Sprint diagnostyczny" : "Diagnostic sprint"}</td>
                <td className="py-3 pl-4">{language === "pl" ? "60-min spotkanie" : "60-min kickoff"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* CTA */}
      <Reveal>
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 bg-neutral-50 dark:bg-white/5 p-8 border border-neutral-200 dark:border-white/10 rounded-none">
          <p className="text-[15px] text-neutral-900 dark:text-white font-medium text-center sm:text-left m-0">
            {language === "pl" 
              ? "Nie jesteście pewni, który model pasuje? Zacznijcie od rozmowy - pomożemy wam to ustalić." 
              : "Not sure which model fits? Start with a conversation - we'll help you figure it out."}
          </p>
          <a 
            href="mailto:hello@r352.com" 
            className="inline-block shrink-0 bg-neutral-200 dark:bg-[#D4FF00] hover:bg-neutral-300 dark:hover:bg-[#bce600] text-neutral-900 dark:text-black font-display uppercase tracking-widest text-xs px-8 py-4 rounded-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-[#D4FF00] focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141414]"
          >
            {language === "pl" ? "Umów spotkanie" : "Schedule a call"}
          </a>
        </div>
      </Reveal>
    </section>
  );
}