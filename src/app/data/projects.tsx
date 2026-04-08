import sonovaAsset1 from "figma:asset/209f8cbc4090410c2f591ddabbe7a2b127fba064.png";
import sonovaAsset2 from "figma:asset/1f8226a360c36242f8b1cd87137b2ed45b5b12eb.png";
import sonovaAsset3 from "figma:asset/5560d70ae6cb2aae698382d474abd8298c9b4c98.png";
import sonovaAsset4 from "figma:asset/70ffa00b6de8a7019dca4820d3f27c34ceb12f29.png";
import sonovaAsset5 from "figma:asset/ff5c7b5d6db2610ec21e962e7ac6e1eec5c9b1ef.png";

import benefitImg from "figma:asset/392dd9058b83c94247f5bff0c77a81c590ddd6b3.png";
import benefitCoverImg from "figma:asset/eb490e9a1afd74719bc7f9923aba70eab1890d8f.png";

// Restore home page photo for Benefit Systems
const benefitHomeImg = "https://images.unsplash.com/photo-1637870473618-8c9fa7d11f0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBpbnRlcmlvciUyMGRhcmslMjBuZW9ufGVufDF8fHx8MTc3MzU1Nzk5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

import kubotaImg from "figma:asset/64d75b93efc7e2276259be86fa58f58167868519.png";
import sonovaCoverImg from "figma:asset/720834113c63952050fd1bd7419be70afae4ceb6.png";
import dawidImg from "figma:asset/85688108fd26519f5f268b0edee3e11082b409ab.png";

// Dawid Podsiadlo Project Assets
import dawidAsset1 from "figma:asset/a2fb88b4a767274b92af34ad6534183768eeef35.png";
import dawidAsset2 from "figma:asset/d1bbac7e4cf37ccfc8e8489eb7911a7cba54f0c6.png";
import dawidAsset3 from "figma:asset/7e48eef64acdf4a81ce924544991a70fa72de099.png";
import dawidAsset4 from "figma:asset/c49057385a8b349bc99b8d4d1d1bb707f4674bb3.png";
import dawidAsset5 from "figma:asset/76e847d9bccd1dc5e3e21726a452b712839f339d.png";
import dawidCdImg from "figma:asset/a4e5cfe65f5adbdf1bcf845f9b99f3ba39177d4e.png";
import dawidPhone1 from "figma:asset/58c74394310b11dfca043fb3b1d11720ddb56065.png";
import dawidPhone2 from "figma:asset/1f28b418f11aaea61d562420766fd66383fe0405.png";
import dawidPhone3 from "figma:asset/eebf0f709c3cd8c99d83da2f3eba5767e761d673.png";
import dawidDesktopImg from "figma:asset/23fa00f7824aa041c745cd0a2128c70bb7554f79.png";

// Benefit Systems Project Assets
import benefitAsset1 from "figma:asset/fa2519b057d62b113e618bbc8a4d1444a79ccf8b.png";
import benefitAsset2 from "figma:asset/07174841306f7651acc2728ea5690360b2c0896c.png";
import benefitAsset3 from "figma:asset/352e6d0d08b2645318c6602909418ca9ae456250.png";
import benefitAsset4 from "figma:asset/4d1f7797ea1d8d7473233f7ab8d2f56fb3186fa4.png";

// Kubota Project Assets
import kubotaAsset1 from "figma:asset/d7d8b655b0c0a00ac55aefb2c11480f6ada173de.png";
import kubotaAsset2 from "figma:asset/eb31f0fd6023ee1b0a1d37d3abadc6b5c9b719ef.png";
import kubotaAsset3 from "figma:asset/51f00fe90a9650cf992b64f1a354e63e83efdfe5.png";

export const projects = [
  {
    id: "benefit-systems",
    client: "Benefit Systems",
    title: "System at Scale",
    category: {
      en: "Product Design / System",
      pl: "Design Produktu / System"
    },
    year: "2024",
    image: benefitImg,
    coverImage: benefitCoverImg,
    images: [
        benefitImg,
        benefitAsset1,
        benefitAsset2,
        benefitAsset3,
        benefitAsset4
    ],
    isInternal: false,
    description: {
      en: "Working with Benefit Systems is not just about design - it's about building a scalable communication system for the largest sports club network in Poland, with precision, process and locally adapted aesthetics.",
      pl: "Praca z Benefit Systems to nie tylko design - to budowanie skalowalnego systemu komunikacji dla największej sieci klubów sportowych w Polsce, z precyzją, procesem i lokalnie dopasowaną estetyką."
    },
    services: {
      en: ["Visual Communication", "Key Visuals", "Asset Production"],
      pl: ["Komunikacja Wizualna", "Key Visuale", "Produkcja Zasobów"]
    },
    challenge: {
      en: "Balancing bold, eye-catching visuals with practical functionality required innovative thinking. We had to coordinate with over 5 Project Managers simultaneously while ensuring assets were finalized 2.5 months before every club opening.",
      pl: "Zbalansowanie odważnych, przyciągających wzrok wizualiów z praktyczną funkcjonalnością wymagało innowacyjnego myślenia. Musieliśmy koordynować pracę z ponad 5 Project Managerami jednocześnie, zapewniając finalizację zasobów na 2,5 miesiąca przed otwarciem każdego klubu."
    },
    decisions: {
      en: "We established a workflow relying on structured timelines and checklists. We focused on layout systems that are scalable, adaptable and easy to deploy across multiple locations, from mesh banners to digital screens.",
      pl: "Ustanowiliśmy przepływ pracy oparty na ustrukturyzowanych harmonogramach i listach kontrolnych. Skupiliśmy się na systemach layoutu, które są skalowalne, adaptowalne i łatwe do wdrożenia w wielu lokalizacjach, od siatek mesh po ekrany cyfrowe."
    },
    approach: {
      en: "We manage the entire visual communication system, delivering unique key visuals and full asset packages tailored to local campaigns. We treat every new club launch as a unique project within a consistent framework.",
      pl: "Zarządzamy całym systemem komunikacji wizualnej, dostarczając unikalne key visuale i pełne pakiety zasobów dopasowane do lokalnych kampanii. Każde otwarcie nowego klubu traktujemy jako unikalny projekt w ramach spójnych ram."
    },
    quote: {
      en: "Wellness at work, simplified for everyone.",
      pl: "Wellness w pracy, uproszczony dla każdego."
    },
    outcome: {
      en: "A long-term partnership demonstrating how design scales across hundreds of locations without losing clarity. Each project strengthens Benefit Systems' presence in Poland’s urban spaces through visual storytelling and operational excellence.",
      pl: "Długoterminowe partnerstwo pokazujące, jak design skaluje się w setkach lokalizacji bez utraty jasności. Każdy projekt wzmacnia obecność Benefit Systems w polskich przestrzeniach miejskich poprzez wizualny storytelling i doskonałość operacyjną."
    },
    reflection: {
      en: "Reliability is the ultimate design feature. When you run multiple threads in parallel, process becomes as important as the pixels.",
      pl: "Niezawodność to ostateczna cecha designu. Gdy prowadzisz wiele wątków równolegle, proces staje się tak samo ważny jak piksele."
    },
    stats: [
        { value: "5+", label: { en: "PMs Coordinated", pl: "Koordynowanych PM-ów" } },
        { value: "100+", label: { en: "Clubs Supported", pl: "Wspieranych Klubów" } }
    ]
  },
  {
    id: "sonova",
    client: "Sonova",
    title: "Market Communication",
    category: {
      en: "Brand Support",
      pl: "Wsparcie Marki"
    },
    year: "2024",
    image: sonovaCoverImg,
    coverImage: sonovaCoverImg,
    images: [sonovaAsset4, sonovaAsset1, sonovaAsset2, sonovaAsset3, sonovaAsset5],
    isInternal: false,
    description: {
      en: "We help Sonova communicate clearly and confidently across their Polish market, delivering campaigns, print materials and digital assets that connect with diverse audiences.",
      pl: "Pomagamy firmie Sonova komunikować się w sposób jasny i pewny na polskim rynku, dostarczając kampanie, materiały drukowane i zasoby cyfrowe, które łączą się z różnorodnymi odbiorcami."
    },
    services: {
      en: ["Retail Campaigns", "Print Design", "Digital Assets"],
      pl: ["Kampanie Retail", "Projekty Drukowane", "Zasoby Cyfrowe"]
    },
    challenge: {
      en: "We provide continuous creative and production support for Sonova’s Polish operations. The challenge is to maintain global brand precision while localizing communication for hundreds of clinics and diverse audiences.",
      pl: "Zapewniamy ciągłe wsparcie kreatywne i produkcyjne dla polskich operacji Sonova. Wyzwaniem jest zachowanie globalnej precyzji marki przy jednoczesnej lokalizacji komunikacji dla setek klinik i zróżnicowanych odbiorców."
    },
    decisions: {
      en: "We established a modular system allowing fast and consistent rollout across all clinics. We closely coordinate with local marketing to ensure visuals are on-brand, compliant, and conversion-ready.",
      pl: "Stworzyliśmy modułowy system umożliwiający szybkie i spójne wdrożenia we wszystkich klinikach. Ściśle współpracujemy z lokalnym marketingiem, aby wizualizacje były zgodne z marką, przepisami i nastawione na konwersję."
    },
    approach: {
      en: "We support both brand-level messaging and conversion-driven communication. For each campaign, we refine templates to better serve patients, sales teams, and the organization's goals.",
      pl: "Wspieramy zarówno komunikację wizerunkową, jak i sprzedażową. Przy każdej kampanii udoskonalamy szablony, aby lepiej służyły pacjentom, zespołom sprzedaży i celom organizacji."
    },
    quote: {
      en: "Sonova’s mission is about restoring hearing - our role is to make that promise feel accessible, trustworthy and clear.",
      pl: "Misją Sonova jest przywracanie słuchu - naszą rolą jest sprawienie, by ta obietnica była dostępna, wiarygodna i jasna."
    },
    outcome: {
      en: "We successfully localize communication without losing quality. Deliverables include print-ready materials, web banners, and tailored messaging that resonates with senior and multi-generational audiences.",
      pl: "Skutecznie lokalizujemy komunikację bez utraty jakości. Dostarczamy gotowe materiały do druku, banery i dopasowane komunikaty, które rezonują z odbiorcami senioralnymi i wielopokoleniowymi."
    },
    reflection: {
      en: "With each project, we focus on simplifying complexity, building human connections and helping people hear the world again.",
      pl: "Przy każdym projekcie skupiamy się na upraszczaniu złożoności, budowaniu ludzkich relacji i pomaganiu ludziom usłyszeć świat na nowo."
    },
    stats: [
        { value: "100+", label: { en: "Clinics Supported", pl: "Obsłużone Kliniki" } },
        { value: "Daily", label: { en: "Asset Production", pl: "Produkcja Zasobów" } }
    ]
  },
  {
    id: "dawid-podsiadlo",
    client: "Dawid Podsiadlo",
    title: "Tour Experience",
    category: {
      en: "Digital Products",
      pl: "Produkty Cyfrowe"
    },
    year: "2024",
    image: dawidImg,
    coverImage: dawidImg,
    images: [
        dawidDesktopImg,
        dawidPhone1,
        dawidPhone2,
        dawidAsset1,
        dawidAsset2,
        dawidAsset3,
        dawidAsset4,
        dawidAsset5,
        dawidPhone3,
        dawidCdImg
    ],
    isInternal: false,
    description: {
      en: "Long-term 360° support for one of Poland's biggest artists. We provide comprehensive development of digital products - from advanced e-commerce platforms handling massive traffic to dedicated concert apps and asset production for stadium tours.",
      pl: "Długoterminowe wsparcie 360° dla jednego z największych polskich artystów. Zapewniamy kompleksową realizację produktów cyfrowych - od zaawansowanych sklepów WWW obsługujących ogromny ruch, po dedykowane aplikacje koncertowe i produkcję zasobów na trasy stadionowe."
    },
    services: {
      en: ["Concert Apps", "E-commerce", "Digital & Print"],
      pl: ["Aplikacje Koncertowe", "Sklepy WWW", "Digital i Druk"]
    },
    challenge: {
      en: "The scale of stadium tours required reliable technological solutions. Our main challenge was building scalable digital products, such as an e-commerce platform and concert apps, capable of withstanding massive traffic spikes during drops.",
      pl: "Skala stadionowych tras koncertowych wymagała niezawodnych rozwiązań technologicznych. Naszym głównym wyzwaniem było stworzenie skalowalnych produktów cyfrowych, takich jak sklep WWW i aplikacje koncertowe, które wytrzymają ogromne obciążenie ruchem podczas premier."
    },
    decisions: {
      en: "We designed a high-performance architecture for the online store and created intuitive apps to streamline logistics and fan experience during concerts. In parallel, we managed the production of physical materials for the events.",
      pl: "Zaprojektowaliśmy wydajną architekturę dla sklepu internetowego oraz stworzyliśmy intuicyjne aplikacje ułatwiające logistykę i doświadczenie fanów podczas koncertów. Równolegle zarządzaliśmy produkcją materiałów fizycznych na wydarzenia."
    },
    approach: {
      en: "We combined technological and production expertise. We designed and deployed reliability-focused digital products while maintaining strict visual consistency with promotional materials.",
      pl: "Połączyliśmy kompetencje technologiczne z produkcyjnymi. Zaprojektowaliśmy i wdrożyliśmy produkty cyfrowe zorientowane na niezawodność, dbając jednocześnie o spójność z materiałami promocyjnymi."
    },
    quote: {
      en: "Digital products at this scale don't forgive errors - the e-commerce store and apps must work flawlessly.",
      pl: "Produkty cyfrowe przy tej skali nie wybaczą błędów - sklep WWW i aplikacje muszą działać bezbłędnie."
    },
    outcome: {
      en: "Seamless delivery of robust digital products, enabling the artist's team to focus on the performance while we handled both the e-commerce ecosystem and the 360° production pipeline.",
      pl: "Płynne dostarczanie niezawodnych produktów cyfrowych, co pozwoliło zespołowi artysty skupić się na występie, podczas gdy my zarządzaliśmy ekosystemem e-commerce i procesem produkcji 360°."
    },
    reflection: {
      en: "Consistency and reliability in high-stakes environments build trust. Scalable tech architecture isn't just about code; it's about peace of mind for the artist.",
      pl: "Spójność i niezawodność w środowiskach o wysoką stawkę budują zaufanie. Skalowalna architektura technologiczna to nie tylko kod, to także spokój ducha dla artysty."
    },
    stats: [
        { value: "300k+", label: { en: "Tickets Sold", pl: "Sprzedane Bilety" } },
        { value: "0", label: { en: "Server Crashes", pl: "Awarie Serwera" } }
    ]
  },
  {
    id: "kubota",
    client: "Kubota",
    title: "Long-term creative partnership",
    category: {
      en: "Design-first partner",
      pl: "Zintegrowany partner projektowy"
    },
    year: "2023",
    image: kubotaImg,
    coverImage: kubotaImg,
    images: [
        kubotaAsset3,
        kubotaAsset1,
        kubotaAsset2
    ],
    isInternal: false,
    description: {
      en: "Kubota’s growth required more than one-off campaigns. We supported the brand from early-stage momentum to large-scale communication by building a consistent visual language and a repeatable content production system. This helped the marketing team move faster, stay coherent across channels, and ship reliably during key moments, including a dedicated IPO debut materials package.",
      pl: "Rozwój marki Kubota wymagał czegoś więcej niż jednorazowych kampanii. Wspieraliśmy markę od wczesnego etapu wzrostu do komunikacji na dużą skalę, budując spójny język wizualny i powtarzalny system produkcji treści. Pomogło to zespołowi marketingu działać szybciej, zachować spójność we wszystkich kanałach i niezawodnie dostarczać materiały w kluczowych momentach, w tym dedykowany pakiet na debiut giełdowy."
    },
    services: {
      en: ["Always-on content", "Campaign assets", "Modular formats", "IPO materials"],
      pl: ["Bieżąca obsługa", "Materiały kampanijne", "Formaty modułowe", "Materiały IPO"]
    },
    challenge: {
      en: "Kubota needed continuous, high-quality creative output while scaling fast. The core challenge wasn’t a single project, it was maintaining consistency across touchpoints, reducing approval friction, and keeping speed high without compromising detail.",
      pl: "Kubota potrzebowała ciągłych, wysokiej jakości materiałów kreatywnych w trakcie szybkiego skalowania. Głównym wyzwaniem nie był pojedynczy projekt, ale utrzymanie spójności we wszystkich punktach styku, redukcja tarć decyzyjnych i utrzymanie tempa bez kompromisów w detalach."
    },
    decisions: {
      en: "We acted as an embedded design-first partner, delivering campaign assets and always-on content across digital, social, and print. In parallel, we built a modular system of formats and reusable components that made production predictable, reduced back-and-forth, and kept the brand visually coherent even as volume increased.",
      pl: "Działaliśmy jako zintegrowany partner projektowy, dostarczając materiały do kampanii i bieżącej komunikacji w kanałach digital, social i druku. Równolegle zbudowaliśmy modułowy system formatów i reużywalnych komponentów, który uczynił produkcję przewidywalną, zmniejszył liczbę poprawek i utrzymał spójność wizualną marki nawet przy rosnącym wolumenie."
    },
    approach: {
      en: "At a key milestone, we delivered a dedicated set of communication materials supporting Kubota’s IPO debut process. The focus was clarity, consistency, and execution readiness under high visibility, while protecting the brand’s tone and quality on both the “big picture” and detail level.",
      pl: "W kluczowym momencie dostarczyliśmy dedykowany zestaw materiałów komunikacyjnych wspierających proces debiutu giełdowego marki Kubota. Skupiliśmy się na jasności, spójności i gotowości egzekucyjnej przy dużej widoczności, chroniąc jednocześnie ton i jakość marki zarówno na poziomie strategicznym, jak i w detalach."
    },
    quote: {
      en: "Systemizing content delivery. Keeping brand quality consistent during growth.",
      pl: "Systematyzacja dostarczania treści. Utrzymanie spójnej jakości marki podczas wzrostu."
    },
    outcome: {
      en: "A scalable creative workflow that helped Kubota ship faster with fewer iterations, clearer standards, and consistent output across channels during growth and high-stakes moments.",
      pl: "Skalowalny proces kreatywny, który pomógł marce Kubota działać szybciej z mniejszą liczbą iteracji, jaśniejszymi standardami i spójnymi materiałami we wszystkich kanałach podczas wzrostu i kluczowych momentów."
    },
    reflection: {
      en: "Highlights: Always-on content production and campaign assets, Modular formats and reusable components, Cross-channel consistency (digital / social / print), IPO debut communication materials package.",
      pl: "Najważniejsze punkty: Bieżąca produkcja treści i materiały kampanijne, Modułowe formaty i reużywalne komponenty, Spójność we wszystkich kanałach (digital / social / print), Pakiet materiałów na debiut IPO."
    },
    stats: [
        { value: "IPO", label: { en: "Key milestone", pl: "Kluczowy etap" } },
        { value: "Fast", label: { en: "Turnaround", pl: "Czas realizacji" } }
    ]
  }
];