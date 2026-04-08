import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { motion } from "motion/react";
import { ArrowRight, Clock, Lock, Eye, EyeOff, Image, Video } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect, type ReactNode } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLenis } from "lenis/react";

// ─── Data ────────────────────────────────────────────────────────────────────

const baseRates = [
  { id: 1, type: "Master still (dostosowanie master KV do reformatów bazowych)", min: 100, std: 125, max: 150, desc: "Pełna kreacja: koncept, layout, typografia, zdjęcia, 1 runda poprawek." },
  { id: 2, type: "Reformat still (adaptacja)", min: 30, std: 45, max: 60, desc: "Adaptacja mastera: zmiana rozmiaru lub brandu. Praca mechaniczna." },
  { id: 3, type: "Motion / Video — master (za sztukę)", min: 240, std: 300, max: 360, desc: "Video 15s/6s — dostosowanie master KV do reformatów bazowych." },
  { id: 4, type: "Motion / Video — adaptacja (za sztukę)", min: 120, std: 180, max: 240, desc: "Podmiana brandu w video." },
];

const phase1Items = [
  { id: 1, format: "Paid Social — feed 1080×1080", qty: 1, rate: "100–150", type: "still", channel: "Paid Social" },
  { id: 2, format: "Paid Social — stories 1080×1920", qty: 1, rate: "100–150", type: "still", channel: "Paid Social" },
  { id: 3, format: "SEM — wiodący rozmiar", qty: 1, rate: "100–150", type: "still", channel: "SEM" },
  { id: 4, format: "Programmatic — wiodący rozmiar", qty: 1, rate: "100–150", type: "still", channel: "Programmatic" },
  { id: 5, format: "Criteo — wiodący rozmiar", qty: 1, rate: "100–150", type: "still", channel: "Criteo" },
  { id: 6, format: "Wizytówka GBP (1200×900)", qty: 1, rate: "100–150", type: "still", channel: "GBP" },
  { id: 7, format: "Video 15s", qty: 1, rate: "240–360", type: "motion master", channel: "Video" },
  { id: 8, format: "Video 6s (bumper)", qty: 1, rate: "240–360", type: "motion master", channel: "Video" },
];

const phase2Extra = [
  { id: 1, format: "SEM — 3 dodatkowe rozmiary", qty: 3, rate: "30–60", type: "still", channel: "SEM" },
  { id: 2, format: "Programmatic — 4 dodatkowe rozmiary", qty: 4, rate: "30–60", type: "still", channel: "Programmatic" },
  { id: 3, format: "Criteo — 3 dodatkowe rozmiary", qty: 3, rate: "30–60", type: "still", channel: "Criteo" },
];

const phase2Brands = [
  { id: 4, format: "Paid Social (feed + stories) × 5 brandów", qty: 10, rate: "30–60", type: "still", channel: "Paid Social" },
  { id: 5, format: "SEM (4 rozm.) × 5 brandów", qty: 20, rate: "30–60", type: "still", channel: "SEM" },
  { id: 6, format: "Programmatic (5 rozm.) × 5 brandów", qty: 25, rate: "30–60", type: "still", channel: "Programmatic" },
  { id: 7, format: "Wizytówka GBP × 5 brandów", qty: 5, rate: "30–60", type: "still", channel: "GBP" },
  { id: 8, format: "Video 15s × 5 brandów", qty: 5, rate: "120–240", type: "motion adapt.", channel: "Video" },
  { id: 9, format: "Video 6s × 5 brandów", qty: 5, rate: "120–240", type: "motion adapt.", channel: "Video" },
];

const quantitySummary = [
  { label: "Still masters (Faza 1)", qty: 6 },
  { label: "Motion masters (Faza 1)", qty: 2 },
  { label: "Still reformaty — dod. rozmiary 1. brand", qty: 10 },
  { label: "Still reformaty — adaptacje ×5 brandów", qty: 60 },
  { label: "Motion adaptacje ×5 brandów", qty: 10 },
];

const totalSummary = [
  { label: "Faza 1 (8 masterów)", min: "1 080", std: "1 350", max: "1 620" },
  { label: "Faza 2 (80 reformatów)", min: "3 300", std: "4 950", max: "6 600" },
  { label: "Copy (opcja)", min: "500", std: "850", max: "1 400" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function Pricing() {

  const { language } = useLanguage();
  const lenis = useLenis();
  const [showDetails, setShowDetails] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Recalculate Lenis scroll height when content changes (unlock)
  useEffect(() => {
    if (lenis && unlocked) {
      // Give DOM time to render the new content
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
      if (password === "Benefit2026") {
        setUnlocked(true);
      } else {
        setError(true);
      }
      setLoading(false);
    }, 800);
  };

  // ─── Password Gate ──────────────────────────────────────────
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
                {language === "pl"
                  ? "Ta strona zawiera poufne dane wyceny. Wprowadź hasło otrzymane od agencji."
                  : "This page contains confidential pricing data. Enter the password provided by the agency."}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                <div className="space-y-2">
                  <label
                    htmlFor="pricing-password"
                    className="text-[11px] font-display uppercase tracking-[0.2em] text-white/30"
                  >
                    {language === "pl" ? "Hasło dostępu" : "Access Password"}
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
                      {language === "pl"
                        ? "Nieprawidłowe hasło. Spróbuj ponownie."
                        : "Incorrect password. Please try again."}
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
                    {loading
                      ? language === "pl"
                        ? "Weryfikacja..."
                        : "Verifying..."
                      : language === "pl"
                      ? "Uzyskaj dostęp"
                      : "Unlock"}
                  </span>
                  {!loading && (
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  )}
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-white/[0.06]">
                <p className="text-white/20 text-xs leading-relaxed">
                  {language === "pl"
                    ? "Nie masz hasła? Skontaktuj się z nami, aby uzyskać dostęp do wyceny."
                    : "Don't have a password? Contact us to get access to pricing."}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-4 text-[#D4FF00]/60 hover:text-[#D4FF00] text-sm font-display uppercase tracking-widest transition-colors duration-300"
                >
                  {language === "pl" ? "Kontakt" : "Contact"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </PageTransition>
    );
  }

  // ─── Unlocked pricing content ──────────────────────────────
  return (
    <PageTransition>
      <div className="min-h-screen pt-40 pb-32 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">

          {/* Hero */}
          <Reveal>
            <div className="mb-16">
              <span className="text-xs font-display uppercase tracking-[0.3em] text-[#D4FF00] block mb-6">
                Cennik
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                Kreacje Performance
                <br />
                <span className="text-white/40">Marketing</span>
              </h1>
              <p className="text-lg text-white/50 mt-6 max-w-2xl">
                Model 2-fazowy: MASTERY (kreacja) → REFORMATY (adaptacje po akceptacji) | Ceny netto PLN
              </p>
            </div>
          </Reveal>

          {/* ─── Widełki cenowe — prominent summary ──────────────── */}
          <Reveal delay={0.1}>
            <div className="max-w-[900px] mx-auto mb-20">
              <div className="border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 md:p-12">
                <p className="text-sm text-white/40 font-display uppercase tracking-[0.25em] mb-8">
                  Pełne widełki cenowe
                </p>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="pb-4 text-left text-sm font-normal text-white/40 w-[40%]"></th>
                        <th className="pb-4 text-right text-sm font-bold text-white/60 uppercase tracking-wider w-[20%]">MIN</th>
                        <th className="pb-4 text-right text-sm font-bold text-[#D4FF00] uppercase tracking-wider w-[20%]">STD</th>
                        <th className="pb-4 text-right text-sm font-bold text-white/60 uppercase tracking-wider w-[20%]">MAX</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/[0.06]">
                        <td className="py-5 text-base md:text-lg text-white/70">Faza 1 (8 masterów)</td>
                        <td className="py-5 text-right text-base md:text-lg text-white/50">1 080</td>
                        <td className="py-5 text-right text-base md:text-lg text-white font-medium">1 350</td>
                        <td className="py-5 text-right text-base md:text-lg text-white/50">1 620</td>
                      </tr>
                      <tr className="border-b border-white/[0.06]">
                        <td className="py-5 text-base md:text-lg text-white/70">Faza 2 (80 reformatów)</td>
                        <td className="py-5 text-right text-base md:text-lg text-white/50">3 300</td>
                        <td className="py-5 text-right text-base md:text-lg text-white font-medium">4 950</td>
                        <td className="py-5 text-right text-base md:text-lg text-white/50">6 600</td>
                      </tr>
                      <tr className="border-b border-white/[0.06]">
                        <td className="py-5 text-base md:text-lg text-white/40 italic">Copy (opcja)</td>
                        <td className="py-5 text-right text-base md:text-lg text-white/30">500</td>
                        <td className="py-5 text-right text-base md:text-lg text-white/60 font-medium">850</td>
                        <td className="py-5 text-right text-base md:text-lg text-white/30">1 400</td>
                      </tr>
                      {/* SUMA row */}
                      <tr className="border-t-2 border-white/20">
                        <td className="pt-6 pb-2 text-xl md:text-2xl font-bold text-white">SUMA</td>
                        <td className="pt-6 pb-2 text-right text-xl md:text-2xl font-bold text-white/60">4 880 <span className="text-sm font-normal text-white/30">PLN</span></td>
                        <td className="pt-6 pb-2 text-right text-xl md:text-2xl font-bold text-[#D4FF00]">7 150 <span className="text-sm font-normal text-[#D4FF00]/50">PLN</span></td>
                        <td className="pt-6 pb-2 text-right text-xl md:text-2xl font-bold text-white/60">9 620 <span className="text-sm font-normal text-white/30">PLN</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer notes */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm text-white/30">
                  <p>Rozstrzał MIN→MAX: <span className="text-white/60 font-medium">4 740 PLN</span></p>
                  <p>Stawka efektywna per plik przy STD: <span className="text-white/60 font-medium">~81 PLN</span></p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4FF00]/50" />
                    Czas dostarczenia: <span className="text-[#D4FF00]/80 font-medium">3–5 dni roboczych</span>
                  </p>
                </div>

                {/* ── STILL vs MOTION split ───────────────────── */}
                <div className="mt-10 pt-8 border-t border-white/[0.06]">
                  <p className="text-sm text-white/40 font-display uppercase tracking-[0.25em] mb-6">
                    Podział kosztów
                  </p>

                  {/* Visual bar */}
                  <div className="relative h-12 md:h-14 flex overflow-hidden mb-6">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "62%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                      className="h-full bg-white/[0.08] border border-white/10 flex items-center justify-between px-4 md:px-6 relative overflow-hidden"
                    >
                      <div className="flex items-center gap-2.5">
                        <Image className="w-4 h-4 text-white/50" />
                        <span className="text-sm md:text-base font-bold text-white tracking-tight">STILL</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg md:text-xl font-bold text-white">62%</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "38%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                      className="h-full bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-between px-4 md:px-6 relative overflow-hidden"
                    >
                      <div className="flex items-center gap-2.5">
                        <Video className="w-4 h-4 text-[#D4FF00]/60" />
                        <span className="text-sm md:text-base font-bold text-[#D4FF00] tracking-tight">MOTION</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg md:text-xl font-bold text-[#D4FF00]">38%</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Amounts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* ── STILL card with widełki ── */}
                    <div className="border border-white/[0.06] bg-white/[0.01] p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Image className="w-3.5 h-3.5 text-white/40" />
                          <span className="text-xs font-display uppercase tracking-[0.2em] text-white/40">Still · 76 plików</span>
                        </div>
                        <span className="text-xs font-bold text-white/50 tracking-wider">62%</span>
                      </div>
                      <table className="w-full border-collapse mb-3">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="pb-2 text-left text-[10px] font-normal text-white/30"></th>
                            <th className="pb-2 text-right text-[10px] font-bold text-white/40 uppercase tracking-wider">MIN</th>
                            <th className="pb-2 text-right text-[10px] font-bold text-white/60 uppercase tracking-wider">STD</th>
                            <th className="pb-2 text-right text-[10px] font-bold text-white/40 uppercase tracking-wider">MAX</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/[0.04]">
                            <td className="py-2 text-xs text-white/50">Masters (6×)</td>
                            <td className="py-2 text-right text-xs text-white/40">600</td>
                            <td className="py-2 text-right text-xs text-white font-medium">750</td>
                            <td className="py-2 text-right text-xs text-white/40">900</td>
                          </tr>
                          <tr className="border-b border-white/[0.04]">
                            <td className="py-2 text-xs text-white/50">Dod. rozmiary (10×)</td>
                            <td className="py-2 text-right text-xs text-white/40">300</td>
                            <td className="py-2 text-right text-xs text-white font-medium">450</td>
                            <td className="py-2 text-right text-xs text-white/40">600</td>
                          </tr>
                          <tr className="border-b border-white/[0.04]">
                            <td className="py-2 text-xs text-white/50">Brandy ×5 (60×)</td>
                            <td className="py-2 text-right text-xs text-white/40">1 800</td>
                            <td className="py-2 text-right text-xs text-white font-medium">2 700</td>
                            <td className="py-2 text-right text-xs text-white/40">3 600</td>
                          </tr>
                          <tr className="border-t border-white/15">
                            <td className="pt-3 pb-1 text-sm font-bold text-white">RAZEM</td>
                            <td className="pt-3 pb-1 text-right text-sm font-bold text-white/50">2 700</td>
                            <td className="pt-3 pb-1 text-right text-sm font-bold text-white">3 900</td>
                            <td className="pt-3 pb-1 text-right text-sm font-bold text-white/50">5 100</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-[10px] text-white/25">Stawka eff. per plik STD: ~51 PLN</p>
                    </div>

                    {/* ── MOTION card with widełki ── */}
                    <div className="border border-[#D4FF00]/10 bg-[#D4FF00]/[0.02] p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Video className="w-3.5 h-3.5 text-[#D4FF00]/50" />
                          <span className="text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00]/50">Motion · 12 plików</span>
                        </div>
                        <span className="text-xs font-bold text-[#D4FF00]/50 tracking-wider">38%</span>
                      </div>
                      <table className="w-full border-collapse mb-3">
                        <thead>
                          <tr className="border-b border-[#D4FF00]/10">
                            <th className="pb-2 text-left text-[10px] font-normal text-[#D4FF00]/25"></th>
                            <th className="pb-2 text-right text-[10px] font-bold text-[#D4FF00]/30 uppercase tracking-wider">MIN</th>
                            <th className="pb-2 text-right text-[10px] font-bold text-[#D4FF00]/60 uppercase tracking-wider">STD</th>
                            <th className="pb-2 text-right text-[10px] font-bold text-[#D4FF00]/30 uppercase tracking-wider">MAX</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[#D4FF00]/[0.06]">
                            <td className="py-2 text-xs text-[#D4FF00]/40">Masters (2×)</td>
                            <td className="py-2 text-right text-xs text-[#D4FF00]/35">480</td>
                            <td className="py-2 text-right text-xs text-[#D4FF00] font-medium">600</td>
                            <td className="py-2 text-right text-xs text-[#D4FF00]/35">720</td>
                          </tr>
                          <tr className="border-b border-[#D4FF00]/[0.06]">
                            <td className="py-2 text-xs text-[#D4FF00]/40">Adaptacje ×5 (10×)</td>
                            <td className="py-2 text-right text-xs text-[#D4FF00]/35">1 200</td>
                            <td className="py-2 text-right text-xs text-[#D4FF00] font-medium">1 800</td>
                            <td className="py-2 text-right text-xs text-[#D4FF00]/35">2 400</td>
                          </tr>
                          <tr className="border-t border-[#D4FF00]/20">
                            <td className="pt-3 pb-1 text-sm font-bold text-[#D4FF00]">RAZEM</td>
                            <td className="pt-3 pb-1 text-right text-sm font-bold text-[#D4FF00]/50">1 680</td>
                            <td className="pt-3 pb-1 text-right text-sm font-bold text-[#D4FF00]">2 400</td>
                            <td className="pt-3 pb-1 text-right text-sm font-bold text-[#D4FF00]/50">3 120</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-[10px] text-[#D4FF00]/20">Stawka eff. per plik STD: ~200 PLN</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ─── A4 Card ─────────────────────────────────────────────── */}
          <Reveal delay={0.15}>
            <div
              className="relative bg-white text-neutral-900 shadow-2xl mx-auto overflow-hidden"
              style={{
                maxWidth: "900px",
              }}
            >
              {/* Subtle decorative corner marks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-neutral-200" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-neutral-200" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-neutral-200" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-neutral-200" />

              {/* Inner content */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12">

                {/* Header */}
                <div className="border-b border-neutral-200 pb-4 mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 uppercase">
                        Cennik — Kreacje Performance Marketing
                      </h2>
                      <p className="text-[10px] sm:text-xs text-neutral-400 mt-1 italic">
                        Model 2-fazowy: MASTERY (kreacja) → REFORMATY (adaptacje po akceptacji) | Ceny netto PLN
                      </p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="text-base sm:text-lg font-bold tracking-tighter text-neutral-900">r352</span>
                      <p className="text-[9px] sm:text-[10px] text-neutral-400 mt-0.5">per sztuka</p>
                    </div>
                  </div>
                </div>

                {/* ── Stawki bazowe ──────────────────────────────── */}
                <SectionLabel icon="rates">Stawki bazowe per sztuka</SectionLabel>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-[9px] sm:text-[10px] md:text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-900 text-white">
                        <th className="px-2 py-1.5 text-left font-medium w-6">#</th>
                        <th className="px-2 py-1.5 text-left font-medium">Typ</th>
                        <th className="px-2 py-1.5 text-right font-medium">MIN</th>
                        <th className="px-2 py-1.5 text-right font-medium bg-amber-500/90 text-neutral-900">STD</th>
                        <th className="px-2 py-1.5 text-right font-medium">MAX</th>
                        <th className="px-2 py-1.5 text-left font-medium hidden sm:table-cell">Opis</th>
                      </tr>
                    </thead>
                    <tbody>
                      {baseRates.map((row, i) => (
                        <tr key={row.id} className={i % 2 === 0 ? "bg-neutral-50" : "bg-white"}>
                          <td className="px-2 py-1.5 text-neutral-400">{row.id}</td>
                          <td className="px-2 py-1.5 font-medium">{row.type}</td>
                          <td className="px-2 py-1.5 text-right font-semibold text-blue-700">{row.min}</td>
                          <td className="px-2 py-1.5 text-right font-bold text-amber-700 bg-amber-50">{row.std}</td>
                          <td className="px-2 py-1.5 text-right font-semibold text-blue-700">{row.max}</td>
                          <td className="px-2 py-1.5 text-neutral-400 italic hidden sm:table-cell">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Faza 1 ───────────────────────────────────── */}
                <SectionLabel icon="phase1">Faza 1 — Mastery (dostosowanie master KV do reformatów bazowych)</SectionLabel>
                <p className="text-[8px] sm:text-[9px] text-neutral-400 italic mb-2 -mt-1">
                  Zawiera: dostosowanie master KV per format. Dostawa: 1 master per kanał/rozmiar (1 brand).
                </p>
                <div className="overflow-x-auto mb-2">
                  <table className="w-full text-[9px] sm:text-[10px] md:text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-100 border-b border-neutral-200">
                        <th className="px-2 py-1.5 text-left font-medium w-6">#</th>
                        <th className="px-2 py-1.5 text-left font-medium">Format</th>
                        <th className="px-2 py-1.5 text-center font-medium">Szt.</th>
                        <th className="px-2 py-1.5 text-right font-medium">Stawka</th>
                        <th className="px-2 py-1.5 text-center font-medium">Typ</th>
                        <th className="px-2 py-1.5 text-right font-medium">Kanał</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phase1Items.map((row, i) => (
                        <tr key={row.id} className={`border-b border-neutral-100 ${i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}`}>
                          <td className="px-2 py-1 text-neutral-400">{row.id}</td>
                          <td className="px-2 py-1 font-medium">{row.format}</td>
                          <td className="px-2 py-1 text-center">{row.qty}</td>
                          <td className="px-2 py-1 text-right text-blue-700">{row.rate}</td>
                          <td className="px-2 py-1 text-center text-neutral-500">{row.type}</td>
                          <td className="px-2 py-1 text-right text-neutral-400 italic">{row.channel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[9px] sm:text-[10px] font-bold text-neutral-600 mb-6 pl-2">
                  RAZEM FAZA 1: 6 still + 2 motion = 8 masterów
                </p>

                {/* ── Faza 2 ────────────────────────────────────── */}
                <SectionLabel icon="phase2">Faza 2 — Reformaty (po akceptacji masterów)</SectionLabel>
                <p className="text-[8px] sm:text-[9px] text-neutral-400 italic mb-2 -mt-1">
                  Adaptacja masterów na dodatkowe rozmiary i brandy. Praca mechaniczna.
                </p>
                <div className="overflow-x-auto mb-2">
                  <table className="w-full text-[9px] sm:text-[10px] md:text-xs border-collapse">
                    <thead>
                      <tr className="bg-neutral-100 border-b border-neutral-200">
                        <th className="px-2 py-1.5 text-left font-medium w-6">#</th>
                        <th className="px-2 py-1.5 text-left font-medium">Element</th>
                        <th className="px-2 py-1.5 text-center font-medium">Szt.</th>
                        <th className="px-2 py-1.5 text-right font-medium">Stawka</th>
                        <th className="px-2 py-1.5 text-center font-medium">Typ</th>
                        <th className="px-2 py-1.5 text-right font-medium">Kanał</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Sub-header: Dodatkowe rozmiary */}
                      <tr className="bg-neutral-200/50">
                        <td colSpan={6} className="px-2 py-1.5 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-700">
                          Dodatkowe rozmiary — 1. brand
                        </td>
                      </tr>
                      {phase2Extra.map((row, i) => (
                        <tr key={`extra-${row.id}`} className={`border-b border-neutral-100 ${i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}`}>
                          <td className="px-2 py-1 text-neutral-400">{row.id}</td>
                          <td className="px-2 py-1 font-medium">{row.format}</td>
                          <td className="px-2 py-1 text-center">{row.qty}</td>
                          <td className="px-2 py-1 text-right text-blue-700">{row.rate}</td>
                          <td className="px-2 py-1 text-center text-neutral-500">{row.type}</td>
                          <td className="px-2 py-1 text-right text-neutral-400 italic">{row.channel}</td>
                        </tr>
                      ))}
                      {/* Sub-header: Adaptacje na brandy */}
                      <tr className="bg-neutral-200/50">
                        <td colSpan={6} className="px-2 py-1.5 font-bold text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-700">
                          Adaptacje na kolejne brandy (×5 brandów)
                        </td>
                      </tr>
                      {phase2Brands.map((row, i) => (
                        <tr key={`brand-${row.id}`} className={`border-b border-neutral-100 ${i % 2 === 0 ? "bg-white" : "bg-neutral-50/50"}`}>
                          <td className="px-2 py-1 text-neutral-400">{row.id}</td>
                          <td className="px-2 py-1 font-medium">{row.format}</td>
                          <td className="px-2 py-1 text-center">{row.qty}</td>
                          <td className="px-2 py-1 text-right text-blue-700">{row.rate}</td>
                          <td className="px-2 py-1 text-center text-neutral-500">{row.type}</td>
                          <td className="px-2 py-1 text-right text-neutral-400 italic">{row.channel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Podsumowanie ilościowe ─────────────────────── */}
                <div className="mb-6 mt-4">
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-700 mb-2 pl-2">
                    Podsumowanie ilościowe
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full max-w-md text-[9px] sm:text-[10px] md:text-xs border-collapse">
                      <tbody>
                        {quantitySummary.map((row, i) => (
                          <tr key={row.label} className={`border-b border-neutral-100 ${i % 2 === 0 ? "bg-neutral-50/50" : "bg-white"}`}>
                            <td className="px-2 py-1">{row.label}</td>
                            <td className="px-2 py-1 text-right font-semibold w-16">{row.qty}</td>
                          </tr>
                        ))}
                        <tr className="bg-neutral-900 text-white font-bold">
                          <td className="px-2 py-1.5">RAZEM PLIKÓW W PACZCE</td>
                          <td className="px-2 py-1.5 text-right text-[#D4FF00]">88</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ── SUMA ────────────────────────────────────────── */}
                <div className="border-t-2 border-neutral-900 pt-4 mb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-[10px] sm:text-xs md:text-sm border-collapse">
                      <thead>
                        <tr className="border-b-2 border-neutral-300">
                          <th className="px-2 py-2 text-left font-medium"></th>
                          <th className="px-2 py-2 text-right font-bold">MIN</th>
                          <th className="px-2 py-2 text-right font-bold">STD</th>
                          <th className="px-2 py-2 text-right font-bold">MAX</th>
                        </tr>
                      </thead>
                      <tbody>
                        {totalSummary.map((row, i) => (
                          <tr key={row.label} className="border-b border-neutral-100">
                            <td className="px-2 py-2 font-medium">{row.label}</td>
                            <td className="px-2 py-2 text-right">{row.min}</td>
                            <td className="px-2 py-2 text-right font-semibold">{row.std}</td>
                            <td className="px-2 py-2 text-right">{row.max}</td>
                          </tr>
                        ))}
                        <tr className="border-t-2 border-neutral-900 bg-neutral-900 text-white">
                          <td className="px-2 py-2.5 font-bold">SUMA</td>
                          <td className="px-2 py-2.5 text-right font-bold">4 880 PLN</td>
                          <td className="px-2 py-2.5 text-right font-bold text-[#D4FF00]">7 150 PLN</td>
                          <td className="px-2 py-2.5 text-right font-bold">9 620 PLN</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ── Footer notes ────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-[8px] sm:text-[9px] text-neutral-400 border-t border-neutral-200 pt-3">
                  <p>Rozstrzał MIN→MAX: <span className="font-semibold text-neutral-600">4 740 PLN</span></p>
                  <p>Stawka efektywna per plik przy STD: <span className="font-semibold text-neutral-600">~81 PLN</span></p>
                  <p className="flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    Czas dostarczenia: <span className="font-semibold text-neutral-600">3–5 dni roboczych</span>
                  </p>
                </div>

              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.2}>
            <div className="max-w-[900px] mx-auto mt-20 text-center">
              <p className="text-white/40 text-sm mb-6 max-w-lg mx-auto">
                Zainteresowany? Skontaktuj się z nami, aby omówić szczegóły i dostosować wycenę do Twojego projektu.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-10 py-4 bg-[#D4FF00] text-black font-display uppercase tracking-widest text-sm transition-all duration-500 hover:gap-5"
                >
                  Rozpocznij rozmowę
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="mailto:hello@r352.com"
                  className="inline-flex items-center gap-2 px-10 py-4 border border-white/20 text-white font-display uppercase tracking-widest text-sm transition-all duration-500 hover:bg-white hover:text-black"
                >
                  hello@r352.com
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </PageTransition>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children, icon }: { children: ReactNode; icon: string }) {
  const colors: Record<string, string> = {
    rates: "bg-neutral-900 text-white",
    phase1: "bg-blue-900 text-white",
    phase2: "bg-neutral-800 text-white",
  };
  return (
    <div className={`${colors[icon] || "bg-neutral-900 text-white"} px-3 py-1.5 mb-2 inline-block`}>
      <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider">{children}</span>
    </div>
  );
}