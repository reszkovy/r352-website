import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLocation } from "wouter";
import { useScrollStarted } from "@/app/hooks/useScrollStarted";
import botAvatar from "figma:asset/ca9abe862ac1bfee95045e08a8d97f21981b65dc.png";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

type FAQ = {
  id: string;
  question: { pl: string; en: string };
  answer: { pl: string; en: string };
};

const faqs: FAQ[] = [
  {
    id: "q1",
    question: {
      pl: "Co dokładnie sprzedajecie?",
      en: "What exactly do you sell?",
    },
    answer: {
      pl: "Nie sprzedajemy plików designu. Sprzedajemy operating systems — workflow briefingu, standardy jakości, mapę ownership decyzji i dashboardy performance — wszystko, co zamienia chaos operacyjny w powtarzalny system. Plus seniorską egzekucję samej pracy (UX/UI, brand, kampanie, AI workflows). Ale rzemiosło bez struktury łamie się przy dostawie — dlatego budujemy oba.",
      en: "We don't sell design files. We sell operating systems — briefing workflows, quality standards, decision ownership maps and performance dashboards — everything that turns operational chaos into a repeatable system. Plus senior execution on the work itself (UX/UI, brand, campaigns, AI workflows). But craft without structure breaks at delivery — so we build both.",
    },
  },
  {
    id: "q2",
    question: {
      pl: "Czym jest r3loop?",
      en: "What is r3loop?",
    },
    answer: {
      pl: "r3loop to nasza 8-krokowa metodologia operacyjna — ten sam framework dla każdego projektu, modyfikujemy głębokość, nie strukturę: 01 Diagnose → 02 Map → 03 Standardize → 04 Build → 05 Govern → 06 Ship → 07 Measure → 08 Iterate. Każdy krok ma własne deliverables i mierzalne KPI (np. „% briefów ready przy pierwszym złożeniu — cel 80%+”). Diagnose to entry point — 3-5 dni dla fokusowanych projektów, 1-2 tygodnie dla organizacji. Pełen interaktywny breakdown z timeline'em per step na /process.",
      en: "r3loop is our 8-step operating methodology — same framework for every project, we modify depth not structure: 01 Diagnose → 02 Map → 03 Standardize → 04 Build → 05 Govern → 06 Ship → 07 Measure → 08 Iterate. Each step has its own deliverables and measurable KPI (e.g. '% of briefs meeting readiness checklist on first submission — target 80%+'). Diagnose is the entry point — 3-5 days for focused projects, 1-2 weeks for organization-wide engagements. Full interactive breakdown with per-step timeline on /process.",
    },
  },
  {
    id: "q3",
    question: {
      pl: "Jakie modele współpracy mam do wyboru?",
      en: "What engagement models can I choose from?",
    },
    answer: {
      pl: "Pięć modeli — wybierasz w zależności od dojrzałości problemu: 1) Diagnostic — audyt workflow + plan działania (1-2 tyg, entry tier, money-back jeśli rekomendacje nie są wdrażalne w 60 dni). 2) Sprint — focusowany projekt z jasnym zakresem (2-6 tyg). 3) Retainer — ciągła współpraca z systemem (od 3 mies). 4) Enterprise Sprint — pełna transformacja Creative Operating System (12-16 tyg + 90-day handover). 5) Operating Partner — strategiczna rola, opieka nad systemem (kontrakt roczny, monthly cadence). Pełne porównanie + comparison table na /services.",
      en: "Five models — pick by problem maturity: 1) Diagnostic — workflow audit + action plan (1-2 weeks, entry tier, money-back if recommendations aren't actionable within 60 days). 2) Sprint — focused project with clear scope (2-6 weeks). 3) Retainer — ongoing partnership with a system (from 3 months). 4) Enterprise Sprint — full Creative Operating System transformation (12-16 weeks + 90-day handover). 5) Operating Partner — strategic role, custodian of the system (annual contract, monthly cadence). Full comparison + table on /services.",
    },
  },
  {
    id: "q4",
    question: {
      pl: "Co to jest AI Development & Automation?",
      en: "What is AI Development & Automation?",
    },
    answer: {
      pl: "To produkt consultingowy — bierzemy system który zbudowaliśmy w fazie Standardize/Govern i operacjonalizujemy go: AI brief assistant trenowany na Waszych standardach, integracje workflow z Asana/Notion/Figma/Slack, automatyzacja quality review per typ assetu, engine routingu i ownership decyzji, workflow performance dashboard. Dla zespołów, które MAJĄ już standardy, ale egzekucja wciąż zależy od heroizmu — gotowe wdrożyć warstwę operacyjną, która zamienia standardy w automatyczny workflow. 90-day adoption plan z checkpoint reviews. Pełen breakdown na /services (karta 06).",
      en: "It's a consulting product — we take the system we've built in the Standardize/Govern phase and operationalize it: AI brief assistant trained on your standards, workflow integrations with Asana/Notion/Figma/Slack, quality review automation per asset type, decision ownership & routing engine, workflow performance dashboard. For teams that already HAVE standards but execution still depends on heroics — ready to ship the operating layer that turns standards into automated workflow. 90-day adoption plan with checkpoint reviews. Full breakdown on /services (card 06).",
    },
  },
  {
    id: "q5",
    question: {
      pl: "Czym jest AI Brief Assistant?",
      en: "What is the AI Brief Assistant?",
    },
    answer: {
      pl: "Nasz SaaS — produkt subskrypcyjny. Zamienia niejasne requesty w gotowe briefy w 5 minut. Trenowany na 500+ realnych briefach z naszych projektów. Co robi: zadaje właściwe pytania, generuje strukturalne briefy (zgodne z Definition of Ready), ocenia jakość briefa 0–100 przed wysyłką, integruje się ze Slack/Notion/Asana, uczy się Twojej organizacji. Dostępny w early access — by invitation. Działa standalone albo jako warstwa nad Retainerem / Operating Partner. Pełne info na /services (sekcja „Product · SaaS”).",
      en: "It's our SaaS — subscription product. Turns unclear requests into ready briefs in 5 minutes. Trained on 500+ real briefs from our projects. What it does: asks the right questions, generates structured briefs (against the Definition of Ready), scores brief quality 0–100 before submission, integrates with Slack/Notion/Asana, learns your organization. Available in early access — by invitation. Works standalone or as a layer on top of Retainer / Operating Partner. Full info on /services ('Product · SaaS' section).",
    },
  },
  {
    id: "q6",
    question: {
      pl: "Czym się różnicie od typowej agencji?",
      en: "How are you different from a typical agency?",
    },
    answer: {
      pl: "Większość problemów z designem to nie problemy z designem. To problemy z niejasnymi briefami, rozproszonymi requestami, wolnymi decyzjami i brakującymi standardami jakości. Typowa agencja zaczyna od pytania „co ma ładnie wyglądać”. My zaczynamy od diagnozy — co realnie zawodzi w Waszym workflow — zanim cokolwiek zaprojektujemy. Nie zostawiamy decka z rekomendacjami — zostawiamy działający system + zespół, który go używa. Pełen manifest na /philosophy (6 beliefs + 6 non-negotiables).",
      en: "Most design problems are not design problems. They're problems of unclear briefs, scattered requests, slow decisions and missing quality standards. A typical agency starts with 'what should look pretty?'. We start with diagnosis — what's actually breaking in your workflow — before we design anything. We don't leave a deck of recommendations — we leave a working system + a team that uses it. Full manifesto on /philosophy (6 beliefs + 6 non-negotiables).",
    },
  },
  {
    id: "q7",
    question: {
      pl: "Dla kogo to jest, a dla kogo NIE?",
      en: "Who is this for — and who is it NOT for?",
    },
    answer: {
      pl: "TAK: marki wielolokalizacyjne (3+ lokalizacji), organizacje w fitness/wellness/health/retail, marketing teams z powtarzającymi się requestami, zespoły utknięte w niejasnych pętlach feedbacku, gdzie jakość/szybkość/ownership trzeba zsystemizować. NIE: jednorazowy baner, pojedynczy landing page, generic visual refresh bez powtarzającego się workflow. Jeśli nie pasujemy — powiemy to w feedbacku i polecimy kogoś z naszej sieci, kto pasuje lepiej. Bez upsell pressure.",
      en: "YES: multi-location brands (3+ locations), organizations in fitness/wellness/health/retail, marketing teams with recurring asset requests, teams stuck in unclear feedback loops, where quality/speed/ownership need to be systemized. NO: one-off banners, single landing pages, generic visual refreshes with no recurring workflow. If we don't fit — we'll tell you in the feedback and refer you to someone in our network who fits better. No upsell pressure.",
    },
  },
  {
    id: "q8",
    question: {
      pl: "Jak zacząć współpracę?",
      en: "How do I start?",
    },
    answer: {
      pl: "Trzy ścieżki — w zależności od commitment'u: 1) Wypełnij brief (5-18 min, ustrukturyzowany, dopasowuje się do typu projektu) — pisemna odpowiedź w 48h. 2) Napisz bezpośrednio na hello@r352.com — dla warm referrals i quick chat. 3) Zarezerwuj 30-min call na Calendly. Każda opcja prowadzi do tego samego: discovery call z pełnym kontekstem. Diagnostic ma money-back — bez ryzyka po Twojej stronie.",
      en: "Three paths — by commitment level: 1) Fill the brief (5-18 min, structured, adapts to project type) — written response within 48h. 2) Write directly to hello@r352.com — for warm referrals and quick chat. 3) Book a 30-min call on Calendly. Each option leads to the same outcome: a discovery call with full context. Diagnostic has money-back — zero risk on your side.",
    },
  },
];

export function Chatbot() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Gate visibility on scroll — chat icon hidden at top of page, slides up
  // from bottom once user starts scrolling. Removes the page-load popup feel.
  const scrollStarted = useScrollStarted();

  useEffect(() => {
    // Reset messages and show welcome message based on language
    setMessages([
      {
        id: "welcome",
        text: language === 'pl'
          ? "Cześć — tu asystent r352. Mogę krótko opowiedzieć co sprzedajemy, jak działa nasz 8-step proces, jakie modele współpracy mamy i jak zacząć. Wybierz pytanie albo zacznij od briefa."
          : "Hi — r352 assistant here. I can briefly cover what we sell, how our 8-step process works, our engagement models, and how to start. Pick a question or jump straight into the brief.",
        sender: "bot",
      }
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFAQClick = (faq: FAQ) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: faq.question[language as keyof typeof faq.question] || faq.question.en,
      sender: "user"
    };
    
    setMessages(prev => [...prev, userMsg]);

    // Simulate bot thinking and reply
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: faq.answer[language as keyof typeof faq.answer] || faq.answer.en,
        sender: "bot"
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    // Outer wrapper is now an AnimatePresence + motion.div — chat icon mounts
    // AFTER user has scrolled. Chat enters FIRST (no delay), Brief CTA enters
    // SECOND (delay 0.25s in its own file). Soft 1s expo-out easing for that
    // "settling in" feel rather than snapping. Exit unstaggered (both slide out
    // together when user returns to top).
    <AnimatePresence>
      {scrollStarted && (
        <motion.div
          className="hidden md:block fixed bottom-6 right-6 z-[1001]"
          data-no-cursor-fx="true"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0 }}
        >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[320px] sm:w-[420px] md:w-[560px] bg-[#111111] border border-[#222222] rounded-none shadow-2xl flex flex-col overflow-hidden max-h-[85vh]"
          >
            {/* Chat Area — no top header, close button moved next to FAQ label below */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[480px] scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <img src={botAvatar} alt="Agent" className="w-6 h-6 rounded-full border border-white/10 object-cover shrink-0 mt-1" />
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-[13px] leading-relaxed rounded-none ${
                      msg.sender === "user"
                        ? "bg-[#D4FF00] text-black font-medium"
                        : "bg-[#222222] text-zinc-300"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Options */}
            <div className="p-4 bg-[#0A0A0A] border-t border-[#222222]">
              <div className="flex items-center justify-between mb-3 px-1">
                <p className="text-[11px] uppercase tracking-wider text-zinc-600">
                  {language === 'pl' ? "Wybierz pytanie" : "Choose a question"}
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 hover:text-white transition-colors -mr-1 p-1"
                  aria-label={language === 'pl' ? "Zamknij" : "Close"}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* 2-col grid on md+ — saves vertical space so chat answer stays readable */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {faqs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleFAQClick(faq)}
                    className="text-left text-[12px] leading-snug text-zinc-400 hover:text-[#D4FF00] hover:bg-[#1A1A1A] border border-[#222222] rounded-none px-3 py-2.5 transition-all duration-200"
                  >
                    {faq.question[language as keyof typeof faq.question] || faq.question.en}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setLocation("/contact");
                  window.scrollTo(0, 0);
                }}
                className="mt-3 w-full text-center text-[12px] font-medium leading-snug text-black bg-[#D4FF00] hover:bg-[#bce600] rounded-lg px-3 py-2.5 transition-colors duration-200"
              >
                {language === 'pl' ? "Przejdź do kontaktu" : "Go to contact"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Subdued fade pulse effect when closed */}
        {!isOpen && (
          <motion.div
            animate={{
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-[-6px] bg-[#D4FF00] rounded-full z-0 blur-[8px] pointer-events-none"
          />
        )}

        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 25px rgba(212,255,0,0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 w-14 h-14 bg-[#D4FF00] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,255,0,0.2)] text-black hover:bg-[#bce600] transition-colors duration-300"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex items-center justify-center w-full h-full rounded-full overflow-hidden"
              >
                <img src={botAvatar} alt="Asystent r352" className="w-full h-full object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
