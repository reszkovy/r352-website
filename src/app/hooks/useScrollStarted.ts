import { useEffect, useState } from "react";

/**
 * useScrollStarted — returns true once the user has scrolled past `threshold` pixels
 * (default 60). Used to gate floating UI (chat button, brief CTA) so they only
 * appear once the visitor commits to engaging with the page — feels less like
 * a popup and more like an ambient layer that activates with intent.
 *
 * Returns false again if user scrolls back to the very top, so the floating UI
 * recedes cleanly. Works with Lenis smooth scroll because Lenis keeps window.scrollY
 * in sync with its virtual scroll.
 */
export function useScrollStarted(threshold: number = 60): boolean {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setStarted(window.scrollY > threshold);
    };
    onScroll(); // initialize on mount (handles refresh-mid-page state)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return started;
}
