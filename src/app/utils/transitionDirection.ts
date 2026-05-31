/**
 * Page transition direction state — shared between exit (leaving page) and
 * entry (incoming page) so a single navigation feels like one continuous sweep.
 *
 * Each PageTransition lazily reads the current direction on mount via
 * `getCurrentDirection()`. The direction is rolled fresh on every wouter
 * location change by `useTransitionRoll()` mounted in App.tsx — this fires
 * via useLayoutEffect (synchronously after DOM commit, before paint), so the
 * outgoing PageTransition's exit animation captures the new direction in time.
 *
 * Mobile: vertical-only (top/bottom). Horizontal sweeps conflict with iOS
 * pull-to-refresh + browser swipe gestures.
 */

import { useLayoutEffect } from "react";
import { useLocation } from "wouter";

export type TransitionDirection =
  | "top-to-bottom"
  | "bottom-to-top"
  | "left-to-right"
  | "right-to-left";

let currentDirection: TransitionDirection = "bottom-to-top"; // matches original sweep

export function getCurrentDirection(): TransitionDirection {
  return currentDirection;
}

/**
 * Pick a fresh random direction. Avoids repeating the previous one for
 * more visible variety across consecutive navigations. Mobile gets vertical
 * only.
 */
export function rollNewDirection(): TransitionDirection {
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;

  const pool: TransitionDirection[] = isDesktop
    ? ["top-to-bottom", "bottom-to-top", "left-to-right", "right-to-left"]
    : ["top-to-bottom", "bottom-to-top"];

  // Don't repeat — keeps consecutive transitions visibly different
  const filtered = pool.filter((d) => d !== currentDirection);
  const next = filtered[Math.floor(Math.random() * filtered.length)];
  currentDirection = next;
  return next;
}

/**
 * Sweep layer props for a given direction.
 *
 * The sweep is a full-viewport rectangle. On ENTRY it sits at center (covers
 * screen) and animates OFF screen in the chosen direction. On EXIT it starts
 * OFF screen on the opposite side and animates back to center. Combined with
 * mode="wait" AnimatePresence, this creates a continuous wipe.
 */
export function getSweepProps(direction: TransitionDirection): {
  axis: "x" | "y";
  initial: { x?: string; y?: string };
  animate: { x?: string; y?: string };
  exit: { x?: string[]; y?: string[] };
} {
  switch (direction) {
    case "top-to-bottom":
      return {
        axis: "y",
        initial: { y: "0%" },
        animate: { y: "100%" },
        exit: { y: ["-100%", "0%"] },
      };
    case "bottom-to-top":
      return {
        axis: "y",
        initial: { y: "0%" },
        animate: { y: "-100%" },
        exit: { y: ["100%", "0%"] },
      };
    case "left-to-right":
      return {
        axis: "x",
        initial: { x: "0%" },
        animate: { x: "100%" },
        exit: { x: ["-100%", "0%"] },
      };
    case "right-to-left":
      return {
        axis: "x",
        initial: { x: "0%" },
        animate: { x: "-100%" },
        exit: { x: ["100%", "0%"] },
      };
  }
}

/**
 * Static branding layer (logo + tagline) uses clipPath to be revealed and
 * concealed in sync with the sweep — never moves, only clips. clipPath must
 * adapt to the sweep axis to feel cohesive.
 */
export function getBrandingClipPath(direction: TransitionDirection): {
  initial: string;
  animate: string;
  exit: string[];
} {
  switch (direction) {
    case "top-to-bottom":
      return {
        initial: "inset(0 0 0 0)",
        animate: "inset(100% 0 0 0)",
        exit: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
      };
    case "bottom-to-top":
      return {
        initial: "inset(0 0 0 0)",
        animate: "inset(0 0 100% 0)",
        exit: ["inset(100% 0 0 0)", "inset(0 0 0 0)"],
      };
    case "left-to-right":
      return {
        initial: "inset(0 0 0 0)",
        animate: "inset(0 0 0 100%)",
        exit: ["inset(0 100% 0 0)", "inset(0 0 0 0)"],
      };
    case "right-to-left":
      return {
        initial: "inset(0 0 0 0)",
        animate: "inset(0 100% 0 0)",
        exit: ["inset(0 0 0 100%)", "inset(0 0 0 0)"],
      };
  }
}

/**
 * Mount this hook ONCE at the App level. It rolls a fresh direction on every
 * wouter location change. useLayoutEffect runs synchronously after DOM commit
 * but before browser paint, which keeps the new direction available for both
 * the outgoing PageTransition's exit and the incoming PageTransition's entry.
 */
export function useTransitionRoll() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    rollNewDirection();
  }, [location]);
}
