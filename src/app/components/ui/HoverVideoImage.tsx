import { useRef, useState, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface HoverVideoImageProps {
  /** Static cover image — always rendered as fallback / poster */
  src: string;
  /** Optional hover video URL — if present, plays on mouseenter (desktop) or scroll-into-view (mobile) */
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
 *
 * Desktop (hover-capable):
 *   - On mouseenter: video plays + fades to opacity 1, image hides underneath
 *   - On mouseleave: video pauses + rewinds to 0, image visible again
 *
 * Mobile / touch (no hover):
 *   - IntersectionObserver — when element scrolls into viewport, video autoplays + fades in
 *   - When element scrolls out of viewport, video pauses (saves battery + bandwidth)
 *   - Loops while in view — provides same interactive feedback as desktop hover
 *
 * Performance:
 *   - preload="auto" on desktop, "metadata" on mobile (data costs)
 *   - muted + playsInline — required for autoplay across browsers
 *   - loop — seamless preview
 *   - opacity transition for smooth crossfade
 *   - IntersectionObserver disconnects on unmount
 */
export function HoverVideoImage({
  src,
  videoSrc,
  alt,
  className = "",
}: HoverVideoImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false); // unified: hover (desktop) or in-view (mobile)

  // Detect touch device — switches between hover and intersection-observer modes
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  // ─── Mobile: IntersectionObserver — autoplay when in viewport ─────────
  useEffect(() => {
    if (!isTouchDevice || !videoSrc) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (entry.isIntersecting) {
          // 35% of element in viewport — start playing
          setIsActive(true);
          if (v) {
            v.play().catch(() => {
              // Autoplay rejected — fall back to static image
            });
          }
        } else {
          // Scrolled out — pause + reset, fade back to image
          setIsActive(false);
          if (v) {
            v.pause();
          }
        }
      },
      {
        // Trigger when at least 35% of the element is visible
        // Slight bottom margin so videos don't autoplay too eagerly at edge
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isTouchDevice, videoSrc]);

  // ─── Desktop: hover handlers ──────────────────────────────────────────
  const handleEnter = () => {
    if (isTouchDevice || !videoSrc) return;
    setIsActive(true);
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
    setIsActive(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Static image — always rendered, used as poster/fallback */}
      <ImageWithFallback src={src} alt={alt} className={className} />

      {/* Hover/in-view video — desktop fades on hover, mobile fades on viewport intersection.
          Mounted on BOTH desktop and mobile when videoSrc present (was desktop-only before).
          Performance: mobile uses "metadata" preload to save data costs vs desktop "auto". */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload={isTouchDevice ? "metadata" : "auto"}
          className={`absolute inset-0 ${className}`}
          style={{
            opacity: isActive ? 1 : 0,
            transition: "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
