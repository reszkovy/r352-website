import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import svgPaths from "@/imports/svg-n2r0qxw5n2";
import { cn } from "@/lib/utils";

// Use the specific path requested by the user
const SHAPE_PATH = svgPaths.p24c9d700;

function MagnetItem({ mouseX, mouseY, scrollTrigger, fillColor = "#111", isMobile }: { mouseX: any; mouseY: any; scrollTrigger: any; fillColor?: string; isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for the item's position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth movement
  // Softer, slower spring on mobile for that "smooth/blurred" feel
  const springConfig = isMobile 
    ? { damping: 40, stiffness: 150, mass: 1 } 
    : { damping: 20, stiffness: 300, mass: 0.5 };

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    // Shared update logic
    const updatePosition = () => {
      if (!ref.current) return;
      
      const latestX = mouseX.get();
      const latestY = mouseY.get();
      
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center of item to mouse (or virtual center)
      const distX = latestX - centerX;
      const distY = latestY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      // Max distance to affect the item (magnet radius)
      // Larger radius on mobile to create a more "global" gentle wave
      const maxDist = isMobile ? 500 : 400; 
      
      if (dist < maxDist) {
        // Calculate attraction force
        const force = (maxDist - dist) / maxDist;
        // Subtle movement towards mouse
        // Reduced movement factor on mobile
        const factor = isMobile ? 0.15 : 0.2;
        const moveX = distX * force * factor;
        const moveY = distY * force * factor;
        
        x.set(moveX);
        y.set(moveY);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    // Subscribe to changes
    const unsubX = mouseX.on("change", updatePosition);
    const unsubY = mouseY.on("change", updatePosition);
    const unsubScroll = scrollTrigger.on("change", updatePosition);

    return () => {
      unsubX();
      unsubY();
      unsubScroll();
    };
  }, [mouseX, mouseY, scrollTrigger, x, y, isMobile]);

  return (
    <div ref={ref} className="flex items-center justify-center p-4">
      <motion.div style={{ x: springX, y: springY }} className="w-16 h-16 relative">
        <svg 
            viewBox="0 0 76 94" 
            className={cn(
                "magnet-shape-svg w-full h-full rotate-90 transition-all duration-700",
                isMobile && "blur-[1px]" // Literal blur as requested ("rozmyty")
            )} 
            style={{ fill: fillColor }}
        >
             <path d={SHAPE_PATH} />
        </svg>
      </motion.div>
    </div>
  );
}

interface MagnetGridProps {
  className?: string;
  fillColor?: string;
  gradientOverlay?: boolean;
  opacity?: number;
}

export function MagnetGrid({ className, fillColor = "#111", gradientOverlay = true, opacity = 0.2 }: MagnetGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollTrigger = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
        if (window.innerWidth < 768) {
             mouseX.set(window.innerWidth / 2);
             mouseY.set(window.innerHeight / 2);
        }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      // Only track mouse on desktop
      if (window.innerWidth >= 768) {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
      }
    };

    const handleScroll = () => {
      // Update scrollTrigger to force re-calculation in children
      scrollTrigger.set(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY, scrollTrigger]);

  // Generate a grid of items
  const items = Array.from({ length: 64 }, (_, i) => i); // 8x8 grid

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {/* On mobile, override opacity to be more subtle ("delikatnie widoczny") */}
        <div className="absolute inset-0" style={{ opacity: isMobile ? 0.3 : opacity }}>
            <div className="grid grid-cols-6 md:grid-cols-8 gap-8 w-full h-full content-center justify-center scale-110">
                {items.map((i) => (
                    <MagnetItem 
                        key={i} 
                        mouseX={mouseX} 
                        mouseY={mouseY} 
                        scrollTrigger={scrollTrigger} 
                        fillColor={fillColor}
                        isMobile={isMobile}
                    />
                ))}
            </div>
        </div>
        {gradientOverlay && (
             <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808] pointer-events-none" />
        )}
    </div>
  );
}
