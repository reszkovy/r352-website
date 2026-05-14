/**
 * Subtle bottom gradient — grounds floating CTAs (Brief CTA + chat icon).
 * Creates a "shelf" feeling at viewport bottom, similar to nav shadow that appears under header on scroll.
 * Pointer-events-none so it doesn't intercept clicks.
 */
export function BottomGradient() {
  return (
    <div
      aria-hidden="true"
      className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none z-30 bg-gradient-to-t from-black/30 via-black/10 to-transparent dark:from-black/40 dark:via-black/15 dark:to-transparent"
    />
  );
}
