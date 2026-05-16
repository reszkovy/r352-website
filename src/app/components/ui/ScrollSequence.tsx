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
   *  Higher = slower playback. 200vh = 2 viewport heights of scroll. */
  pinHeight?: string;
  /** Optional className for the outer scroll-trigger container */
  className?: string;
  /** Background color shown behind canvas (and during initial load) */
  backgroundColor?: string;
  /** Optional children rendered as overlay (text manifest, captions, etc.) on top of canvas */
  children?: React.ReactNode;
  /** Fade children out over scroll progress range — [startProgress, endProgress] in 0..1.
   *  Example: [0.1, 0.25] = fully visible until 10% scroll, fades out by 25%. */
  fadeChildrenAt?: [number, number];
  /** Optional className for the overlay wrapper inside the fixed canvas layer */
  overlayClassName?: string;
}

/**
 * ScrollSequence — Apple-style scroll-driven frame sequence.
 *
 * IMPORTANT IMPLEMENTATION NOTE:
 * This component does NOT use CSS `position: sticky`. Sticky is fragile —
 * any ancestor with `transform`, `filter`, `perspective`, or
 * `overflow-x: hidden` (which browsers coerce to `overflow: hidden auto`,
 * making the element a scroll container) breaks sticky for descendants.
 *
 * Instead, the canvas + overlay are rendered via React Portal to document.body
 * with `position: fixed`. This escapes ALL ancestor styles. JS tracks
 * the scroll trigger container's bounding box to determine visibility and
 * compute scroll progress. The trigger container is just an invisible
 * height spacer that adds scrollable room to the page.
 */
export function ScrollSequence({
  frameCount = 120,
  framePath = "/scroll-frames/frame",
  padDigits = 3,
  pinHeight = "200vh",
  className = "",
  backgroundColor = "#0a0a0a",
  children,
  fadeChildrenAt,
  overlayClassName = "",
}: ScrollSequenceProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
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

  // ─── Track scroll + draw current frame ────────────────────────────────
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    let rafId = 0;

    const update = () => {
      const rect = trigger.getBoundingClientRect();
      const vh = window.innerHeight;
      const triggerHeight = rect.height;

      // Container in view if ANY portion is visible (intersects viewport)
      const visible = rect.top < vh && rect.bottom > 0;
      setInView(visible);

      if (visible) {
        // Scroll progress within the trigger container:
        // - rect.top = 0 when top of trigger meets top of viewport (progress 0)
        // - rect.bottom = 0 when bottom of trigger meets top of viewport (progress 1)
        // - scrolled = how far past the top we are (in px)
        const scrolled = Math.max(0, -rect.top);
        const maxScroll = triggerHeight;
        const p = Math.max(0, Math.min(1, scrolled / maxScroll));
        setProgress(p);

        // Draw frame
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const idx = Math.min(
              frameCount - 1,
              Math.max(0, Math.floor(p * frameCount)),
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
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Initial draw
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(rafId);
    };
  }, [frameCount, firstFrameReady]);

  // ─── Overlay opacity (scroll-tied fade) ───────────────────────────────
  let overlayOpacity = 1;
  if (fadeChildrenAt) {
    const [start, end] = fadeChildrenAt;
    if (progress <= start) overlayOpacity = 1;
    else if (progress >= end) overlayOpacity = 0;
    else overlayOpacity = 1 - (progress - start) / (end - start);
  }

  const loadingProgress = Math.round((loadedCount / frameCount) * 100);

  return (
    <>
      {/* Scroll trigger container — invisible, adds scrollable height to page */}
      <div
        ref={triggerRef}
        className={`relative ${className}`}
        style={{ height: pinHeight }}
        aria-hidden="true"
      />

      {/* Fixed canvas layer — rendered via portal to document.body to escape
          ALL ancestor styles (transform, filter, overflow-x:hidden, etc.)
          which would otherwise break position:fixed/sticky. */}
      {mounted &&
        createPortal(
          <div
            className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-0 pointer-events-none"
            style={{
              backgroundColor,
              opacity: inView ? 1 : 0,
              visibility: inView ? "visible" : "hidden",
              transition: "opacity 200ms ease-out",
            }}
            aria-hidden="true"
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-contain md:object-cover object-bottom md:object-center"
              style={{
                opacity: firstFrameReady ? 1 : 0,
                transition: "opacity 600ms ease-out",
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
                Fades on scroll if fadeChildrenAt provided. */}
            {children && (
              <div
                className={`absolute inset-0 ${overlayClassName}`}
                style={fadeChildrenAt ? { opacity: overlayOpacity } : undefined}
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
