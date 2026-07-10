/**
 * AudioContext - site-wide immersive music layer.
 *
 * Plays one looped track (Mompou's Música Callada I, No. 1 - Angelico,
 * Stephen Hough piano) as ambient backdrop. Triggered by the first CTA
 * hover anywhere on the site (see useCTAHoverMusicTrigger). Manual control
 * via the SoundWaveWidget in the header.
 *
 * Design principles:
 * - NO autoplay on page load - browser will reject it and we want intent
 * - Volume default 0.4 (background, not foreground)
 * - 600ms fade-in / fade-out so transitions never jar
 * - sessionStorage persists "playing" state across navigation
 * - "explicitlyPaused" flag prevents auto-resume after a manual pause
 * - SSR-safe (audio element only created post-mount)
 *
 * Singleton-friendly: only one provider should ever mount, at App root.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const TRACK = {
  title: "Planet Rock",
  composer: "Afrika Bambaataa",
  piece: "Instrumental",
} as const;

const AUDIO_SRC = "/audio/planet-rock-instrumental.mp3";
const TARGET_VOLUME = 0.5;
const FADE_MS = 600;
const SESSION_KEY = "r352-music-playing";
const PAUSED_KEY = "r352-music-paused";

export interface AudioContextValue {
  isPlaying: boolean;
  currentTrack: typeof TRACK | null;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  /**
   * Has the user explicitly paused this session? Used by the CTA-hover
   * trigger to AVOID re-triggering playback after a manual pause.
   */
  explicitlyPaused: boolean;
  /**
   * Lazily builds (once) a Web Audio analyser tapped into the site track,
   * for audio-reactive visuals (/webgl "808"). Routing stays element →
   * analyser → speakers, so playback/volume behave exactly as before.
   * Returns null before mount or if Web Audio is unavailable.
   */
  getAnalyser: () => AnalyserNode | null;
}

const Ctx = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);
  // Web Audio tap for audio-reactive visuals. Created at most ONCE per audio
  // element (createMediaElementSource throws on a second call for the same el).
  const audioGraphRef = useRef<{ ctx: AudioContext; analyser: AnalyserNode } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [explicitlyPaused, setExplicitlyPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Create the audio element once on mount (client only).
  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);

    const el = new Audio(AUDIO_SRC);
    el.loop = true;
    el.preload = "none"; // lazy - don't fetch until user shows intent
    el.volume = 0;
    audioRef.current = el;

    // Restore explicit-pause flag from session storage (survives nav).
    try {
      if (sessionStorage.getItem(PAUSED_KEY) === "1") {
        setExplicitlyPaused(true);
      }
    } catch {
      /* private mode - ignore */
    }

    // Restore "was playing" state - but only attempt resume if NOT explicitly paused
    // and only if a user gesture already unlocked audio on this origin.
    try {
      const wasPlaying = sessionStorage.getItem(SESSION_KEY) === "1";
      const wasPaused = sessionStorage.getItem(PAUSED_KEY) === "1";
      if (wasPlaying && !wasPaused) {
        el.play()
          .then(() => {
            fadeTo(el, TARGET_VOLUME);
            setIsPlaying(true);
          })
          .catch(() => {
            /* autoplay blocked - wait for next CTA hover */
          });
      }
    } catch {
      /* ignore */
    }

    return () => {
      try {
        el.pause();
      } catch {
        /* ignore */
      }
      if (fadeRafRef.current !== null) {
        cancelAnimationFrame(fadeRafRef.current);
        fadeRafRef.current = null;
      }
      audioRef.current = null;
    };
  }, []);

  /** Smooth volume ramp using rAF. Cancels any in-flight ramp. */
  const fadeTo = useCallback((el: HTMLAudioElement, target: number) => {
    if (fadeRafRef.current !== null) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
    const start = el.volume;
    const delta = target - start;
    const startedAt = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startedAt) / FADE_MS);
      // ease-out cubic - matches the site easing language
      const eased = 1 - Math.pow(1 - t, 3);
      el.volume = Math.max(0, Math.min(1, start + delta * eased));
      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        fadeRafRef.current = null;
        if (target === 0) {
          // After fade-out completes, actually pause to free decoder.
          try {
            el.pause();
          } catch {
            /* ignore */
          }
        }
      }
    };
    fadeRafRef.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    // play() runs inside a user gesture - the one place a suspended analyser
    // context is guaranteed to be allowed to resume.
    audioGraphRef.current?.ctx.resume?.().catch(() => {});
    // Clear the explicit-pause flag - playing means user wants sound.
    setExplicitlyPaused(false);
    try {
      sessionStorage.removeItem(PAUSED_KEY);
    } catch {
      /* ignore */
    }
    // Start at 0 if currently silent, then fade up.
    if (el.paused) {
      el.volume = 0;
    }
    const promise = el.play();
    if (promise && typeof promise.then === "function") {
      promise
        .then(() => {
          fadeTo(el, TARGET_VOLUME);
          setIsPlaying(true);
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            /* ignore */
          }
        })
        .catch(() => {
          // Autoplay rejected (iOS Safari without user gesture). Silently fail -
          // the SoundWaveWidget click still works because it IS a user gesture.
          setIsPlaying(false);
        });
    } else {
      // Older browsers without play() promise
      fadeTo(el, TARGET_VOLUME);
      setIsPlaying(true);
    }
  }, [fadeTo]);

  const pause = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    fadeTo(el, 0); // actual pause() fires when fade reaches 0
    setIsPlaying(false);
    setExplicitlyPaused(true);
    try {
      sessionStorage.setItem(PAUSED_KEY, "1");
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const getAnalyser = useCallback((): AnalyserNode | null => {
    const existing = audioGraphRef.current;
    if (existing) {
      // Context may be suspended (created pre-gesture) - resuming is cheap.
      existing.ctx.resume?.().catch(() => {});
      return existing.analyser;
    }
    const el = audioRef.current;
    if (!el || typeof window === "undefined") return null;
    try {
      const Ctor: typeof AudioContext | undefined =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      const ctx = new Ctor();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.55;
      // Capturing the element (createMediaElementSource) is IRREVERSIBLE and
      // reroutes its sound through this context - on a suspended context that
      // would mute the site track. So wire the element only once the context
      // is actually running; until then the analyser just reads silence and
      // the visuals fall back to their BPM clock.
      let wired = false;
      const wire = () => {
        if (wired) return;
        wired = true;
        try {
          const source = ctx.createMediaElementSource(el);
          source.connect(analyser);
          analyser.connect(ctx.destination);
        } catch {
          /* element already captured elsewhere - leave routing untouched */
        }
      };
      ctx.onstatechange = () => {
        if (ctx.state === "running") wire();
      };
      if (ctx.state === "running") {
        wire();
      } else {
        const tryResume = () => ctx.resume().then(wire).catch(() => {});
        tryResume();
        // Retry from a real user gesture (WebKit won't resume outside one).
        window.addEventListener("pointerdown", tryResume, { once: true });
        window.addEventListener("keydown", tryResume, { once: true });
      }
      audioGraphRef.current = { ctx, analyser };
      return analyser;
    } catch {
      return null;
    }
  }, []);

  const value = useMemo<AudioContextValue>(
    () => ({
      isPlaying,
      currentTrack: mounted ? TRACK : null,
      play,
      pause,
      toggle,
      explicitlyPaused,
      getAnalyser,
    }),
    [isPlaying, mounted, play, pause, toggle, explicitlyPaused, getAnalyser]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Read the audio state. Returns safe defaults if used outside the provider. */
export function useAudio(): AudioContextValue {
  const v = useContext(Ctx);
  if (!v) {
    return {
      isPlaying: false,
      currentTrack: null,
      play: () => {},
      pause: () => {},
      toggle: () => {},
      explicitlyPaused: false,
      getAnalyser: () => null,
    };
  }
  return v;
}
