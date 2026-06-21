/**
 * Industries - single source of truth for the /industries landing pages.
 *
 * Why this file exists:
 *  - One data shape, one detail template (IndustryDetail), four routes.
 *  - Each entry is a lead-generation page anchored on a real verticals we serve:
 *    fitness/wellness networks, real estate developers, retail/franchise
 *    operators, and health/service networks.
 *  - Adding a fifth segment = one new object here + an entry in the SEO map +
 *    sitemap. No new components, no template duplication.
 */

export interface IndustryContent {
  /** URL slug - used in /industries/:slug. Must be unique. */
  slug: string;
  /** Eyebrow above the H1 - "Industry · 01" etc. */
  eyebrow: { en: string; pl: string };
  /** Short title for the index card + nav surfaces. */
  title: { en: string; pl: string };
  /** The H1 on the detail page - operator-tone, plain-spoken outcome. */
  h1: { en: string; pl: string };
  /** Lede paragraph under the H1 - establishes what r352 does for this segment. */
  subcopy: { en: string; pl: string };
  /** "Common symptoms" bullet list - observable pain we name out loud. */
  symptoms: { en: string; pl: string }[];
  /** Proof block - one real client, one measurable outcome, link to case study. */
  proof: {
    clientName: string;
    context: { en: string; pl: string };
    outcome: { en: string; pl: string };
    caseStudyHref?: string;
    /** Label for the secondary CTA - usually "See [client] case study". */
    secondaryLabel: { en: string; pl: string };
  };
  /** "What the Diagnostic delivers" - concrete deliverables for this segment. */
  whatYouGet: { en: string; pl: string }[];
  /** Primary CTA label - drives to /brief?segment=... */
  ctaPrimary: { en: string; pl: string };
  /** Primary CTA href, with ?segment=... query so the brief can pre-route. */
  ctaHref: string;
  /**
   * FAQ - operator-tone questions (COO / network director, not marketer),
   * answered ONLY with facts that already exist on this site (canon:
   * ICP 30-300+ locations, Diagnostic €2k / 5 days / 5-7 bottlenecks,
   * Sprint from €15k / 4-6 weeks, r3loop 8 steps, client proof blocks).
   * Rendered in IndustryDetail as a <details> list + FAQPage JSON-LD.
   */
  faq: { q: { en: string; pl: string }; a: { en: string; pl: string } }[];
}

export const industries: IndustryContent[] = [
  // ─── 01 ── Fitness & Wellness Networks ──────────────────────────────
  {
    slug: "fitness-wellness",
    eyebrow: { en: "Industry · 01", pl: "Branża · 01" },
    title: {
      en: "Fitness & Wellness Networks",
      pl: "Sieci fitness i wellness",
    },
    h1: {
      en: "Creative delivery across every location, on every cadence.",
      pl: "Kreatywna dostawa w każdej lokalizacji, w każdym rytmie.",
    },
    subcopy: {
      en: "r352 helps fitness and wellness networks turn campaign production into a repeatable operating system - central brand standards, local execution speed, no governance drift.",
      pl: "r352 pomaga sieciom fitness i wellness zamienić produkcję kampanii w powtarzalny system operacyjny - centralne standardy marki, lokalna prędkość egzekucji, zero osuwania się governance.",
    },
    symptoms: [
      {
        en: "Every new campaign restarts from zero",
        pl: "Każda nowa kampania startuje od zera",
      },
      {
        en: "Local clubs adapt assets without clear standards",
        pl: "Lokalne kluby adaptują assety bez jasnych standardów",
      },
      {
        en: "Brand consistency leaks at the location level",
        pl: "Spójność marki przecieka na poziomie lokalizacji",
      },
      {
        en: "Approvals stack up at headquarters",
        pl: "Akceptacje piętrzą się w centrali",
      },
      {
        en: "Designers become the bottleneck for every promo",
        pl: "Designerzy stają się wąskim gardłem każdej promocji",
      },
    ],
    proof: {
      clientName: "Benefit Systems",
      context: {
        en: "300+ wellness clubs supported across a multi-year retainer.",
        pl: "Ponad 300 klubów wellness obsługiwanych w ramach wieloletniego retainera.",
      },
      // TODO(reszek): potwierdź metrykę "11 dni → 3" cyklu launchu - usunięta,
      // bo nie ma pokrycia w kanonie case'u Benefit Systems. Po weryfikacji można przywrócić.
      outcome: {
        en: "Brief intake standardized across 5+ parallel PM streams - campaign launches moved from ad-hoc emails to a fixed weekly cadence, with launch assets locked 2.5 months before each club opening.",
        pl: "Brief intake ujednolicony dla 5+ równoległych streamów PM - launche kampanii przeszły z ad-hocowych maili na stały tygodniowy rytm, a assety launchowe zamykane 2,5 miesiąca przed otwarciem klubu.",
      },
      caseStudyHref: "/work/benefit-systems",
      secondaryLabel: {
        en: "See Benefit Systems case study",
        pl: "Zobacz case study Benefit Systems",
      },
    },
    whatYouGet: [
      {
        en: "Campaign workflow map across HQ + clubs",
        pl: "Mapa workflow kampanii między centralą a klubami",
      },
      {
        en: "Brand consistency leak report",
        pl: "Raport wycieków spójności marki",
      },
      {
        en: "Brief and approval pipeline diagnosis",
        pl: "Diagnoza pipeline'u briefów i akceptacji",
      },
      {
        en: "Template + toolkit opportunity scan",
        pl: "Skan możliwości na templaty i toolkity",
      },
      {
        en: "30/60/90-day operating system roadmap",
        pl: "Roadmapa operating systemu na 30/60/90 dni",
      },
    ],
    ctaPrimary: {
      en: "Audit creative delivery across locations",
      pl: "Audytuj kreatywną dostawę między lokalizacjami",
    },
    ctaHref: "/brief?segment=fitness-wellness",
    faq: [
      {
        q: {
          en: "How do you keep brand consistency across 300+ fitness clubs?",
          pl: "Jak utrzymujecie spójność marki w 300+ klubach fitness?",
        },
        a: {
          en: "With a system, not policing. Standards are set once - brand rules, brief templates, adaptation rules - then local teams get toolkits and templates that let them move fast without breaking consistency. Approval gates (Master / Variant / Pre-production) each have a named owner and a defined SLA. That's how Benefit Systems runs 300+ wellness clubs on a multi-year retainer.",
          pl: "Systemem, nie pilnowaniem. Standardy ustawiamy raz - reguły marki, templaty briefów, reguły adaptacji - a lokalne zespoły dostają toolkity i templaty, które pozwalają działać szybko bez psucia spójności. Bramki akceptacji (Master / Variant / Pre-production) mają imiennego ownera i zdefiniowane SLA. Tak Benefit Systems prowadzi 300+ klubów wellness w wieloletnim retainerze.",
        },
      },
      {
        q: {
          en: "Our HQ design team is the bottleneck for every club promotion. What changes that?",
          pl: "Nasz zespół designu w centrali jest wąskim gardłem każdej promocji klubowej. Co to zmienia?",
        },
        a: {
          en: "Two mechanisms. Brief templates plus a readiness checklist mean local requests arrive complete - the target is 80%+ of briefs passing the checklist on first submission. And approval gates with named owners stop every decision stacking up at headquarters. The result at Benefit Systems: brief intake standardized across 5+ parallel PM streams.",
          pl: "Dwa mechanizmy. Templaty briefów plus readiness checklist sprawiają, że lokalne zapytania przychodzą kompletne - target to 80%+ briefów przechodzących checklist za pierwszym podejściem. A bramki akceptacji z imiennymi ownerami zatrzymują piętrzenie się każdej decyzji w centrali. Wynik w Benefit Systems: brief intake ujednolicony dla 5+ równoległych streamów PM.",
        },
      },
      {
        q: {
          en: "What does a design ops audit look like for a fitness network?",
          pl: "Jak wygląda audyt design ops dla sieci fitness?",
        },
        a: {
          en: "The Diagnostic: 5 working days, €2k fixed. We map your delivery workflow end-to-end - brief → approval → production → publish - across HQ and clubs. You get a one-page written diagnosis with 5-7 prioritized bottlenecks and a 60-day action plan, backed by a 60-day money-back guarantee if the recommendations aren't actionable.",
          pl: "Diagnostic: 5 dni roboczych, €2k fixed. Mapujemy workflow delivery end-to-end - brief → akceptacja → produkcja → publikacja - między centralą a klubami. Dostajesz jednostronicową diagnozę z 5-7 spriorytetyzowanymi bottleneckami i 60-dniowym action planem, z 60-day money-back guarantee jeśli rekomendacje nie są actionable.",
        },
      },
      {
        q: {
          en: "Can campaign launches run on a fixed cadence instead of ad-hoc emails?",
          pl: "Czy launche kampanii mogą działać w stałym rytmie zamiast ad-hocowych maili?",
        },
        a: {
          en: "Yes - that's exactly the Benefit Systems outcome. Campaign launches moved from ad-hoc emails to a fixed weekly cadence, with launch assets locked 2.5 months before each club opening. The mechanism is the Ship phase of r3loop: weekly cadence, structured delivery packs, no heroic launches.",
          pl: "Tak - to dokładnie wynik Benefit Systems. Launche kampanii przeszły z ad-hocowych maili na stały tygodniowy rytm, a assety launchowe są zamykane 2,5 miesiąca przed otwarciem klubu. Mechanizm to faza Ship w r3loop: tygodniowy rytm, ustrukturyzowane delivery packi, zero heroic launchy.",
        },
      },
      {
        q: {
          en: "Do local clubs lose creative freedom under a central system?",
          pl: "Czy lokalne kluby tracą kreatywną swobodę w centralnym systemie?",
        },
        a: {
          en: "No - the system defines where freedom lives. Adaptation rules separate what's locked at master level from what each club can change, and toolkits let local teams execute fast inside those rules. Central brand standards, local execution speed - that's the design goal, not a trade-off.",
          pl: "Nie - system definiuje, gdzie mieszka swoboda. Reguły adaptacji oddzielają to, co zamknięte na poziomie mastera, od tego, co każdy klub może zmieniać, a toolkity pozwalają lokalnym zespołom egzekwować szybko w ramach tych reguł. Centralne standardy marki, lokalna prędkość egzekucji - to cel projektowy, nie kompromis.",
        },
      },
    ],
  },

  // ─── 02 ── Real Estate Developers ───────────────────────────────────
  {
    slug: "real-estate",
    eyebrow: { en: "Industry · 02", pl: "Branża · 02" },
    title: {
      en: "Real Estate Developers",
      pl: "Deweloperzy nieruchomości",
    },
    h1: {
      en: "Launch every investment without rebuilding the system from scratch.",
      pl: "Launchuj każdą inwestycję bez odbudowy systemu od zera.",
    },
    subcopy: {
      en: "r352 helps real estate teams turn campaign production into a repeatable operating system - from launch assets and approvals to templates, QA gates, and rollout-ready delivery.",
      pl: "r352 pomaga zespołom deweloperskim zamienić produkcję kampanii w powtarzalny system operacyjny - od assetów launchowych i akceptacji, przez templaty, bramki QA, po rollout-ready delivery.",
    },
    symptoms: [
      {
        en: "Each new investment launch restarts campaign production from zero",
        pl: "Każdy launch inwestycji startuje produkcję kampanii od zera",
      },
      {
        en: "Many assets, many stakeholders, missed deadlines",
        pl: "Dużo assetów, dużo stakeholderów, ślizgające się deadliny",
      },
      {
        en: "Renders, ads, landing pages, print, and sales materials live in disconnected workflows",
        pl: "Renderingi, reklamy, landing page'e, druk i materiały sprzedażowe żyją w odrębnych workflow'ach",
      },
      {
        en: "Sales offices wait on materials that should be ready before launch",
        pl: "Biura sprzedaży czekają na materiały, które powinny być gotowe przed launchem",
      },
      {
        en: "Decision velocity collapses around revision rounds",
        pl: "Decision velocity zapada się przy rundach poprawek",
      },
    ],
    proof: {
      clientName: "Archicom",
      context: {
        en: "Multi-investment real estate campaigns delivered through the r3loop methodology.",
        pl: "Kampanie wielu inwestycji deweloperskich dostarczane przez metodologię r3loop.",
      },
      // TODO(reszek): potwierdź "setup time cut by 60%" - liczba bez pokrycia w kanonie faktów;
      // zmiękczona do mechanizmu. Po weryfikacji można przywrócić konkretną wartość.
      outcome: {
        en: "River Point and Bulwar Północny launched on one shared production system - the second launch reused templates, approval gates, and asset pipelines instead of rebuilding them from scratch.",
        pl: "River Point i Bulwar Północny launchowane na jednym wspólnym systemie produkcji - drugi launch reużył templaty, bramki akceptacji i pipeline'y assetów zamiast budować je od zera.",
      },
      caseStudyHref: "/work/archicom",
      secondaryLabel: {
        en: "See Archicom case study",
        pl: "Zobacz case study Archicom",
      },
    },
    whatYouGet: [
      {
        en: "Launch production workflow map (renders → ads → landing → print → sales)",
        pl: "Mapa workflow produkcji launchowej (renderingi → reklamy → landing → druk → sprzedaż)",
      },
      {
        en: "Multi-stakeholder approval gate diagnosis",
        pl: "Diagnoza bramek akceptacji z wieloma stakeholderami",
      },
      {
        en: "Template + toolkit opportunity scan",
        pl: "Skan możliwości na templaty i toolkity",
      },
      {
        en: "QA gate implementation plan",
        pl: "Plan wdrożenia bramek QA",
      },
      {
        en: "30/60/90-day rollout system roadmap",
        pl: "Roadmapa systemu rolloutu na 30/60/90 dni",
      },
    ],
    ctaPrimary: {
      en: "Map your launch production system",
      pl: "Zmapuj swój system produkcji launchowej",
    },
    ctaHref: "/brief?segment=real-estate",
    faq: [
      {
        q: {
          en: "Every investment launch rebuilds campaign production from scratch. How do you fix that?",
          pl: "Każdy launch inwestycji buduje produkcję kampanii od zera. Jak to naprawiacie?",
        },
        a: {
          en: "By building one shared production system instead of one-off campaigns. For Archicom, River Point and Bulwar Północny launched on the same system - the second launch reused templates, approval gates, and asset pipelines instead of rebuilding them. That reuse is the product: the system outlives each launch.",
          pl: "Budując jeden wspólny system produkcji zamiast jednorazowych kampanii. Dla Archicomu River Point i Bulwar Północny launchowane były na tym samym systemie - drugi launch reużył templaty, bramki akceptacji i pipeline'y assetów zamiast budować je od nowa. To reużycie jest produktem: system przeżywa każdy launch.",
        },
      },
      {
        q: {
          en: "Renders, ads, landing pages, print and sales materials live in separate workflows. Can they run as one?",
          pl: "Renderingi, reklamy, landing page'e, druk i materiały sprzedażowe żyją w osobnych workflow'ach. Mogą działać jako jeden?",
        },
        a: {
          en: "Yes - that's what the Map phase of r3loop does. We map the launch path end-to-end (renders → ads → landing → print → sales), then standardize briefs and install QA gates so every asset type runs through one pipeline. The deliverable is a launch production workflow map your team operates after we're gone.",
          pl: "Tak - od tego jest faza Map w r3loop. Mapujemy ścieżkę launchu end-to-end (renderingi → reklamy → landing → druk → sprzedaż), potem standaryzujemy briefy i wdrażamy bramki QA, żeby każdy typ assetu szedł jednym pipeline'em. Deliverable to mapa workflow produkcji launchowej, którą Wasz zespół obsługuje po naszym wyjściu.",
        },
      },
      {
        q: {
          en: "How do you handle multi-stakeholder approvals without missed deadlines?",
          pl: "Jak ogarniacie akceptacje wielu stakeholderów bez ślizgających się deadline'ów?",
        },
        a: {
          en: "Through the Govern phase: a decision ownership model where every approval gate (Master / Variant / Pre-production) has a named owner and a defined SLA. Most revision loops aren't about quality - they happen because ownership is unclear. We also track decision velocity, so slow approvals show up as numbers, not opinions.",
          pl: "Przez fazę Govern: model decision ownership, w którym każda bramka akceptacji (Master / Variant / Pre-production) ma imiennego ownera i zdefiniowane SLA. Większość rund poprawek nie dotyczy jakości - bierze się z niejasnego ownershipu. Mierzymy też decision velocity, więc wolne akceptacje widać w liczbach, nie w opiniach.",
        },
      },
      {
        q: {
          en: "What does a Diagnostic look like for a real estate developer?",
          pl: "Jak wygląda Diagnostic dla dewelopera nieruchomości?",
        },
        a: {
          en: "5 working days, €2k fixed, kickoff within 1-2 weeks. We map your launch production workflow, diagnose multi-stakeholder approval gates, and scan for template and toolkit opportunities. You get a one-page diagnosis with 5-7 prioritized bottlenecks plus a 30/60/90-day rollout roadmap - with a 60-day money-back guarantee if it's not actionable.",
          pl: "5 dni roboczych, €2k fixed, kickoff w 1-2 tygodnie. Mapujemy workflow produkcji launchowej, diagnozujemy bramki akceptacji z wieloma stakeholderami i skanujemy możliwości na templaty i toolkity. Dostajesz jednostronicową diagnozę z 5-7 spriorytetyzowanymi bottleneckami plus roadmapę rolloutu na 30/60/90 dni - z 60-day money-back guarantee jeśli nie jest actionable.",
        },
      },
      {
        q: {
          en: "How fast can a launch system be in place before our next investment goes to market?",
          pl: "Jak szybko system launchowy może działać przed wejściem kolejnej inwestycji na rynek?",
        },
        a: {
          en: "The Diagnostic takes 5 working days with kickoff within 1-2 weeks - so within a month you know exactly where production breaks down. A Sprint then builds one working part of the system in 4-6 weeks, fixed scope. If you have a launch date, the system is sequenced around it.",
          pl: "Diagnostic trwa 5 dni roboczych z kickoffem w 1-2 tygodnie - więc w miesiąc wiesz dokładnie, gdzie produkcja się sypie. Sprint buduje potem jedną działającą część systemu w 4-6 tygodni, fixed scope. Jeśli macie datę launchu, system jest sekwencjonowany pod nią.",
        },
      },
    ],
  },

  // ─── 03 ── Retail & Franchise Operators ─────────────────────────────
  {
    slug: "retail-franchise",
    eyebrow: { en: "Industry · 03", pl: "Branża · 03" },
    title: {
      en: "Retail & Franchise Operators",
      pl: "Operatorzy retail i sieci franczyzowych",
    },
    h1: {
      en: "Central brand standards. Local execution speed. No leaks.",
      pl: "Centralne standardy marki. Lokalna prędkość egzekucji. Bez wycieków.",
    },
    subcopy: {
      en: "r352 helps retail chains and franchise networks balance central brand governance with local execution autonomy - through templates, approval gates, and a working operating system.",
      pl: "r352 pomaga sieciom retail i franczyzowym zbalansować centralne governance marki z autonomią lokalnej egzekucji - przez templaty, bramki akceptacji i działający operating system.",
    },
    symptoms: [
      {
        en: "Brand consistency leaks because each market adapts materials differently",
        pl: "Spójność marki przecieka, bo każdy rynek adaptuje materiały po swojemu",
      },
      {
        en: "Local branches produce assets that don't match central standards",
        pl: "Lokalne oddziały produkują assety, które nie trzymają centralnych standardów",
      },
      {
        en: "Central brand team can't keep up with location-level requests",
        pl: "Centralny brand team nie nadąża za zapytaniami z lokalizacji",
      },
      {
        en: "No clear standards for local adaptation",
        pl: "Brak jasnych standardów lokalnej adaptacji",
      },
      {
        en: "Brand consistency depends on individual memory, not a system",
        pl: "Spójność marki zależy od pamięci pojedynczych osób, nie od systemu",
      },
    ],
    proof: {
      clientName: "r352 methodology",
      context: {
        en: "r352 methodology applied across multi-location brand systems.",
        pl: "Metodologia r352 stosowana w wielolokalizacyjnych systemach marki.",
      },
      outcome: {
        en: "r3loop's Govern + Standardize phases specifically address cross-market consistency at scale - reusable templates, defined adaptation rules, decision velocity tracking.",
        pl: "Fazy Govern i Standardize z r3loop rozwiązują problem spójności między rynkami w skali - reużywalne templaty, zdefiniowane reguły adaptacji, tracking decision velocity.",
      },
      caseStudyHref: "/process",
      secondaryLabel: {
        en: "See r3loop methodology",
        pl: "Zobacz metodologię r3loop",
      },
    },
    whatYouGet: [
      {
        en: "Cross-market brand consistency audit",
        pl: "Audyt spójności marki między rynkami",
      },
      {
        en: "Local adaptation rules + template framework",
        pl: "Reguły lokalnej adaptacji + framework templatów",
      },
      {
        en: "Central + local approval gate design",
        pl: "Projekt bramek akceptacji centrala + lokalizacja",
      },
      {
        en: "Decision velocity baseline + improvement plan",
        pl: "Baseline decision velocity + plan poprawy",
      },
      {
        en: "30/60/90-day governance system roadmap",
        pl: "Roadmapa systemu governance na 30/60/90 dni",
      },
    ],
    ctaPrimary: {
      en: "Find brand consistency leaks",
      pl: "Znajdź wycieki spójności marki",
    },
    ctaHref: "/brief?segment=retail-franchise",
    faq: [
      {
        q: {
          en: "How do you keep brand consistency across a franchise network without policing every location?",
          pl: "Jak utrzymujecie spójność marki w sieci franczyzowej bez pilnowania każdej lokalizacji?",
        },
        a: {
          en: "By replacing individual memory with a system. The Standardize and Govern phases of r3loop install reusable templates, defined local adaptation rules, and approval gates split between central and local level - each with a named owner and SLA. Consistency stops depending on who happens to remember the brand rules.",
          pl: "Zastępując pamięć pojedynczych osób systemem. Fazy Standardize i Govern w r3loop wdrażają reużywalne templaty, zdefiniowane reguły lokalnej adaptacji i bramki akceptacji podzielone między centralę a lokalizacje - każda z imiennym ownerem i SLA. Spójność przestaje zależeć od tego, kto akurat pamięta reguły marki.",
        },
      },
      {
        q: {
          en: "What does a design ops audit look like for a franchise network?",
          pl: "Jak wygląda audyt design ops dla sieci franczyzowej?",
        },
        a: {
          en: "The Diagnostic: 5 working days, €2k fixed. It covers a cross-market brand consistency audit, a local adaptation rules and template framework scan, and a decision velocity baseline. The output is a one-page diagnosis with 5-7 prioritized bottlenecks and a 30/60/90-day governance roadmap - 60-day money-back guarantee if it's not actionable.",
          pl: "Diagnostic: 5 dni roboczych, €2k fixed. Obejmuje audyt spójności marki między rynkami, skan reguł lokalnej adaptacji i frameworku templatów oraz baseline decision velocity. Output to jednostronicowa diagnoza z 5-7 spriorytetyzowanymi bottleneckami i roadmapa governance na 30/60/90 dni - 60-day money-back guarantee jeśli nie jest actionable.",
        },
      },
      {
        q: {
          en: "Our central brand team can't keep up with location-level requests. What's the fix?",
          pl: "Nasz centralny brand team nie nadąża za zapytaniami z lokalizacji. Jaki jest fix?",
        },
        a: {
          en: "Demand mapping plus standards. First we classify what's actually coming in - the target is 95%+ of requests categorized cleanly at intake. Then brief templates for standard, local, and express requests, with a readiness checklist, so 80%+ of briefs arrive production-ready. Templates and toolkits let locations self-serve the recurring asset types instead of queueing at HQ.",
          pl: "Demand mapping plus standardy. Najpierw klasyfikujemy, co faktycznie wpływa - target to 95%+ zapytań czysto skategoryzowanych na intake'u. Potem templaty briefów dla zapytań standardowych, lokalnych i express, z readiness checklistą, żeby 80%+ briefów przychodziło production-ready. Templaty i toolkity pozwalają lokalizacjom samodzielnie obsłużyć powtarzalne typy assetów zamiast czekać w kolejce do centrali.",
        },
      },
      {
        q: {
          en: "How much freedom do franchisees keep under central governance?",
          pl: "Ile swobody zachowują franczyzobiorcy przy centralnym governance?",
        },
        a: {
          en: "Exactly as much as the adaptation rules define - which is the point. The system separates what's locked at master level from what each market can adapt, through Master / Variant approval gates. Central brand standards and local execution autonomy aren't opposites; the balance between them is the thing we design.",
          pl: "Dokładnie tyle, ile definiują reguły adaptacji - i o to chodzi. System oddziela to, co zamknięte na poziomie mastera, od tego, co każdy rynek może adaptować, przez bramki akceptacji Master / Variant. Centralne standardy marki i autonomia lokalnej egzekucji nie są przeciwieństwami - balans między nimi to rzecz, którą projektujemy.",
        },
      },
      {
        q: {
          en: "How do you measure whether brand governance actually works?",
          pl: "Jak mierzycie, czy brand governance faktycznie działa?",
        },
        a: {
          en: "The Measure phase of r3loop tracks decision velocity, brief throughput, consistency score, and rework rate - numbers, not opinions. A workflow dashboard goes live with the first baseline captured within 2 weeks of system launch, and the decision gate is hard: 3 measurable improvements vs baseline within 60 days, or the system isn't working.",
          pl: "Faza Measure w r3loop mierzy decision velocity, brief throughput, consistency score i rework rate - liczby, nie opinie. Dashboard workflow startuje z pierwszym baseline'em w 2 tygodnie od launchu systemu, a decision gate jest twardy: 3 mierzalne poprawy vs baseline w 60 dni, albo system nie działa.",
        },
      },
    ],
  },

  // ─── 04 ── Health & Service Networks ────────────────────────────────
  {
    slug: "health-service-networks",
    eyebrow: { en: "Industry · 04", pl: "Branża · 04" },
    title: {
      en: "Health & Service Networks",
      pl: "Sieci zdrowia i usług",
    },
    h1: {
      en: "Multi-market customer experience, systemized.",
      pl: "Customer experience na wielu rynkach, w systemie.",
    },
    subcopy: {
      en: "r352 helps health and service networks deliver consistent customer-facing communication across every local market - repeatable standards, templates, and approval gates that scale.",
      pl: "r352 pomaga sieciom zdrowia i usług dostarczać spójną komunikację do klienta na każdym lokalnym rynku - powtarzalne standardy, templaty i bramki akceptacji, które się skalują.",
    },
    symptoms: [
      {
        en: "Local market execution creates inconsistent customer experience",
        pl: "Lokalna egzekucja tworzy niespójny customer experience",
      },
      {
        en: "Each clinic/branch produces materials with different quality bars",
        pl: "Każda klinika/oddział produkuje materiały na innym poziomie jakości",
      },
      {
        en: "Customer-facing communication varies by market without strategy",
        pl: "Komunikacja do klienta zmienia się między rynkami bez strategii",
      },
      {
        en: "No repeatable standards for local service brands",
        pl: "Brak powtarzalnych standardów dla lokalnych brandów usługowych",
      },
      {
        en: "Central team can't scale quality control manually",
        pl: "Centralny zespół nie skaluje ręcznej kontroli jakości",
      },
    ],
    proof: {
      clientName: "Sonova / Geers",
      context: {
        en: "Hearing care network operating across 17 countries.",
        pl: "Sieć opieki słuchowej działająca w 17 krajach.",
      },
      outcome: {
        en: "r3loop applied for multi-market brand delivery, reducing local-market production variance and bringing 600+ locations into a consistent customer experience.",
        pl: "r3loop wdrożone dla wielorynkowej dostawy marki - zredukowana wariancja lokalnej produkcji, 600+ lokalizacji w spójnym customer experience.",
      },
      caseStudyHref: "/work/sonova",
      secondaryLabel: {
        en: "See Sonova / Geers case study",
        pl: "Zobacz case study Sonova / Geers",
      },
    },
    whatYouGet: [
      {
        en: "Multi-market brand delivery audit",
        pl: "Audyt wielorynkowej dostawy marki",
      },
      {
        en: "Local execution standards + templates",
        pl: "Standardy lokalnej egzekucji + templaty",
      },
      {
        en: "Customer experience consistency baseline",
        pl: "Baseline spójności customer experience",
      },
      {
        en: "Quality control gate design for distributed teams",
        pl: "Projekt bramek kontroli jakości dla rozproszonych zespołów",
      },
      {
        en: "30/60/90-day systemization roadmap",
        pl: "Roadmapa systematyzacji na 30/60/90 dni",
      },
    ],
    ctaPrimary: {
      en: "Systemize multi-market brand delivery",
      pl: "Zsystematyzuj wielorynkową dostawę marki",
    },
    ctaHref: "/brief?segment=health-service-networks",
    faq: [
      {
        q: {
          en: "How do you keep customer experience consistent across hundreds of clinics in different markets?",
          pl: "Jak utrzymujecie spójny customer experience w setkach klinik na różnych rynkach?",
        },
        a: {
          en: "With repeatable standards instead of market-by-market improvisation: local execution standards, templates, and approval gates that scale. For Sonova / Geers - a hearing care network operating across 17 countries - r3loop was applied to multi-market brand delivery, reducing local production variance and bringing 600+ locations into a consistent customer experience.",
          pl: "Powtarzalnymi standardami zamiast improwizacji rynek po rynku: standardy lokalnej egzekucji, templaty i bramki akceptacji, które się skalują. Dla Sonova / Geers - sieci opieki słuchowej działającej w 17 krajach - r3loop wdrożono dla wielorynkowej dostawy marki, redukując wariancję lokalnej produkcji i wprowadzając 600+ lokalizacji w spójny customer experience.",
        },
      },
      {
        q: {
          en: "Can quality control scale without the central team reviewing everything manually?",
          pl: "Czy kontrola jakości może się skalować bez ręcznego review wszystkiego przez centralny zespół?",
        },
        a: {
          en: "Yes - by moving QA from people to gates. We design quality review checklists per asset type that anyone on a distributed team can apply consistently, replacing \"looks good, I guess\" with structured review. The target: 70%+ of work passing quality review on the first round, with sign-off rules so nothing ships without the named owner.",
          pl: "Tak - przenosząc QA z ludzi na bramki. Projektujemy checklisty quality review per typ assetu, które każdy w rozproszonym zespole stosuje tak samo, zastępując \"chyba ok\" ustrukturyzowanym review. Target: 70%+ pracy przechodzącej quality review w pierwszej rundzie, z regułami sign-offu, żeby nic nie wychodziło bez imiennego ownera.",
        },
      },
      {
        q: {
          en: "What does the Diagnostic deliver for a health or service network?",
          pl: "Co dostarcza Diagnostic dla sieci zdrowia lub usług?",
        },
        a: {
          en: "In 5 working days, for €2k fixed: a multi-market brand delivery audit, a customer experience consistency baseline, and a quality control gate design scan for distributed teams. The output is a one-page diagnosis with 5-7 prioritized bottlenecks and a 30/60/90-day systemization roadmap - covered by a 60-day money-back guarantee.",
          pl: "W 5 dni roboczych, za €2k fixed: audyt wielorynkowej dostawy marki, baseline spójności customer experience i skan projektu bramek kontroli jakości dla rozproszonych zespołów. Output to jednostronicowa diagnoza z 5-7 spriorytetyzowanymi bottleneckami i roadmapa systematyzacji na 30/60/90 dni - objęta 60-day money-back guarantee.",
        },
      },
      {
        q: {
          en: "We operate dozens of branches, not hundreds. Is this built for our scale?",
          pl: "Operujemy dziesiątkami oddziałów, nie setkami. Czy to jest zbudowane na naszą skalę?",
        },
        a: {
          en: "Yes - r352 works with networks from 30 to 300+ location complexity. The r3loop sequence stays the same at every scale; only the depth of each step changes with engagement size. That's what makes the work predictable across 47 locations or 470.",
          pl: "Tak - r352 pracuje z sieciami o złożoności od 30 do 300+ lokalizacji. Sekwencja r3loop zostaje ta sama w każdej skali; zmienia się tylko głębokość kroków, zależnie od wielkości engagementu. To dzięki temu praca jest przewidywalna przy 47 lokalizacjach i przy 470.",
        },
      },
      {
        q: {
          en: "How long does a multi-market rollout system take to stand up?",
          pl: "Ile trwa postawienie systemu rolloutu na wiele rynków?",
        },
        a: {
          en: "The Enterprise Sprint ships a multi-location rollout system in 12-16 weeks - versus a typical 12-18 months in-house - built to handle 300+ branches without breaking. Handoff includes complete system documentation, team training, and a 90-day transition plan, so the system runs without us afterwards.",
          pl: "Enterprise Sprint dostarcza system rolloutu multi-location w 12-16 tygodni - versus typowe 12-18 miesięcy in-house - zbudowany tak, żeby uniósł 300+ oddziałów bez pękania. Handoff obejmuje pełną dokumentację systemu, szkolenie zespołu i 90-dniowy plan przejściowy, więc system działa potem bez nas.",
        },
      },
    ],
  },
];
