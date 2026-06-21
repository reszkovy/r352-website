import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { R352Symbol } from "@/app/components/agency/R352Logo";

/**
 * Entry preloader - black screen, r352 mark + tabular counter 0→100,
 * two-stage curtain exit (lime sliver sweep leads, black lifts behind it).
 *
 * Pure overlay: page content mounts immediately underneath (SEO/LCP safe).
 * Total runtime ≤2.2s. Plays ONCE per browser session.
 *
 * Hard skip conditions (renders nothing, zero side effects):
 *   - navigator.webdriver (Puppeteer prerender - never delays __PRERENDER_READY__)
 *   - prefers-reduced-motion
 *   - sessionStorage flag already set (subsequent in-session loads)
 */

const SESSION_KEY = "r352-preloader-played";

// Counter timing (ms) - fast start, hold at ~90, snap to 100.
const RISE_MS = 950; // 0 → 90, easeOutQuart (fast start, decelerating)
const HOLD_UNTIL_MS = 1200; // hold at 90
const EXIT_AT_MS = 1280; // snap to 100, then begin curtain exit
// Curtain exit: lime sweep 0.85s, black lifts at +0.2s for 0.65s → done ~2.13s total.

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function shouldPlay(): boolean {
  if (typeof window === "undefined") return false;
  if (navigator.webdriver) return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return false;
  } catch {
    return false;
  }
  return true;
}

export function Preloader() {
  // Decided synchronously before first paint - no flash, no layout shift.
  const [active] = useState<boolean>(shouldPlay);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    // Mark played immediately - even an interrupted load counts as a play.
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* private mode - ignore */
    }

    // Lock scroll while the curtain is down.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < RISE_MS) {
        setCount(Math.round(90 * easeOutQuart(elapsed / RISE_MS)));
      } else if (elapsed < HOLD_UNTIL_MS) {
        setCount(90);
      } else if (elapsed < EXIT_AT_MS) {
        setCount(100);
      } else {
        setCount(100);
        setExiting(true);
        return; // stop the loop
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  const handleExitComplete = () => {
    setDone(true);
    document.body.style.overflow = "";
  };

  if (!active || done) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <motion.div
          key="r352-preloader"
          className="fixed inset-0 z-[10000]"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            // Near-instant fade AFTER the curtain choreography (0.85s) completes -
            // keeps the wrapper alive so AnimatePresence waits for all children.
            transition: { duration: 0.05, delay: 0.87 },
          }}
        >
          {/* Stage 2 - black curtain lifts, revealing the hero */}
          <motion.div
            className="absolute inset-0 bg-[#0A0A0A] z-[1]"
            initial={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
            }}
          />

          {/* Stage 1 - lime sliver sweeps up through the screen first */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[18vh] bg-[#D4FF00] z-[2]"
            initial={{ y: "100%" }}
            exit={{
              y: "-560%", // clears the full viewport (18vh band × ~5.6)
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
            }}
          />

          {/* Branding - logo mark centered, concealed upward in sync with the black lift */}
          <motion.div
            className="absolute inset-0 z-[3] flex items-center justify-center"
            initial={{ clipPath: "inset(0 0 0 0)" }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
            }}
          >
            <div className="flex flex-col items-center gap-5">
              <R352Symbol className="w-9 h-9 md:w-11 md:h-11" color="#D4FF00" />
              <span className="text-[11px] md:text-sm font-display uppercase tracking-[0.3em] text-[#D4FF00]/70">
                design · systems · ai
              </span>
            </div>
          </motion.div>

          {/* Tabular counter - bottom right, snaps out with the black curtain */}
          <motion.div
            className="absolute bottom-6 right-8 md:bottom-10 md:right-12 z-[3]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <span className="font-display text-[#D4FF00] text-6xl md:text-8xl leading-none tabular-nums tracking-tight select-none">
              {count}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
