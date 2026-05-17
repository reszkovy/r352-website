import { useRef, useState, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface HoverVideoImageProps {
  /** Static cover image — always rendered as fallback / poster */
  src: string;
  /** Optional hover video URL — if present, plays on mouseenter, pauses on mouseleave */
  videoSrc?: string;
  /** Image alt */
  alt: string;
  /** className applied to both image and video for unified styling */
  className?: string;
}

/**
 * HoverVideoImage — drops in where <img>/<ImageWithFallback> normally lives.
 *
 * Behavior:
 *   - Always renders the static image (the "poster")
 *   - If videoSrc is provided, also renders a <video> element overlaid on top
 *   - On mouseenter: video plays + fades to opacity 1, image hides underneath
 *   - On mouseleave: video pauses + rewinds to 0, image visible again
 *   - On touch devices: video doesn't auto-trigger (no hover state) — image only
 *
 * Performance:
 *   - preload="auto" — video pre-loaded so hover is instant (videos are ~290KB each,
 *     acceptable trade-off vs first-hover delay from "metadata" preload)
 *   - muted + playsInline — required for autoplay across browsers
 *   - loop — seamless preview
 *   - opacity transition for smooth crossfade
 */
export function HoverVideoImage({
  src,
  videoSrc,
  alt,
  className = "",
}: HoverVideoImageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Detect touch device — skip hover behavior entirely there
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const handleEnter = () => {
    if (isTouchDevice || !videoSrc) return;
    setIsHovering(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {
        // Ignore autoplay rejection — image stays as fallback
      });
    }
  };

  const handleLeave = () => {
    if (isTouchDevice || !videoSrc) return;
    setIsHovering(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <div
      className="w-full h-full relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Static image — always rendered, used as poster/fallback */}
      <ImageWithFallback src={src} alt={alt} className={className} />

      {/* Optional hover video — fades in on hover, hidden by default.
          Note: no videoCanPlay gate — opacity is gated only by isHovering.
          The video element renders its current frame even before fully loaded,
          and with preload="auto" the data is ready by the time user hovers. */}
      {videoSrc && !isTouchDevice && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 ${className}`}
          style={{
            opacity: isHovering ? 1 : 0,
            transition: "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
