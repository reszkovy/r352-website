// Build-time constants injected via vite.config.ts `define`
declare const __BUILD_TIME__: string;
declare const __BUILD_COMMIT__: string;
declare const __BUILD_ENV__: string;

/**
 * Microscopic version label — fixed bottom-left, low opacity.
 * Format: YYYY-MM-DD HH:mm · commit · env
 * Use to verify which build is currently live.
 */
export function VersionLabel() {
  // Format ISO timestamp as YYYY-MM-DD HH:mm (UTC, no seconds)
  const formatted = (() => {
    try {
      const d = new Date(__BUILD_TIME__);
      const pad = (n: number) => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    } catch {
      return __BUILD_TIME__;
    }
  })();

  return (
    <div
      className="fixed bottom-2 left-2 z-[9999] pointer-events-none select-none font-mono text-[9px] leading-none text-white/15 dark:text-white/15 tracking-tight"
      aria-hidden="true"
      data-version-label
    >
      <span>{formatted}</span>
      <span className="mx-1.5">·</span>
      <span>{__BUILD_COMMIT__}</span>
      <span className="mx-1.5">·</span>
      <span>{__BUILD_ENV__}</span>
    </div>
  );
}
