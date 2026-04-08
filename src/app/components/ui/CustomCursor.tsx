import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useLocation } from "wouter";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [location] = useLocation();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring physics for lag effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isExcluded, setIsExcluded] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Direct update to motion values, skipping state for better performance
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const updateHoverState = () => {
      const hoveredElement = document.elementFromPoint(cursorX.get(), cursorY.get());
      if (!hoveredElement) {
        setIsHovering(false);
        setIsExcluded(false);
        return;
      }

      // Check if hovered element or its parents are clickable
      const isClickable = hoveredElement.closest('a, button, input, select, [role="button"], .cursor-pointer');
      
      // Elements that should NOT trigger the large magnifying glass effect (and use native cursor instead)
      const isOverExcluded = hoveredElement.closest('header, [data-no-cursor-fx="true"], form, input, textarea');
      
      setIsExcluded(!!isOverExcluded);
      setIsHovering(!!isClickable && !isOverExcluded);
      
      if (isVisible) {
        // Only hide native cursor if we're not over an excluded element
        if (isOverExcluded) {
          document.body.classList.remove('hide-native-cursor');
        } else {
          document.body.classList.add('hide-native-cursor');
        }
      } else {
        document.body.classList.remove('hide-native-cursor');
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    // Periodically check hover state
    const hoverInterval = setInterval(updateHoverState, 50);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(hoverInterval);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  // Calculate sizes based on state
  const size = isHovering ? 64 : 12;
  const offset = size / 2;

  // Do not render custom cursor at all if we are hovering over an excluded element
  const shouldRenderDot = isVisible && !isHovering && !isExcluded;
  const shouldRenderCircle = isVisible && !isExcluded;

  return (
    <>
      {/* Small dot that follows cursor exactly (No spring) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: shouldRenderDot ? 1 : 0
        }}
      >
        <div className="w-2 h-2 bg-[#D4FF00] rounded-full" />
      </motion.div>

      {/* Larger circle that lags behind slightly and expands on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          opacity: shouldRenderCircle ? 1 : 0
        }}
      >
        <motion.div
          className="rounded-full flex items-center justify-center overflow-hidden"
          initial={false}
          animate={{
            width: size,
            height: size,
            backgroundColor: isHovering ? "rgba(212, 255, 0, 0.03)" : "transparent",
            scale: isHovering ? 1.5 : 1,
            borderWidth: isHovering ? "1px" : "1px",
            borderColor: isHovering ? "rgba(212, 255, 0, 0.3)" : "#D4FF00",
            backdropFilter: isHovering ? "blur(4px) brightness(1.1) contrast(1.2) saturate(1.2)" : "blur(0px)",
            WebkitBackdropFilter: isHovering ? "blur(4px) brightness(1.1) contrast(1.2) saturate(1.2)" : "blur(0px)",
            boxShadow: isHovering ? "inset 0 0 20px rgba(212, 255, 0, 0.15), 0 4px 20px rgba(0,0,0,0.2)" : "none"
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.8
          }}
        >
          <motion.span
            initial={false}
            animate={{
              opacity: isHovering ? 1 : 0,
              y: isHovering ? 0 : 5,
              scale: isHovering ? 1 : 0.5
            }}
            transition={{
              duration: 0.3,
              delay: isHovering ? 0.1 : 0,
              ease: "easeOut"
            }}
            className="text-[#D4FF00] font-display text-[10px] tracking-widest uppercase"
          >
            EXPLORE
          </motion.span>
        </motion.div>
      </motion.div>
      
      <style>{`
        body.hide-native-cursor, 
        body.hide-native-cursor * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}