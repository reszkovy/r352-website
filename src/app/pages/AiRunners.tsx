import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

/**
 * AiRunners — standalone interactive gallery (linked from LinkedIn, not in nav).
 *
 * One running scene rendered by ten different AI image/video models. The model
 * name + number are burned into each frame, so the gallery just presents them:
 * a clean grid that opens into a keyboard/swipe-navigable lightbox.
 */
const IMAGES = Array.from({ length: 10 }, (_, i) => `/gallery/run-${String(i + 1).padStart(2, "0")}.webp`);

export function AiRunners() {
  const { language } = useLanguage();
  const pl = language === "pl";
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % IMAGES.length)), []);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length)), []);

  // Keyboard nav + scroll lock while the lightbox is open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, next, prev]);

  return (
    <PageTransition className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1500px] mx-auto">
      {/* ── Hero ── */}
      <section className="mb-16 md:mb-24">
        <Reveal>
          <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-6 block">
            {pl ? "AI · Eksperyment" : "AI · Experiment"}
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[0.92] mb-8">
            {pl ? (
              <>Ta sama scena.<br />Dziesięć modeli AI.</>
            ) : (
              <>Same scene.<br />Ten AI models.</>
            )}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-lg md:text-2xl text-neutral-400 leading-relaxed max-w-2xl">
            {pl
              ? "Jeden prompt biegaczki, dziesięć różnych modeli obrazu i wideo. Ten sam pomysł, bardzo różne wyniki - kliknij, przejrzyj i oceń sam."
              : "One runner prompt, ten different image & video models. Same idea, very different results - click through and judge for yourself."}
          </p>
        </Reveal>
      </section>

      {/* ── Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {IMAGES.map((src, i) => (
          <Reveal key={src} delay={Math.min(0.4, i * 0.05)} width="100%">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={pl ? `Otwórz zdjęcie ${i + 1}` : `Open image ${i + 1}`}
              className="group relative block w-full aspect-square overflow-hidden bg-[#0A0A0A] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF00]"
            >
              <img
                src={src}
                alt={pl ? `Biegaczka - model AI ${i + 1}` : `Runner - AI model ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              {/* subtle darken + lime index on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
              <span className="absolute bottom-3 left-3 font-display text-xs tracking-widest text-white/0 group-hover:text-[#D4FF00] transition-colors duration-300">
                {String(i + 1).padStart(2, "0")} / {IMAGES.length}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="text-sm text-neutral-500 mt-10">
          {pl ? "Kliknij dowolne zdjęcie - strzałki ← → przewijają, Esc zamyka." : "Click any image - arrow keys ← → navigate, Esc closes."}
        </p>
      </Reveal>

      {/* ── Lightbox — portal to body so it escapes PageTransition's transform
          stacking context and covers the fixed header too. ── */}
      {mounted && createPortal(
        <AnimatePresence>
        {open !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-sm flex items-center justify-center px-4 py-16 md:p-16"
            onClick={close}
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label={pl ? "Zamknij" : "Close"}
              className="absolute top-5 right-5 md:top-8 md:right-8 z-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-[#D4FF00] transition-colors"
            >
              <X className="w-7 h-7" />
            </button>

            {/* Counter */}
            <span className="absolute top-6 left-6 md:top-9 md:left-10 font-display text-sm tracking-widest text-white/60">
              {String(open + 1).padStart(2, "0")} <span className="text-white/30">/ {String(IMAGES.length).padStart(2, "0")}</span>
            </span>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label={pl ? "Poprzednie" : "Previous"}
              className="absolute left-2 md:left-6 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white/70 hover:text-[#D4FF00] hover:-translate-x-0.5 transition-all"
            >
              <ArrowLeft className="w-7 h-7 md:w-8 md:h-8" />
            </button>

            {/* Image */}
            <motion.img
              key={open}
              src={IMAGES[open]}
              alt={pl ? `Biegaczka - model AI ${open + 1}` : `Runner - AI model ${open + 1}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-full object-contain select-none shadow-[0_30px_120px_rgba(0,0,0,0.7)]"
              draggable={false}
            />

            {/* Next */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label={pl ? "Następne" : "Next"}
              className="absolute right-2 md:right-6 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-white/70 hover:text-[#D4FF00] hover:translate-x-0.5 transition-all"
            >
              <ArrowRight className="w-7 h-7 md:w-8 md:h-8" />
            </button>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </PageTransition>
  );
}
