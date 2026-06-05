#!/usr/bin/env node
/**
 * generate-og-industries.mjs
 * ---------------------------------------------------------------------------
 * Per-industry Open Graph image generator for r352.com.
 *
 * Why this exists:
 *   - Industry landing pages (/industries + 4 detail pages) need their own
 *     route-specific OG previews so LinkedIn / X / Slack share cards land
 *     on the right vertical messaging.
 *   - Same brand frame as `scripts/generate-og-images.mjs` (Agent A5):
 *     void background, lime r352 mark, bold typographic title, signature
 *     foot strip. We deliberately mirror that script's template so the
 *     industry cards look like part of the same family — not a fork.
 *
 * Outputs (all 1200×630 PNG, written to public/og/):
 *   industries.png                          (index)
 *   industry-fitness-wellness.png           (detail)
 *   industry-real-estate.png                (detail)
 *   industry-retail-franchise.png           (detail)
 *   industry-health-service-networks.png    (detail)
 *
 * Idempotent. Overwrites existing files. Logs progress + final stats.
 *
 * Requires: ImageMagick `convert` on PATH.
 */

import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ─── Paths ─────────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OG_DIR = resolve(ROOT, "public/og");

mkdirSync(OG_DIR, { recursive: true });

// ─── Brand tokens (mirrors generate-og-images.mjs) ─────────────────────────
const BG = "#0A0A0A";
const LIME = "#DAFF45";
const FG = "#FFFFFF";
const MUTED = "#9CA3AF";
const FAINT = "#525252";

// ─── Helpers (mirrors A5's pattern) ────────────────────────────────────────

function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapTitle(title, maxCharsPerLine = 22, maxLines = 3) {
  const words = title.split(/\s+/);
  const lines = [];
  let current = "";
  for (const w of words) {
    const candidate = current ? `${current} ${w}` : w;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = w;
    } else {
      current = candidate;
    }
    if (lines.length === maxLines - 1 && current.length > maxCharsPerLine) {
      lines.push(current.slice(0, maxCharsPerLine - 1).trim() + "…");
      current = "";
      break;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

/**
 * Build the 1200×630 SVG for one industry OG card.
 * Layout identical to A5's static-route cards — same r352 mark glyph,
 * same typographic rhythm, same signature foot strip.
 */
function buildSvg({ eyebrow, title, subtitle }) {
  const titleLines = wrapTitle(title, 22, 3);
  const titleFontSize = titleLines.length >= 3 ? 64 : titleLines.length === 2 ? 76 : 92;
  const titleLineHeight = Math.round(titleFontSize * 1.05);
  const titleStartY = 250 + (3 - titleLines.length) * 30;

  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="180" y="${titleStartY + i * titleLineHeight}" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="${titleFontSize}" fill="${FG}" letter-spacing="-2">${esc(line)}</text>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- background -->
  <rect width="1200" height="630" fill="${BG}"/>

  <!-- subtle vignette -->
  <defs>
    <radialGradient id="vg" cx="20%" cy="0%" r="120%">
      <stop offset="0%" stop-color="#1a1a1a" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#vg)"/>

  <!-- r352 mark (top-left, lime) -->
  <g transform="translate(80, 80) scale(0.16)">
    <rect x="-20" y="-20" width="698" height="716" rx="100" fill="${BG}"/>
    <path d="M0 337.632C0 136.127 154.934 0 328.676 0C502.418 0 657.352 136.127 657.352 337.632C657.352 539.136 502.418 675.264 328.676 675.264C154.934 675.264 0 539.136 0 337.632ZM78.8106 337.632C78.8106 492.566 189.862 601.827 328.676 601.827C465.699 601.827 578.541 492.566 578.541 337.632C578.541 182.697 465.699 73.4372 328.676 73.4372C189.862 73.4372 78.8106 182.697 78.8106 337.632Z" fill="${LIME}"/>
    <path d="M468.492 402.837C474.353 406.798 478.709 412.183 481.56 418.994C484.411 425.806 485.282 432.617 484.174 439.428C483.065 446.239 480.055 452.496 475.145 458.199C470.393 463.743 464.769 467.544 458.275 469.604C455.424 470.237 452.414 470.633 449.246 470.792C446.078 470.95 441.88 470.792 436.653 470.316C431.584 469.841 428.575 469.445 427.624 469.128C412.418 468.495 396.499 465.089 379.866 458.912C363.393 452.734 349.137 445.843 337.098 438.24C325.06 430.479 313.338 422.004 301.933 412.817C290.687 403.63 282.45 396.422 277.222 391.195C271.995 385.968 268.114 381.77 265.58 378.602L260.59 373.137L261.066 395.472C261.382 422.4 261.699 440.141 262.016 448.695C262.333 460.416 259.323 469.92 252.987 477.207C246.176 484.969 237.543 489.404 227.088 490.513C216 491.463 206.417 488.533 198.339 481.721C189.627 474.276 185.112 465.644 184.795 455.823C184.795 447.111 184.479 429.132 183.845 401.887C183.528 372.741 183.211 353.258 182.895 343.437C181.944 314.291 180.598 282.69 178.855 248.634C178.222 237.229 181.311 227.646 188.122 219.884C194.616 212.439 202.932 208.083 213.07 206.816H214.02L214.496 206.341C219.089 203.49 225.267 200.559 233.029 197.55C272.312 181.709 311.199 173.393 349.691 172.601C362.363 172.285 372.738 174.74 380.817 179.967C390.479 186.145 397.132 195.886 400.775 209.192C407.587 235.803 401.251 262.256 381.767 288.551C377.807 293.778 371.63 301.223 363.234 310.886C358.324 316.746 354.601 321.102 352.067 323.954C349.849 327.122 349.374 330.211 350.641 333.22C355.552 342.566 361.809 351.04 369.412 358.644C377.015 366.088 384.539 371.791 391.984 375.751C399.429 379.553 406.636 382.879 413.606 385.73C420.576 388.423 426.199 390.086 430.476 390.72L436.891 392.145C443.702 393.413 448.85 394.521 452.335 395.472C458.829 397.531 464.215 399.986 468.492 402.837ZM309.299 262.652C310.883 255.524 308.586 250.535 302.408 247.684C298.765 246.1 293.934 246.1 287.915 247.684C283.321 248.951 274.688 251.881 262.016 256.475C258.848 257.425 257.422 259.484 257.739 262.652L259.64 307.084C259.64 309.935 261.066 311.836 263.917 312.786C266.926 313.737 269.382 313.103 271.282 310.886C279.994 299.798 286.172 292.511 289.815 289.026C295.359 282.849 299.399 278.334 301.933 275.483C306.21 270.573 308.665 266.296 309.299 262.652Z" fill="${LIME}"/>
  </g>

  <!-- eyebrow -->
  <text x="180" y="170" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="22" fill="${LIME}" letter-spacing="4">${esc(eyebrow.toUpperCase())}</text>

  <!-- title (1-3 lines) -->
  ${titleSvg}

  <!-- subtitle -->
  <text x="180" y="500" font-family="Helvetica, Arial, sans-serif" font-weight="400" font-size="26" fill="${MUTED}">${esc(subtitle)}</text>

  <!-- divider before foot strip -->
  <rect x="80" y="555" width="1040" height="1" fill="${FAINT}"/>

  <!-- foot strip: signature + url -->
  <text x="80" y="595" font-family="Helvetica, Arial, sans-serif" font-weight="500" font-size="20" fill="${LIME}">— Move fast, steady cadence.</text>
  <text x="1120" y="595" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-weight="400" font-size="20" fill="${MUTED}">r352.com</text>
</svg>`;
}

function renderCard(name, { eyebrow, title, subtitle }) {
  const svg = buildSvg({ eyebrow, title, subtitle });
  const svgPath = resolve(OG_DIR, `${name}.svg`);
  const pngPath = resolve(OG_DIR, `${name}.png`);
  writeFileSync(svgPath, svg, "utf8");
  execSync(
    `convert -density 144 -background "${BG}" -resize 1200x630 "${svgPath}" "${pngPath}"`,
    { stdio: "pipe" },
  );
  process.stdout.write(`  ✓ ${name}.png\n`);
}

// ─── Industry route definitions ────────────────────────────────────────────

const INDUSTRY_ROUTES = [
  {
    name: "industries",
    eyebrow: "r352 · Industries",
    title: "Multi-location brand ops",
    subtitle: "Fitness · Real estate · Retail · Health",
  },
  {
    name: "industry-fitness-wellness",
    eyebrow: "Industry",
    title: "Fitness & wellness networks",
    subtitle: "Creative delivery across every location",
  },
  {
    name: "industry-real-estate",
    eyebrow: "Industry",
    title: "Real estate developers",
    subtitle: "Campaign production systems for every launch",
  },
  {
    name: "industry-retail-franchise",
    eyebrow: "Industry",
    title: "Retail & franchise operators",
    subtitle: "Central standards, local execution speed",
  },
  {
    name: "industry-health-service-networks",
    eyebrow: "Industry",
    title: "Health & service networks",
    subtitle: "Multi-market customer experience, systemized",
  },
];

// ─── Main ──────────────────────────────────────────────────────────────────

function main() {
  const startedAt = Date.now();
  console.log("→ Generating r352 industry OG images (1200×630)…\n");

  for (const route of INDUSTRY_ROUTES) {
    renderCard(route.name, {
      eyebrow: route.eyebrow,
      title: route.title,
      subtitle: route.subtitle,
    });
  }

  // Stats summary — only count the files this script writes.
  const totalBytes = INDUSTRY_ROUTES.reduce(
    (sum, r) => sum + statSync(resolve(OG_DIR, `${r.name}.png`)).size,
    0,
  );
  const totalKb = (totalBytes / 1024).toFixed(1);
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  console.log(
    `\n✓ Generated ${INDUSTRY_ROUTES.length} industry OG images, total ${totalKb} KB (${elapsed}s).`,
  );
  console.log(`  Output: public/og/`);
}

try {
  main();
} catch (err) {
  console.error("✗ Industry OG generation failed:", err.message);
  process.exitCode = 1;
}
