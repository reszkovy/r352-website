/**
 * Page transition direction state — shared between exit (leaving page) and
 * entry (incoming page) so a single navigation feels like one continuous sweep.
 *
 * Direction follows a DETERMINISTIC clockwise cycle (no randomness):
 *
 *   left-to-right → top-to-bottom → right-to-left → bottom-to-top → (repeat)
 *
 * Each direction has exactly one valid successor. This guarantees consecutive
 * navigations never repeat the same direction, and produces a rhythmic
 * compass-rotation effect rather than chaotic randomness.
 *
 * Each PageTransition lazily reads the current direction on mount via
 * `getCurrentDirection()`. The direction advances on every wouter location
 * change via `useTransitionRoll()` mounted in App.tsx — useLayoutEffect fires
 * synchronously after DOM commit, so the outgoing PageTransition's exit
 * animation captures the new direction in time.
 *
 * Mobile: vertical-only alternation (top ↔ bottom). Horizontal sweeps conflict
 * with iOS pull-to-refresh + browser swipe-back gestures.
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
 * Desktop pairing — each direction has a fixed next direction. Together they
 * form a clockwise compass cycle:
 *
 *   L→R then T→B then R→L then B→T then back to L→R
 */
const nextDesktop: Record<TransitionDirection, TransitionDirection> = {
  "left-to-right": "top-to-bottom",
  "top-to-bottom": "right-to-left",
  "right-to-left": "bottom-to-top",
  "bottom-to-top": "left-to-right",
};

/**
 * Mobile pairing — pure vertical alternation, no horizontal sweeps.
 */
const nextMobile: Record<TransitionDirection, TransitionDirection> = {
  "top-to-bottom": "bottom-to-top",
  "bottom-to-top": "top-to-bottom",
  // Horizontal directions shouldn't exist on mobile but if state carries
  // over from a viewport resize, fall back to a sensible vertical successor.
  "left-to-right": "bottom-to-top",
  "right-to-left": "top-to-bottom",
};

/**
 * Advance to the next direction in the deterministic cycle.
 */
export function rollNewDirection(): TransitionDirection {
  const isDesktop =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches;

  currentDirection = (isDesktop ? nextDesktop : nextMobile)[currentDirection];
  return currentDirection;
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
 * concealed in sync with the sweep — never moves, only clips. clipPath axis
 * must match sweep axis to feel cohesive.
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
 * Depth scrim gradient for the OUTGOING page — a soft directional shadow that
 * deepens toward the edge the sweep enters from, selling the illusion that the
 * incoming sweep is a physical layer sliding OVER the exiting page. Fades in
 * during exit, fades out during entry (so the handoff stays seamless).
 */
export function getDepthScrim(direction: TransitionDirection): string {
  switch (direction) {
    case "top-to-bottom":
      return "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)";
    case "bottom-to-top":
      return "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)";
    case "left-to-right":
      return "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)";
    case "right-to-left":
      return "linear-gradient(to left, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%)";
  }
}

/**
 * Mount this hook ONCE at the App level. It advances the deterministic
 * direction cycle on every wouter location change. useLayoutEffect runs
 * synchronously after DOM commit but before browser paint, keeping the new
 * direction available for both outgoing exit and incoming entry animations.
 */
export function useTransitionRoll() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    rollNewDirection();
  }, [location]);
}
