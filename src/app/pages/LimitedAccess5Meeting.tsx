import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Eye, EyeOff, ChevronRight, FileText, Beaker, MessageSquare, Layers, LineChart, Target, Rocket, ExternalLink, Download, Play, Activity, HeartPulse, Apple } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useCallback } from "react";
import { useLenis } from "lenis/react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const TABS = [
  { id: '00', title: 'Otwarcie', icon: Play },
  { id: '01', title: 'Co zobaczyliśmy', icon: FileText },
  { id: '02', title: 'Pytania discovery', icon: MessageSquare },
  { id: '04', title: 'Dwa modele do weryfikacji', icon: Layers },
  { id: '05', title: 'Możliwe napięcia', icon: Beaker },
  { id: '06', title: 'Co trzeba doprecyzować', icon: Target },
  { id: '07', title: 'Następne kroki', icon: Rocket },
];

function SectionLabel({ number, title }: { number: string, title?: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-8 h-8 rounded-full border border-[#D4FF00]/30 bg-[#D4FF00]/10 flex items-center justify-center">
        <span className="text-xs font-bold text-[#D4FF00]">{number}</span>
      </div>
      {title && <span className="text-sm font-display uppercase tracking-[0.2em] text-[#D4FF00]/80">{title}</span>}
    </div>
  );
}

export function LimitedAccess5Meeting() {
  const lenis = useLenis();
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  useEffect(() => {
    if (lenis) {
      const timers = [
        setTimeout(() => lenis.resize(), 100),
        setTimeout(() => lenis.resize(), 500),
        setTimeout(() => lenis.resize(), 1500),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [lenis, activeTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        setActiveTab(prev => {
          const index = TABS.findIndex(t => t.id === prev);
          return index > 0 ? TABS[index - 1].id : prev;
        });
      } else if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        setActiveTab(prev => {
          const index = TABS.findIndex(t => t.id === prev);
          return index < TABS.length - 1 ? TABS[index + 1].id : prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const renderTabContent = (currentTab = activeTab) => {
    switch (currentTab) {
      case '00':
        return (
          <motion.div
            key="00"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="p-10 border border-white/[0.08] bg-white/[0.02] rounded-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Agenda i cel spotkania</h3>
              <p className="text-base text-white/70 leading-relaxed mb-8">
                Głównym celem naszej dzisiejszej sesji jest wspólne zmapowanie obecnego ekosystemu marek BetterWorkplace oraz podjęcie kluczowych decyzji dotyczących docelowej architektury i pozycjonowania całego portfolio.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#D4FF00]">1</div>
                  Podsumowanie dotychczasowych obserwacji
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#D4FF00]">2</div>
                  Weryfikacja dwóch potencjalnych modeli architektonicznych
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#D4FF00]">3</div>
                  Zdefiniowanie brakujących elementów i napięć
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#D4FF00]">4</div>
                  Ustalenie następnych kroków
                </div>
              </div>
            </div>
          </motion.div>
        );
      case '01':
        return (
          <motion.div
            key="01"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="grid gap-6">
              <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm group hover:border-white/20 transition-colors">
                <h3 className="text-lg font-bold text-white/90 mb-3">Dziś klient widzi kilka osobnych bytów, a nie jeden ekosystem</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  BetterWorkplace, DailyFruits i Mała Palarnia funkcjonują na osobnych stronach i z perspektywy klienta nie budują jednego obrazu oferty.
                </p>
                <div className="bg-[#D4FF00]/10 border border-[#D4FF00]/20 p-4 rounded-sm">
                  <span className="text-[10px] font-display uppercase tracking-widest text-[#D4FF00] block mb-1">Pytanie do weryfikacji</span>
                  <p className="text-sm font-medium text-[#D4FF00]/90">Jak chcecie, żeby klient rozumiał relację między tymi bytami za 12 miesięcy?</p>
                </div>
              </div>

              <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm group hover:border-white/20 transition-colors">
                <h3 className="text-lg font-bold text-white/90 mb-3">DailyFruits realnie oferuje więcej niż komunikuje</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  Oferta obejmuje nie tylko owoce, ale też kanapki, programy, wydarzenia i edukację, podczas gdy komunikacja nadal sprowadza markę głównie do "owoców do biura".
                </p>
                <div className="bg-[#D4FF00]/10 border border-[#D4FF00]/20 p-4 rounded-sm">
                  <span className="text-[10px] font-display uppercase tracking-widest text-[#D4FF00] block mb-1">Pytanie do weryfikacji</span>
                  <p className="text-sm font-medium text-[#D4FF00]/90">Czy DailyFruits ma dalej być postrzegany jako dostawca jednej kategorii, czy jako szersza oferta dla workplace?</p>
                </div>
              </div>

              <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm group hover:border-white/20 transition-colors">
                <h3 className="text-lg font-bold text-white/90 mb-3">Widzimy możliwy rozdźwięk między językiem sprzedaży a językiem komunikacji</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  Warsztat sprzedażowy pokazuje konkretne problemy klienta, podczas gdy komunikacja na stronach pozostaje głównie produktowa.
                </p>
                <div className="bg-[#D4FF00]/10 border border-[#D4FF00]/20 p-4 rounded-sm">
                  <span className="text-[10px] font-display uppercase tracking-widest text-[#D4FF00] block mb-1">Pytanie do weryfikacji</span>
                  <p className="text-sm font-medium text-[#D4FF00]/90">Który język ma dziś większy wpływ na decyzję klienta - język problemów czy język kategorii produktowych?</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case '02':
        return (
          <motion.div
            key="02"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm">
              <ul className="space-y-6">
                {[
                  "Jak chcecie, żeby klient rozumiał relację między BetterWorkplace, DailyFruits i pozostałymi bytami za rok?",
                  "Które byty mają być pełnoprawnymi markami, a które bardziej produktami lub liniami oferty?",
                  "Czy DailyFruits ma dalej być postrzegany głównie jako „owoce do biura”, czy jako szersza oferta dla workplace?",
                  "Kto dziś realnie odpowiada za spójność komunikacji między tymi bytami?",
                  "Jakie decyzje brandingowe i architektoniczne są już zamknięte, a co nadal pozostaje otwarte?"
                ].map((q, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-[#D4FF00] font-display font-bold mt-1 opacity-80">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-lg text-white/90">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      case '05':
        return (
          <motion.div
            key="05"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm mb-6">
              <h3 className="text-xl font-bold text-white/90 mb-2">Możliwe napięcia architektoniczne</h3>
              <p className="text-sm text-white/60">
                To nie są wnioski - to obszary, które warto wspólnie zweryfikować. Każdy z nich może być świadomą decyzją albo niedomknięciem.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Napięcie 1 */}
              <div className="p-8 border border-[#9b51e0]/30 border-l-[3px] border-l-[#9b51e0] bg-white/[0.02] rounded-sm hover:bg-white/[0.04] transition-colors">
                <span className="inline-block px-2 py-1 bg-[#9b51e0]/10 text-[#9b51e0] text-[9px] font-display uppercase tracking-widest rounded-sm font-bold mb-4">Hipoteza robocza</span>
                <h4 className="text-base font-bold text-white/90 mb-3 leading-snug">Architektura oferty może nie odpowiadać architekturze marek</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  To, co realnie dostarczacie (funkcja), i to, jak komunikujecie (marki), mogą pracować na różnych logikach. To jest obszar decyzji, który warto zmapować.
                </p>
              </div>

              {/* Napięcie 2 */}
              <div className="p-8 border border-[#9b51e0]/30 border-l-[3px] border-l-[#9b51e0] bg-white/[0.02] rounded-sm hover:bg-white/[0.04] transition-colors">
                <span className="inline-block px-2 py-1 bg-[#9b51e0]/10 text-[#9b51e0] text-[9px] font-display uppercase tracking-widest rounded-sm font-bold mb-4">Hipoteza robocza</span>
                <h4 className="text-base font-bold text-white/90 mb-3 leading-snug">Skala może wymagać uproszczenia struktury</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  Przy targecie 120 MPLN i ekspansji - każdy dodatkowy byt to dodatkowy koszt komunikacji, onboardingu i sprzedaży. To może sugerować potrzebę konsolidacji, ale wymaga potwierdzenia.
                </p>
              </div>

              {/* Napięcie 3 */}
              <div className="p-8 border border-[#9b51e0]/30 border-l-[3px] border-l-[#9b51e0] bg-white/[0.02] rounded-sm hover:bg-white/[0.04] transition-colors">
                <span className="inline-block px-2 py-1 bg-[#9b51e0]/10 text-[#9b51e0] text-[9px] font-display uppercase tracking-widest rounded-sm font-bold mb-4">Hipoteza robocza</span>
                <h4 className="text-base font-bold text-white/90 mb-3 leading-snug">TeamBudget - produkt, feature czy osobna marka?</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  TeamBudget funkcjonuje jako narzędzie / capability w ekosystemie, ale nie jest jasne, jaką rolę ma pełnić docelowo. Czy to samodzielna marka z własnym pozycjonowaniem, feature wewnątrz jednego z bytów, czy raczej warstwa platformowa pod spodem? Od tej decyzji zależy, jak go komunikować i gdzie umieścić w architekturze.
                </p>
              </div>

              {/* Napięcie 4 */}
              <div className="p-8 border border-[#9b51e0]/30 border-l-[3px] border-l-[#9b51e0] bg-white/[0.02] rounded-sm hover:bg-white/[0.04] transition-colors">
                <span className="inline-block px-2 py-1 bg-[#9b51e0]/10 text-[#9b51e0] text-[9px] font-display uppercase tracking-widest rounded-sm font-bold mb-4">Hipoteza robocza</span>
                <h4 className="text-base font-bold text-white/90 mb-3 leading-snug">Dwie ścieżki klienta, jedna strona</h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  HR szuka benefitów, Office Manager szuka zaopatrzenia kuchni - na ten moment wygląda, że obie persony trafiają w jedno miejsce. To może powodować rozmycie przekazu.
                </p>
              </div>
            </div>

            {/* Alternatywny podział (ze screena z tabelą) */}
            <div className="mt-8 p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm">
              <div className="mb-8">
                <h4 className="text-lg font-bold text-white/90 mb-2">Hipoteza alternatywna: Podział według osi decyzyjnych</h4>
                <p className="text-sm text-white/60">
                  Zamiast komunikować wyłącznie produkty, być może kategoryzacja powinna odzwierciedlać logikę nabywcy.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <span className="text-[10px] font-display uppercase tracking-widest text-white/40 border-b border-white/10 pb-2 block w-full">Według potrzeby</span>
                  <ul className="space-y-3">
                    <li className="text-sm font-bold text-white/80">Wyższy standard</li>
                    <li className="text-sm font-bold text-white/80">Optymalizacja budżetu</li>
                    <li className="text-sm font-bold text-white/80">Redukcja marnotrawstwa</li>
                    <li className="text-sm font-bold text-white/80">Oszczędność czasu</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-display uppercase tracking-widest text-white/40 border-b border-white/10 pb-2 block w-full">Według roli</span>
                  <ul className="space-y-3">
                    <li className="text-sm font-bold text-white/80">Kierownik biura</li>
                    <li className="text-sm font-bold text-white/80">Lider środowiska pracy</li>
                    <li className="text-sm font-bold text-white/80">Dział zakupów</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-display uppercase tracking-widest text-white/40 border-b border-white/10 pb-2 block w-full">Według skali</span>
                  <ul className="space-y-3">
                    <li className="text-sm font-bold text-white/80">Duże przedsiębiorstwa</li>
                    <li className="text-sm font-bold text-white/80">Firmy w fazie wzrostu</li>
                    <li className="text-sm font-bold text-white/80">Start-upy</li>
                  </ul>
                </div>
              </div>
            </div>

          </motion.div>
        );
      case '04':
        return (
          <motion.div
            key="04"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-sm relative overflow-hidden mb-12">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#D4FF00]"></div>
              
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-[#D4FF00]/10 text-[#D4FF00] text-[10px] font-display uppercase tracking-widest rounded-sm mb-4">
                  Pozycjonowanie kategorii
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">
                  BetterWorkplace jako trzeci filar benefitów pracowniczych
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-4xl">
                  Dziś w Polsce istnieją dwie ustalone kategorie benefitów: sportowe i zdrowotne. Nie istnieje jeszcze kategoria „benefitów żywieniowych” - a BetterWorkplace ma szansę ją zdefiniować i zdominować.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 border border-white/10 bg-white/5 rounded-sm text-center flex flex-col items-center">
                  <div className="text-[#D4FF00] mb-4">
                    <Activity className="w-8 h-8" />
                  </div>
                  <h4 className="text-white/90 font-bold mb-2">Benefity sportowe</h4>
                  <p className="text-xs text-white/50 mb-6">Multisport, FitProfit, OK System</p>
                  <div className="mt-auto pt-4 w-full border-t border-white/5">
                    <span className="text-[10px] text-white/40">Kategoria zdefiniowana ✓</span>
                  </div>
                </div>

                <div className="p-6 border border-white/10 bg-white/5 rounded-sm text-center flex flex-col items-center">
                  <div className="text-[#D4FF00] mb-4">
                    <HeartPulse className="w-8 h-8" />
                  </div>
                  <h4 className="text-white/90 font-bold mb-2">Benefity zdrowotne</h4>
                  <p className="text-xs text-white/50 mb-6">Medicover, Luxmed, Enel-Med</p>
                  <div className="mt-auto pt-4 w-full border-t border-white/5">
                    <span className="text-[10px] text-white/40">Kategoria zdefiniowana ✓</span>
                  </div>
                </div>

                <div className="p-6 border border-[#D4FF00]/30 bg-[#D4FF00]/5 rounded-sm text-center flex flex-col items-center shadow-[0_0_30px_rgba(212,255,0,0.05)] relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#D4FF00]"></div>
                  <div className="text-[#D4FF00] mb-4">
                    <Apple className="w-8 h-8" />
                  </div>
                  <h4 className="text-white/90 font-bold mb-2">Benefity żywieniowe</h4>
                  <p className="text-xs text-white/50 mb-6 font-medium">BetterWorkplace</p>
                  <div className="mt-auto pt-4 w-full border-t border-[#D4FF00]/20">
                    <span className="text-[10px] text-[#D4FF00]/80 font-bold">Kategoria do zdefiniowania →</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                <p className="text-sm text-white/70 leading-relaxed">
                  <strong className="text-white">Dlaczego to zmienia optykę:</strong> Multisport nie porównuje się z siłowniami - Multisport <em className="text-white/90 not-italic">jest kategorią</em>. Medicover nie porównuje się z klinikami - Medicover <em className="text-white/90 not-italic">jest kategorią</em>. Jeśli BW zdefiniuje „benefity żywieniowe” jako trzeci filar - przestaje konkurować z dostawcami owoców czy firmami cateringowymi i zaczyna grać na poziomie Multisport i Medicover. To jest inna rozmowa sprzedażowa, inny budżet, inny decydent.
                </p>
              </div>
            </div>

            <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm mb-6 mt-8">
              <h3 className="text-xl font-bold text-white/90 mb-2">Widzimy dwa możliwe kierunki porządkowania ekosystemu</h3>
              <p className="text-sm text-white/60">Oba mają swoją logikę - i oba wymagają weryfikacji z Waszą perspektywą.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Model A */}
              <div className="flex flex-col border border-[#D4FF00]/30 bg-white/[0.02] rounded-sm overflow-hidden">
                <div className="p-8 pb-6 border-b border-white/5 flex-grow">
                  <h4 className="text-xl font-bold text-white mb-2">Model A: Większa integracja</h4>
                  <p className="text-sm text-[#D4FF00]/90 mb-6 font-medium">Jeden parasol, wspólna logika, spójna komunikacja</p>
                  
                  <ul className="space-y-4 mb-8">
                    {["Jedna marka-matka", "Wspólna nawigacja", "Uproszczony onboarding", "Lżejsza sprzedaż"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]"></div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    Obecne byty stają się liniami oferty pod wspólnym dachem. Klient widzi jednego dostawcę z wieloma usługami.
                  </p>
                  <div className="p-4 bg-white/5 rounded-sm">
                    <p className="text-xs text-white/50 italic">Robocze przykłady (do weryfikacji): np. rodzina „Better___” lub inna logika parasola. TeamBudget staje się funkcjonalnością platformy, nie osobną marką.</p>
                  </div>
                </div>

                <div className="p-8 pt-6 bg-white/[0.01]">
                  <span className="text-[10px] font-display uppercase tracking-widest text-[#D4FF00]/70 block mb-6">Kto tak działa na rynku</span>
                  
                  <div className="space-y-6">
                    <div>
                      <a href="https://craftydelivers.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 mb-1 hover:text-[#D4FF00] transition-colors group">
                        Crafty <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-[#D4FF00]/70 transition-colors" />
                      </a>
                      <p className="text-xs text-white/40 mb-2">USA · B2B workplace · $100M+ revenue</p>
                      <p className="text-xs text-white/60 mb-3">Zaczynali od owoców i kawy, dziś jedna platforma: Food & Beverage → Equipment → Service → Platform. Klient nie widzi marek - widzi kategorie potrzeb pod jednym dachem.</p>
                      <span className="inline-block px-2 py-1 bg-[#D4FF00]/10 text-[#D4FF00] text-[10px] rounded-sm font-medium">Jeden brand → nawigacja kategoriami</span>
                    </div>
                    <div>
                      <a href="https://garten.co" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 mb-1 hover:text-[#D4FF00] transition-colors group">
                        garten <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-[#D4FF00]/70 transition-colors" />
                      </a>
                      <p className="text-xs text-white/40 mb-2">DACH · office food ecosystem · rebrand 2023</p>
                      <p className="text-xs text-white/60 mb-3">Skonsolidowali 3 oddzielne marki (catering, vending, coffee) w jeden ekosystem „garten”. Rebrand z „office canteen"��� na „good food ecosystem”. Jeden język, jedna strona, jedna sprzedaż.</p>
                      <span className="inline-block px-2 py-1 bg-[#D4FF00]/10 text-[#D4FF00] text-[10px] rounded-sm font-medium">3 marki → 1 ekosystem</span>
                    </div>
                    <div>
                      <a href="https://officedrop.co.uk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 mb-1 hover:text-[#D4FF00] transition-colors group">
                        Officedrop <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-[#D4FF00]/70 transition-colors" />
                      </a>
                      <p className="text-xs text-white/40 mb-2">PL · office supply platform</p>
                      <p className="text-xs text-white/60 mb-3">Przejście z „dostawcy owoców do biura” na pełną platformę zaopatrzenia biurowego. Jedna marka, jeden onboarding, rozszerzanie kategorii pod jednym parasolem.</p>
                      <span className="inline-block px-2 py-1 bg-[#D4FF00]/10 text-[#D4FF00] text-[10px] rounded-sm font-medium">Dostawca → platforma</span>
                    </div>
                    <div>
                      <a href="https://edensprings.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 mb-1 hover:text-[#D4FF00] transition-colors group">
                        Eden Springs <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-[#D4FF00]/70 transition-colors" />
                      </a>
                      <p className="text-xs text-white/40 mb-2">EU · workplace hydration & coffee</p>
                      <p className="text-xs text-white/60 mb-3">Eden Springs, Eden Red, Eden - wspólny parasol „Eden�� w każdej nazwie. Klient widzi jedną rodzinę z kategoriami (woda, kawa, dystrybutory). Endorsement przez naming daje spójność.</p>
                      <span className="inline-block px-2 py-1 bg-[#D4FF00]/10 text-[#D4FF00] text-[10px] rounded-sm font-medium">Endorsed brand → rodzina pod jednym naming</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Model B */}
              <div className="flex flex-col border border-[#9b51e0]/30 bg-white/[0.02] rounded-sm overflow-hidden">
                <div className="p-8 pb-6 border-b border-white/5 flex-grow">
                  <h4 className="text-xl font-bold text-white mb-2">Model B: Większa niezależność</h4>
                  <p className="text-sm text-[#9b51e0]/90 mb-6 font-medium">Oddzielne marki, wspólna platforma w tle</p>
                  
                  <ul className="space-y-4 mb-8">
                    {["Silne sub-brandy", "Osobne pozycjonowanie", "Elastyczność kategorii", "Więcej do zarządzania"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#9b51e0]"></div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    Marki zachowują autonomię i własną tożsamość. BetterWorkplace pełni rolę holding / endorsement w tle.
                  </p>
                  <div className="p-4 bg-white/5 rounded-sm">
                    <p className="text-xs text-white/50 italic">Robocze przykłady (do weryfikacji): np. DF, nowa marka office, TeamBudget jako samodzielne narzędzie z własnym pozycjonowaniem.</p>
                  </div>
                </div>

                <div className="p-8 pt-6 bg-white/[0.01]">
                  <span className="text-[10px] font-display uppercase tracking-widest text-[#9b51e0]/70 block mb-6">Kto tak działa na rynku</span>
                  
                  <div className="space-y-6">
                    <div>
                      <a href="https://www.benefitsystems.pl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 mb-1 hover:text-[#9b51e0] transition-colors group">
                        Benefit Systems <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-[#9b51e0]/70 transition-colors" />
                      </a>
                      <p className="text-xs text-white/40 mb-2">PL · benefity pracownicze · 2.8 mld PLN revenue</p>
                      <p className="text-xs text-white/60 mb-3">Multisport, MyBenefit, FitSport, Bene - każda marka z osobnym pozycjonowaniem i segmentem. Benefit Systems jako holding niewidoczny dla użytkownika końcowego. Klient „kupuje Multisport”, nie „kupuje Benefit Systems”.</p>
                      <span className="inline-block px-2 py-1 bg-[#9b51e0]/10 text-[#9b51e0] text-[10px] rounded-sm font-medium">Holding w tle → silne sub-brandy per segment</span>
                    </div>
                    <div>
                      <a href="https://www.luxmed.pl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 mb-1 hover:text-[#9b51e0] transition-colors group">
                        Lux Med / Bupa <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-[#9b51e0]/70 transition-colors" />
                      </a>
                      <p className="text-xs text-white/40 mb-2">PL/Global · opieka zdrowotna · Bupa £16B, LM #1 w PL</p>
                      <p className="text-xs text-white/60 mb-3">Luxmed, Dental Medicine, Medycyna Rodzinna, CM Medica - każda marka działa z własną tożsamością per segment (korporacje, rodziny, stomatologia). Klient widzi konkretną markę, nie holding.</p>
                      <span className="inline-block px-2 py-1 bg-[#9b51e0]/10 text-[#9b51e0] text-[10px] rounded-sm font-medium">Osobne marki per potrzebę klienta</span>
                    </div>
                    <div>
                      <a href="https://www.fruitfuloffice.co.uk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-white/90 mb-1 hover:text-[#9b51e0] transition-colors group">
                        Fruitful Office / Convini <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-[#9b51e0]/70 transition-colors" />
                      </a>
                      <p className="text-xs text-white/40 mb-2">UK/SE · workplace food & micro-markets</p>
                      <p className="text-xs text-white/60 mb-3">Fruitful Office (fruit delivery, UK) i Convini (unattended micro-markets, Skandynawia) - operują jako osobne, wyspecjalizowane marki w workplace food, nie konsolidując pod jeden parasol. Każda marka = jedna jasna obietnica.</p>
                      <span className="inline-block px-2 py-1 bg-[#9b51e0]/10 text-[#9b51e0] text-[10px] rounded-sm font-medium">Wyspecjalizowana marka → jedna jasna obietnica</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border border-white/10 rounded-sm bg-white/[0.02] overflow-x-auto mt-8">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="py-4 px-6 text-[10px] font-display uppercase tracking-widest text-white/50 w-1/3">Wymiar</th>
                    <th className="py-4 px-6 text-[10px] font-display uppercase tracking-widest text-[#D4FF00]/80 w-1/3">Model A: Integracja</th>
                    <th className="py-4 px-6 text-[10px] font-display uppercase tracking-widest text-white/50 w-1/3">Model B: Niezależność</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-6 font-bold text-white/90">Klarowność dla klienta</td>
                    <td className="py-4 px-6 text-white/70">Wyższa - jedna historia</td>
                    <td className="py-4 px-6 text-white/70">Zależy od wykonania</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-6 font-bold text-white/90">Koszt komunikacji</td>
                    <td className="py-4 px-6 text-white/70">Niższy - jeden język</td>
                    <td className="py-4 px-6 text-white/70">Wyższy - wiele narracji</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-6 font-bold text-white/90">Elastyczność kategorii</td>
                    <td className="py-4 px-6 text-white/70">Ograniczona przez parasol</td>
                    <td className="py-4 px-6 text-white/70">Wysoka - osobne marki</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-6 font-bold text-white/90">Skalowalność sprzedaży</td>
                    <td className="py-4 px-6 text-white/70">Łatwiejszy cross-sell</td>
                    <td className="py-4 px-6 text-white/70">Wymaga koordynacji</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 px-6 font-bold text-white/90">Złożoność zarządzania</td>
                    <td className="py-4 px-6 text-white/70">Niższa</td>
                    <td className="py-4 px-6 text-white/70">Wyższa</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-bold text-[#D4FF00]/80">Kto tak robi</td>
                    <td className="py-4 px-6 text-[#D4FF00]/80">Crafty, garten, Eden Springs</td>
                    <td className="py-4 px-6 text-[#9b51e0]/80">Benefit Systems, Lux Med</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12 p-1 relative rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4FF00]/20 via-[#9b51e0]/10 to-transparent"></div>
              <div className="absolute inset-0 border-2 border-[#D4FF00]/30 rounded-lg"></div>
              <div className="relative bg-[#050505]/80 backdrop-blur-xl p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full bg-[#D4FF00] flex items-center justify-center shadow-[0_0_30px_rgba(212,255,0,0.3)]">
                    <MessageSquare className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Kluczowe pytania do weryfikacji</h3>
                    <p className="text-sm text-[#D4FF00]/80 font-medium">Obszary wymagające wspólnej decyzji na dzisiejszym spotkaniu</p>
                  </div>
                </div>

                <ul className="grid md:grid-cols-2 gap-4">
                  {[
                    "Czy największym wyzwaniem jest dziś dla Was brak spójnej logiki całego ekosystemu?",
                    "Celujecie w model silnie zintegrowany, czy raczej w architekturę niezależnych marek?",
                    "Jaka ma być docelowa, strategiczna rola DailyFruits w nowym układzie?",
                    "Na jakim etapie jesteście z pracami nad brandingiem i co jest już przesądzone?",
                    "Jak w praktyce wygląda dziś Wasz proces zakupowy i finalizacja sprzedaży?",
                    "Kto wewnętrznie odpowiada za spójność wizji i podejmuje ostateczne decyzje?",
                    "Po czym realnie poznacie, że nowy model działa i przynosi efekty?"
                  ].map((q, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (idx * 0.1), duration: 0.5, ease: "easeOut" }}
                      className={`flex gap-4 p-5 bg-white/[0.03] border border-white/10 rounded-sm hover:border-[#D4FF00]/30 hover:bg-white/[0.05] transition-all group ${idx === 6 ? 'md:col-span-2' : ''}`}
                    >
                      <span className="text-[#D4FF00] font-display font-bold text-lg opacity-80 group-hover:opacity-100 transition-opacity mt-0.5">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-white/90 text-sm leading-relaxed">{q}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        );
      case '06':
        return (
          <motion.div
            key="06"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
             <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm">
                <h3 className="text-xl font-bold text-white/90 mb-3">Co trzeba doprecyzować</h3>
                <p className="text-sm text-white/60 mb-8 pb-6 border-b border-white/10">
                  Do przejścia na kolejny etap potrzebujemy kilku informacji i decyzji z Waszej strony.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="p-6 bg-white/[0.02] border border-white/[0.05] border-l-[3px] border-l-[#D4FF00] rounded-sm hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-bold text-white/90 mb-3">Rola poszczególnych bytów</h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Które z obecnych marek / bytów mają być pełnoprawnymi markami, a które raczej liniami oferty lub produktami?
                    </p>
                  </div>

                  <div className="p-6 bg-white/[0.02] border border-white/[0.05] border-l-[3px] border-l-[#D4FF00] rounded-sm hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-bold text-white/90 mb-3">Decyzje już zamknięte</h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Które decyzje (nazwy, domeny, struktura) są już zamknięte, a co jest jeszcze otwarte i do wypracowania?
                    </p>
                  </div>

                  <div className="p-6 bg-white/[0.02] border border-white/[0.05] border-l-[3px] border-l-[#D4FF00] rounded-sm hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-bold text-white/90 mb-3">Priorytety biznesowe</h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Co jest priorytetem na najbliższe 6-12 miesięcy - sprzedaż nowych klientów, konsolidacja, rebranding, nowe kategorie?
                    </p>
                  </div>

                  <div className="p-6 bg-white/[0.02] border border-white/[0.05] border-l-[3px] border-l-[#D4FF00] rounded-sm hover:bg-white/[0.04] transition-colors">
                    <h4 className="text-base font-bold text-white/90 mb-3">Dane do analizy</h4>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Struktura przychodów per byt, customer journey map (jeśli istnieje), obecne materiały sprzedażowe i pitch deck.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-8 bg-white/[0.02] border border-white/[0.05] border-l-[3px] border-l-[#D4FF00] rounded-sm">
                  <h4 className="text-lg font-bold text-[#D4FF00] mb-3">Mapa usług - stan dziś vs. plan na 12 miesięcy</h4>
                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    Żeby dobrze zaprojektować architekturę, potrzebujemy pełnej listy usług i produktów, które firma planuje oferować za rok - nie tylko tych, które oferuje dziś. Bez tego projektujemy strukturę pod obecny stan, a nie pod docelowy.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-[#D4FF00]/5 rounded-sm">
                      <span className="inline-block px-2 py-1 bg-[#D4FF00]/10 text-[#D4FF00] text-[9px] font-display uppercase tracking-widest rounded-sm font-bold mb-3">Dziś</span>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Jakie usługi i produkty realnie dostarczacie? Które generują przychód, a które są w fazie pilotażu?
                      </p>
                    </div>
                    
                    <div className="p-6 bg-[#9b51e0]/5 rounded-sm">
                      <span className="inline-block px-2 py-1 bg-[#9b51e0]/10 text-[#9b51e0] text-[9px] font-display uppercase tracking-widest rounded-sm font-bold mb-3">Za 12 miesięcy</span>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Co planujecie uruchomić? Które kategorie chcecie rozszerzyć? Czy wchodzą nowe segmenty, rynki, modele?
                      </p>
                    </div>
                  </div>
                </div>
             </div>
          </motion.div>
        );
      case '07':
        return (
          <motion.div
            key="07"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
             <div className="p-8 border border-[#D4FF00]/20 bg-[#D4FF00]/[0.02] rounded-sm">
                <p className="text-lg text-white/90 font-medium leading-relaxed mb-8">
                  Na bazie dzisiejszej rozmowy doprecyzuję mapę ekosystemu, role bytów i obszary otwarte. Do kolejnego kroku potrzebuję jeszcze kilku danych i potwierdzenia kluczowych decyzji po Waszej stronie. Wtedy wrócę z frameworkiem, który będzie dobrą podstawą do zamknięcia zakresu i wyceny.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-sm">
                    <span className="text-[#D4FF00] font-bold mt-0.5">1.</span>
                    <div>
                      <p className="text-white/90 font-medium mb-1">Potwierdzamy zrozumienie problemu</p>
                      <p className="text-sm text-white/50">Weryfikujemy, czy wnioski ze spotkania odzwierciedlają stan faktyczny.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-sm">
                    <span className="text-[#D4FF00] font-bold mt-0.5">2.</span>
                    <div>
                      <p className="text-white/90 font-medium mb-1">Zbieramy brakujące dane i decyzje otwarte</p>
                      <p className="text-sm text-white/50">Uzgadniamy kwestie z sekcji "Do doprecyzowania".</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-white/5 border border-white/10 rounded-sm">
                    <span className="text-[#D4FF00] font-bold mt-0.5">3.</span>
                    <div>
                      <p className="text-white/90 font-medium mb-1">Wracamy z frameworkiem i zakresem</p>
                      <p className="text-sm text-white/50">Przedstawiamy konkretny plan działania i wycenę opartą o wybrany model.</p>
                    </div>
                  </div>
                </div>
             </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    toast.info("Trwa generowanie pliku PDF...", {
      description: "Może to potrwać kilka sekund."
    });

    // Dajemy Reactowi chwilę na wpięcie widoku PDF do drzewa DOM
    setTimeout(async () => {
      try {
        const element = document.getElementById("pdf-export-container");
        if (!element) throw new Error("Nie znaleziono zawartości do eksportu.");

        const canvas = await html2canvas(element, {
          scale: 2,
          backgroundColor: "#0A0A0A",
          useCORS: true,
          logging: false,
          windowWidth: 1200, // wymuszamy szerokość okna dla canvasu
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4"
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        let heightLeft = pdfHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();

        while (heightLeft > 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
          heightLeft -= pdf.internal.pageSize.getHeight();
        }

        pdf.save(`r352-podsumowanie-17-03.pdf`);

        toast.success("Gotowe!", {
          description: "Plik PDF został pomyślnie pobrany."
        });
      } catch (error) {
        console.error(error);
        toast.error("Wystąpił błąd", {
          description: "Nie udało się wygenerować pliku PDF."
        });
      } finally {
        setIsGeneratingPdf(false);
      }
    }, 1200); // Wydłużamy czas do 1.2s, żeby wszystkie animacje opadły
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div id="pdf-content" className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left Column: Navigation / Tabs */}
          <div className="w-full lg:w-1/3 flex flex-col">
            <Reveal>
              <div className="mb-12">
                <Link href="/limitedaccess5" data-html2canvas-ignore className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-widest text-white/40 hover:text-[#D4FF00] transition-colors mb-8">
                  <ChevronRight className="w-3 h-3 rotate-180" /> BetterWorkplace Oferta
                </Link>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-white mb-4">
                  Rozmowa diagnostyczna
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm text-white/40 font-display uppercase tracking-widest">
                    17 Marca 2026
                  </p>
                  
                  <button 
                    onClick={handleDownloadPDF}
                    data-html2canvas-ignore
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 rounded-sm text-[10px] font-display uppercase tracking-widest w-fit"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Pobierz PDF
                  </button>
                </div>
              </div>

              {/* Tabs Menu */}
              <div className="flex flex-col gap-2">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-4 w-full text-left px-5 py-4 rounded-sm transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00]' 
                          : 'bg-white/[0.02] border border-white/5 text-white/60 hover:bg-white/[0.05] hover:text-white/90'
                      }`}
                    >
                      <span className="text-[10px] font-display font-bold opacity-70 w-4">{tab.id}</span>
                      <span className="text-sm font-medium">{tab.title}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Content Area */}
          <div className="w-full lg:w-2/3">
            <Reveal delay={0.2}>
              <div className="min-h-[500px]">
                <AnimatePresence mode="wait">
                  {renderTabContent()}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Ukryty widok do eksportu PDF (zawiera od razu całą treść dokumentu) */}
        {isGeneratingPdf && (
          <div className="absolute top-[-99999px] left-0 pointer-events-none opacity-0">
            <div id="pdf-export-container" className="w-[1200px] bg-[#050505] text-white p-24 font-sans border-8 border-[#050505]">
              
              {/* Header raportu PDF */}
              <div className="mb-24 border-b border-white/10 pb-16 flex justify-between items-end">
                <div>
                  <p className="text-[#D4FF00] font-display uppercase tracking-[0.2em] text-sm mb-6 font-bold">r352</p>
                  <h1 className="text-5xl font-bold tracking-tight text-white mb-4">Rozmowa diagnostyczna</h1>
                  <p className="text-2xl text-white/50">Podsumowanie, wnioski i następne kroki</p>
                </div>
                <div className="text-right border-r-2 border-[#D4FF00] pr-6">
                  <p className="text-white/80 font-display uppercase tracking-widest text-sm mb-3 font-semibold">Klient: BetterWorkplace</p>
                  <p className="text-white/50 font-display uppercase tracking-widest text-sm">Data: 17 Marca 2026</p>
                </div>
              </div>

              {/* Treść sekcji - renderujemy je jedna po drugiej */}
              <div className="space-y-32">
                {TABS.map((tab) => (
                  <div key={tab.id} className="pdf-section pb-12 border-b border-white/5 last:border-b-0">
                    <div className="flex items-center gap-6 mb-12">
                      <div className="w-12 h-12 rounded-full border border-[#D4FF00]/30 bg-[#D4FF00]/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-[#D4FF00]">{tab.id}</span>
                      </div>
                      <h2 className="text-3xl font-display uppercase tracking-[0.1em] text-white/90 font-bold">{tab.title}</h2>
                    </div>
                    
                    <div className="pdf-content-wrapper pl-[72px]">
                      {renderTabContent(tab.id)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stopka raportu */}
              <div className="mt-32 pt-12 border-t border-white/10 flex justify-between items-center">
                <p className="text-[#D4FF00] font-display uppercase tracking-[0.2em] text-xs font-bold">Agencja r352</p>
                <p className="text-white/30 font-display uppercase tracking-[0.2em] text-xs">Raport Poufny</p>
              </div>

            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
