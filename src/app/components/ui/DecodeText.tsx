import { useEffect, useRef, useState } from "react";

/**
 * DecodeText - machine-decode text reveal (lamalama-inspired, r352 grammar).
 *
 * Characters resolve left-to-right out of a mono scramble. Runs ONCE per
 * activation (silence = stillness: no idle looping, ever). Reduced motion
 * renders the final text immediately.
 *
 * Usage: mono kickers, console menu links, status labels. NOT for Tanker
 * display headings (those keep MaskReveal/CinematicText).
 */
const CHARSET = "R352#/·<>_-%$*+=";

export function DecodeText({
  text,
  active = true,
  delay = 0,
  duration = 450,
  className = "",
}: {
  text: string;
  /** start the decode (e.g. when a menu opens); false renders scramble-free final text */
  active?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef(0);
  const doneRef = useRef(false);

  useEffect(() => {
    doneRef.current = false;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (!active || reduced || text.length === 0) {
      setDisplay(text);
      return;
    }

    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now + delay;
      const p = Math.min(Math.max((now - start) / duration, 0), 1);
      // resolve boundary sweeps left -> right; unresolved chars scramble
      const resolved = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (i < resolved || c === " " || p === 1) out += c;
        else out += CHARSET[(i * 7 + Math.floor(now / 50)) % CHARSET.length];
      }
      setDisplay(out);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        doneRef.current = true;
        setDisplay(text);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, active, delay, duration]);

  // aria: expose the real text, hide the scramble noise from AT
  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
