import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ScrollSequenceProps {
  /** Number of frames in the sequence */
  frameCount?: number;
  /** Path pattern — appended with `-{padded-idx}.webp` (e.g. "/scroll-frames/frame") */
  framePath?: string;
  /** Zero-pad width for frame index (e.g. 3 → frame-000 ... frame-119) */
  padDigits?: number;
  /** Total scrollable height (drives how long the scroll-driven animation lasts).
   *  Higher = slower playback. 300vh = 3 viewport heights of scroll. */
  pinHeight?: string;
  /** Optional className for the outer scroll-trigger container */
  className?: string;
  /** Background color shown behind canvas (and during initial load) */
  backgroundColor?: string;
  /** Optional children rendered as overlay (text manifest, captions, etc.) on top of canvas */
  children?: React.ReactNode;
  /** Fade children out over scroll progress range — [startProgress, endProgress] in 0..1.
   *  If omitted, overlay stays fully visible throughout the sequence. */
  fadeChildrenAt?: [number, number];
  /** Optional className for the overlay wrapper inside the fixed canvas layer */
  overlayClassName?: string;
}

/**
 * ScrollSequence — Apple-style scroll-driven frame sequence.
 *
 * Architecture:
 *   1. INVISIBLE TRIGGER SPACER in normal document flow (height = pinHeight)
 *      — adds scrollable space to the page. User scrolls "through" it.
 *
 *   2. FIXED CANVAS LAYER rendered via React Portal to document.body
 *      — escapes ALL ancestor CSS that would break position:sticky/fixed
 *      (transform, filter, overflow-x:hidden, etc.). The canvas is
 *      position: fixed at viewport top, controlled by JS scroll listener.
 *
 *   3. THREE SCROLL PHASES tracked via getBoundingClientRect:
 *      - BEFORE: trigger not yet reached. Canvas hidden.
 *      - PLAY: scrolled into trigger. Canvas pinned at viewport top.
 *              Progress maps 0→1 over (triggerHeight - viewportHeight).
 *      - EXIT: scrolled past play distance. Canvas SLIDES UP (top → negative)
 *              while progress stays at 1. Last viewportHeight worth of
 *              trigger scroll = canvas exit animation.
 *      - AFTER: trigger fully scrolled past. Canvas hidden.
 *
 *   This produces a smooth, continuous scroll: video plays → slides up
 *   off screen → next section follows naturally underneath. No jump cut.
 *
 *   DOM mutations (canvas position, opacity) are applied IMPERATIVELY via
 *   refs, NOT React state, to avoid re-rendering per scroll frame.
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

      // PLAY phase distance = triggerHeight - vh (last vh reserved for EXIT slide-out)
      const playDistance = Math.max(1, triggerHeight - vh);
      // How far we've scrolled past the trigger top (in document coords)
      const scrolled = -triggerRect.top;

      let canvasTopPx = 0;
      let progress = 0;
      let visible = false;

      if (scrolled < 0) {
        // BEFORE — trigger not yet entered
        visible = false;
      } else if (scrolled < playDistance) {
        // PLAY — canvas pinned at viewport top, progress maps to frames
        visible = true;
        progress = scrolled / playDistance;
        canvasTopPx = 0;
      } else if (scrolled < triggerHeight) {
        // EXIT — canvas anchors at last position and slides up as scroll continues
        visible = true;
        progress = 1;
        canvasTopPx = -(scrolled - playDistance);
      } else {
        // AFTER — trigger fully scrolled past
        visible = false;
        progress = 1;
        canvasTopPx = -vh;
      }

      // Apply to wrapper (imperative, no React re-render per frame).
      // Transform updates immediately (synced to scroll). Opacity changes are
      // CSS-transitioned via inline style for smooth fade-in/out.
      wrapper.style.transform = `translate3d(0, ${canvasTopPx}px, 0)`;
      wrapper.style.opacity = visible ? "1" : "0";

      // Apply optional overlay fade
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
      if (canvas && visible) {
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

    // Initial paint
    update();

    // Schedule deferred updates to catch post-page-transition layout settle.
    // Page nav from another route triggers PageTransition (delay 0.3s + duration 0.9s = 1.2s
    // of motion.div translateY/scale/filter). During the animation, getBoundingClientRect
    // returns the pre-settled position, making the trigger appear "before" its true location.
    // After animation completes, no scroll/resize event fires — so without these deferred
    // updates the canvas stays hidden until the user manually scrolls.
    const timers: ReturnType<typeof setTimeout>[] = [
      setTimeout(update, 100),
      setTimeout(update, 400),
      setTimeout(update, 800),
      setTimeout(update, 1300),
      setTimeout(update, 1800),
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

      {/* Fixed canvas layer — portal'd to document.body to escape all
          ancestor styles (transform, filter, overflow-x:hidden, etc.)
          which would otherwise break fixed/sticky positioning. */}
      {mounted &&
        createPortal(
          <div
            ref={wrapperRef}
            className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-0 pointer-events-none"
            style={{
              backgroundColor,
              opacity: 0,
              willChange: "transform, opacity",
              transform: "translate3d(0, 0, 0)",
              // Smooth fade-in for first appearance + fade-out when scrolling past.
              // Apple-style decel curve. Only opacity transitions — transform stays
              // synced to scroll (no easing on position, must be instant per frame).
              transition: "opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            aria-hidden="true"
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-contain md:object-cover object-bottom md:object-center"
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

            {/* Optional overlay children — captions, text manifest.
                Fades on scroll only if fadeChildrenAt is provided. */}
            {children && (
              <div
                ref={overlayRef}
                className={`absolute inset-0 ${overlayClassName}`}
              >
                {children}
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
