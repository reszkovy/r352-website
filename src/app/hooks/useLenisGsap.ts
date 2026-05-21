import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

/**
 * Bridges Lenis smooth scroll with GSAP ScrollTrigger.
 *
 * Without this, ScrollTrigger reads the native window scroll position which is
 * decoupled from what Lenis is actually rendering — animations stutter or fire
 * at the wrong moment. We tell ScrollTrigger to re-check on every Lenis tick
 * and we delegate gsap.ticker to drive Lenis so frame budgets line up.
 *
 * Mount once at the root of any subtree using ScrollTrigger.
 */
gsap.registerPlugin(ScrollTrigger);

export function useLenisGsap() {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;

    function update(time: number) {
      lenis!.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);
}
