import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";

interface MaskedTextProps {
  children: string; // We'll expect a string to split it ourselves, or HTML content
  className?: string;
  delay?: number;
  phrasing?: "words" | "lines" | "chars";
  tag?: keyof JSX.IntrinsicElements;
}

export function MaskedText({ 
  children, 
  className = "", 
  delay = 0,
  phrasing = "words",
  tag: Tag = "div" 
}: MaskedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Simple splitting logic (for production, might want a more robust splitter or use a library)
  // This assumes children is a string. If it contains HTML, this simple split won't work well.
  // For the AgencyHero, we are passing HTML strings via dangerouslySetInnerHTML usually, 
  // but here we should pass plain text if we want to split it.
  
  // However, looking at AgencyHero, we pass `t("hero.title")` which might contain <br>.
  // Let's handle <br> by splitting by newlines first.
  
  const text = typeof children === 'string' ? children : '';
  
  // Split by <br/> or \n to get lines first if needed, but "words" phrasing is usually safer for responsive
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    }
  };

  const childVariant: Variants = {
    hidden: { 
      y: "100%", 
      opacity: 0,
      filter: "blur(5px)",
      rotateZ: 5
    },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      rotateZ: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] // Custom "Expo" ease
      }
    }
  };

  if (phrasing === "lines") {
      // This is a simplified "lines" approach that just wraps the whole block in an overflow hidden
      // For true line-by-line on responsive, we need complex measurement.
      // Let's stick to a robust "word" reveal or a simple "block" reveal.
      
      return (
        <Tag ref={ref} className={`${className} overflow-hidden`}>
             <motion.div
                initial={{ y: "100%", rotate: 3 }}
                animate={isInView ? { y: "0%", rotate: 0 } : { y: "100%", rotate: 3 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
             >
                {children}
             </motion.div>
        </Tag>
      )
  }

  return (
    <Tag ref={ref} className={`${className} flex flex-wrap gap-[0.25em]`}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block"
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom">
             <motion.span variants={childVariant} className="inline-block will-change-transform">
                {word}
             </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
