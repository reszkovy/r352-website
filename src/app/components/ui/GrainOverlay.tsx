/**
 * Static film-grain overlay — sits ABOVE page content (below the custom
 * cursor at z-[9999]) and unifies every section under one subtle texture.
 *
 * Implementation: tiny SVG feTurbulence tile inlined as a data URI and
 * repeated. Fully static (no animation, no canvas, no rAF) — zero GPU/CPU
 * cost beyond one composited layer. The WebGL hero carries its own animated
 * grain; this layer deliberately does not compete with it.
 *
 * mix-blend-overlay + 3.5% opacity reads correctly on both the dark (#0A0A0A)
 * and light themes — overlay blending brightens dark pixels and darkens light
 * ones symmetrically.
 */

// 140×140 monochrome fractal-noise tile. Encoded once at module scope.
const GRAIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="140" height="140" filter="url(%23n)"/></svg>`;
const GRAIN_URL = `url("data:image/svg+xml,${GRAIN_SVG.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "'").replace(/#/g, "%23")}")`;

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[2000] mix-blend-overlay"
      style={{
        backgroundImage: GRAIN_URL,
        backgroundRepeat: "repeat",
        backgroundSize: "140px 140px",
        opacity: 0.035,
      }}
    />
  );
}
