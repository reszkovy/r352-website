import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface ImageHoverProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees (default 4) */
  tiltMax?: number;
  /** Light leak intensity 0-1 (default 0.15) */
  glowIntensity?: number;
  /** Enable/disable tilt (default true) */
  tilt?: boolean;
  /** Enable/disable grain intensification (default true) */
  grain?: boolean;
  /** Enable/disable light leak (default true) */
  glow?: boolean;
  /** Enable/disable saturation boost (default true) */
  saturate?: boolean;
  /** Aspect ratio class (e.g. "aspect-[16/9]") - optional, pass in className */
  disabled?: boolean;
}

export function ImageHover({
  children,
  className,
  tiltMax = 4,
  glowIntensity = 0.15,
  tilt = true,
  grain = true,
  glow = true,
  saturate = true,
  disabled = false,
}: ImageHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse position relative to container (0-1 normalized)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring-smoothed values for that premium laggy feel
  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Tilt transforms: map 0-1 → -tiltMax to +tiltMax degrees
  const rotateX = useTransform(smoothY, [0, 1], [tiltMax, -tiltMax]);
  const rotateY = useTransform(smoothX, [0, 1], [-tiltMax, tiltMax]);

  // Light leak position: map 0-1 → percentage for radial gradient center
  const glowX = useTransform(smoothX, (v) => `${v * 100}%`);
  const glowY = useTransform(smoothY, (v) => `${v * 100}%`);

  // Grain opacity: smoothly transition
  const grainOpacity = useSpring(isHovered ? 0.12 : 0.03, { damping: 30, stiffness: 150 });

  // Saturation / brightness for the image
  const filterIntensity = useSpring(isHovered ? 1 : 0, { damping: 25, stiffness: 200 });
  const imgFilter = useTransform(filterIntensity, (v) => {
    const sat = 1 + v * 0.2;  // 1.0 → 1.2
    const bright = 1 + v * 0.05; // 1.0 → 1.05
    const contrast = 1 + v * 0.05; // 1.0 → 1.05
    return `saturate(${sat}) brightness(${bright}) contrast(${contrast})`;
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(Math.max(0, Math.min(1, x)));
    mouseY.set(Math.max(0, Math.min(1, y)));
  }, [disabled, mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Smoothly return to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  if (disabled) {
    return <div className={cn("relative overflow-hidden", className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Main content with tilt + filter */}
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: tilt ? rotateX : 0,
          rotateY: tilt ? rotateY : 0,
          filter: saturate ? imgFilter : "none",
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {children}

        {/* Lime Light Leak — radial gradient following cursor */}
        {glow && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) =>
                  `radial-gradient(ellipse 60% 50% at ${x} ${y}, rgba(212, 255, 0, ${glowIntensity}) 0%, rgba(212, 255, 0, 0.03) 40%, transparent 70%)`
              ),
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        )}

        {/* Secondary warm light for depth */}
        {glow && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) =>
                  `radial-gradient(circle 35% at ${x} ${y}, rgba(255, 255, 255, 0.06) 0%, transparent 60%)`
              ),
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        )}

        {/* Grain overlay that intensifies on hover */}
        {grain && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              opacity: grainOpacity,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }}
          />
        )}

        {/* Vignette that softens on hover */}
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-700"
          style={{
            background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.25) 100%)",
            opacity: isHovered ? 0.3 : 0.6,
          }}
        />

        {/* Edge highlight on hover — subtle lime border glow */}
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-all duration-700"
          style={{
            boxShadow: isHovered
              ? "inset 0 0 30px rgba(212, 255, 0, 0.06), inset 0 0 80px rgba(212, 255, 0, 0.03)"
              : "inset 0 0 0 rgba(0,0,0,0)",
            border: isHovered
              ? "1px solid rgba(212, 255, 0, 0.08)"
              : "1px solid transparent",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
