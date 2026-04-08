import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/app/components/ui/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  textStrength?: number;
  className?: string;
  glowColor?: string;
  as?: "button" | "a";
  href?: string;
}

export function MagneticButton({
  children,
  strength = 30,
  textStrength = 15,
  className,
  glowColor = "rgba(212, 255, 0, 0.4)",
  as = "button",
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Position for the whole button
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Position for the glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<any>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center (-1 to 1)
    const normalizedX = (clientX - (left + width / 2)) / (width / 2);
    const normalizedY = (clientY - (top + height / 2)) / (height / 2);

    x.set(normalizedX * strength);
    y.set(normalizedY * strength);

    // Glow position relative to button
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const textX = useTransform(x, (val) => (val / strength) * textStrength);
  const textY = useTransform(y, (val) => (val / strength) * textStrength);
  
  const springTextX = useSpring(textX, springConfig);
  const springTextY = useSpring(textY, springConfig);

  const Component = as === "a" ? motion.a : motion.button;
  const componentProps = as === "a" ? { href, ...props } : props;

  return (
    <Component
      ref={ref}
      {...componentProps}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        x: springX,
        y: springY,
      }}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-none font-display text-sm tracking-widest uppercase transition-all duration-500 group cursor-pointer",
        "bg-neutral-900 text-white border border-neutral-800 hover:border-[#D4FF00]/50",
        className
      )}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none blur-2xl pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(circle 50px at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 100%)`,
        }}
      />
      
      {/* Hover background layer */}
      <div className="absolute inset-0 z-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Text layer with stronger parallax */}
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2 w-full h-full pointer-events-none"
        style={{
          x: springTextX,
          y: springTextY,
        }}
      >
        {children}
      </motion.span>
    </Component>
  );
}
