import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/app/components/ui/utils";
import { useLanguage } from "@/app/context/LanguageContext";

export function Marquee() {
  const { t } = useLanguage();
  
  const rawText = t("marquee.text");
  const words = rawText.split(/\s*[·\-]\s*/).filter(Boolean);
  const items = [...words, ...words, ...words, ...words, ...words, ...words, ...words, ...words];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth custom animation
  const baseX = useMotionValue(0);
  const speedMultiplier = useSpring(1, { damping: 50, stiffness: 400 });
  
  // Magnetic effect coordinates
  const mouseY = useMotionValue(0);
  const magneticY = useSpring(mouseY, { damping: 15, stiffness: 150 });
  const mouseX = useMotionValue(0);
  const magneticX = useSpring(mouseX, { damping: 15, stiffness: 150 });

  // Increase scroll speed on hover
  useEffect(() => {
    speedMultiplier.set(isHovered ? 2 : 1);
  }, [isHovered, speedMultiplier]);

  // Custom animation loop for smooth infinite scroll with variable speed
  useAnimationFrame((_, delta) => {
    // Base speed equivalent to ~65s loop
    const moveBy = -0.00075 * speedMultiplier.get() * delta;
    let nextX = baseX.get() + moveBy;
    
    // Wrap seamlessly
    if (nextX <= -50) {
      nextX += 50;
    } else if (nextX > 0) {
      nextX -= 50;
    }
    
    baseX.set(nextX);
  });

  const xPercent = useTransform(baseX, (v) => `${v}%`);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate distance from center of the container
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;
    
    // Apply subtle magnetic pull
    mouseX.set(offsetX * 0.05);
    mouseY.set(offsetY * 0.15);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset magnetic pull
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-background py-16 md:py-24 border-y border-white/5 cursor-default select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Magnetic wrapper */}
      <motion.div 
        style={{ x: magneticX, y: magneticY }}
        className="w-full flex items-center justify-start"
      >
        {/* Infinite scroll wrapper */}
        <motion.div
          className="flex whitespace-nowrap will-change-transform gap-8 md:gap-16"
          style={{ x: xPercent }}
        >
          <div className="flex shrink-0 gap-8 md:gap-16 items-center">
            {items.map((word, i) => (
              <div key={`m1-${i}`} className="flex items-center gap-8 md:gap-16">
                <span 
                  className="text-6xl md:text-[100px] lg:text-[140px] leading-none font-display uppercase tracking-widest text-transparent transition-colors duration-500 group-hover:text-[#D4FF00]/10"
                  style={{
                    WebkitTextStroke: "2px rgba(212, 255, 0, 0.4)",
                  }}
                >
                  {word}
                </span>
                <svg 
                  className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-[#D4FF00] opacity-50 fill-current transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-110" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="8" />
                </svg>
              </div>
            ))}
          </div>
          <div className="flex shrink-0 gap-8 md:gap-16 items-center" aria-hidden="true">
            {items.map((word, i) => (
              <div key={`m2-${i}`} className="flex items-center gap-8 md:gap-16">
                <span 
                  className="text-6xl md:text-[100px] lg:text-[140px] leading-none font-display uppercase tracking-widest text-transparent transition-colors duration-500 group-hover:text-[#D4FF00]/10"
                  style={{
                    WebkitTextStroke: "2px rgba(212, 255, 0, 0.4)",
                  }}
                >
                  {word}
                </span>
                <svg 
                  className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-[#D4FF00] opacity-50 fill-current transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-110" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="8" />
                </svg>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}