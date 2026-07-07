import { useId, useState } from "react";
import { motion } from "motion/react";
import { useAudio } from "@/app/context/AudioContext";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

/**
 * SoundWaveWidget - premium 4-bar audio visualizer + click-to-toggle in the
 * top-right of the AgencyHeader. Replaces the previous AudioToggle (the
 * "szum" / UI sound 3-bar equalizer) per client direction 2026-06-10.
 *
 * States:
 *   - idle (paused) → soft outline speaker icon with rounded sound waves
 *                     (warm vector style per client direction 2026-06-10 -
 *                     the resting bars read as a collapsed menu). Waves
 *                     "breathe" gently on hover.
 *   - playing       → bars EQ-bounce in staggered loop (unchanged)
 *   - idle ↔ playing → crossfade + scale, ease cubic-bezier(0.22, 1, 0.36, 1)
 *
 * Tooltip motion is hand-rolled from the ChipTooltip pattern (AgencyHero.tsx)
 * - fade + slide(6px) + scale(0.97) + blur, ease cubic-bezier(0.22, 1, 0.36, 1).
 * The ChipTooltip COMPONENT itself is not reused (it's tuned for chip layout
 * with arrow pointer + max-width); we replicate only the motion language.
 *
 * Accessibility:
 *   - aria-label "Play ambient soundtrack" (idle) / "Pause ambient soundtrack" (playing)
 *   - aria-pressed reflects play state
 *   - prefers-reduced-motion: bars animate but with reduced delta + slower;
 *     idle hover breathing is disabled
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BAR_COUNT = 4;

// Per-bar phase offsets so the EQ doesn't look mechanical.
const BAR_DELAYS = [0, 0.18, 0.36, 0.12];

export function SoundWaveWidget({ className = "" }: { className?: string }) {
  const { isPlaying, toggle } = useAudio();
  const reduced = useReducedMotion();
  const tooltipId = useId();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const animate = isPlaying && !reduced;
  const breathe = !isPlaying && hovered && !reduced;
  const crossfade =
    "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <span className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => {
          setHovered(true);
          setTooltipOpen(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
          setTooltipOpen(false);
        }}
        onFocus={() => setTooltipOpen(true)}
        onBlur={() => setTooltipOpen(false)}
        aria-label={
          isPlaying ? "Pause ambient soundtrack" : "Play ambient soundtrack"
        }
        aria-pressed={isPlaying}
        aria-describedby={tooltipId}
        className={`inline-flex items-center justify-center w-7 h-7 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-1 focus-visible:ring-[#D4FF00]/60 ${
          isPlaying ? "text-[#D4FF00]" : "text-neutral-500 hover:text-[#D4FF00]"
        }`}
      >
        <span
          className="relative block w-[20px] h-[20px]"
          aria-hidden="true"
        >
          {/* IDLE - universal outline PLAY (client direction 2026-06-10):
              same visual language as the ThemeToggle sun (lucide-style
              1.75 stroke outline) - instantly readable as "play", no
              ambiguity with a collapsed menu. Subtle scale-breathe on hover. */}
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: isPlaying ? 0 : hovered ? 1 : 0.8,
              transform: isPlaying ? "scale(0.55)" : "scale(1)",
              transition: crossfade,
              pointerEvents: "none",
            }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animation: breathe
                  ? "r352-wave-breathe 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0s infinite"
                  : "none",
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            >
              {/* Play triangle - rounded joins, friendly outline */}
              <path d="M8.5 6.8c0-1 1.1-1.6 2-1.1l8 4.7c.9.5.9 1.7 0 2.2l-8 4.7c-.9.5-2-.1-2-1.1V6.8Z" />
            </svg>
          </span>

          {/* PLAYING - 4-bar EQ (unchanged animation) */}
          <span
            className="absolute inset-0 flex items-end justify-center gap-[3px] py-[2px]"
            style={{
              opacity: isPlaying ? 1 : 0,
              transform: isPlaying ? "scale(1)" : "scale(0.55)",
              transition: crossfade,
              pointerEvents: "none",
            }}
          >
            {Array.from({ length: BAR_COUNT }, (_, i) => (
              <span
                key={i}
                className="block w-[3px] rounded-[1px] bg-current"
                style={{
                  height: animate ? undefined : "10px",
                  animation: animate
                    ? `r352-soundwave ${reduced ? "1.6s" : "0.9s"} ease-in-out ${BAR_DELAYS[i] ?? 0}s infinite alternate`
                    : "none",
                  transition: "height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            ))}
          </span>
        </span>
        <style>{`
          @keyframes r352-soundwave {
            0%   { height: 4px; }
            50%  { height: 12px; }
            100% { height: 16px; }
          }
          @keyframes r352-wave-breathe {
            0%, 100% { opacity: 0.65; transform: scale(1); }
            50%      { opacity: 1;    transform: scale(1.12); }
          }
        `}</style>
      </button>

      {/* Hover tooltip - same motion language as ChipTooltip, lighter chrome.
          Positioned BELOW the widget (top-full) since the widget lives at the
          very top of the page and there's no headroom above. */}
      <motion.span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute top-full right-0 mt-3 w-max max-w-[200px] z-[60]"
        initial={false}
        animate={tooltipOpen ? "open" : "closed"}
        variants={{
          closed: {
            opacity: 0,
            y: -6,
            scale: 0.97,
            filter: "blur(6px)",
            transitionEnd: { visibility: "hidden" },
          },
          open: {
            visibility: "visible",
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <span className="relative block px-3 py-2 bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/10 rounded-[6px] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]">
          <span
            aria-hidden="true"
            className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-[#D4FF00]/50 to-transparent"
          />
          <span className="block text-[10px] leading-snug text-neutral-100 normal-case tracking-normal font-sans text-center whitespace-nowrap">
            {isPlaying ? "Turn off music" : "Play music"}
          </span>
        </span>
      </motion.span>
    </span>
  );
}
