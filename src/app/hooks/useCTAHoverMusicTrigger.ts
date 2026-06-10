import { useEffect } from "react";
import { useAudio } from "@/app/context/AudioContext";

/**
 * Global delegated pointerover listener — fires AudioContext.play() the FIRST
 * time a user hovers any element tagged with `.js-music-trigger`. Once playing
 * (or once explicitly paused by the user), the listener self-removes.
 *
 * Why delegated:
 * - Zero per-component wiring beyond a className on the CTA primitive
 * - Survives lazy-loaded routes (handlers attach at App level)
 * - Easy to scope to only the CTAs we want (no header nav, no theme toggle)
 *
 * Skipped entirely on touch devices — hover is meaningless there, the
 * SoundWaveWidget acts as tap-to-play instead.
 */
export function useCTAHoverMusicTrigger() {
  const { play, isPlaying, explicitlyPaused } = useAudio();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Touch detection — coarse pointer means no real hover
    const isTouch =
      window.matchMedia?.("(hover: none), (pointer: coarse)")?.matches ?? false;
    if (isTouch) return;

    // If already playing or user explicitly paused, do not wire the trigger.
    if (isPlaying || explicitlyPaused) return;

    let armed = true;

    const handler = (e: PointerEvent) => {
      if (!armed) return;
      // Skip touch-derived events (some browsers fire pointerover from taps)
      if (e.pointerType === "touch") return;
      const target = e.target as Element | null;
      if (!target) return;
      // Match the CTA itself OR any descendant inside a CTA (e.g. magnetic
      // button has inner span/icon wrappers).
      const trigger = target.closest?.(".js-music-trigger");
      if (!trigger) return;
      armed = false;
      play();
    };

    document.addEventListener("pointerover", handler, { passive: true });
    return () => {
      document.removeEventListener("pointerover", handler);
    };
  }, [play, isPlaying, explicitlyPaused]);
}
