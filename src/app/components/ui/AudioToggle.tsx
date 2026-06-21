import { useEffect, useSyncExternalStore } from "react";
import { useLocation } from "wouter";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

/**
 * Opt-in UI sound layer - Web Audio API, zero dependencies.
 *
 * Consent-first: OFF by default, preference persisted in localStorage.
 * The AudioContext is only ever created inside a user gesture (the toggle
 * click, or - when restoring a saved "on" preference - the first
 * pointerdown/keydown of the session). No autoplay, ever.
 *
 * Sounds (very quiet, master gain ≤ 0.15):
 *   - sparks.wav     → short tick on nav-link hover (delegated listener)
 *   - transition.wav → whoosh on wouter route change
 *
 * The engine is a MODULE-LEVEL SINGLETON: the toggle renders in both the
 * desktop nav and the mobile overlay, and both instances must share one
 * AudioContext, one enabled flag, and fire each sound exactly once.
 *
 * Icon: 3-bar equalizer - flat/static when off, animated when on
 * (animation suppressed under prefers-reduced-motion).
 */

const STORAGE_KEY = "r352-audio";
const MASTER_GAIN = 0.15;
const SPARK_GAIN = 0.45; // × master → ~0.07 effective
const WHOOSH_GAIN = 0.8; // × master → ~0.12 effective
const HOVER_THROTTLE_MS = 150;

type BufferName = "sparks" | "transition";
const SOUND_URLS: Record<BufferName, string> = {
  sparks: "/sounds/sparks.wav",
  transition: "/sounds/transition.wav",
};

// ─── Singleton engine (module scope) ─────────────────────────────────────────

let audioEnabled = false;
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
const buffers: Partial<Record<BufferName, AudioBuffer>> = {};
const subscribers = new Set<() => void>();

let restoredFromStorage = false;
let unlockListenersAttached = false;
let hoverListenerAttached = false;
let lastHoverAt = 0;
let lastHoverEl: Element | null = null;
let lastWhooshLocation: string | null = null;

function getEnabled(): boolean {
  return audioEnabled;
}

function subscribe(cb: () => void): () => void {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

function notify() {
  subscribers.forEach((cb) => cb());
}

/** Create/resume the AudioContext. MUST be called from a user gesture. */
function ensureContext() {
  if (typeof window === "undefined") return;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = MASTER_GAIN;
    master.connect(ctx.destination);
    // Fire-and-forget decode of both samples.
    (Object.keys(SOUND_URLS) as BufferName[]).forEach((name) => {
      fetch(SOUND_URLS[name])
        .then((r) => r.arrayBuffer())
        .then((ab) => ctx!.decodeAudioData(ab))
        .then((buf) => {
          buffers[name] = buf;
        })
        .catch(() => {
          /* sound asset missing - stay silent */
        });
    });
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
}

function playSound(name: BufferName, gain: number) {
  const buffer = buffers[name];
  if (!audioEnabled || !ctx || !master || !buffer || ctx.state !== "running") return;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const g = ctx.createGain();
  g.gain.value = gain;
  src.connect(g);
  g.connect(master);
  src.start();
}

/** Delegated nav-link hover → spark tick. Attached once, guarded internally. */
function attachHoverListener() {
  if (hoverListenerAttached || typeof document === "undefined") return;
  hoverListenerAttached = true;
  document.addEventListener(
    "pointerover",
    (e: PointerEvent) => {
      if (!audioEnabled) return;
      if (e.pointerType === "touch") return; // hover doesn't exist on touch
      const target = e.target as Element | null;
      const link = target?.closest("header a, header button, nav a");
      if (!link) {
        lastHoverEl = null;
        return;
      }
      if (link === lastHoverEl) return;
      const now = performance.now();
      if (now - lastHoverAt < HOVER_THROTTLE_MS) return;
      lastHoverAt = now;
      lastHoverEl = link;
      playSound("sparks", SPARK_GAIN);
    },
    { passive: true }
  );
}

/** Restore persisted "on" preference - context still waits for a gesture. */
function restorePreferenceOnce() {
  if (restoredFromStorage || typeof window === "undefined") return;
  restoredFromStorage = true;
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* private mode - ignore */
  }
  if (saved !== "on") return;
  audioEnabled = true;
  attachHoverListener();
  if (!unlockListenersAttached) {
    unlockListenersAttached = true;
    const unlock = () => {
      ensureContext();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      unlockListenersAttached = false;
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
  }
  notify();
}

function toggleAudio() {
  audioEnabled = !audioEnabled;
  try {
    localStorage.setItem(STORAGE_KEY, audioEnabled ? "on" : "off");
  } catch {
    /* ignore */
  }
  if (audioEnabled) {
    // We are inside a click - the one place a context may be created.
    ensureContext();
    attachHoverListener();
    // Confirmation tick so the user hears that sound is now live
    // (slight delay so the buffer has a chance to finish decoding).
    window.setTimeout(() => playSound("sparks", SPARK_GAIN), 200);
  }
  notify();
}

// ─── Component (pure view over the singleton) ────────────────────────────────

export function AudioToggle({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion();
  const [location] = useLocation();
  const enabled = useSyncExternalStore(subscribe, getEnabled, () => false);

  useEffect(() => {
    restorePreferenceOnce();
  }, []);

  // Route change → transition whoosh. Module-level location guard makes this
  // idempotent across the two mounted instances (desktop nav + mobile menu).
  useEffect(() => {
    if (lastWhooshLocation === null) {
      lastWhooshLocation = location; // first mount - no sound on initial load
      return;
    }
    if (lastWhooshLocation === location) return;
    lastWhooshLocation = location;
    playSound("transition", WHOOSH_GAIN);
  }, [location]);

  const animate = enabled && !reduced;

  return (
    <button
      onClick={toggleAudio}
      aria-label={enabled ? "Turn UI sounds off" : "Turn UI sounds on"}
      aria-pressed={enabled}
      title={enabled ? "Sound on" : "Sound off"}
      className={`inline-flex items-center justify-center w-7 h-7 transition-colors duration-300 ${
        enabled ? "text-[#D4FF00]" : "text-neutral-500 hover:text-[#D4FF00]"
      } ${className}`}
    >
      {/* 3-bar equalizer - bars rest flat, bounce when audio is on */}
      <span className="flex items-end gap-[3px] h-[14px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-[3px] rounded-[1px] bg-current"
            style={{
              height: animate ? undefined : enabled ? "10px" : "3px",
              animation: animate
                ? `r352-eq 0.9s ease-in-out ${i * 0.18}s infinite alternate`
                : "none",
              transition: "height 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        ))}
      </span>
      <style>{`
        @keyframes r352-eq {
          0% { height: 4px; }
          100% { height: 14px; }
        }
      `}</style>
    </button>
  );
}
