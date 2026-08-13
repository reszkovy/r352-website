import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
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
      pl: "Design operations - system plus seniorska egzekucja całego stacku (strategia, UX/UI, brand, kampanie, produkcja, workflow AI). Nie pojedyncze pliki, tylko powtarzalny system: workflow briefingu, standardy jakości, ownership decyzji i dashboardy - a na nim dowożona praca. 10k+ assetów rocznie, 300+ lokalizacji w jednym systemie. Rzemiosło bez struktury łamie się przy dostawie - budujemy oba.",
      en: "Design operations - a system plus senior execution across the whole stack (strategy, UX/UI, brand, campaigns, production, AI workflows). Not one-off files, but a repeatable system: briefing workflow, quality standards, decision ownership and dashboards - with the work delivered on top of it. 10k+ assets a year, 300+ locations on one system. Craft without structure breaks at delivery - so we build both.",
    },
  },
  {
    id: "q2",
    question: {
      pl: "Czym różnicie się od agencji?",
      en: "How are you different from an agency?",
    },
    answer: {
      pl: "Jesteśmy operatorem, nie agencją. Agencja pyta „co ma ładnie wyglądać”. My zaczynamy od diagnozy - co realnie zawodzi w workflow - zanim cokolwiek zaprojektujemy. Nie zostawiamy decka rekomendacji, tylko działający system i zespół, który go używa. Efekt: akceptacje szybsze 3×, jakość i tempo trzymają poziom w skali. Pełen manifest na /philosophy.",
      en: "We're an operator, not an agency. An agency asks 'what should look good?'. We start with diagnosis - what's actually breaking in your workflow - before we design anything. We don't leave a deck of recommendations, we leave a working system and a team that runs it. Result: 3× faster approvals, quality and speed holding at scale. Full manifesto on /philosophy.",
    },
  },
  {
    id: "q3",
    question: {
      pl: "Pracujecie z agencjami?",
      en: "Do you work with agencies?",
    },
    answer: {
      pl: "Tak, dwoma torami. White-label - dostarczamy pod Twoją marką, jako Twój zespół produkcyjno-strategiczny, niewidoczni dla klienta. Direct - wchodzimy jako operator przy przetargach i realizacjach, które potrzebują strategii plus egzekucji w skali. Jeden akountowalny zespół zamiast żonglerki freelancerami. Szczegóły na /for-agencies.",
      en: "Yes, two ways. White-label - we deliver under your name, as your production and strategy team, invisible to your client. Direct - we come in as an operator on pitches and rollouts that need strategy plus execution at scale. One accountable team instead of juggling freelancers. Details on /for-agencies.",
    },
  },
  {
    id: "q4",
    question: {
      pl: "Jak wykorzystujecie AI?",
      en: "How do you use AI?",
    },
    answer: {
      pl: "AI okiełznane w spójny output przy skali, nie doklejone. Governance zamiast „używamy AI”: asystent briefów trenowany na Waszych standardach, automatyzacja quality review, integracje workflow (Asana/Notion/Figma/Slack), routing i ownership decyzji. Cel to przewidywalny output, nie loteria. To warstwa operacyjna nad standardami, nie gadżet. Więcej na /services.",
      en: "AI governed into consistent output at scale, not just bolted on. Governance over 'we use AI': a brief assistant trained on your standards, quality-review automation, workflow integrations (Asana/Notion/Figma/Slack), decision routing and ownership. The point is predictable output, not a gamble. It's an operating layer over your standards, not a gadget. More on /services.",
    },
  },
  {
    id: "q5",
    question: {
      pl: "Jakie modele współpracy?",
      en: "What engagement models?",
    },
    answer: {
      pl: "Pięć modeli, wybierasz wg dojrzałości problemu - od diagnostyki za ~€2k po wieloletnie partnerstwo operacyjne: 1) Diagnostic (audyt + plan, 1-2 tyg, money-back). 2) Sprint (fokusowany projekt, 2-6 tyg). 3) Retainer (ciągły system, od 3 mies). 4) Enterprise Sprint (pełna transformacja, 12-16 tyg). 5) Operating Partner (rola strategiczna, kontrakt roczny). Pełne porównanie na /services.",
      en: "Five models, pick by problem maturity - from a ~€2k diagnostic to a multi-year operating partnership: 1) Diagnostic (audit + plan, 1-2 wks, money-back). 2) Sprint (focused project, 2-6 wks). 3) Retainer (ongoing system, from 3 mos). 4) Enterprise Sprint (full transformation, 12-16 wks). 5) Operating Partner (strategic role, annual). Full comparison on /services.",
    },
  },
  {
    id: "q6",
    question: {
      pl: "Czym jest r3loop?",
      en: "What is r3loop?",
    },
    answer: {
      pl: "Nasza 8-krokowa metodologia operacyjna - ten sam framework dla każdego projektu, zmieniamy głębokość, nie strukturę: Diagnose → Map → Standardize → Build → Govern → Ship → Measure → Iterate. Każdy krok ma deliverables i mierzalny KPI. Wejście to Diagnose (3-5 dni / 1-2 tyg). Pełen breakdown na /process.",
      en: "Our 8-step operating methodology - same framework for every project, we change depth not structure: Diagnose → Map → Standardize → Build → Govern → Ship → Measure → Iterate. Each step has deliverables and a measurable KPI. Entry point is Diagnose (3-5 days / 1-2 weeks). Full breakdown on /process.",
    },
  },
  {
    id: "q7",
    question: {
      pl: "Dla kogo to jest, a dla kogo NIE?",
      en: "Who is this for - and who is it NOT for?",
    },
    answer: {
      pl: "TAK: marki wielolokalizacyjne (3+ lokalizacji), zespoły marketingu z powtarzalnymi requestami, organizacje gdzie jakość/tempo/ownership trzeba zsystemizować, agencje potrzebujące zaplecza. NIE: jednorazowy baner czy pojedynczy landing bez powtarzalnego workflow. Jeśli nie pasujemy - powiemy to i polecimy kogoś, kto pasuje lepiej. Bez presji.",
      en: "YES: multi-location brands (3+ locations), marketing teams with recurring requests, organizations where quality/speed/ownership need systemizing, agencies needing a delivery bench. NO: a one-off banner or single landing with no recurring workflow. If we don't fit - we'll say so and refer someone who fits better. No pressure.",
    },
  },
  {
    id: "q8",
    question: {
      pl: "Jak zacząć?",
      en: "How do I start?",
    },
    answer: {
      pl: "Trzy ścieżki: 1) Wypełnij brief (~12 min, dopasowuje się do projektu) - pisemna odpowiedź w 48h. 2) Napisz na hello@r352.com. 3) Zarezerwuj 30-min call. Każda prowadzi do tego samego: rozmowy z pełnym kontekstem. Diagnostic ma money-back - zero ryzyka po Twojej stronie.",
      en: "Three paths: 1) Fill the brief (~12 min, adapts to your project) - written response within 48h. 2) Write to hello@r352.com. 3) Book a 30-min call. Each leads to the same: a call with full context. Diagnostic has money-back - zero risk on your side.",
    },
  },
];

export function Chatbot() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Gate visibility on scroll - chat icon hidden at top of page, slides up
  // from bottom once user starts scrolling. Removes the page-load popup feel.
  const scrollStarted = useScrollStarted();

  useEffect(() => {
    // Reset messages and show welcome message based on language
    setMessages([
      {
        id: "welcome",
        text: language === 'pl'
          ? "Cześć, jestem R080 - robot-asystent r352. Powiem krótko co robimy, jak działa nasz 8-krokowy proces, jakie mamy modele współpracy i jak zacząć. Wybierz pytanie albo od razu wypełnij brief."
          : "Hi, I'm R080 - r352's robot assistant. I can quickly cover what we do, how our 8-step process works, our engagement models, and how to start. Pick a question or jump straight into the brief.",
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
    // Outer wrapper is now an AnimatePresence + motion.div - chat icon mounts
    // AFTER user has scrolled. Chat enters FIRST (no delay), Brief CTA enters
    // SECOND (delay 0.25s in its own file). Soft 1s expo-out easing for that
    // "settling in" feel rather than snapping. Exit unstaggered (both slide out
    // together when user returns to top).
    <AnimatePresence>
      {scrollStarted && (
        <motion.div
          // Closed launcher stays low (z-985) so it tucks under the open nav
          // menu. But the OPEN chat panel must sit ABOVE the header (z-999) -
          // otherwise, on shorter viewports the tall panel reaches the top and
          // the header nav bleeds through the answer, making it unreadable.
          // Chat and menu are never both open, so the swap is safe.
          className={`hidden md:block fixed bottom-6 right-6 ${isOpen ? "z-[1002]" : "z-[985]"}`}
          data-no-cursor-fx="true"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0 }}
        >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // Full-screen dim so the open chat is a focused modal: the header
            // and page darken behind it (no nav peeking beside the panel). Sits
            // inside the z-1002 container, so it covers the header (z-999).
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label={language === 'pl' ? "Asystent r352" : "r352 assistant"}
            className="absolute bottom-20 right-0 w-[320px] sm:w-[420px] md:w-[560px] bg-[#111111] border border-[#222222] rounded-none shadow-2xl flex flex-col overflow-hidden max-h-[85vh]"
          >
            {/* Close - top-right, the conventional position users reach for. */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label={language === 'pl' ? "Zamknij" : "Close"}
              className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-[#111111]/80 backdrop-blur text-zinc-400 hover:text-white hover:bg-[#222222] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Chat Area. aria-live announces bot replies to screen readers as they arrive. */}
            <div aria-live="polite" className="flex-1 overflow-y-auto p-4 pt-11 space-y-4 min-h-[300px] max-h-[480px] scrollbar-thin">
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
                        : "bg-[#1c1c1c] text-zinc-100"
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
              <div className="mb-3 px-1">
                <p className="text-[11px] uppercase tracking-wider text-zinc-600">
                  {language === 'pl' ? "Wybierz pytanie" : "Choose a question"}
                </p>
              </div>
              {/* 2-col grid on md+ - saves vertical space so chat answer stays readable */}
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

      {/* Brand-hero launcher - looping robot video (R080) in a circle. Hover
          reveals a "FAQ" label above it; click toggles the panel. */}
      <div className="relative group">
        {/* Subdued fade pulse when closed */}
        {!isOpen && (
          <motion.div
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-6px] bg-[#D4FF00] rounded-full z-0 blur-[8px] pointer-events-none"
          />
        )}
        {/* FAQ label - fades in above the circle on hover/focus */}
        <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 text-[#D4FF00] font-display uppercase tracking-[0.25em] text-xs whitespace-nowrap [text-shadow:0_0_14px_rgba(0,0,0,0.7)]">
          FAQ
        </span>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(212,255,0,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={language === 'pl' ? "Otwórz FAQ" : "Open FAQ"}
          className="relative z-10 w-16 h-16 bg-[#D4FF00] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,255,0,0.2)] text-black hover:bg-[#bce600] transition-colors duration-300 overflow-hidden"
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
                key="bot"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="w-full h-full rounded-full overflow-hidden"
              >
                <video
                  src="/brand-hero/hero.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="R080"
                  className="w-full h-full object-cover [transform:translateY(10px)_scale(1.3)]"
                />
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
