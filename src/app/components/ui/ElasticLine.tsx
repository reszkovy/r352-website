import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react";
import { cn } from "@/app/components/ui/utils";

interface ElasticLineProps {
  className?: string;
  strokeColor?: string;
  hoverColor?: string;
}

export function ElasticLine({ 
  className, 
  strokeColor = "rgba(255,255,255,0.1)", 
  hoverColor = "#D4FF00" 
}: ElasticLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const controlX = useMotionValue(0);
  const controlY = useMotionValue(30); // 30 is the center of the 60px height

  // A relatively stiff spring on X, but very bouncy on Y to simulate a tight string being plucked
  const springX = useSpring(controlX, { stiffness: 400, damping: 20 });
  const springY = useSpring(controlY, { stiffness: 1000, damping: 4, mass: 1 });

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateWidth = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.offsetWidth;
        setWidth(newWidth);
        controlX.set(newWidth / 2);
      }
    };
    
    updateWidth();
    window.addEventListener("resize", updateWidth);
    
    // Add a slight delay to ensure layout is complete before measuring
    const timeout = setTimeout(updateWidth, 100);
    
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timeout);
    };
  }, [controlX]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    controlX.set(mouseX);
    
    // Calculate the distance from center
    const diff = mouseY - 30;
    
    // Pull the string towards the mouse, 0.8 factor keeps it feeling tight
    controlY.set(30 + diff * 0.8); 
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!containerRef.current) return;
    
    // Snap back to center
    controlX.set(width / 2);
    controlY.set(30);
  };

  // The string is essentially a quadratic bezier curve 
  // It goes from (0,30) to (width,30) with the control point at (cx,cy)
  const path = useMotionTemplate`M 0 30 Q ${springX} ${springY} ${width} 30`;

  return (
    <div 
      ref={containerRef}
      className={cn("group flex items-center justify-center pointer-events-auto", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      data-no-cursor-fx="true"
    >
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        preserveAspectRatio="none"
      >
        <motion.path 
          d={path} 
          stroke={isHovered ? hoverColor : strokeColor} 
          strokeWidth="1" 
          fill="none" 
          className="transition-colors duration-300"
        />
      </svg>
    </div>
  );
}