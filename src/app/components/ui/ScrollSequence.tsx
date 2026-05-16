import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

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
  /** Fade children out over scroll progress range — [startProgress, endProgress] in 0..1.
   *  Example: [0.1, 0.25] = fully visible until 10% scroll, fades out by 25%. */
  fadeChildrenAt?: [number, number];
  /** Optional className for children wrapper (overlay container) — useful for custom positioning */
  overlayClassName?: string;
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
  fadeChildrenAt,
  overlayClassName = "",
}: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  // offset "end start" maps progress over the FULL container scroll (including the
  // sticky slide-out tail). This eliminates the "frozen on last frame" gap that
  // appears when sticky child slides out while progress is already capped at 1.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Optional fade for overlay children — keeps hooks order stable by always computing
  const fadeStart = fadeChildrenAt?.[0] ?? 0;
  const fadeEnd = fadeChildrenAt?.[1] ?? 1;
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, fadeStart, fadeEnd, 1],
    [1, 1, 0, 0],
  );

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
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ backgroundColor }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain md:object-cover object-bottom md:object-center"
          style={{
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

        {/* Optional overlay children — captions, text manifest. Fades on scroll if fadeChildrenAt provided */}
        {children && (
          <motion.div
            className={`absolute inset-0 pointer-events-none ${overlayClassName}`}
            style={fadeChildrenAt ? { opacity: overlayOpacity } : undefined}
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
