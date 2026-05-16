import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";

interface ScrollSequenceProps {
  /** Number of frames in the sequence */
  frameCount?: number;
  /** Path pattern — appended with `-{padded-idx}.webp` (e.g. "/scroll-frames/frame") */
  framePath?: string;
  /** Zero-pad width for frame index (e.g. 3 → frame-000 ... frame-119) */
  padDigits?: number;
  /** Total scrollable height (drives how long the scroll-driven animation lasts). */
  pinHeight?: string;
  /** Optional className for the outer scroll-trigger container */
  className?: string;
  /** Background color shown behind canvas (and during initial load) */
  backgroundColor?: string;
  /** Optional children rendered as overlay (text manifest, captions, etc.) on top of canvas */
  children?: React.ReactNode;
  /** Fade children out over scroll progress range — [startProgress, endProgress] in 0..1. */
  fadeChildrenAt?: [number, number];
  /** Optional className for the overlay wrapper inside the fixed canvas layer */
  overlayClassName?: string;
}

/**
 * ScrollSequence — Apple-style scroll-driven frame sequence with separated
 * entry animations for image vs typography.
 *
 * ENTRY ANIMATION LAYERS (on /philosophy navigation):
 *   1. CANVAS (image): opacity 0 → 1, 900ms cubic decel. Fades in as soon as
 *      first frame loads. Smooth editorial reveal of the scene.
 *
 *   2. OVERLAY (typography): Framer Motion animation matching PageTransition
 *      timing exactly — opacity + translateY(30→0) + filter blur(24→0),
 *      delay 0.3s + duration 0.9s. Typography appears IDENTICALLY to other
 *      subpages, synced with PageTransition for the rest of the page content.
 *
 * ARCHITECTURE:
 *   - Invisible trigger spacer in normal flow (height = pinHeight).
 *   - Canvas + overlay rendered via Portal to document.body to escape ALL
 *     ancestor styles (transform, filter, overflow) that would break fixed
 *     positioning.
 *   - Three scroll phases: PLAY (canvas pinned, frames advance), EXIT
 *     (canvas slides up over last vh), AFTER (canvas off-screen).
 *   - DOM mutations via refs (not React state) per scroll frame for 60fps.
 */
export function ScrollSequence({
  frameCount = 120,
  framePath = "/scroll-frames/frame",
  padDigits = 3,
  pinHeight = "300vh",
  className = "",
  backgroundColor = "#0a0a0a",
  children,
  fadeChildrenAt,
  overlayClassName = "",
}: ScrollSequenceProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // SSR guard for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Preload all frames ───────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let cancelled = false;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const idx = String(i).padStart(padDigits, "0");
      img.src = `${framePath}-${idx}.webp`;
      img.onload = () => {
        if (cancelled) return;
        setLoadedCount((prev) => prev + 1);
        if (i === 0) setFirstFrameReady(true);
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [frameCount, framePath, padDigits]);

  // ─── Scroll listener: position canvas + draw current frame ────────────
  useEffect(() => {
    const trigger = triggerRef.current;
    const wrapper = wrapperRef.current;
    if (!trigger || !wrapper) return;

    let rafId = 0;

    const update = () => {
      const triggerRect = trigger.getBoundingClientRect();
      const vh = window.innerHeight;
      const triggerHeight = triggerRect.height;
      const playDistance = Math.max(1, triggerHeight - vh);
      const scrolled = -triggerRect.top;

      let canvasTopPx = 0;
      let progress = 0;

      if (scrolled < 0) {
        // BEFORE trigger entered viewport — canvas at top, frame 0
        canvasTopPx = 0;
        progress = 0;
      } else if (scrolled < playDistance) {
        // PLAY — canvas pinned at viewport top, frames advance
        canvasTopPx = 0;
        progress = scrolled / playDistance;
      } else if (scrolled < triggerHeight) {
        // EXIT — canvas anchored, slides up as scroll continues
        canvasTopPx = -(scrolled - playDistance);
        progress = 1;
      } else {
        // AFTER — canvas off-screen above viewport
        canvasTopPx = -vh;
        progress = 1;
      }

      // Apply translate (synced to scroll, no easing — must be instant per frame)
      wrapper.style.transform = `translate3d(0, ${canvasTopPx}px, 0)`;

      // Optional overlay scroll-tied fade (separate from entry animation)
      if (overlayRef.current && fadeChildrenAt) {
        const [start, end] = fadeChildrenAt;
        let overlayOpacity = 1;
        if (progress <= start) overlayOpacity = 1;
        else if (progress >= end) overlayOpacity = 0;
        else overlayOpacity = 1 - (progress - start) / (end - start);
        overlayRef.current.style.opacity = `${overlayOpacity}`;
      }

      // Draw current frame
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const idx = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(progress * frameCount)),
          );
          const img = imagesRef.current[idx];
          if (img && img.complete && img.naturalWidth > 0) {
            if (canvas.width !== img.naturalWidth) {
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
            }
            ctx.drawImage(img, 0, 0);
          }
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Initial paint + deferred re-updates to handle PageTransition layout settle
    update();
    const timers: ReturnType<typeof setTimeout>[] = [
      setTimeout(update, 100),
      setTimeout(update, 400),
      setTimeout(update, 900),
      setTimeout(update, 1400),
    ];

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
    };
  }, [frameCount, firstFrameReady, fadeChildrenAt]);

  const loadingProgress = Math.round((loadedCount / frameCount) * 100);

  return (
    <>
      {/* Scroll trigger spacer — invisible, adds scrollable height to page */}
      <div
        ref={triggerRef}
        className={`relative ${className}`}
        style={{ height: pinHeight }}
        aria-hidden="true"
      />

      {/* Portal layer — canvas + overlay rendered to body to escape ancestor styles */}
      {mounted &&
        createPortal(
          <div
            ref={wrapperRef}
            className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-0 pointer-events-none"
            style={{
              backgroundColor,
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
            }}
            aria-hidden="true"
          >
            {/* CANVAS LAYER — smooth fade-in once first frame loads (900ms cubic decel).
                Mobile: 100vw × 100vw square at top of viewport (object-cover object-right
                keeps the character subject in frame since they're in right third of source).
                Desktop md+: fills viewport (inset-0 + cover + center, unchanged). */}
            <canvas
              ref={canvasRef}
              className="absolute left-0 right-0 top-0 w-screen aspect-square md:inset-0 md:w-full md:h-full md:aspect-auto object-cover object-right md:object-center"
              style={{
                opacity: firstFrameReady ? 1 : 0,
                transition: "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            {/* Loading state — visible only until first frame ready */}
            {!firstFrameReady && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-display uppercase tracking-[0.25em] text-white/40">
                  Loading sequence · {loadingProgress}%
                </span>
              </div>
            )}

            {/* OVERLAY LAYER — Framer Motion entry matching PageTransition timing.
                Typography (children) animates with opacity + translateY for an
                editorial "fade-in + rise" feel, synced to PageTransition timing.
                NOTE: filter: blur removed (kept opacity + y only) — blur filter
                is GPU-expensive on mobile and was causing jank during the
                concurrent scroll-driven wrapper translate. Net visual difference
                is subtle; perf benefit is significant on mid-tier phones. */}
            {children && (
              <motion.div
                ref={overlayRef}
                className={`absolute inset-0 ${overlayClassName}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.9,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                onAnimationComplete={() => {
                  // Clear inline transform after entry — prevents stale
                  // containing block from y transform sticking around.
                  const el = overlayRef.current;
                  if (el) {
                    el.style.transform = "";
                    el.style.willChange = "";
                  }
                }}
              >
                {children}
              </motion.div>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
