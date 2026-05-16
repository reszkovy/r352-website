import { useEffect, useRef, useState } from "react";
import { useScroll } from "motion/react";

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
  /** Optional className for the outer container */
  className?: string;
  /** Background color shown behind canvas (and during initial load) */
  backgroundColor?: string;
  /** Optional children rendered as overlay (text manifest, captions, etc.) inside sticky frame */
  children?: React.ReactNode;
}

/**
 * ScrollSequence — Apple-style scroll-driven frame sequence.
 *
 * Reads scroll position relative to a tall container, maps progress 0→1 to
 * frame index, and draws the corresponding frame to a canvas. Frames preload
 * progressively. Sticky-pinned during the animation duration.
 *
 * Usage:
 *   <ScrollSequence
 *     frameCount={120}
 *     framePath="/scroll-frames/frame"
 *     pinHeight="300vh"
 *   />
 */
export function ScrollSequence({
  frameCount = 120,
  framePath = "/scroll-frames/frame",
  padDigits = 3,
  pinHeight = "300vh",
  className = "",
  backgroundColor = "#0a0a0a",
  children,
}: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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

  // ─── Draw current frame on scroll change ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (progress: number) => {
      const idx = Math.min(
        frameCount - 1,
        Math.max(0, Math.floor(progress * frameCount)),
      );
      const img = imagesRef.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Resize canvas buffer to match image natural size on first valid draw
      if (canvas.width !== img.naturalWidth) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      ctx.drawImage(img, 0, 0);
    };

    // Initial draw
    drawFrame(scrollYProgress.get());

    // Subscribe to scroll changes
    const unsubscribe = scrollYProgress.on("change", drawFrame);

    return () => unsubscribe();
  }, [scrollYProgress, frameCount, firstFrameReady]);

  const loadingProgress = Math.round((loadedCount / frameCount) * 100);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: pinHeight }}
    >
      <div
        className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor }}
      >
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-full w-auto h-auto"
          style={{
            objectFit: "contain",
            opacity: firstFrameReady ? 1 : 0,
            transition: "opacity 600ms ease-out",
          }}
          aria-hidden="true"
        />

        {/* Loading state — visible only until first frame ready */}
        {!firstFrameReady && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs font-display uppercase tracking-[0.25em] text-white/40">
              Loading sequence · {loadingProgress}%
            </span>
          </div>
        )}

        {/* Optional overlay children — captions, text manifest */}
        {children && (
          <div className="absolute inset-0 pointer-events-none">{children}</div>
        )}
      </div>
    </div>
  );
}
