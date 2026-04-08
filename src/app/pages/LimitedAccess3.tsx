import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { motion } from "motion/react";
import {
  Lock, Eye, EyeOff, ArrowRight, Download, Loader2,
  ChevronDown, Mail, Building2, MapPin, Layers
} from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, useCallback } from "react";
import { useLenis } from "lenis/react";
import { jsPDF } from "jspdf";

// ─── Data ────────────────────────────────────────────────────────────────────

type TaskItem = {
  name: string;
  price: number | null; // null = "brak kwoty"
};

const bpTasks: TaskItem[] = [
  { name: "BP: kreacje asap \u2014 paid", price: 1000 },
  { name: "paid \u2014 grafiki \u2014 Bulwar", price: 800 },
  { name: "Grafiki pod slidery \u2014 Bulwar P\u00F3\u0142nocny", price: 200 },
  { name: "BP: Wyklejki na drzwi + banery (pliki produkcyjne)", price: 1600 },
  { name: "Reformaty Digital Motion BP", price: 4000 },
  { name: "Animacja Kinowa + Master 45s + wersje BP", price: 13000 },
  { name: "BP: Wyklejki na drzwi + banery (projekty)", price: 2400 },
  { name: "BP: Pomys\u0142 na 20/80 kreacje", price: 640 },
  { name: "BP: Kreacja wizka", price: 300 },
  { name: "BP: Nowe linie komunikacji x4 (MASTERY)", price: 1000 },
  { name: "Grafiki \u2014 karuzela BP ASAP", price: 500 },
  { name: "PILNY MATERIA\u0141 \u2014 BULWAR P\u00D3\u0141NOCNY", price: 600 },
  { name: "BP: Wizualizacje \u2014 wy\u017Csza rozdzielczo\u015B\u0107", price: 100 },
  { name: "BP: Kreacje paid social na poniedzia\u0142ek", price: 1200 },
  { name: "BP: Karuzela grafik na poniedzia\u0142ek", price: 2500 },
  { name: "BP: Video 6s/10s/15s/30s \u2014 Produkcja", price: 800 },
  { name: "BP: finalne materia\u0142y", price: null },
];

const rpTasks: TaskItem[] = [
  { name: "prezentacja river point (ASAP)", price: 700 },
  { name: "Ulotka River", price: 300 },
  { name: "pliki otwarte do River", price: 100 },
  { name: "Grafiki paid \u2014 RP", price: 900 },
  { name: "River Point, KM5 \u2014 paid grafiki", price: 2200 },
  { name: "RP: Korekty grafik paid KM5", price: 300 },
  { name: "RP: Stille", price: 1200 },
  { name: "RP: Szyb Windowy", price: 500 },
  { name: "RP: Video 6s/10s/15s \u2014 Wst\u0119pnie", price: 4000 },
  { name: "RP: finalne materia\u0142y", price: null },
];

const BP_TOTAL = 30640;
const RP_TOTAL = 10200;
const GRAND_TOTAL = 40840;
const TOTAL_TASKS = 27;

function fmt(n: number): string {
  return n.toLocaleString("pl-PL");
}

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
  ctx.fillText("POUFNE  \u00b7  ARCHICOM  \u00b7  2026", SW / 2, SH - 32);
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

function slideHeader(ctx: CanvasRenderingContext2D, num: string, title: string, subtitle?: string) {
  ctx.fillStyle = L + "18"; ctx.fillRect(PAD, 95, 52, 28);
  ctx.fillStyle = L; ctx.font = "bold 13px Arial, sans-serif"; ctx.textAlign = "center"; ctx.fillText(num, PAD + 26, 114); ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff"; ctx.font = "bold 38px Arial, sans-serif"; ctx.fillText(title, PAD + 68, 118);
  if (subtitle) { ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.font = "15px Arial, sans-serif"; ctx.fillText(subtitle, PAD + 70, 148); }
  ctx.fillStyle = L + "30"; ctx.fillRect(PAD, 168, 60, 2);
}

function drawTaskTable(ctx: CanvasRenderingContext2D, tasks: TaskItem[], startY: number, total: number, projectName: string) {
  // Header row
  ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.fillRect(PAD, startY, CW, 40);
  ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(PAD, startY + 40); ctx.lineTo(PAD + CW, startY + 40); ctx.stroke();
  ctx.font = "bold 10px Arial, sans-serif"; ctx.letterSpacing = "2px";
  ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.fillText("LP", PAD + 20, startY + 25);
  ctx.fillText("ZADANIE", PAD + 70, startY + 25);
  ctx.fillStyle = L + "70"; ctx.textAlign = "right"; ctx.fillText("KWOTA NETTO", PAD + CW - 20, startY + 25);
  ctx.textAlign = "left"; ctx.letterSpacing = "0px";

  const rowH = 38;
  tasks.forEach((task, i) => {
    const y = startY + 40 + i * rowH;
    if (i % 2 === 0) { ctx.fillStyle = "rgba(255,255,255,0.015)"; ctx.fillRect(PAD, y, CW, rowH); }
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.beginPath(); ctx.moveTo(PAD, y + rowH); ctx.lineTo(PAD + CW, y + rowH); ctx.stroke();

    ctx.fillStyle = L + "30"; ctx.font = "bold 11px Arial, sans-serif";
    ctx.fillText(String(i + 1).padStart(2, "0"), PAD + 20, y + 24);
    ctx.fillStyle = "rgba(255,255,255,0.65)"; ctx.font = "14px Arial, sans-serif";
    ctx.fillText(task.name, PAD + 70, y + 24);
    ctx.textAlign = "right";
    if (task.price !== null) {
      ctx.fillStyle = "#ffffff"; ctx.font = "bold 14px Arial, sans-serif";
      ctx.fillText(`${fmt(task.price)} z\u0142`, PAD + CW - 20, y + 24);
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.20)"; ctx.font = "italic 13px Arial, sans-serif";
      ctx.fillText("do ustalenia", PAD + CW - 20, y + 24);
    }
    ctx.textAlign = "left";
  });

  // Sum row
  const sumY = startY + 40 + tasks.length * rowH;
  ctx.strokeStyle = "rgba(255,255,255,0.12)"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(PAD, sumY); ctx.lineTo(PAD + CW, sumY); ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,0.04)"; ctx.fillRect(PAD, sumY, CW, 48);
  ctx.fillStyle = "#ffffff"; ctx.font = "bold 16px Arial, sans-serif";
  ctx.fillText(`SUMA ${projectName}`, PAD + 20, sumY + 30);
  ctx.textAlign = "right"; ctx.fillStyle = L; ctx.font = "bold 22px Arial, sans-serif";
  ctx.fillText(`${fmt(total)} z\u0142`, PAD + CW - 20, sumY + 30);
  ctx.textAlign = "left";

  return sumY + 48;
}

function generateArchicomPdf() {
  const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [SW, SH] });
  const canvas = document.createElement("canvas");
  canvas.width = SW;
  canvas.height = SH;
  const ctx = canvas.getContext("2d")!;
  const total = 4;

  const addSlide = (fn: () => void, page: number) => {
    if (page > 1) pdf.addPage([SW, SH], "landscape");
    drawBg(ctx); drawTopAccent(ctx); drawCornerMarks(ctx);
    fn();
    drawFooter(ctx, page, total);
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, SW, SH);
  };

  // 1 — Cover
  addSlide(() => {
    ctx.fillStyle = "rgba(255,255,255,0.015)"; ctx.font = "bold 600px Arial, sans-serif"; ctx.fillText("r", SW - 600, 700);
    ctx.strokeStyle = L + "30"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(SW - 340, 200); ctx.lineTo(SW - 340, 800); ctx.stroke();
    ctx.fillStyle = L; ctx.fillRect(PAD, 320, 4, 400);
    ctx.fillStyle = L + "90"; ctx.font = "bold 12px Arial, sans-serif"; ctx.letterSpacing = "8px";
    ctx.fillText("ZESTAWIENIE ZADA\u0143", PAD + 30, 390); ctx.letterSpacing = "0px";
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 90px Arial, sans-serif"; ctx.fillText("Archicom", PAD + 30, 510);
    ctx.fillStyle = "rgba(255,255,255,0.25)"; ctx.font = "bold 48px Arial, sans-serif"; ctx.fillText("Rozliczenie 2026", PAD + 30, 580);
    ctx.fillStyle = "rgba(255,255,255,0.40)"; ctx.font = "20px Arial, sans-serif";
    ctx.fillText("Bulwar P\u00F3\u0142nocny + River Point \u2014 zestawienie zrealizowanych zada\u0144", PAD + 32, 640);

    // Summary cards
    const cardY = 700;
    drawCard(ctx, PAD + 30, cardY, 280, 80);
    ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.font = "12px Arial, sans-serif"; ctx.fillText("BULWAR P\u00D3\u0141NOCNY", PAD + 54, cardY + 28);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 28px Arial, sans-serif"; ctx.fillText(`${fmt(BP_TOTAL)} z\u0142`, PAD + 54, cardY + 60);

    drawCard(ctx, PAD + 340, cardY, 280, 80);
    ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.font = "12px Arial, sans-serif"; ctx.fillText("RIVER POINT", PAD + 364, cardY + 28);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 28px Arial, sans-serif"; ctx.fillText(`${fmt(RP_TOTAL)} z\u0142`, PAD + 364, cardY + 60);

    drawCard(ctx, PAD + 650, cardY, 320, 80, { highlight: true, topAccent: true });
    ctx.fillStyle = L + "80"; ctx.font = "bold 12px Arial, sans-serif"; ctx.letterSpacing = "2px"; ctx.fillText("RAZEM ARCHICOM", PAD + 674, cardY + 28); ctx.letterSpacing = "0px";
    ctx.fillStyle = L; ctx.font = "bold 28px Arial, sans-serif"; ctx.fillText(`${fmt(GRAND_TOTAL)} z\u0142`, PAD + 674, cardY + 60);

    ctx.fillStyle = "rgba(255,255,255,0.10)"; ctx.font = "bold 13px Arial, sans-serif"; ctx.letterSpacing = "4px";
    ctx.fillText("R352 AGENCY", PAD + 30, 830); ctx.letterSpacing = "0px";
  }, 1);

  // 2 — Bulwar Północny
  addSlide(() => {
    slideHeader(ctx, "01", "Bulwar P\u00F3\u0142nocny", `${bpTasks.length} task\u00F3w \u00b7 Suma: ${fmt(BP_TOTAL)} z\u0142 netto`);
    drawTaskTable(ctx, bpTasks, 200, BP_TOTAL, "BP");
  }, 2);

  // 3 — River Point
  addSlide(() => {
    slideHeader(ctx, "02", "River Point", `${rpTasks.length} task\u00F3w \u00b7 Suma: ${fmt(RP_TOTAL)} z\u0142 netto`);
    drawTaskTable(ctx, rpTasks, 200, RP_TOTAL, "RP");
  }, 3);

  // 4 — Podsumowanie + CTA
  addSlide(() => {
    const g2 = ctx.createRadialGradient(SW / 2, SH / 2, 0, SW / 2, SH / 2, 600);
    g2.addColorStop(0, "rgba(212,255,0,0.04)"); g2.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g2; ctx.fillRect(0, 0, SW, SH);

    // Summary
    ctx.textAlign = "center";
    ctx.fillStyle = L + "80"; ctx.font = "bold 12px Arial, sans-serif"; ctx.letterSpacing = "8px";
    ctx.fillText("PODSUMOWANIE", SW / 2, 180); ctx.letterSpacing = "0px";

    // Project cards
    const cardW = 500, cardH = 120, gap = 40;
    const cx = SW / 2 - cardW / 2;

    drawCard(ctx, cx, 220, cardW, cardH);
    ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.font = "12px Arial, sans-serif"; ctx.fillText("BULWAR P\u00D3\u0141NOCNY", SW / 2, 258);
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "11px Arial, sans-serif"; ctx.fillText(`${bpTasks.length} task\u00F3w`, SW / 2, 278);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 32px Arial, sans-serif"; ctx.fillText(`${fmt(BP_TOTAL)} z\u0142`, SW / 2, 320);

    drawCard(ctx, cx, 220 + cardH + gap, cardW, cardH);
    ctx.fillStyle = "rgba(255,255,255,0.30)"; ctx.font = "12px Arial, sans-serif"; ctx.fillText("RIVER POINT", SW / 2, 220 + cardH + gap + 38);
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "11px Arial, sans-serif"; ctx.fillText(`${rpTasks.length} task\u00F3w`, SW / 2, 220 + cardH + gap + 58);
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 32px Arial, sans-serif"; ctx.fillText(`${fmt(RP_TOTAL)} z\u0142`, SW / 2, 220 + cardH + gap + 100);

    // Dashed separator
    ctx.strokeStyle = L + "30"; ctx.lineWidth = 2; ctx.setLineDash([6, 6]);
    const sepY = 220 + 2 * cardH + 2 * gap;
    ctx.beginPath(); ctx.moveTo(cx + 80, sepY); ctx.lineTo(cx + cardW - 80, sepY); ctx.stroke();
    ctx.setLineDash([]);

    // Grand total
    drawCard(ctx, cx - 40, sepY + 20, cardW + 80, 140, { highlight: true, topAccent: true });
    ctx.fillStyle = L + "80"; ctx.font = "bold 12px Arial, sans-serif"; ctx.letterSpacing = "4px";
    ctx.fillText("RAZEM ARCHICOM", SW / 2, sepY + 58); ctx.letterSpacing = "0px";
    ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.font = "11px Arial, sans-serif"; ctx.fillText(`${TOTAL_TASKS} task\u00F3w`, SW / 2, sepY + 78);
    ctx.fillStyle = L; ctx.font = "bold 56px Arial, sans-serif"; ctx.fillText(`${fmt(GRAND_TOTAL)} z\u0142`, SW / 2, sepY + 132);

    // Footer note
    ctx.fillStyle = "rgba(255,255,255,0.20)"; ctx.font = "14px Arial, sans-serif";
    ctx.fillText("Wszystkie kwoty netto PLN", SW / 2, SH - 100);
    ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.font = "11px Arial, sans-serif";
    ctx.fillText("Dokument poufny \u2014 przygotowany wy\u0142\u0105cznie dla Archicom  \u00b7  r352 agency 2026", SW / 2, SH - 75);
    ctx.textAlign = "left";
  }, 4);

  pdf.save("r352_Archicom_Zestawienie_2026.pdf");
}

// ─── Component ───────────────────────────────────────────────────────────────

export function LimitedAccess3() {
  const lenis = useLenis();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [expandedBP, setExpandedBP] = useState(true);
  const [expandedRP, setExpandedRP] = useState(true);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (password === "Archicom2026") { setUnlocked(true); } else { setError(true); }
      setLoading(false);
    }, 800);
  };

  const handleExportPdf = useCallback(async () => {
    setExporting(true);
    await new Promise((r) => setTimeout(r, 100));
    try { generateArchicomPdf(); } catch (err) { console.error("PDF export failed:", err); }
    finally { setExporting(false); }
  }, []);

  // ─── Password Gate ──────────────────────────────────────────
  if (!unlocked) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 flex flex-col justify-center items-center">
          <Reveal>
            <div className="w-full max-w-md mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto mb-10 w-20 h-20 border border-white/10 bg-white/[0.02] flex items-center justify-center"
              >
                <Lock className="w-8 h-8 text-[#D4FF00]/60" />
              </motion.div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Zestawienie Archicom</h1>
              <p className="text-white/40 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
                Poufne zestawienie zrealizowanych zadań. Wprowadź hasło otrzymane od agencji.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                <div className="space-y-2">
                  <label htmlFor="la3-password" className="text-[11px] font-display uppercase tracking-[0.2em] text-white/30">Hasło dostępu</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="la3-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(false); }}
                      className={`w-full bg-white/[0.03] border ${error ? "border-red-500/60" : "border-white/10 focus:border-[#D4FF00]/50"} px-5 py-4 pr-12 text-white text-lg tracking-wider focus:outline-none transition-colors duration-300`}
                      placeholder="••••••••••"
                      autoFocus
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 transition-colors">
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                  <motion.div initial={false} animate={{ height: error ? "auto" : 0, opacity: error ? 1 : 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="text-red-400/80 text-sm pt-1">Nieprawidłowe hasło. Spróbuj ponownie.</p>
                  </motion.div>
                </div>

                <button type="submit" disabled={loading || !password} className={`group relative flex items-center justify-center px-8 py-4 overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${loading ? "bg-white/10" : "bg-[#D4FF00] hover:bg-[#e0ff33]"} text-black`}>
                  <span className="relative z-10 font-display uppercase tracking-[0.2em] text-sm font-bold">{loading ? "Weryfikacja..." : "Uzyskaj dostęp"}</span>
                  {!loading && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />}
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-white/[0.06]">
                <p className="text-white/20 text-xs leading-relaxed">Nie masz hasła? Skontaktuj się z nami.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 mt-4 text-[#D4FF00]/60 hover:text-[#D4FF00] text-sm font-display uppercase tracking-widest transition-colors duration-300">
                  Kontakt <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </PageTransition>
    );
  }

  // ─── Unlocked Content ──────────────────────────────────────
  return (
    <PageTransition>
      <div className="min-h-screen pt-40 pb-32 px-6 md:px-12">
        <div className="max-w-[960px] mx-auto">

          {/* ═══════════════════ HERO ═══════════════════ */}
          <Reveal>
            <div className="mb-16">
              <span className="text-xs font-display uppercase tracking-[0.3em] text-[#D4FF00] block mb-6">Zestawienie zadań</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                Archicom<br /><span className="text-white/35">Rozliczenie 2026</span>
              </h1>
              <p className="text-base md:text-lg text-white/50 mt-6 max-w-2xl leading-relaxed">
                Zestawienie wszystkich zrealizowanych zadań kreatywnych dla projektów
                Bulwar Północny i River Point — łącznie {TOTAL_TASKS} tasków.
              </p>
              <div className="mt-8">
                <button onClick={handleExportPdf} disabled={exporting} className="group inline-flex items-center gap-3 px-5 py-2.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-wait">
                  {exporting ? <Loader2 className="w-4 h-4 text-[#D4FF00] animate-spin" /> : <Download className="w-4 h-4 text-[#D4FF00]/60 group-hover:text-[#D4FF00] transition-colors" />}
                  <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors font-display uppercase tracking-[0.15em]">{exporting ? "Generowanie..." : "Pobierz jako PDF"}</span>
                  <span className="text-[9px] text-white/20 border border-white/10 px-1.5 py-0.5">16:9</span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* ═══════════════════ SUMMARY CARDS ═══════════════════ */}
          <Reveal delay={0.03}>
            <div className="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-5 border border-white/10 bg-white/[0.02] text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[10px] font-display uppercase tracking-[0.2em] text-white/40">Bulwar Północny</span>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-white block">{fmt(BP_TOTAL)}</span>
                <span className="text-[10px] text-white/25 mt-0.5 block">PLN netto &middot; {bpTasks.length} tasków</span>
              </div>
              <div className="p-5 border border-white/10 bg-white/[0.02] text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Building2 className="w-3.5 h-3.5 text-white/30" />
                  <span className="text-[10px] font-display uppercase tracking-[0.2em] text-white/40">River Point</span>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-white block">{fmt(RP_TOTAL)}</span>
                <span className="text-[10px] text-white/25 mt-0.5 block">PLN netto &middot; {rpTasks.length} tasków</span>
              </div>
              <div className="p-5 border border-[#D4FF00]/20 bg-[#D4FF00]/[0.03] text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Layers className="w-3.5 h-3.5 text-[#D4FF00]/50" />
                  <span className="text-[10px] font-display uppercase tracking-[0.2em] text-[#D4FF00]/70">Razem Archicom</span>
                </div>
                <span className="text-2xl md:text-3xl font-bold text-[#D4FF00] block">{fmt(GRAND_TOTAL)}</span>
                <span className="text-[10px] text-[#D4FF00]/30 mt-0.5 block">PLN netto &middot; {TOTAL_TASKS} tasków</span>
              </div>
            </div>
          </Reveal>

          {/* ═══════════════════ BULWAR PÓŁNOCNY ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-16">
              <button
                onClick={() => setExpandedBP(!expandedBP)}
                className="w-full flex items-center justify-between gap-4 mb-6 group"
              >
                <div className="text-left">
                  <span className="text-[11px] font-display uppercase tracking-[0.25em] text-[#D4FF00]/35">01</span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                    Bulwar Północny
                  </h2>
                  <p className="text-sm text-white/40 mt-1">{bpTasks.length} tasków &middot; {fmt(BP_TOTAL)} PLN netto</p>
                </div>
                <motion.div animate={{ rotate: expandedBP ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                  <ChevronDown className="w-5 h-5 text-white/20" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{ height: expandedBP ? "auto" : 0, opacity: expandedBP ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border border-white/10 overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-[40px_1fr_140px] bg-white/[0.04]">
                    <div className="px-3 py-3">
                      <span className="text-[10px] font-display uppercase tracking-[0.15em] text-white/25">LP</span>
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-[10px] font-display uppercase tracking-[0.15em] text-white/25">Zadanie</span>
                    </div>
                    <div className="px-4 py-3 text-right">
                      <span className="text-[10px] font-display uppercase tracking-[0.15em] text-[#D4FF00]/50">Kwota netto</span>
                    </div>
                  </div>

                  {/* Rows */}
                  {bpTasks.map((task, i) => (
                    <div key={i} className={`grid grid-cols-[40px_1fr_140px] border-t border-white/[0.06] hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                      <div className="px-3 py-3.5 flex items-center">
                        <span className="text-[11px] text-[#D4FF00]/25 font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="px-4 py-3.5 flex items-center">
                        <span className="text-sm text-white/65">{task.name}</span>
                      </div>
                      <div className="px-4 py-3.5 flex items-center justify-end">
                        {task.price !== null ? (
                          <span className="text-sm font-bold text-white tabular-nums">{fmt(task.price)} zł</span>
                        ) : (
                          <span className="text-xs text-white/20 italic">do ustalenia</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Sum */}
                  <div className="grid grid-cols-[40px_1fr_140px] border-t-2 border-white/20 bg-white/[0.03]">
                    <div className="px-3 py-5" />
                    <div className="px-4 py-5">
                      <span className="text-base font-bold text-white">Suma Bulwar Północny</span>
                    </div>
                    <div className="px-4 py-5 text-right">
                      <span className="text-xl font-bold text-[#D4FF00]">{fmt(BP_TOTAL)} zł</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          </Reveal>

          {/* ═══════════════════ RIVER POINT ═══════════════════ */}
          <Reveal delay={0.05}>
            <section className="mb-16">
              <button
                onClick={() => setExpandedRP(!expandedRP)}
                className="w-full flex items-center justify-between gap-4 mb-6 group"
              >
                <div className="text-left">
                  <span className="text-[11px] font-display uppercase tracking-[0.25em] text-[#D4FF00]/35">02</span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
                    River Point
                  </h2>
                  <p className="text-sm text-white/40 mt-1">{rpTasks.length} tasków &middot; {fmt(RP_TOTAL)} PLN netto</p>
                </div>
                <motion.div animate={{ rotate: expandedRP ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
                  <ChevronDown className="w-5 h-5 text-white/20" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{ height: expandedRP ? "auto" : 0, opacity: expandedRP ? 1 : 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border border-white/10 overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-[40px_1fr_140px] bg-white/[0.04]">
                    <div className="px-3 py-3">
                      <span className="text-[10px] font-display uppercase tracking-[0.15em] text-white/25">LP</span>
                    </div>
                    <div className="px-4 py-3">
                      <span className="text-[10px] font-display uppercase tracking-[0.15em] text-white/25">Zadanie</span>
                    </div>
                    <div className="px-4 py-3 text-right">
                      <span className="text-[10px] font-display uppercase tracking-[0.15em] text-[#D4FF00]/50">Kwota netto</span>
                    </div>
                  </div>

                  {/* Rows */}
                  {rpTasks.map((task, i) => (
                    <div key={i} className={`grid grid-cols-[40px_1fr_140px] border-t border-white/[0.06] hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                      <div className="px-3 py-3.5 flex items-center">
                        <span className="text-[11px] text-[#D4FF00]/25 font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="px-4 py-3.5 flex items-center">
                        <span className="text-sm text-white/65">{task.name}</span>
                      </div>
                      <div className="px-4 py-3.5 flex items-center justify-end">
                        {task.price !== null ? (
                          <span className="text-sm font-bold text-white tabular-nums">{fmt(task.price)} zł</span>
                        ) : (
                          <span className="text-xs text-white/20 italic">do ustalenia</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Sum */}
                  <div className="grid grid-cols-[40px_1fr_140px] border-t-2 border-white/20 bg-white/[0.03]">
                    <div className="px-3 py-5" />
                    <div className="px-4 py-5">
                      <span className="text-base font-bold text-white">Suma River Point</span>
                    </div>
                    <div className="px-4 py-5 text-right">
                      <span className="text-xl font-bold text-[#D4FF00]">{fmt(RP_TOTAL)} zł</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>
          </Reveal>

          {/* ═══════════════════ GRAND TOTAL ═══════════════════ */}
          <Reveal delay={0.05}>
            <div className="mb-24 p-6 md:p-8 border border-[#D4FF00]/20 bg-[#D4FF00]/[0.03]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-display uppercase tracking-[0.25em] text-[#D4FF00]/60 block mb-1">Razem Archicom</span>
                  <span className="text-sm text-white/40">{TOTAL_TASKS} tasków &middot; Bulwar Północny + River Point</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl md:text-4xl font-bold text-[#D4FF00] block">{fmt(GRAND_TOTAL)} zł</span>
                  <span className="text-[10px] text-[#D4FF00]/30">netto PLN</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ═══════════════════ NOTES ═══════════════════ */}
          <Reveal delay={0.05}>
            <div className="mb-24 space-y-0 border border-white/[0.06]">
              {[
                "Wszystkie kwoty netto PLN.",
                "Pozycje oznaczone \"do ustalenia\" dotyczą zadań w trakcie finalizacji.",
                "Zestawienie obejmuje wyłącznie zrealizowane taski kreatywne.",
                "Dokument poufny — przygotowany wyłącznie dla Archicom.",
              ].map((note, i) => (
                <div key={i} className={`px-5 py-3 ${i > 0 ? "border-t border-white/[0.04]" : ""} flex items-start gap-3`}>
                  <span className="text-white/15 text-xs mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-white/45 leading-relaxed">{note}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ═══════════════════ CTA ═══════════════════ */}
          <Reveal delay={0.05}>
            <div className="border-t border-white/[0.06] pt-16 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Pytania do zestawienia?
              </h3>
              <p className="text-white/40 text-sm mb-8 max-w-lg mx-auto leading-relaxed">
                W razie pytań dotyczących poszczególnych pozycji lub potrzeby dodatkowych materiałów — zapraszamy do kontaktu.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4FF00] text-black font-display uppercase tracking-[0.2em] text-sm font-bold hover:bg-[#e0ff33] transition-colors duration-300 group"
                >
                  Kontakt
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={handleExportPdf}
                  disabled={exporting}
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/70 font-display uppercase tracking-[0.2em] text-sm transition-all duration-300 disabled:opacity-50"
                >
                  {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Pobierz PDF
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-[11px] text-white/20">
                <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> hello@r352.agency</span>
              </div>
              <p className="text-white/10 text-xs mt-8">
                Dokument poufny — przygotowany wyłącznie dla Archicom  |  r352 agency 2026
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </PageTransition>
  );
}