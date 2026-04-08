import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { motion } from "motion/react";
import {
  Lock, Eye, EyeOff, ArrowRight, Download, Loader2,
  ChevronDown, Mail, Building2, MapPin, Layers, Briefcase, ChevronRight, Trello, ExternalLink, Figma
} from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useCallback } from "react";
import { useLenis } from "lenis/react";
import { jsPDF } from "jspdf";

// ─── Data ────────────────────────────────────────────────────────────────────

type DeliverableItem = {
  num: string;
  name: string;
  desc: string;
  details: string[];
};

const deliverables: DeliverableItem[] = [
  {
    num: "01",
    name: "Brand Architecture Map",
    desc: "Wizualna hierarchia ekosystemu",
    details: [
      "Kto jest marką, produktem, usługą",
      "Relacje i endorsement logic",
      "Struktura master brand / sub-brands"
    ]
  },
  {
    num: "02",
    name: "Ecosystem Role Cards",
    desc: "Per byt: rola, obietnica, terytorium",
    details: [
      "Rola biznesowa i w ekosystemie",
      "Audience i value proposition",
      "Messaging territory, differentiation"
    ]
  },
  {
    num: "03",
    name: "Narrative & Messaging Framework",
    desc: "Narracja dla całego ekosystemu",
    details: [
      "Core narrative i hierarchia przekazów",
      "Key message territories",
      "Tone / style principles, do's & don'ts"
    ]
  },
  {
    num: "04",
    name: "Communication Matrix",
    desc: "Matryca: byt × audience × przekaz",
    details: [
      "Role kanałów i priorytety",
      "Cele biznesowe i KPI",
      "Jedno źródło prawdy"
    ]
  },
  {
    num: "05",
    name: "Ecosystem Journey Map",
    desc: "Logika ścieżek i wsparcia",
    details: [
      "Ścieżki przejścia między bytami",
      "Customer journey, cross-sell / upsell",
      "Synergie komunikacyjne"
    ]
  },
  {
    num: "06",
    name: "Implementation Roadmap",
    desc: "Konkretne kroki i timeline",
    details: [
      "Priorytety wdrożenia (quick wins)",
      "Ownership i odpowiedzialności",
      "Kamienie milowe i kolejność"
    ]
  }
];

type BrandItem = {
  name: string;
  type: string;
  color: string;
  desc: string;
};

const brands: BrandItem[] = [
  { name: "BetterWorkplace", type: "Master brand / parasol", color: "#FF6B35", desc: "Główna marka, pod którą funkcjonują wszystkie produkty i usługi" },
  { name: "DailyFruits", type: "Revenue driver / owoce + food", color: "#22C55E", desc: "Główny produkt generujący przychody - dostawa owoców i żywności" },
  { name: "Mała Palarnia", type: "Kawa / craft brand", color: "#A16207", desc: "Brand premium - kawa rzemieślnicza dla biur" },
  { name: "TeamBudget", type: "Nowy produkt cyfrowy", color: "#3B82F6", desc: "Aplikacja do zarządzania budżetem team-buildingowym" },
  { name: "Sendgift", type: "Paczki świąteczne", color: "#666666", desc: "Usługa wysyłki prezentów firmowych (do ustalenia)" },
  { name: "Dobre Krafty", type: "Produkty rzemieślnicze", color: "#666666", desc: "Produkty rzemieślnicze (do doprecyzowania)" }
];

const timeline = [
  { week: "Tydzień 1 (11.03 - 17.03)", task: "Pytania doprecyzowujące + Audit ekosystemu", deliverable: "Brief i dostęp do materiałów" },
  { week: "Tydzień 2 (17.03 - 24.03)", task: "Brand Architecture & Role Cards draft", deliverable: "Pierwsza wersja do feedbacku" },
  { week: "Tydzień 3 (25.03 - 31.03)", task: "Narrative, Matrix & Journey Map", deliverable: "2 rundy poprawek na fundamenty" },
  { week: "Tydzień 4 (01.04 - 02.04)", task: "Implementation Roadmap + Prezentacja", deliverable: "Wszystkie 6 deliverables gotowe" }
];

const meetings = [
  { name: "Wstępny Kick-off", when: "Zrealizowany", what: "Omówienie problemów. W przyszłym tygodniu wrócę z dodatkowymi pytaniami." },
  { name: "Q&A + Wstępny koncept", when: "W przyszłym tyg. (~1h)", what: "Rozwianie wątpliwości, pytania i omówienie wstępnego konceptu" },
  { name: "Mid-point Check-in", when: "25.03 (1h)", what: "Feedback na Brand Architecture i Role Cards" },
  { name: "Final Presentation", when: "02.04 (1.5h)", what: "Prezentacja wszystkich deliverables + Q&A" }
];

const phases = [
  {
    phase: "FAZA 1",
    title: "Fundamenty: Architektura i Matryca",
    desc: "Rozpoczynamy od uporządkowania całego ekosystemu w spójną strukturę. Chcemy precyzyjnie zdefiniować role poszczególnych marek, ich wzajemne relacje oraz optymalne synergie. Dzięki temu zbudujemy trwały fundament pod wszystkie przyszłe działania i wdrożenia.",
    footer: "Zakładany termin: do 2 kwietnia"
  },
  {
    phase: "FAZA 2",
    title: "System i Narzędzia dla Zespołu",
    desc: "Opierając się na wypracowanych fundamentach, tworzymy kompleksowy system operacyjny. Opracujemy wytyczne komunikacyjne (Tone of Voice) oraz praktyczne playbooki, które pozwolą Waszemu zespołowi na w pełni samodzielną i skuteczną pracę każdego dnia.",
    footer: "Zakładany kolejny etap: kwiecień-maj"
  },
  {
    phase: "FAZA 3",
    title: "Bieżące Wsparcie (opcja)",
    desc: "Proponujemy również długofalowe partnerstwo w realizacji wyzwań biznesowych. Zapewnimy nadzór nad spójnością komunikacji, planowaniem treści oraz systematycznymi przeglądami. Naszym celem jest aktywne wspieranie strategii w miarę ciągłego rozwoju Waszej organizacji.",
    footer: "Potencjalny start: po zamknięciu Fazy 2 | model do ustalenia"
  }
];

// ─── PDF Export ──────────────────────────────────────────────────────────────

const SW = 1920;
const SH = 1080;
const L = "#D4FF00";
const PAD = 120;
const CW = SW - PAD * 2;

function drawBg(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#08080a";
  ctx.fillRect(0, 0, SW, SH);
  const g1 = ctx.createRadialGradient(0, 0, 0, 0, 0, 900);
  g1.addColorStop(0, "rgba(212,255,0,0.025)");
  g1.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, SW, SH);
  ctx.fillStyle = "rgba(255,255,255,0.018)";
  for (let gx = PAD; gx < SW - PAD; gx += 40) {
    for (let gy = 80; gy < SH - 60; gy += 40) {
      ctx.fillRect(gx, gy, 1, 1);
    }
  }
}

function drawFooter(ctx: CanvasRenderingContext2D, page: number, ttl: number) {
  ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(PAD, SH - 56); ctx.lineTo(SW - PAD, SH - 56); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.font = "bold 11px Arial, sans-serif";
  ctx.letterSpacing = "3px"; ctx.textAlign = "left"; ctx.fillText("R352", PAD, SH - 32); ctx.letterSpacing = "0px";
  ctx.textAlign = "center"; ctx.fillStyle = "rgba(255,255,255,0.07)"; ctx.font = "10px Arial, sans-serif";
  ctx.fillText("POUFNE  |  BETTERWORKPLACE  |  2026", SW / 2, SH - 32);
  ctx.textAlign = "right"; ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "11px Arial, sans-serif";
  ctx.fillText(`${String(page).padStart(2, "0")} / ${String(ttl).padStart(2, "0")}`, SW - PAD, SH - 32);
  ctx.textAlign = "left";
}

function drawTopAccent(ctx: CanvasRenderingContext2D) { ctx.fillStyle = L; ctx.fillRect(0, 0, SW, 3); }

function drawCornerMarks(ctx: CanvasRenderingContext2D) {
  const sz = 16, m = PAD - 24; ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(m, 80); ctx.lineTo(m, 80 - sz); ctx.moveTo(m, 80); ctx.lineTo(m + sz, 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(SW - m, 80); ctx.lineTo(SW - m, 80 - sz); ctx.moveTo(SW - m, 80); ctx.lineTo(SW - m - sz, 80); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(m, SH - 64); ctx.lineTo(m, SH - 64 + sz); ctx.moveTo(m, SH - 64); ctx.lineTo(m + sz, SH - 64); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(SW - m, SH - 64); ctx.lineTo(SW - m, SH - 64 + sz); ctx.moveTo(SW - m, SH - 64); ctx.lineTo(SW - m - sz, SH - 64); ctx.stroke();
}

function drawCard(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, opts?: { highlight?: boolean; topAccent?: boolean }) {
  ctx.fillStyle = opts?.highlight ? "rgba(212,255,0,0.04)" : "rgba(255,255,255,0.03)"; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = opts?.highlight ? L + "25" : "rgba(255,255,255,0.07)"; ctx.lineWidth = 1; ctx.strokeRect(x + .5, y + .5, w - 1, h - 1);
  if (opts?.topAccent) { ctx.fillStyle = L; ctx.fillRect(x, y, w, 2); }
}

function slideHeader(ctx: CanvasRenderingContext2D, num: string, title: string, subtitle?: string): number {
  ctx.fillStyle = L + "18"; ctx.fillRect(PAD, 95, 52, 28);
  ctx.fillStyle = L; ctx.font = "bold 13px Arial, sans-serif"; ctx.textAlign = "center"; ctx.fillText(num, PAD + 26, 114); ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff"; ctx.font = "bold 38px Arial, sans-serif"; ctx.fillText(title, PAD + 68, 118);
  let finalY = 168;
  if (subtitle) {
    ctx.fillStyle = "rgba(255,255,255,0.40)";
    ctx.font = "15px Arial, sans-serif";
    const newY = wrapText(ctx, subtitle, PAD + 70, 148, CW - 100, 24);
    finalY = newY + 20;
  }
  ctx.fillStyle = L + "30"; ctx.fillRect(PAD, finalY, 60, 2);
  return finalY;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lineH: number): number {
  const words = text.split(" ");
  let line = "";
  let ty = y;
  for (const word of words) {
    const test = line + word + " ";
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line.trim(), x, ty);
      line = word + " ";
      ty += lineH;
    } else { line = test; }
  }
  ctx.fillText(line.trim(), x, ty);
  return ty;
}

function generatePdf() {
  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [SW, SH] });
  const canvas = document.createElement("canvas");
  canvas.width = SW;
  canvas.height = SH;
  const ctx = canvas.getContext("2d")!;
  const total = 6;

  const addSlide = (fn: () => void, page: number) => {
    if (page > 1) pdf.addPage([SW, SH], "landscape");
    drawBg(ctx); drawTopAccent(ctx); drawCornerMarks(ctx);
    fn();
    drawFooter(ctx, page, total);
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, SW, SH);
  };

  // 1 - Cover
  addSlide(() => {
    ctx.fillStyle = "rgba(255,255,255,0.015)"; ctx.font = "bold 600px Arial, sans-serif"; ctx.fillText("r", SW - 600, 700);
    ctx.strokeStyle = L + "30"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(SW - 340, 200); ctx.lineTo(SW - 340, 800); ctx.stroke();
    ctx.fillStyle = L; ctx.fillRect(PAD, 320, 4, 460);
    ctx.fillStyle = L + "90"; ctx.font = "bold 12px Arial, sans-serif"; ctx.letterSpacing = "8px";
    ctx.fillText("WSTĘPNA PROPOZYCJA WSPÓŁPRACY", PAD + 30, 390); ctx.letterSpacing = "0px";
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 68px Arial, sans-serif"; ctx.fillText("BetterWorkplace", PAD + 30, 480);
    
    ctx.fillStyle = "rgba(255,255,255,0.50)"; ctx.font = "18px Arial, sans-serif";
    wrapText(ctx, "Zebraliśmy w jednym miejscu wszystko, o czym rozmawialiśmy, i przygotowaliśmy propozycję pierwszych kroków dla BetterWorkplace. Potraktujcie to jako punkt wyjścia - po Waszym feedbacku doprecyzujemy priorytety i przygotujemy finalną wycenę.", PAD + 30, 530, 900, 26);

    ctx.fillStyle = "rgba(255,255,255,0.40)"; ctx.font = "16px Arial, sans-serif";
    ctx.fillText("Dokument roboczy - przygotowany w celu wyrównania założeń, zakresu i oczekiwań przed finalną wyceną.  |  Marzec 2026", PAD + 30, 620);
    
    // Szerszy cel
    ctx.fillStyle = L + "60"; ctx.font = "bold 11px Arial, sans-serif"; ctx.letterSpacing = "2px";
    ctx.fillText("SZERSZY CEL", PAD + 30, 680); ctx.letterSpacing = "0px";
    ctx.fillStyle = "rgba(255,255,255,0.70)"; ctx.font = "16px Arial, sans-serif";
    wrapText(ctx, "Zbudowanie nowej, rozpoznawalnej kategorii benefitów pracowniczych - pozycjonowanej na równi z kartami sportowymi czy prywatną opieką medyczną.", PAD + 30, 710, 900, 24);

    drawCard(ctx, SW - 320, 440, 200, 120);
    ctx.fillStyle = L; ctx.font = "bold 24px Arial, sans-serif"; ctx.fillText("Better", SW - 300, 490);
    ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.font = "14px Arial, sans-serif"; ctx.fillText("Workplace", SW - 300, 520);
    ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.font = "11px Arial, sans-serif"; ctx.fillText("Strategic Partner", SW - 300, 545);
    ctx.fillStyle = "rgba(255,255,255,0.10)"; ctx.font = "bold 13px Arial, sans-serif"; ctx.letterSpacing = "4px";
    ctx.fillText("R352 AGENCY", PAD + 30, 840); ctx.letterSpacing = "0px";
  }, 1);

  // 2 - Ecosystem
  addSlide(() => {
    const finalY = slideHeader(ctx, "01", "Jak widzimy Wasz ekosystem", "Na bazie naszych rozmów zarysowaliśmy wstępny układ sił - główne byty i produkty, które chcemy uporządkować w jedną spójną całość. To punkt wyjścia, który wspólnie dopracujemy w pierwszym etapie prac.");
    
    const tY = finalY + 40;
    ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.fillRect(PAD, tY, CW, 40);
    ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(PAD, tY + 40); ctx.lineTo(PAD + CW, tY + 40); ctx.stroke();
    ctx.font = "bold 10px Arial, sans-serif"; ctx.letterSpacing = "2px";
    ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillText("MARKA / PRODUKT", PAD + 20, tY + 25);
    ctx.fillText("TYP", PAD + 420, tY + 25);
    ctx.fillStyle = L + "70"; ctx.textAlign = "right"; ctx.fillText("OPIS", PAD + CW - 20, tY + 25);
    ctx.textAlign = "left"; ctx.letterSpacing = "0px";

    const rowH = 80;
    brands.forEach((brand, i) => {
      const y = tY + 40 + i * rowH;
      if (i % 2 === 0) { ctx.fillStyle = "rgba(255,255,255,0.015)"; ctx.fillRect(PAD, y, CW, rowH); }
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.beginPath(); ctx.moveTo(PAD, y + rowH); ctx.lineTo(PAD + CW, y + rowH); ctx.stroke();

      ctx.fillStyle = brand.color; ctx.fillRect(PAD + 20, y + 35, 4, 24);
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 18px Arial, sans-serif";
      ctx.fillText(brand.name, PAD + 40, y + 45);
      ctx.fillStyle = "rgba(255,255,255,0.40)"; ctx.font = "14px Arial, sans-serif";
      ctx.fillText(brand.type, PAD + 420, y + 45);
      ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.font = "13px Arial, sans-serif";
      wrapText(ctx, brand.desc, PAD + 940, y + 36, 720, 20);
    });

    ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.font = "italic 13px Arial, sans-serif";
    ctx.fillText("To obecny punkt wyjścia - finalna struktura ról, zależności i sposobu komunikacji będzie dopracowana w pierwszym etapie prac.", PAD, SH - 80);
  }, 2);

  // 3 - Deliverables
  addSlide(() => {
    const finalY = slideHeader(ctx, "02", "Co wspólnie wypracujemy w pierwszej fazie", "Zaprojektowaliśmy zestaw konkretnych materiałów, które pomogą nam zrealizować Wasze cele. Finalny zakres tych działań dopasujemy do Waszych priorytetów, gdy tylko omówimy otwarte kwestie.");
    const cardW = (CW - 60) / 3;
    const cardH = 200;
    let startY = finalY + 40;
    
    deliverables.forEach((del, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = PAD + col * (cardW + 30);
      const y = startY + row * (cardH + 30);
      
      drawCard(ctx, x, y, cardW, cardH, { topAccent: true });
      ctx.fillStyle = L + "20"; ctx.fillRect(x + 24, y + 24, 32, 32);
      ctx.fillStyle = L; ctx.font = "bold 18px Arial, sans-serif"; ctx.textAlign = "center";
      ctx.fillText(del.num, x + 40, y + 48); ctx.textAlign = "left";
      
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 16px Arial, sans-serif";
      wrapText(ctx, del.name, x + 24, y + 86, cardW - 48, 22);
      
      ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.font = "12px Arial, sans-serif";
      wrapText(ctx, del.desc, x + 24, y + 120, cardW - 48, 18);
    });
  }, 3);

  // 4 - Timeline
  addSlide(() => {
    const finalY = slideHeader(ctx, "03", "Jak to zaplanowaliśmy", "Pierwszy etap chcemy zamknąć w około 4 tygodnie. Poniżej rozpisaliśmy, jak krok po kroku chcemy to zrealizować. Szczegóły dopracujemy po starcie.");
    
    const cardW = (CW - 90) / 4;
    const cardH = 260;
    let startY = finalY + 40;
    
    timeline.forEach((week, i) => {
      const x = PAD + i * (cardW + 30);
      drawCard(ctx, x, startY, cardW, cardH, { topAccent: true });
      
      ctx.fillStyle = L + "15"; ctx.font = "bold 120px Arial, sans-serif";
      ctx.fillText(String(i + 1), x + 20, startY + 130);
      
      ctx.fillStyle = "rgba(255,255,255,0.40)"; ctx.font = "12px Arial, sans-serif";
      wrapText(ctx, week.week, x + 24, startY + 160, cardW - 48, 18);
      
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 14px Arial, sans-serif";
      wrapText(ctx, week.task, x + 24, startY + 194, cardW - 48, 20);
      
      ctx.fillStyle = L + "50"; ctx.fillRect(x + 24, startY + 220, 40, 2);
    });
    
    // Meetings
    const meetY = startY + cardH + 40;
    ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.fillRect(PAD, meetY, CW, 40);
    ctx.font = "bold 11px Arial, sans-serif"; ctx.letterSpacing = "2px";
    ctx.fillStyle = L + "70"; ctx.fillText("SPOTKANIA", PAD + 20, meetY + 25); ctx.letterSpacing = "0px";
    
    const meetRowH = 60;
    meetings.forEach((meet, i) => {
      const y = meetY + 40 + i * meetRowH;
      if (i % 2 === 0) { ctx.fillStyle = "rgba(255,255,255,0.015)"; ctx.fillRect(PAD, y, CW, meetRowH); }
      ctx.strokeStyle = "rgba(255,255,255,0.03)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PAD, y); ctx.lineTo(PAD + CW, y); ctx.stroke();
      
      ctx.fillStyle = L + "30"; ctx.fillRect(PAD + 20, y + 26, 4, 4);
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 15px Arial, sans-serif";
      ctx.fillText(meet.name, PAD + 36, y + 30);
      ctx.fillStyle = meet.when === "Zrealizowany" ? "#4ADE80" : "#FACC15"; 
      ctx.font = "13px Arial, sans-serif";
      ctx.fillText(meet.when, PAD + 280, y + 30);
      ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "13px Arial, sans-serif";
      ctx.fillText(meet.what, PAD + 440, y + 30);
    });
  }, 4);

  // 5 - Phases
  addSlide(() => {
    const finalY = slideHeader(ctx, "04", "Nasz pomysł na współpracę w 3 krokach", "Poniżej rozpisaliśmy nasz pomysł na ułożenie projektu. Chcemy najpierw zbudować solidne fundamenty, a dopiero potem zająć się szerszą strategią i wdrożeniem.");
    
    const cardW = CW;
    const cardH = 180;
    const gap = 30;
    let startY = finalY + 40;
    
    phases.forEach((p, i) => {
      const y = startY + i * (cardH + gap);
      drawCard(ctx, PAD, y, cardW, cardH, { topAccent: i === 0, highlight: false });
      
      const tagColor = i === 0 ? "#FF6B35" : (i === 1 ? "#3B82F6" : "#22C55E");
      
      ctx.fillStyle = tagColor + "20";
      ctx.fillRect(PAD + 30, y + 30, 80, 24);
      ctx.fillStyle = tagColor;
      ctx.font = "bold 11px Arial, sans-serif";
      ctx.fillText(p.phase, PAD + 42, y + 46);
      
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 22px Arial, sans-serif";
      ctx.fillText(p.title, PAD + 130, y + 49);
      
      ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "14px Arial, sans-serif";
      wrapText(ctx, p.desc, PAD + 30, y + 90, cardW - 60, 24);
      
      ctx.fillStyle = tagColor; ctx.font = "13px Arial, sans-serif";
      ctx.fillText(p.footer, PAD + 30, y + 160);
    });
  }, 5);

  // 6 - Next Steps
  addSlide(() => {
    const g2 = ctx.createRadialGradient(SW / 2, SH / 2, 0, SW / 2, SH / 2, 600);
    g2.addColorStop(0, "rgba(212,255,0,0.04)"); g2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g2; ctx.fillRect(0, 0, SW, SH);
    ctx.strokeStyle = L + "40"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(SW / 2, 180); ctx.lineTo(SW / 2, 340); ctx.stroke();
    ctx.fillStyle = L; ctx.save(); ctx.translate(SW / 2, 360); ctx.rotate(Math.PI / 4); ctx.fillRect(-5, -5, 10, 10); ctx.restore();
    ctx.textAlign = "center";
    ctx.fillStyle = L + "80"; ctx.font = "bold 12px Arial, sans-serif"; ctx.letterSpacing = "8px";
    ctx.fillText("NASTĘPNY KROK", SW / 2, 420); ctx.letterSpacing = "0px";
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 64px Arial, sans-serif"; ctx.fillText("Kolejne", SW / 2, 500);
    ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.fillText("kroki", SW / 2, 560);
    ctx.fillStyle = "rgba(255,255,255,0.40)"; ctx.font = "18px Arial, sans-serif";
    wrapText(ctx, "Chcemy, żeby ten materiał był dobrym punktem wyjścia do rozmowy. Dajcie nam znać, co o tym myślicie - na tej podstawie doprecyzujemy zakres działań i przygotujemy finalną wycenę.", SW / 2, 620, 800, 26);
    ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.font = "11px Arial, sans-serif";
    ctx.fillText("Dokument poufny - przygotowany wyłącznie dla BetterWorkplace  |  r352 agency 2026", SW / 2, 860);
    ctx.textAlign = "left";
  }, 6);

  pdf.save("r352_BetterWorkplace_Phase1_2026.pdf");
}

// ─── Component ───────────────────────────────────────────────────────────────

function SectionLabel({ number }: { number: string }) {
  return (
    <span className="text-[11px] font-display uppercase tracking-[0.25em] text-[#D4FF00]/35">
      {number}
    </span>
  );
}

export function LimitedAccess5() {
  const lenis = useLenis();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  useEffect(() => {
    if (lenis && unlocked) {
      const timers = [
        setTimeout(() => lenis.resize(), 100),
        setTimeout(() => lenis.resize(), 500),
        setTimeout(() => lenis.resize(), 1500),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [lenis, unlocked]);

  const handleUnlock = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (password.trim() === "BetterW2026") {
        setUnlocked(true);
      } else {
        setError(true);
        setPassword("");
      }
      setLoading(false);
    }, 800);
  }, [password]);

  const handleExport = useCallback(() => {
    setExporting(true);
    setTimeout(() => {
      generatePdf();
      setExporting(false);
    }, 500);
  }, []);

  if (!unlocked) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 flex flex-col justify-center items-center">
          <Reveal>
            <div className="w-full max-w-md mx-auto text-center">
              {/* Lock icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto mb-10 w-20 h-20 border border-white/10 bg-white/[0.02] flex items-center justify-center"
              >
                <Lock className="w-8 h-8 text-[#D4FF00]/60" />
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Limited Access
              </h1>
              <p className="text-white/40 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                Ta strona zawiera poufne szczegóły Twojego projektu. Wprowadź hasło, które otrzymaliście od nas w wiadomości.
              </p>

              <form onSubmit={handleUnlock} className="flex flex-col gap-5 text-left">
                <div className="space-y-2">
                  <label
                    htmlFor="pricing-password"
                    className="text-[11px] font-display uppercase tracking-[0.2em] text-white/30"
                  >
                    Hasło dostępu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="pricing-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError(false);
                      }}
                      className={`w-full bg-white/[0.03] border ${
                        error ? "border-red-500/60" : "border-white/10 focus:border-[#D4FF00]/50"
                      } px-5 py-4 pr-12 text-white text-lg tracking-wider focus:outline-none transition-colors duration-300`}
                      placeholder="••••••••••"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>

                  {/* Error message */}
                  <motion.div
                    initial={false}
                    animate={{ height: error ? "auto" : 0, opacity: error ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-red-400/80 text-sm pt-1">
                      Nieprawidłowe hasło. Spróbuj ponownie.
                    </p>
                  </motion.div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !password}
                  className={`group relative flex items-center justify-center px-8 py-4 overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
                    loading ? "bg-white/10" : "bg-[#D4FF00] hover:bg-[#e0ff33]"
                  } text-black`}
                >
                  <span className="relative z-10 font-display uppercase tracking-[0.2em] text-sm font-bold">
                    {loading ? "Weryfikacja..." : "Uzyskaj dostęp"}
                  </span>
                  {!loading && (
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  )}
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-white/[0.06]">
                <p className="text-white/20 text-xs leading-relaxed">
                  Nie masz hasła? Skontaktuj się z nami, aby uzyskać dostęp do projektu.
                </p>
                <Link href="/" className="inline-block mt-4 text-white/20 hover:text-[#D4FF00]/60 text-xs transition-colors">
                  ← Wróć do strony głównej
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <Reveal>
            <div className="mb-16">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <span className="text-xs font-display uppercase tracking-[0.3em] text-[#D4FF00] block mb-6">Wstępna propozycja współpracy</span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                    BetterWorkplace<br /><span className="text-white/35">Marzec 2026</span>
                  </h1>
                </div>
              </div>
              <p className="text-base md:text-lg text-white/50 mt-6 max-w-2xl leading-relaxed">
                Zebraliśmy w jednym miejscu wszystko, o czym rozmawialiśmy, i przygotowaliśmy propozycję pierwszych kroków dla BetterWorkplace. Potraktujcie to jako punkt wyjścia - po Waszym feedbacku doprecyzujemy priorytety i przygotujemy finalną wycenę.
              </p>
              
              <div className="mt-8 p-6 border-l-2 border-[#D4FF00] bg-white/[0.02] max-w-2xl">
                <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[#D4FF00]/80 block mb-2">Szerszy cel</span>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium">
                  Zbudowanie nowej, rozpoznawalnej kategorii benefitów pracowniczych - pozycjonowanej na równi z kartami sportowymi czy prywatną opieką medyczną.
                </p>
              </div>

              <p className="text-xs text-[#D4FF00]/50 mt-8 uppercase tracking-widest font-display">
                Dokument roboczy - przygotowany w celu wyrównania założeń, zakresu i oczekiwań przed finalną wyceną.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button onClick={handleExport} disabled={exporting} className="group inline-flex items-center gap-3 px-5 py-2.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait">
                  {exporting ? <Loader2 className="w-4 h-4 text-[#D4FF00] animate-spin" /> : <Download className="w-4 h-4 text-[#D4FF00]/60 group-hover:text-[#D4FF00] transition-colors" />}
                  <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors font-display uppercase tracking-[0.15em]">{exporting ? "Generowanie..." : "Pobierz jako Pitch PDF"}</span>
                  <span className="text-[9px] text-white/20 border border-white/10 px-1.5 py-0.5">16:9</span>
                </button>
                <Link href="/limitedaccess5/spotkanie" className="group inline-flex items-center gap-3 px-5 py-2.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                  <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors font-display uppercase tracking-[0.15em]">Materiały ze spotkania</span>
                  <ChevronRight className="w-4 h-4 text-[#D4FF00]/60 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/limitedaccess5/wycena" className="group inline-flex items-center gap-3 px-5 py-2.5 border border-[#D4FF00]/20 bg-[#D4FF00]/5 hover:bg-[#D4FF00]/10 hover:border-[#D4FF00]/40 transition-all duration-300">
                  <span className="text-xs text-[#D4FF00]/80 group-hover:text-[#D4FF00] transition-colors font-display uppercase tracking-[0.15em]">Wycena i Plan Prac</span>
                  <ChevronRight className="w-4 h-4 text-[#D4FF00]/60 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="https://trello.com/b/dKrQKN5I/betterworkplace" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 px-5 py-2.5 border border-[#9b51e0]/20 bg-[#9b51e0]/5 hover:bg-[#9b51e0]/10 hover:border-[#9b51e0]/40 transition-all duration-300">
                  <Trello className="w-4 h-4 text-[#9b51e0]/60 group-hover:text-[#9b51e0] transition-colors" />
                  <span className="text-xs text-[#9b51e0]/80 group-hover:text-[#9b51e0] transition-colors font-display uppercase tracking-[0.15em]">Tablica Trello</span>
                  <ExternalLink className="w-3 h-3 text-[#9b51e0]/60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a href="https://figma.com/design/cmesDIPi8I1DcJHpkHjB7c/Better-Workplace?node-id=1-6&t=E31QFCZeU6wYY4rI-1" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 px-5 py-2.5 border border-[#9b51e0]/20 bg-[#9b51e0]/5 hover:bg-[#9b51e0]/10 hover:border-[#9b51e0]/40 transition-all duration-300">
                  <Figma className="w-4 h-4 text-[#9b51e0]/60 group-hover:text-[#9b51e0] transition-colors" />
                  <span className="text-xs text-[#9b51e0]/80 group-hover:text-[#9b51e0] transition-colors font-display uppercase tracking-[0.15em]">Projekt Figma</span>
                  <ExternalLink className="w-3 h-3 text-[#9b51e0]/60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <span className="text-[10px] text-white/30 hidden lg:inline-block ml-2">Wersja robocza do dalszego omówienia</span>
              </div>
              
              <div className="mt-4">
                <a href="https://r352.vercel.app" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 px-5 py-2.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
                  <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors font-display uppercase tracking-[0.15em]">STRATEGIA (Faza 1)</span>
                  <ExternalLink className="w-3 h-3 text-white/40 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* ═══════════════════ 01 - JAK WIDZIMY WASZ EKOSYSTEM ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <SectionLabel number="01" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 mb-4">
                Jak widzimy Wasz ekosystem
              </h2>
              <p className="text-base text-white/60 mb-10 max-w-3xl leading-relaxed">
                Na bazie naszych rozmów zarysowaliśmy wstępny układ sił - główne byty i produkty, które chcemy uporządkować w jedną spójną całość. To punkt wyjścia, który wspólnie dopracujemy w pierwszym etapie prac.
              </p>

              <div className="border border-white/10 overflow-hidden rounded-sm">
                <div className="grid grid-cols-[1.5fr_1fr_2fr] bg-white/[0.04] border-b border-white/10">
                  <div className="px-6 py-5">
                    <span className="text-xs font-display uppercase tracking-[0.2em] text-white/50 font-semibold">Marka / Produkt</span>
                  </div>
                  <div className="px-6 py-5 border-l border-white/[0.06]">
                    <span className="text-xs font-display uppercase tracking-[0.2em] text-white/50 font-semibold">Typ</span>
                  </div>
                  <div className="px-6 py-5 border-l border-white/[0.06]">
                    <span className="text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00]/70 font-semibold">Opis</span>
                  </div>
                </div>

                {brands.map((brand, i) => (
                  <div key={i} className="grid grid-cols-[1.5fr_1fr_2fr] border-b last:border-b-0 border-white/[0.06] hover:bg-white/[0.03] transition-colors">
                    <div className="px-6 py-5 flex items-center gap-4">
                      <div className="w-1.5 h-6 rounded-full opacity-90" style={{ backgroundColor: brand.color }} />
                      <span className="text-base text-white/90 font-semibold">{brand.name}</span>
                    </div>
                    <div className="px-6 py-5 border-l border-white/[0.06] flex items-center">
                      <span className="text-sm text-white/60">{brand.type}</span>
                    </div>
                    <div className="px-6 py-5 border-l border-white/[0.06] flex items-center">
                      <span className="text-sm text-white/50 leading-relaxed">{brand.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-white/50 mt-6 bg-[#D4FF00]/5 border border-[#D4FF00]/10 rounded-sm p-5 italic">
                To obecny punkt wyjścia - finalna struktura ról, zależności i sposobu komunikacji będzie dopracowana w pierwszym etapie prac.
              </p>
            </section>
          </Reveal>

          {/* ═══════════════════ 02 - CO WSPÓLNIE WYPRACUJEMY ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <SectionLabel number="02" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 mb-4">
                Co wspólnie wypracujemy w pierwszej fazie
              </h2>
              <p className="text-base text-white/60 mb-10 max-w-3xl leading-relaxed">
                Zaprojektowaliśmy zestaw konkretnych materiałów, które pomogą nam zrealizować Wasze cele. Finalny zakres tych działań dopasujemy do Waszych priorytetów, gdy tylko omówimy otwarte kwestie.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliverables.map((del, i) => (
                  <div key={i} className="group p-8 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 rounded-sm">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 shrink-0 border border-[#D4FF00]/30 bg-[#D4FF00]/10 flex items-center justify-center rounded-sm">
                        <span className="text-sm font-bold text-[#D4FF00]">{del.num}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-lg font-bold text-white/90 block mb-2">{del.name}</span>
                        <span className="text-sm text-white/60 block mb-5 leading-relaxed">{del.desc}</span>
                        <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
                          {del.details.map((detail, j) => (
                            <span key={j} className="text-sm text-white/50 leading-relaxed block flex items-start gap-3">
                              <span className="text-[#D4FF00]/50 mt-1 flex-shrink-0">•</span> 
                              <span>{detail}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ═══════════════════ 03 - HARMONOGRAM I SPOTKANIA ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <SectionLabel number="03" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 mb-4">
                Jak to zaplanowaliśmy
              </h2>
              <p className="text-base text-white/60 mb-10 max-w-3xl leading-relaxed">
                Pierwszy etap chcemy zamknąć w około 4 tygodnie. Poniżej rozpisaliśmy, jak krok po kroku chcemy to zrealizować. Szczegóły dopracujemy po starcie.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {timeline.map((week, i) => (
                  <div key={i} className="p-6 border border-white/[0.08] bg-white/[0.02] rounded-sm">
                    <span className="text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00]/70 block mb-3 font-semibold">Tydzień {i + 1}</span>
                    <span className="text-sm text-white/50 block mb-2">{week.week.split(" ")[1]}</span>
                    <span className="text-base font-bold text-white/90 block leading-snug">{week.task}</span>
                  </div>
                ))}
              </div>

              <div className="border border-white/10 overflow-hidden rounded-sm">
                <div className="grid grid-cols-[1fr_1fr_2fr] bg-white/[0.04] border-b border-white/10">
                  <div className="px-6 py-5">
                    <span className="text-xs font-display uppercase tracking-[0.2em] text-white/50 font-semibold">Spotkanie</span>
                  </div>
                  <div className="px-6 py-5 border-l border-white/[0.06]">
                    <span className="text-xs font-display uppercase tracking-[0.2em] text-white/50 font-semibold">Termin</span>
                  </div>
                  <div className="px-6 py-5 border-l border-white/[0.06]">
                    <span className="text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00]/70 font-semibold">Cel</span>
                  </div>
                </div>
                {meetings.map((meet, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_2fr] border-b last:border-b-0 border-white/[0.06] hover:bg-white/[0.03] transition-colors">
                    <div className="px-6 py-5 flex items-center">
                      <span className="text-base text-white/90 font-semibold">{meet.name}</span>
                    </div>
                    <div className="px-6 py-5 border-l border-white/[0.06] flex items-center">
                      <span className={`text-sm font-medium ${meet.when === "Zrealizowany" ? "text-green-400" : "text-yellow-400"}`}>
                        {meet.when}
                      </span>
                    </div>
                    <div className="px-6 py-5 border-l border-white/[0.06] flex items-center">
                      <span className="text-sm text-white/60 leading-relaxed">{meet.what}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ═══════════════════ 04 - FAZY PROJEKTU ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-24">
              <SectionLabel number="04" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-3 mb-4">
                Nasz pomysł na współpracę w 3 krokach
              </h2>
              <p className="text-base text-white/60 mb-10 max-w-3xl leading-relaxed">
                Poniżej rozpisaliśmy nasz pomysł na ułożenie projektu. Chcemy najpierw zbudować solidne fundamenty, a dopiero potem zająć się szerszą strategią i wdrożeniem.
              </p>

              <div className="flex flex-col gap-6">
                {phases.map((p, i) => {
                  const tagColor = i === 0 ? "text-[#FF6B35] bg-[#FF6B35]/10 border-[#FF6B35]/30" : (i === 1 ? "text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30" : "text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30");
                  const textColor = i === 0 ? "text-[#FF6B35]" : (i === 1 ? "text-[#3B82F6]" : "text-[#22C55E]");
                  
                  return (
                    <div key={i} className={`p-8 md:p-10 border bg-white/[0.02] rounded-sm ${i === 0 ? "border-[#D4FF00]/30 shadow-[0_0_30px_rgba(212,255,0,0.03)]" : "border-white/[0.08]"}`}>
                      <div className="flex flex-col md:flex-row md:items-center gap-5 mb-5">
                        <span className={`inline-block px-4 py-1.5 text-xs font-display uppercase tracking-[0.1em] border font-bold ${tagColor}`}>
                          {p.phase}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white/90">
                          {p.title}
                        </h3>
                      </div>
                      <p className="text-base text-white/60 leading-relaxed mb-6 max-w-4xl">
                        {p.desc}
                      </p>
                      <div className={`text-sm font-semibold uppercase tracking-wide ${textColor}`}>
                        {p.footer}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </Reveal>

          {/* ═══════════════════ CTA ═══════════��═══════ */}
          <Reveal delay={0.05}>
            <div className="border-t border-white/[0.06] pt-16 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Kolejne kroki
              </h3>
              <p className="text-white/40 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
                Chcemy, żeby ten materiał był dobrym punktem wyjścia do rozmowy. Dajcie nam znać, co o tym myślicie - na tej podstawie doprecyzujemy zakres działań i przygotujemy finalną wycenę.
              </p>
              <div className="flex flex-col items-center justify-center gap-4">
                <button
                  onClick={handleExport}
                  disabled={exporting}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4FF00] text-black font-display uppercase tracking-[0.2em] text-sm font-bold hover:bg-[#e0ff33] transition-colors duration-300 disabled:opacity-50"
                >
                  {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Pobierz materiał
                </button>
                <span className="text-[10px] text-white/30 font-display uppercase tracking-wide mt-2">
                  Wersja robocza do dalszego omówienia
                </span>
              </div>
              <p className="text-white/10 text-xs mt-12">
                Dokument poufny - przygotowany wyłącznie dla BetterWorkplace  |  r352 agency 2026
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </PageTransition>
  );
}