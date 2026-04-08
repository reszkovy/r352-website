import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the cursor follower
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      const isInteractive = target.closest("a, button, input, textarea, [role='button'], .clickable");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none -z-50 mix-blend-screen"
      data-ignore-selection="true"
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 0.25 : 1, // Significantly smaller when hovering
      }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.3, ease: "easeOut" }
      }}
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        // Bright and concentrated when hovering, subtle large glow otherwise
        background: isHovering 
          ? `radial-gradient(circle, rgba(212, 255, 0, 0.45) 0%, rgba(212, 255, 0, 0) 70%)` 
          : `radial-gradient(circle, rgba(212, 255, 0, 0.05) 0%, rgba(212, 255, 0, 0) 60%)`,
      }}
    />
  );
}
