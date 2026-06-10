import { useId, useState } from "react";
import { motion } from "motion/react";
import { useAudio } from "@/app/context/AudioContext";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

/**
 * SoundWaveWidget — premium 4-bar audio visualizer + click-to-toggle in the
 * top-right of the AgencyHeader. Replaces the previous AudioToggle (the
 * "szum" / UI sound 3-bar equalizer) per client direction 2026-06-10.
 *
 * States:
 *   - idle (paused) → bars resting at low height, low opacity. Pulse on hover.
 *   - playing       → bars EQ-bounce in staggered loop
 *
 * Tooltip motion is hand-rolled from the ChipTooltip pattern (AgencyHero.tsx)
 * — fade + slide(6px) + scale(0.97) + blur, ease cubic-bezier(0.22, 1, 0.36, 1).
 * The ChipTooltip COMPONENT itself is not reused (it's tuned for chip layout
 * with arrow pointer + max-width); we replicate only the motion language.
 *
 * Accessibility:
 *   - aria-label "Toggle background music"
 *   - aria-pressed reflects play state
 *   - prefers-reduced-motion: bars animate but with reduced delta + slower
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
  const idleHeight = isPlaying ? "10px" : hovered ? "8px" : "4px";

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
        aria-label="Toggle background music"
        aria-pressed={isPlaying}
        aria-describedby={tooltipId}
        className={`inline-flex items-center justify-center w-7 h-7 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none focus-visible:ring-1 focus-visible:ring-[#D4FF00]/60 ${
          isPlaying ? "text-[#D4FF00]" : "text-neutral-500 hover:text-[#D4FF00]"
        }`}
      >
        <span
          className="flex items-end gap-[3px] h-[16px]"
          aria-hidden="true"
        >
          {Array.from({ length: BAR_COUNT }, (_, i) => (
            <span
              key={i}
              className="block w-[3px] rounded-[1px] bg-current"
              style={{
                height: animate ? undefined : idleHeight,
                animation: animate
                  ? `r352-soundwave ${reduced ? "1.6s" : "0.9s"} ease-in-out ${BAR_DELAYS[i] ?? 0}s infinite alternate`
                  : "none",
                transition: "height 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                opacity: isPlaying ? 1 : hovered ? 0.85 : 0.55,
              }}
            />
          ))}
        </span>
        <style>{`
          @keyframes r352-soundwave {
            0%   { height: 4px; }
            50%  { height: 12px; }
            100% { height: 16px; }
          }
        `}</style>
      </button>

      {/* Hover tooltip — same motion language as ChipTooltip, lighter chrome.
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
            {isPlaying ? "Now playing — click to pause" : "Click to play music"}
          </span>
        </span>
      </motion.span>
    </span>
  );
}
