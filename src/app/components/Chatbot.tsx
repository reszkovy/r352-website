import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLocation } from "wouter";
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
      pl: "Nie sprzedajemy plików designu. Sprzedajemy operating systems — workflow briefingu, standardy jakości, mapę ownership decyzji, dashboardy performance — wszystko co zamienia chaos operacyjny w powtarzalny system. Plus seniorską egzekucję samej pracy (UX/UI, brand, kampanie). Ale rzemiosło bez struktury łamie się przy dostawie — dlatego budujemy oba.",
      en: "We don't sell design files. We sell operating systems — briefing workflows, quality standards, decision ownership maps, performance dashboards — everything that turns operational chaos into a repeatable system. Plus senior execution on the design itself (UX/UI, brand, campaigns). But craft without structure breaks at delivery — so we build both.",
    },
  },
  {
    id: "q2",
    question: {
      pl: "Czym się różnicie od typowej agencji?",
      en: "How are you different from a typical agency?",
    },
    answer: {
      pl: "Większość problemów z designem to nie problemy z designem. To problemy z niejasnymi briefami, rozproszonymi requestami, wolnymi decyzjami i brakującymi standardami jakości. Zaczynamy od diagnozy — co realnie zawodzi w Waszym workflow — zanim cokolwiek zaprojektujemy. Typowa agencja zaczyna od „co chcecie, że ładnie wygląda?”. My zaczynamy od „co się złamało w sposobie dostarczania i czemu?”.",
      en: "Most design problems are not design problems. They're problems of unclear briefs, scattered requests, slow decisions and missing quality standards. We start with diagnosis — what's actually breaking in your workflow — before we design anything. A typical agency starts with 'what do you want to look pretty?'. We start with 'what's broken in how delivery happens and why?'.",
    },
  },
  {
    id: "q3",
    question: {
      pl: "Jakie modele współpracy oferujecie?",
      en: "What engagement models do you offer?",
    },
    answer: {
      pl: "Pięć modeli — wybierasz w zależności od dojrzałości problemu i ambicji transformacji: 1) Diagnostic — audyt workflow + plan działania (entry tier, money-back jeśli rekomendacje nie są wdrażalne). 2) Sprint — focusowany projekt z jasnym zakresem (2-6 tyg). 3) Retainer — ciągła współpraca produkcyjna z systemem (od 3 mies). 4) Enterprise Sprint — pełna transformacja Creative Operating System (12-16 tyg). 5) Operating Partner — strategiczna rola partnera operacyjnego (kontrakt roczny). Plus produkt SaaS: AI Development & Automation. Pełne porównanie na /services.",
      en: "Five models — chosen by maturity of the problem and ambition of transformation: 1) Diagnostic — workflow audit + action plan (entry tier, money-back if not actionable). 2) Sprint — focused project, clear scope (2-6 weeks). 3) Retainer — ongoing production partnership with a system (from 3 months). 4) Enterprise Sprint — full Creative Operating System transformation (12-16 weeks). 5) Operating Partner — strategic operating partner role (annual contract). Plus our SaaS product: AI Development & Automation. Full comparison on /services.",
    },
  },
  {
    id: "q4",
    question: {
      pl: "Jak wygląda Wasz proces?",
      en: "How does your process work?",
    },
    answer: {
      pl: "8-stepowy framework — ten sam dla każdego projektu, modyfikujemy głębokość, nie strukturę: Diagnose → Map → Standardize → Build → Govern → Ship → Measure → Iterate. Każdy krok ma własne deliverables i KPI. Nie zostawiamy rekomendacji — zostawiamy działający system. Interaktywny breakdown na /process.",
      en: "An 8-step framework — same for every project, we modify depth not structure: Diagnose → Map → Standardize → Build → Govern → Ship → Measure → Iterate. Each step has its own deliverables and KPI. We don't leave recommendations — we leave a working system. Interactive breakdown on /process.",
    },
  },
  {
    id: "q5",
    question: {
      pl: "Dla kogo to jest i dla kogo NIE?",
      en: "Who is this for — and who is it NOT for?",
    },
    answer: {
      pl: "TAK: marki wielolokalizacyjne (3+ lokalizacji), organizacje w fitness/wellness/health/retail, zespoły utknięte w niejasnych pętlach feedbacku, marketing teams z powtarzającymi się requestami, projekty od 50K+ PLN. NIE: jednorazowy baner, pojedynczy landing page, generic visual refresh bez powtarzającego się workflow. Jeśli nie pasujemy — polecimy kogoś z naszej sieci kto pasuje lepiej.",
      en: "YES: multi-location brands (3+ locations), organizations in fitness/wellness/health/retail, teams stuck in unclear feedback loops, marketing teams with recurring requests, projects above 50K+ PLN. NO: one-off banners, single landing pages, generic visual refreshes with no recurring workflow. If we don't fit — we'll refer you to someone in our network who fits better.",
    },
  },
  {
    id: "q6",
    question: {
      pl: "Jak zacząć współpracę?",
      en: "How do I start?",
    },
    answer: {
      pl: "Trzy ścieżki — w zależności od commitment'u: 1) Wypełnij brief (5-18 min, ustrukturyzowany, dopasowuje się do typu projektu) — pisemna odpowiedź w 48h. 2) Napisz bezpośrednio na hello@r352.com — dla warm referrals i quick chat. 3) Zarezerwuj 30-min call na Calendly. Każda opcja prowadzi do tego samego rezultatu — discovery call z pełnym kontekstem. Diagnostic ma money-back — bez ryzyka po Twojej stronie.",
      en: "Three paths — based on commitment level: 1) Fill the brief (5-18 min, structured, adapts to project type) — written response within 48h. 2) Write directly to hello@r352.com — for warm referrals and quick chat. 3) Book a 30-min call on Calendly. Each option leads to the same outcome — a discovery call with full context. Diagnostic has money-back — zero risk on your side.",
    },
  },
];

export function Chatbot() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    <div className="hidden md:block fixed bottom-6 right-6 z-50" data-no-cursor-fx="true">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[320px] sm:w-[420px] bg-[#111111] border border-[#222222] rounded-none shadow-2xl flex flex-col overflow-hidden max-h-[85vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#222222] flex items-center justify-between bg-[#0A0A0A]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={botAvatar} alt="Agent" className="w-8 h-8 rounded-full border border-[#D4FF00]/30 object-cover" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#D4FF00] border-2 border-[#0A0A0A]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white tracking-wide">Asystent r352</h3>
                  <p className="text-[10px] text-zinc-500 font-mono">Zawsze do Waszej dyspozycji</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px] scrollbar-thin">
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
              <p className="text-[11px] uppercase tracking-wider text-zinc-600 mb-3 px-1">
                {language === 'pl' ? "Wybierz pytanie" : "Choose a question"}
              </p>
              <div className="flex flex-col gap-2">
                {faqs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleFAQClick(faq)}
                    className="text-left text-[12px] leading-snug text-zinc-400 hover:text-[#D4FF00] hover:bg-[#1A1A1A] border border-[#222222] rounded-none px-3 py-2.5 transition-all duration-200"
                  >
                    {faq.question[language as keyof typeof faq.question] || faq.question.en}
                  </button>
                ))}
                
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setLocation("/contact");
                    window.scrollTo(0, 0);
                  }}
                  className="mt-2 w-full text-center text-[12px] font-medium leading-snug text-black bg-[#D4FF00] hover:bg-[#bce600] rounded-lg px-3 py-2.5 transition-colors duration-200"
                >
                  {language === 'pl' ? "Przejdź do kontaktu" : "Go to contact"}
                </button>
              </div>
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
    </div>
  );
}
