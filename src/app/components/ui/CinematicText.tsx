import { motion, useInView, useAnimation, useAnimationFrame, useSpring, useTransform, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CinematicTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitByChar?: boolean;
  glowEffect?: boolean;
  baseColor?: string;
  glowColor?: string;
  as?: 'h1' | 'h2' | 'h3' | 'div';
}

export function CinematicText({ 
  text, 
  className, 
  delay = 0, 
  duration = 1.2,
  splitByChar = true,
  glowEffect = false,
  baseColor = "#ffffff",
  glowColor = "#D4FF00",
  as: Tag = "div"
}: CinematicTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();
  
  // Track mouse position globally for the proximity effect
  const mousePosition = useRef({ x: -1000, y: -1000, isHovering: false });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (!glowEffect) return;

    const handlePointerMove = (e: PointerEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY, isHovering: true };
    };
    
    const handlePointerLeave = () => {
      mousePosition.current.isHovering = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [glowEffect]);

  // Split text by <br/> or <br> to animate lines individually
  const lines = text.split(/<br\s*\/?>/i);

  return (
    <Tag ref={ref} className={cn("flex flex-col", className)}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="overflow-hidden leading-[1.05] pb-2 flex flex-wrap">
          {splitByChar ? (
            // Character by character animation
            line.split('').map((char, charIndex) => (
              <InteractiveChar 
                key={`${lineIndex}-${charIndex}`}
                char={char}
                delay={delay}
                duration={duration}
                lineIndex={lineIndex}
                charIndex={charIndex}
                controls={controls}
                glowEffect={glowEffect}
                mousePosition={mousePosition}
                baseColor={baseColor}
                glowColor={glowColor}
              />
            ))
          ) : (
            // Line by line animation
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { y: "100%", opacity: 0, rotate: 2 },
                visible: { y: 0, opacity: 1, rotate: 0 },
              }}
              transition={{
                duration: duration,
                delay: delay + lineIndex * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="origin-top-left"
            >
              <span dangerouslySetInnerHTML={{ __html: line }} />
            </motion.div>
          )}
        </div>
      ))}
    </Tag>
  );
}

function InteractiveChar({ 
  char, 
  delay, 
  duration, 
  lineIndex, 
  charIndex, 
  controls, 
  glowEffect,
  mousePosition,
  baseColor,
  glowColor
}: any) {
  const ref = useRef<HTMLSpanElement>(null);
  const intensity = useMotionValue(0);
  
  // Spring for smooth, elegant fade out/in (overdamped for elegance)
  const animatedIntensity = useSpring(intensity, { 
    stiffness: 25, 
    damping: 12, 
    mass: 1 
  });

  useAnimationFrame(() => {
    if (!glowEffect || !ref.current) return;
    
    const mouse = mousePosition.current;
    if (!mouse.isHovering) {
      intensity.set(0);
      return;
    }

    // Get position relative to viewport
    const rect = ref.current.getBoundingClientRect();
    const charX = rect.left + rect.width / 2;
    const charY = rect.top + rect.height / 2;
    
    // Calculate distance to mouse
    const dx = mouse.x - charX;
    const dy = mouse.y - charY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Proximity radius - start glowing from this far away
    const maxDist = 280; 
    
    if (dist < maxDist) {
      // Normalize and apply an exponential curve for a natural radial falloff
      let currentIntensity = 1 - (dist / maxDist);
      currentIntensity = Math.pow(currentIntensity, 1.6);
      intensity.set(currentIntensity);
    } else {
      intensity.set(0);
    }
  });

  // Transform intensity into styles
  const color = useTransform(animatedIntensity, [0, 1], [baseColor, glowColor]);
  
  // Helper to extract RGB from hex to use in rgba()
  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) || 212;
    const g = parseInt(hex.slice(3, 5), 16) || 255;
    const b = parseInt(hex.slice(5, 7), 16) || 0;
    return `${r}, ${g}, ${b}`;
  };
  
  const glowRgb = hexToRgb(glowColor);
  const textShadow = useTransform(animatedIntensity, 
    (v) => `0px 0px ${v * 16}px rgba(${glowRgb}, ${v * 0.7}), 0px 0px ${v * 40}px rgba(${glowRgb}, ${v * 0.4})`
  );

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { y: "100%", opacity: 0, rotate: 6, scale: 0.95 },
        visible: { y: 0, opacity: 1, rotate: 0, scale: 1 },
      }}
      transition={{
        duration: duration,
        delay: delay + (lineIndex * 0.15) + (charIndex * 0.02),
        ease: [0.16, 1, 0.3, 1]
      }}
      className="origin-bottom-left inline-block whitespace-pre relative"
    >
      <motion.span
        ref={ref}
        style={glowEffect ? { color, textShadow } : {}}
        className="inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </motion.div>
  );
}