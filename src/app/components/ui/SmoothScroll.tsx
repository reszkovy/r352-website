import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        autoResize: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}