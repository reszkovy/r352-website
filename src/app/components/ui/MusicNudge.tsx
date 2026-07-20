import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAudio } from "@/app/context/AudioContext";
import { useLanguage } from "@/app/context/LanguageContext";
import { X } from "lucide-react";

/**
 * MusicNudge - a one-time, low-key suggestion that the site plays better with
 * sound (the hero glyph field syncs to the track). Slides in ~3s after the
 * home hero mounts, auto-hides after 14s, never returns in the session once
 * dismissed/acted on. Suppressed entirely when music is already playing or
 * the user explicitly paused it before (their choice stands).
 */
const KEY = "r352-music-nudge";

export function MusicNudge() {
  const { isPlaying, explicitlyPaused, play } = useAudio();
  const { language } = useLanguage();
  const pl = language === "pl";
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") return;
    } catch {
      /* private mode - just show it */
    }
    const appear = setTimeout(() => setShow(true), 3200);
    const vanish = setTimeout(() => dismiss(), 17000);
    return () => {
      clearTimeout(appear);
      clearTimeout(vanish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const onPlay = () => {
    play();
    dismiss();
  };

  // Music already on, or the user said no once - don't nag.
  if (isPlaying || explicitlyPaused) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: "-50%", y: -18 }}
          animate={{ opacity: 1, x: "-50%", y: 0 }}
          exit={{ opacity: 0, x: "-50%", y: -12 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-20 md:top-24 left-1/2 z-[9000] flex items-center gap-2.5 rounded-full border border-white/12 bg-[#0A0A0A]/85 backdrop-blur-md pl-3.5 pr-1.5 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
        >
          {/* tiny equalizer - hints at sound without a word */}
          <span className="flex items-end gap-[3px] h-3.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-[#D4FF00]"
                animate={{ height: ["30%", "100%", "45%", "85%", "30%"] }}
                transition={{ duration: 1.1 + i * 0.25, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </span>
          <span className="text-[11px] text-white/70 whitespace-nowrap">
            {pl ? "Ta strona ma soundtrack." : "This site has a soundtrack."}
          </span>
          <button
            onClick={onPlay}
            className="rounded-full bg-[#D4FF00] text-black font-display uppercase tracking-[0.14em] text-[10px] px-3 py-1 hover:bg-white transition-colors duration-300 whitespace-nowrap"
          >
            {pl ? "Włącz" : "Play"}
          </button>
          <button
            onClick={dismiss}
            aria-label={pl ? "Zamknij" : "Dismiss"}
            className="p-1.5 text-white/40 hover:text-white transition-colors duration-300"
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
