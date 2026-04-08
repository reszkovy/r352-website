import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, FileText, Beaker, Layers, LineChart, Target, Rocket, Download, Zap } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const TABS = [
  { id: 'WSTEP', title: 'Wstęp', icon: FileText },
  { id: 'F0', title: 'Faza 0: Onboarding', icon: Target },
  { id: 'F1', title: 'Faza 1: Strategia', icon: Beaker },
  { id: 'F2', title: 'Faza 2.1: Delivery', icon: Layers },
  { id: 'F2_2', title: 'Faza 2.2: Wsparcie w trakcie delivery', icon: Zap },
  { id: 'F3', title: 'Faza 3: Wsparcie operacyjne', icon: Rocket },
  { id: 'SUM', title: 'Podsumowanie inwestycji', icon: LineChart },
];

export function LimitedAccess5Pricing() {
  const lenis = useLenis();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    toast.info("Trwa generowanie pliku PDF...", {
      description: "Może to potrwać kilka sekund."
    });

    setTimeout(async () => {
      try {
        const element = document.getElementById("pdf-export-container");
        if (!element) throw new Error("Nie znaleziono zawartości do eksportu.");

        const canvas = await html2canvas(element, {
          scale: 2,
          backgroundColor: "#0A0A0A",
          useCORS: true,
          logging: false,
          windowWidth: 1200,
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

        pdf.save(`r352-wycena-betterworkplace-2026.pdf`);

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
    }, 1200);
  };

  const renderTabContent = (currentTab = activeTab) => {
    switch (currentTab) {
      case 'WSTEP':
        return (
          <motion.div key="WSTEP" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-8 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
              <span className="inline-block px-5 py-2 bg-white/[0.05] border border-white/20 text-white text-[10px] font-bold font-display uppercase tracking-widest rounded-full">WSTĘP</span>
            </div>
            
            <div className="p-8 border border-white/10 bg-white/[0.02] rounded-sm space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">BetterWorkplace – Plan współpracy 2026</h3>
                <p className="text-sm text-white/50 tracking-wide">
                  Marzec – Grudzień 2026 · delivery gotowe przed sezonem · wysoki sezon = wrzesień–grudzień
                </p>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                W grudniu 2026 BetterWorkplace wchodzi w nowy rok z gotowym ekosystemem marek — spójną strategią, brandingami, playbookami i zespołem, który potrafi z nich korzystać samodzielnie. To nie jest projekt agencji zakończony PDF-em. To dziewięć miesięcy partnerstwa, w którym strategia, produkcja i operacje budowane są razem w czasie rzeczywistym.
              </p>
              <div className="p-6 bg-white/[0.03] border border-white/10 rounded-sm">
                <p className="text-sm text-white/90 font-medium mb-4">Nasza współpraca dzieli się na 4 ściśle połączone obszary:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#D4FF00] mt-0.5">•</span>
                    <p className="text-sm text-white/70"><strong className="text-white">Strategia</strong> — wyznaczenie kierunku, architektury i przekazu dla całego ekosystemu.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#9b51e0] mt-0.5">•</span>
                    <p className="text-sm text-white/70"><strong className="text-white">Budowa materiałów (delivery)</strong> — tworzenie brandingów, playbooków i narzędzi na podstawie wypracowanej strategii.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#f39c12] mt-0.5">•</span>
                    <p className="text-sm text-white/70"><strong className="text-white">Ongoingowe wsparcie</strong> — zabezpieczenie bieżących kampanii w trakcie trwania wdrażania zmian, aby biznes działał płynnie.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#e67e22] mt-0.5">•</span>
                    <p className="text-sm text-white/70"><strong className="text-white">Wsparcie operacyjne</strong> — partnerstwo na start sezonu po wdrożeniu zmian, zapewniające spójność w krytycznym dla was momencie (Q4).</p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        );
      case 'SUM':
        return (
          <motion.div key="SUM" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-8">
            <div>
              <h3 className="text-[10px] font-display uppercase tracking-widest text-white/40 mb-6">STRUKTURA WSPÓŁPRACY</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                 <div className="p-6 bg-white/[0.02] border border-[#D4FF00]/10 rounded-sm">
                    <p className="text-[10px] font-display uppercase tracking-widest text-[#D4FF00]/80 mb-2">STRATEGIA • FAZA 1</p>
                    <p className="text-3xl font-bold text-white mb-2">20 – 24k</p>
                    <p className="text-sm text-white/50">2 miesiące • marzec–kwiecień</p>
                 </div>
                 <div className="p-6 bg-[#9b51e0]/5 border border-[#9b51e0]/20 rounded-sm">
                    <p className="text-[10px] font-display uppercase tracking-widest text-[#9b51e0]/80 mb-2">DELIVERY • FAZA 2.1</p>
                    <p className="text-3xl font-bold text-[#9b51e0] mb-2">30 – 46k</p>
                    <p className="text-sm text-white/50">5 miesięcy • kwiecień–sierpień</p>
                 </div>
                 <div className="p-6 bg-[#f39c12]/5 border border-[#f39c12]/20 rounded-sm">
                    <p className="text-[10px] font-display uppercase tracking-widest text-[#f39c12]/80 mb-2">WSPARCIE W TRAKCIE DELIVERY • FAZA 2.2</p>
                    <p className="text-3xl font-bold text-[#f39c12] mb-2">15 – 25k</p>
                    <p className="text-sm text-white/50">5 miesięcy • kwiecień–sierpień • ~3–5k / mc</p>
                 </div>
                 <div className="p-6 bg-[#D4FF00]/10 border border-[#D4FF00]/30 rounded-sm">
                    <p className="text-[10px] font-display uppercase tracking-widest text-[#D4FF00] mb-2">WSPARCIE OPERACYJNE • FAZA 3</p>
                    <p className="text-3xl font-bold text-[#D4FF00] mb-2">27 – 42k</p>
                    <p className="text-sm text-[#D4FF00]/70">4 miesiące • wrzesień–grudzień • ~6.7–10.5k / mc</p>
                 </div>
              </div>

              <div className="p-10 bg-[#050505] border border-white/10 rounded-sm flex flex-col md:flex-row justify-between md:items-center mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none"></div>
                <div className="relative z-10">
                  <p className="text-sm text-white/60 mb-2">BetterWorkplace • marzec — grudzień 2026 • 10 miesięcy współpracy</p>
                  <p className="text-2xl font-bold text-white">Łącznie</p>
                </div>
                <div className="text-left md:text-right relative z-10 mt-6 md:mt-0">
                  <p className="text-5xl font-bold text-white tracking-tight mb-2">92 — 137k</p>
                  <p className="text-xs font-display uppercase tracking-widest text-white/40 mb-3">PLN netto</p>
                  <div className="inline-flex items-center px-4 py-1.5 bg-white/5 border border-white/10 rounded-full whitespace-nowrap">
                    <p className="text-xs font-display uppercase tracking-widest text-[#D4FF00]">Średni koszt miesięczny: ~9.2 — 13.7k</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-6 border border-white/10 bg-white/[0.02] rounded-sm">
                   <p className="text-[10px] font-display uppercase tracking-widest text-white/60 mb-3 font-bold">ZAKRES A WYCENA</p>
                   <p className="text-sm text-white/60 leading-relaxed">Podane widełki dotyczą standardowego zakresu miesięcznego. Jeśli w danym miesiącu pojawi się znacząco większa liczba zadań – np. potrzeby związane z produktem TeamBudget lub intensywna kampania – wycena jest ustalana indywidualnie.</p>
                </div>
                <div className="p-6 border border-white/10 bg-white/[0.02] rounded-sm">
                   <p className="text-[10px] font-display uppercase tracking-widest text-white/60 mb-3 font-bold">PODEJŚCIE PARTNERSKIE</p>
                   <p className="text-sm text-white/60 leading-relaxed">Współpraca opiera się na elastyczności. Jeśli w jednym miesiącu zakres jest mniejszy, niewykorzystany potencjał można przesunąć na kolejny okres – bez utraty wartości i bez sztywnego rozliczania każdej godziny.</p>
                </div>
              </div>
              <div className="p-6 border border-white/10 bg-white/[0.02] rounded-sm">
                 <p className="text-[10px] font-display uppercase tracking-widest text-white/60 mb-3 font-bold">WYCENA ZALEŻY OD LICZBY PODMIOTÓW I GŁĘBOKOŚCI PODEJŚCIA</p>
                 <p className="text-sm text-white/60 leading-relaxed">Podane kwoty są szacunkowe i w dużym stopniu uzależnione od tego, ile finalnie będzie podmiotów w ekosystemie oraz jak głęboko będziemy wchodzić w każdą markę. Inne nakłady wymagać będzie marka, która potrzebuje pełnej identyfikacji wizualnej od zera, a inne taka, która wymaga jedynie systematyzacji i playbooka. Ostateczne widełki zostaną doprecyzowane po zamknięciu Fazy 1, gdy zakres będzie wiążący.</p>
              </div>
            </div>
          </motion.div>
        );
      case 'F0':
        return (
          <motion.div key="F0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-6">
            <div className="p-6 bg-[#D4FF00]/5 border-l-[3px] border-[#D4FF00] rounded-sm mb-10">
               <p className="text-sm text-white/80 leading-relaxed">
                 <strong className="text-white">Ważna informacja dotycząca zakresu Fazy 2 i ongoing.</strong> Przedstawiony plan delivery stanowi wstępną hipotezę roboczą opartą na aktualnym rozumieniu potrzeb. Wiążący zakres działań produkcyjnych zostanie ustalony dopiero po wypracowaniu i zatwierdzeniu finalnej strategii w Fazie 1. Szczegóły, priorytety i podział pracy pomiędzy miesiącami zapewne ulegną zmianie – to naturalny efekt procesu strategicznego.
               </p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
              <span className="inline-block px-5 py-2 bg-[#0A0A0A] border border-white/20 text-white text-[10px] font-bold font-display uppercase tracking-widest rounded-full">FAZA 0 - ONBOARDING & DISCOVERY</span>
            </div>

            <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-[#0A0A0A]">0</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Kickoff & audit</h3>
                    <p className="text-sm text-white/50">Marzec 2026 – pierwsze 2 tygodnie</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">w cenie</p>
                  <p className="text-xs text-white/40 mt-1">wliczone w msc 1</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-white/50 font-bold whitespace-nowrap">FAZA 0 • ONBOARDING</p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {["Kick-off projektu", "Audit ekosystemu marek", "Mapa usług – stan dziś", "Diagnoza napięć architektonicznych", "Analiza komunikacji vs. oferty"].map((item, i) => (
                     <span key={i} className="px-3 py-1.5 bg-white/[0.05] rounded-md text-sm text-white/80">{item}</span>
                   ))}
                 </div>
              </div>
            </div>
          </motion.div>
        );
      case 'F1':
        return (
          <motion.div key="F1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-8 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
              <span className="inline-block px-5 py-2 bg-[#D4FF00] text-[#0A0A0A] text-[10px] font-bold font-display uppercase tracking-widest rounded-full">FAZA 1 - STRATEGIA</span>
            </div>

            <div className="p-8 border border-[#D4FF00]/10 bg-white/[0.02] rounded-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-[#0A0A0A]">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Architektura marki</h3>
                    <p className="text-sm text-white/50">Marzec 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#D4FF00]">10 – 12k</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-display mt-1">PLN netto</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-[#D4FF00]/80 font-bold whitespace-nowrap">STRATEGIA – DELIVERABLES</p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-3">
                   {["01 · Brand Architecture Map", "02 · Ecosystem Role Cards", "03 · Narrative & Messaging Framework", "07 · Brand personality & visual direction"].map((item, i) => (
                     <span key={i} className="px-3 py-1.5 bg-[#D4FF00]/15 rounded-md text-sm text-[#D4FF00] font-medium">{item}</span>
                   ))}
                 </div>
                 <div className="flex flex-col gap-2 mt-4">
                   <div className="flex items-start gap-4 p-4 border border-[#D4FF00]/10 border-l-[3px] border-l-[#D4FF00] rounded-sm bg-[#D4FF00]/[0.02]">
                     <span className="px-2 py-1 bg-[#D4FF00] text-[#0A0A0A] text-[9px] font-bold tracking-widest uppercase rounded-sm mt-0.5 shrink-0">Współpraca</span>
                     <p className="text-sm text-white/70">Konsultacje i analiza wniosków zespołu – dopracowanie strategii względem oczekiwań stakeholderów</p>
                   </div>
                 </div>
              </div>
            </div>

            <div className="p-8 border border-[#D4FF00]/10 bg-white/[0.02] rounded-sm mb-8">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#D4FF00] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-[#0A0A0A]">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Komunikacja & roadmap</h3>
                    <p className="text-sm text-white/50">Marzec / Kwiecień 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#D4FF00]">10 – 12k</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-display mt-1">PLN netto</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-[#D4FF00]/80 font-bold whitespace-nowrap">STRATEGIA – DELIVERABLES</p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-3">
                   {["04 · Communication Matrix", "05 · Ecosystem Journey Map", "06 · Implementation Roadmap", "08 · Pozycjonowanie zewnętrzne vs. rynek", "09 · Naming review & spójność ekosystemu"].map((item, i) => (
                     <span key={i} className="px-3 py-1.5 bg-[#D4FF00]/15 rounded-md text-sm text-[#D4FF00] font-medium">{item}</span>
                   ))}
                 </div>
                 <div className="flex flex-col gap-2 mt-4">
                   <div className="flex items-start gap-4 p-4 border border-[#D4FF00]/10 border-l-[3px] border-l-[#D4FF00] rounded-sm bg-[#D4FF00]/[0.02]">
                     <span className="px-2 py-1 bg-[#D4FF00] text-[#0A0A0A] text-[9px] font-bold tracking-widest uppercase rounded-sm mt-0.5 shrink-0">Współpraca</span>
                     <p className="text-sm text-white/70">Podsumowanie strategii w formie prezentacji dla stakeholderów</p>
                   </div>
                 </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
              <span className="inline-flex items-center gap-2 px-6 py-2 bg-[#D4FF00] text-[#0A0A0A] text-[10px] font-bold font-display uppercase tracking-widest rounded-full">
                <span>✓</span> STRATEGIA ZAMKNIĘTA – KONIEC KWIETNIA
              </span>
            </div>
          </motion.div>
        );
      case 'F2_2':
        return (
          <motion.div key="F2_2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-8 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
              <span className="inline-block px-5 py-2 bg-[#f39c12] text-[#0A0A0A] text-[10px] font-bold font-display uppercase tracking-widest rounded-full">FAZA 2.2 - WSPARCIE W TRAKCIE DELIVERY</span>
            </div>
            
            <div className="p-6 bg-[#f39c12]/10 border-l-[3px] border-[#f39c12] rounded-sm mb-8">
               <p className="text-sm text-white/80 leading-relaxed">
                 <strong className="text-[#f39c12] mr-2">Wsparcie w trakcie Fazy Delivery:</strong>
                 Równolegle do prac nad nowymi brandingami i procesami, zabezpieczamy bieżące działania operacyjne w oparciu o wypracowaną strategię. Zespół zyskuje pełne wsparcie w kampaniach bez wstrzymywania pracy.
               </p>
            </div>

            <div className="p-8 border border-[#f39c12]/20 bg-white/[0.02] rounded-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#f39c12] flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Bieżąca produkcja i kampanie</h3>
                    <p className="text-sm text-white/50">Kwiecień – Sierpień 2026 (5 miesięcy)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#f39c12]">15 – 25k</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-display mt-1">Łącznie (PLN netto)</p>
                  <p className="text-xs text-[#f39c12]/80 mt-1">~3 – 5k / mc</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-[#f39c12]/80 font-bold whitespace-nowrap">WSPARCIE RÓWNOLEGŁE – ZAKRES</p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {["Materiały social media", "Kreacje reklamowe (ads)", "Bieżące adaptacje", "Wsparcie kampanii komunikacyjnych", "Doraźne potrzeby operacyjne"].map((item, i) => (
                     <span key={i} className="px-3 py-1.5 bg-[#f39c12]/15 rounded-md text-sm text-[#f39c12]">{item}</span>
                   ))}
                 </div>
              </div>
            </div>
          </motion.div>
        );
      case 'F2':
        return (
          <motion.div key="F2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-8 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
              <span className="inline-block px-5 py-2 bg-[#9b51e0] text-white text-[10px] font-bold font-display uppercase tracking-widest rounded-full">FAZA 2.1 - DELIVERY</span>
            </div>

            <div className="p-6 bg-[#9b51e0]/10 border-l-[3px] border-[#9b51e0] rounded-sm mb-8 space-y-2">
               <p className="text-sm text-white/80 leading-relaxed">
                 <strong className="text-[#9b51e0] mr-2">Estymowany zakres dla całego portfolio:</strong>
                 Poniższe etapy to hipoteza produkcyjna. Ostateczny backlog (w tym m.in. proporcje między BetterWorkplace, DailyFruits czy TeamBudget) zostanie precyzyjnie zamknięty pod koniec Fazy 1.
               </p>
            </div>

            {/* Karta 3 */}
            <div className="p-8 border border-[#9b51e0]/20 bg-white/[0.02] rounded-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#9b51e0] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-white">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Budowa brandingów & playbooków</h3>
                    <p className="text-sm text-white/50">Kwiecień / Maj 2026, wynikowo ze strategii</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#9b51e0]">12 – 18k</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-display mt-1">PLN netto</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-[#9b51e0]/80 font-bold whitespace-nowrap">POTENCJALNE ELEMENTY DELIVERY <span className="text-[#9b51e0]/50 font-normal lowercase tracking-normal">(do potwierdzenia w Fazie 1)</span></p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {["Tone of Voice guidelines per marka", "Visual identity system (logo, kolory, typografia)", "Brand playbook – zasady stosowania", "Naming & messaging architecture", "Przykłady komunikacji (do/nie do)", "+ ostateczny backlog po strategii"].map((item, i) => (
                     <span key={i} className={`px-3 py-1.5 rounded-md text-sm ${item.startsWith('+') ? 'bg-white/[0.05] text-white/70 border border-white/10' : 'bg-[#9b51e0]/20 text-[#d8b4fe]'}`}>{item}</span>
                   ))}
                 </div>
                 <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm mb-4">
                   <p className="text-xs text-white/60"><strong className="text-white/80">Marki:</strong> BetterWorkplace · DailyFruits · TeamBudget · BetterOffice</p>
                 </div>
                 <div className="p-4 border border-dashed border-[#9b51e0]/30 rounded-sm bg-[#9b51e0]/[0.02]">
                   <p className="text-xs text-white/60 leading-relaxed"><strong className="text-[#9b51e0]/80">Uwaga dot. wyceny:</strong> widełki zależą od stanu zasobów każdej marki. Marka z istniejącą identyfikacją wymaga systematyzacji i playbooka. Marka budowana od zera to pełen zakres identity — wycena ustalana indywidualnie po Fazie 2.1.</p>
                 </div>
              </div>
            </div>

            {/* Karta 4 */}
            <div className="p-8 border border-[#9b51e0]/20 bg-white/[0.02] rounded-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#9b51e0] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-white">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Materiały digital</h3>
                    <p className="text-sm text-white/50">Maj – Czerwiec 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#9b51e0]">10 – 14k</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-display mt-1">PLN netto</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-[#9b51e0]/80 font-bold whitespace-nowrap">POTENCJALNE NARZĘDZIA OPERACYJNE <span className="text-[#9b51e0]/50 font-normal lowercase tracking-normal">(do potwierdzenia w Fazie 1)</span></p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {["Content templates (social, email, prezentacje)", "Brief standaryzacja + workflow contentu", "Social media kit + szablony formatów", "Asset library – struktura i pliki źródłowe", "Materiały digital per priorytetowa marka", "+ ostateczny backlog po strategii"].map((item, i) => (
                     <span key={i} className={`px-3 py-1.5 rounded-md text-sm ${item.startsWith('+') ? 'bg-white/[0.05] text-white/70 border border-white/10' : 'bg-[#9b51e0]/20 text-[#d8b4fe]'}`}>{item}</span>
                   ))}
                 </div>
                 <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                   <p className="text-xs text-white/60"><strong className="text-white/80">Marki:</strong> BetterWorkplace · DailyFruits · pozostałe wg. priorytetu z Fazy 2.1</p>
                 </div>
              </div>
            </div>

            {/* Karta 5 */}
            <div className="p-8 border border-[#9b51e0]/20 bg-white/[0.02] rounded-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#9b51e0] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-white">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Materiały sprzedażowe</h3>
                    <p className="text-sm text-white/50">Lipiec – Sierpień 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#9b51e0]">8 – 14k</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-display mt-1">PLN netto</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-[#9b51e0]/80 font-bold whitespace-nowrap">POTENCJALNE MATERIAŁY <span className="text-[#9b51e0]/50 font-normal lowercase tracking-normal">(do potwierdzenia w Fazie 1)</span></p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {["Pitch deck (nowy) + one-pagery per marka", "Praktyczny playbook pracy dla zespołu", "QA przegląd – wersje finalne wszystkich materiałów", "Sesja handoff + przekazanie narzędzi", "Onboarding pack – jak to stosować na co dzień", "+ ostateczny backlog po strategii"].map((item, i) => (
                     <span key={i} className={`px-3 py-1.5 rounded-md text-sm ${item.startsWith('+') ? 'bg-white/[0.05] text-white/70 border border-white/10' : 'bg-[#9b51e0]/20 text-[#d8b4fe]'}`}>{item}</span>
                   ))}
                 </div>
                 <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                   <p className="text-xs text-white/60"><strong className="text-white/80">Marki:</strong> BetterWorkplace · DailyFruits · pozostałe wg. priorytetu z Fazy 2.1</p>
                 </div>
              </div>
            </div>
          </motion.div>
        );
      case 'F3':
        return (
          <motion.div key="F3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-8 before:h-px before:flex-1 before:bg-white/10 after:h-px after:flex-1 after:bg-white/10">
              <span className="inline-block px-5 py-2 bg-[#e67e22] text-[#0A0A0A] text-[10px] font-bold font-display uppercase tracking-widest rounded-full">FAZA 3 - WSPARCIE OPERACYJNE (WRZESIEŃ–GRUDZIEŃ)</span>
            </div>

            <div className="p-6 bg-[#e67e22]/10 border-l-[3px] border-[#e67e22] rounded-sm mb-10">
               <p className="text-sm text-white/80 leading-relaxed">
                 Cały branding, playbooki i materiały gotowe przed sezonem. Faza 2 przechodzi w tryb <strong className="text-[#e67e22]">partnera operacyjnego</strong> – dbamy o spójność ekosystemu, reagujemy na potrzeby i zapewniamy, że wysoki sezon przebiega zgodnie z wypracowaną strategią.
               </p>
            </div>

            {/* Karta 6 */}
            <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#10b981] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-[#0A0A0A]">6</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Wsparcie operacyjne – start sezonu</h3>
                    <p className="text-sm text-white/50">Wrzesień 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#10b981]">6 – 10k</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-display mt-1">PLN netto</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-[#10b981]/80 font-bold whitespace-nowrap">ONGOING • WYSOKI SEZON</p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {["Wdrożenie materiałów sezonowych", "Brand consistency review", "Adaptacje do nowych formatów", "Konsultacje on-demand"].map((item, i) => (
                     <span key={i} className="px-3 py-1.5 bg-[#10b981]/20 rounded-md text-sm text-[#10b981]">{item}</span>
                   ))}
                 </div>
                 <div className="p-4 bg-[#10b981]/[0.03] border border-[#10b981]/10 rounded-sm">
                   <p className="text-xs text-white/60"><strong className="text-[#10b981]/80 mr-1">Wsparcie wszystkich wypracowanych marek:</strong> BetterWorkplace · DailyFruits · TeamBudget · BetterOffice</p>
                 </div>
              </div>
            </div>

            {/* Karta 7 */}
            <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#10b981] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-[#0A0A0A]">7</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Design ops + doradztwo</h3>
                    <p className="text-sm text-white/50">Październik 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#10b981]">6 – 10k</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-display mt-1">PLN netto</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-[#10b981]/80 font-bold whitespace-nowrap">ONGOING • WYSOKI SEZON</p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {["Bieżące kreacje i materiały", "Brand consistency review", "Konsultacja strategiczna (1-2×)", "Nowe formaty jeśli potrzeba"].map((item, i) => (
                     <span key={i} className="px-3 py-1.5 bg-[#10b981]/20 rounded-md text-sm text-[#10b981]">{item}</span>
                   ))}
                 </div>
                 <div className="p-4 bg-[#10b981]/[0.03] border border-[#10b981]/10 rounded-sm">
                   <p className="text-xs text-white/60"><strong className="text-[#10b981]/80 mr-1">Wsparcie wszystkich wypracowanych marek:</strong> BetterWorkplace · DailyFruits · TeamBudget · BetterOffice</p>
                 </div>
              </div>
            </div>

            {/* Karta 8 */}
            <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#10b981] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-[#0A0A0A]">8</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Paczki świąteczne + Q4</h3>
                    <p className="text-sm text-white/50">Listopad 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#10b981]">9 – 12k</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-display mt-1">PLN netto</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-[#10b981]/80 font-bold whitespace-nowrap">ONGOING • PACZKI ŚWIĄTECZNE</p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {["Identyfikacja i materiały paczek świątecznych", "Kampania Q4 – kreacje i formaty", "Wsparcie przy komunikacji sezonowej", "Brand consistency review"].map((item, i) => (
                     <span key={i} className="px-3 py-1.5 bg-[#10b981]/20 rounded-md text-sm text-[#10b981]">{item}</span>
                   ))}
                 </div>
                 <div className="p-4 bg-[#10b981]/[0.03] border border-[#10b981]/10 rounded-sm">
                   <p className="text-xs text-white/60"><strong className="text-[#10b981]/80 mr-1">Wsparcie wszystkich wypracowanych marek:</strong> BetterWorkplace · DailyFruits · TeamBudget · BetterOffice</p>
                 </div>
              </div>
            </div>

            {/* Karta 9 */}
            <div className="p-8 border border-white/[0.08] bg-white/[0.02] rounded-sm">
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-[#10b981] flex items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-[#0A0A0A]">9</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Zamknięcie roku + plan 2027</h3>
                    <p className="text-sm text-white/50">Grudzień 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#10b981]">6 – 10k</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-display mt-1">PLN netto</p>
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-6">
                 <div className="flex items-center gap-4 mb-4">
                   <p className="text-[10px] font-display uppercase tracking-widest text-[#10b981]/80 font-bold whitespace-nowrap">ONGOING • ZAMKNIĘCIE</p>
                   <div className="h-px flex-1 bg-white/10"></div>
                 </div>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {["Podsumowanie roku – brand audit", "Co działało, co wymaga korekty", "Rekomendacje na 2027", "Rozmowa o przedłużeniu współpracy"].map((item, i) => (
                     <span key={i} className="px-3 py-1.5 bg-[#10b981]/20 rounded-md text-sm text-[#10b981]">{item}</span>
                   ))}
                 </div>
                 <div className="p-4 bg-[#10b981]/[0.03] border border-[#10b981]/10 rounded-sm">
                   <p className="text-xs text-white/60"><strong className="text-[#10b981]/80 mr-1">Wsparcie wszystkich wypracowanych marek:</strong> BetterWorkplace · DailyFruits · TeamBudget · BetterOffice</p>
                 </div>
              </div>
            </div>

          </motion.div>
        );
      default:
        return null;
    }
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
                  Wycena & Plan pracy
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm text-white/40 font-display uppercase tracking-widest">
                    Projekt: BetterWorkplace
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
                      <Icon className="w-4 h-4 opacity-70" />
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

        {/* Ukryty widok do eksportu PDF */}
        {isGeneratingPdf && (
          <div className="absolute top-[-99999px] left-0 pointer-events-none opacity-0">
            <div id="pdf-export-container" className="w-[1200px] bg-[#050505] text-white p-24 font-sans border-8 border-[#050505]">
              
              {/* Header raportu PDF */}
              <div className="mb-24 border-b border-white/10 pb-16 flex justify-between items-end">
                <div>
                  <p className="text-[#D4FF00] font-display uppercase tracking-[0.2em] text-sm mb-6 font-bold">r352</p>
                  <h1 className="text-5xl font-bold tracking-tight text-white mb-4">Wycena i Plan Prac 2026</h1>
                  <p className="text-2xl text-white/50">Estymacja budżetowa i zakres faz</p>
                </div>
                <div className="text-right border-r-2 border-[#D4FF00] pr-6">
                  <p className="text-white/80 font-display uppercase tracking-widest text-sm mb-3 font-semibold">Klient: BetterWorkplace</p>
                  <p className="text-white/50 font-display uppercase tracking-widest text-sm">Data: 17 Marca 2026</p>
                </div>
              </div>

              {/* Treść sekcji PDF */}
              <div className="space-y-32">
                {TABS.map((tab) => (
                  <div key={tab.id} className="pdf-section pb-12 border-b border-white/5 last:border-b-0 break-inside-avoid">
                    <div className="flex items-center gap-6 mb-12">
                      <div className="w-12 h-12 rounded-full border border-[#D4FF00]/30 bg-[#D4FF00]/10 flex items-center justify-center">
                        <tab.icon className="w-5 h-5 text-[#D4FF00]" />
                      </div>
                      <h2 className="text-3xl font-display uppercase tracking-[0.1em] text-white/90 font-bold">{tab.title}</h2>
                    </div>
                    
                    <div className="pdf-content-wrapper pl-[72px]">
                      {renderTabContent(tab.id)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stopka raportu PDF */}
              <div className="mt-32 pt-12 border-t border-white/10 flex justify-between items-center">
                <p className="text-[#D4FF00] font-display uppercase tracking-[0.2em] text-xs font-bold">Agencja r352</p>
                <p className="text-white/30 font-display uppercase tracking-[0.2em] text-xs">Dokument poufny</p>
              </div>

            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}