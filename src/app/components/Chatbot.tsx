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
      pl: "Co dokładnie robicie i dla kogo?", 
      en: "What do you actually do — and who is this for?" 
    },
    answer: { 
      pl: "Pomagamy zespołom dostarczać spójny, wysokiej jakości design we wszystkich punktach styku, budując jasne procesy i standardy, a następnie realizując zadania w ramach tego systemu. To idealne rozwiązanie dla dynamicznych zespołów i wielooddziałowych marek, które potrzebują przewidywalnych rezultatów (digital, social media, druk, OOH) bez chaosu.", 
      en: "We help teams ship consistent, high-quality design across touchpoints by building clear workflows and standards, then delivering through that system. It’s best for fast-moving teams and multi-location brands that need predictable output (digital, social, print, OOH) without chaos." 
    },
  },
  {
    id: "q2",
    question: { 
      pl: "Czym jest model design partnership i jak wygląda komunikacja?", 
      en: "What is the design partnership model and how do we communicate?" 
    },
    answer: { 
      pl: "Działamy jako zintegrowany partner design-first (retainer lub stały miesięczny zakres). Zgłoszenia przechodzą przez wspólną tablicę (Trello/Notion), feedback odbywa się w komentarzach w Figmie, a nasza e-komunikacja jest przede wszystkim asynchroniczna. W razie potrzeby robimy krótkie, cotygodniowe statusy, by odblokować decyzje. Zawsze wiesz, co jest w toku, co będzie dalej i kiedy nastąpi wdrożenie.", 
      en: "We work as an embedded design-first partner (retainer or fixed monthly scope). Requests go through a shared board (Trello/Notion), feedback happens in Figma comments, and we keep communication async-first. If needed, we do a short weekly check-in to unblock decisions. You always know what’s in progress, what’s next, and when it ships." 
    },
  },
  {
    id: "q3",
    question: { 
      pl: "Co dokładnie dostarczacie, a czego NIE robicie?", 
      en: "What can you deliver — and what do you NOT do?" 
    },
    answer: { 
      pl: "Zapewniamy kompleksowe wsparcie projektowe: systemy i standardy, key visuale, materiały kampanijne, UI/UX oraz produkcję cross-channel (digital, druk, social media, OOH). Nie działamy jako standardowy wykonawca typu „zróbcie, żeby było ładnie” i nie pracujemy w Adobe InDesign – potrzebujemy jasnych celów i optymalizujemy procesy pod kątem jakości, szybkości oraz powtarzalności.", 
      en: "We deliver end-to-end design support: systems and standards, key visuals, campaign assets, UI/UX, and cross-channel production (digital/print/social/OOH). We don’t act as a generic “make it pretty” vendor and we do not work in Adobe InDesign — we need clear goals and we optimize for quality, speed, and repeatability." 
    },
  },
  {
    id: "q4",
    question: { 
      pl: "Ile czasu zajmuje realizacja i jaki jest typowy czas dostarczenia?", 
      en: "How long does it take to deliver and what’s the typical turnaround?" 
    },
    answer: { 
      pl: "Czas realizacji zależy od stopnia złożoności, ale naszym celem są przewidywalne dostawy. Mniejsze zadania często wdrażamy w 24–72 godziny. Większe projekty (key visuale, systemy, projektowanie produktów) są dostarczane etapami z jasnymi punktami kontrolnymi. Z góry ustalamy priorytety, aby uniknąć niekończących się pętli poprawek.", 
      en: "Turnaround depends on complexity, but the goal is predictable delivery. Small items often ship within 24–72 hours. Larger pieces (key visuals, systems, product design) are delivered in milestones with clear checkpoints. We align priorities upfront so nothing gets stuck in endless loops." 
    },
  },
  {
    id: "q5",
    question: { 
      pl: "Jak wygląda proces startu (kick-off)?", 
      en: "What does the kickoff process look like?" 
    },
    answer: { 
      pl: "Zaczynamy od krótkiego spotkania ujednolicającego: cele, kontekst, ograniczenia i kryteria sukcesu. Następnie ustalamy proces pracy (tablica + format briefu + zasady akceptacji) oraz uzgadniamy rytm pracy i priorytety. Potem dostawy przebiegają w sposób ciągły w ramach ustalonego systemu.", 
      en: "We start with a short alignment: goals, context, constraints, and success criteria. Then we set the workflow (board + brief format + approval rules) and agree on cadence and priorities. After that, delivery runs continuously through the system." 
    },
  }
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
        text: language === 'pl' ? "Cześć! Tu wirtualny asystent r352. Szukasz wsparcia projektowego lub chcesz poznać nasz proces?" : "Hi! This is the r352 virtual assistant. Are you looking for design support or want to learn about our process?",
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
