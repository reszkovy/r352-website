import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  speed?: number;
}

export function ParallaxImage({ 
  src, 
  alt, 
  className, 
  imageClassName,
  speed = 0.2 
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate Y movement based on speed parameter
  // Negative speed = move up, Positive = move down
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative overflow-hidden w-full h-full", className)}
    >
      <motion.div 
        className={cn("absolute inset-0 w-full h-[140%] -top-[20%]", imageClassName)}
        style={{ y }}
      >
        <ImageWithFallback 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover will-change-transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
        />
      </motion.div>
    </div>
  );
}