import { AnimatePresence, motion } from "motion/react";
import { useAudio } from "@/app/context/AudioContext";

/**
 * NowPlayingIndicator - slim "now playing" strip rendered below the main
 * header nav row, right-aligned. Only mounts while audio is playing.
 *
 * Slide-in: y -10 → 0 + opacity 0 → 1, brand easing.
 * Typography: 10px display, uppercase, wide tracking - sits as a quiet
 * annotation, never competes with nav copy.
 *
 * Pointer-events disabled so it never blocks the click area between the
 * nav and the page below.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function NowPlayingIndicator() {
  const { isPlaying, currentTrack } = useAudio();

  return (
    <AnimatePresence>
      {isPlaying && currentTrack && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="pointer-events-none fixed top-[60px] md:top-[78px] right-8 md:right-12 z-[998] font-display text-[10px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-500 flex items-center gap-2"
          aria-live="polite"
        >
          {/* Tiny lime dot - quiet "live" indicator */}
          <span
            aria-hidden="true"
            className="block w-[5px] h-[5px] rounded-full bg-[#D4FF00] animate-pulse"
          />
          <span className="whitespace-nowrap">
            Now playing
            <span className="mx-2 opacity-40">·</span>
            {currentTrack.composer}
            <span className="mx-2 opacity-40">-</span>
            {currentTrack.title}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
