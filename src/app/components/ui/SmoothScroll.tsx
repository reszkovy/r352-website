import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  // Reduced-motion: effectively native scroll (lerp:1 = no easing, smoothWheel off).
  const options = reduced
    ? {
        lerp: 1,
        duration: 0,
        smoothWheel: false,
        autoResize: true,
        syncTouch: false,
      }
    : {
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        autoResize: true,
        syncTouch: false,
      };

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
