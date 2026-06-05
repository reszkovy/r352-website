#!/usr/bin/env node
/**
 * generate-og-images.mjs
 * ---------------------------------------------------------------------------
 * Per-route Open Graph image generator for r352.com.
 *
 * Why this exists:
 *   - LinkedIn / X / Slack previews must be route-specific, not generic.
 *   - Same brand frame across the surface: void background, lime mark,
 *     bold typographic title, signature line at the foot.
 *   - Static + dynamic (case studies + journal articles) in one pass.
 *
 * Outputs (all 1200×630 PNG):
 *   public/og/home.png
 *   public/og/services.png
 *   public/og/process.png
 *   public/og/glossary.png
 *   public/og/work.png
 *   public/og/journal.png
 *   public/og/contact.png
 *   public/og/faq.png
 *   public/og/case-{id}.png        × 10
 *   public/og/article-{id}.png     × 7
 *
 * Idempotent. Overwrites existing files. Logs progress + final stats.
 *
 * Requires: ImageMagick `convert` on PATH.
 */

import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, statSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ─── Paths ─────────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OG_DIR = resolve(ROOT, "public/og");
const PROJECTS_FILE = resolve(ROOT, "src/app/data/projects.tsx");
const ARTICLES_FILE = resolve(ROOT, "src/app/data/journalArticles.ts");

mkdirSync(OG_DIR, { recursive: true });

// ─── Brand tokens ──────────────────────────────────────────────────────────
const BG = "#0A0A0A";
const LIME = "#DAFF45"; // matches logo + theme (#D4FF00 used in CSS, logo uses #DAFF45)
const FG = "#FFFFFF";
const MUTED = "#9CA3AF";
const FAINT = "#525252";

// ─── Helpers ───────────────────────────────────────────────────────────────

/**
 * XML-escape user-controlled strings before embedding in SVG.
 */
function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Strip HTML tags (used to clean journal titles that contain <br/>).
 */
function stripHtml(str) {
  return String(str ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Wrap a title across N lines so it fits the right column.
 * Crude greedy wrap — sized for ImageMagick rendering (no JS DOM measure).
 */
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
      // truncate gracefully
      lines.push(current.slice(0, maxCharsPerLine - 1).trim() + "…");
      current = "";
      break;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

/**
 * Build the 1200×630 SVG for one OG card.
 * Layout:
 *   - Background: void
 *   - Top-left: r352 mark (square logo, 110px)
 *   - Right column: eyebrow, title (up to 3 lines), subtitle
 *   - Foot strip: signature line in lime + "r352.com" right-aligned
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

  <!-- subtle vignette via radial gradient (kept faint so it doesn't compete) -->
  <defs>
    <radialGradient id="vg" cx="20%" cy="0%" r="120%">
      <stop offset="0%" stop-color="#1a1a1a" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#vg)"/>

  <!-- r352 mark (top-left, lime) — scaled-down logo glyph -->
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

/**
 * Render one OG card: write SVG, convert to PNG.
 */
function renderCard(name, { eyebrow, title, subtitle }) {
  const svg = buildSvg({ eyebrow, title, subtitle });
  const svgPath = resolve(OG_DIR, `${name}.svg`);
  const pngPath = resolve(OG_DIR, `${name}.png`);
  writeFileSync(svgPath, svg, "utf8");
  // -density boosts internal rasterization fidelity; -background ensures void fill
  execSync(
    `convert -density 144 -background "${BG}" -resize 1200x630 "${svgPath}" "${pngPath}"`,
    { stdio: "pipe" },
  );
  process.stdout.write(`  ✓ ${name}.png\n`);
}

// ─── Source data extraction (regex-based, no TS compile) ───────────────────

/**
 * Pull projects out of projects.tsx via regex. We need id, client, title,
 * and the first stats[].value when present (used as the headline number).
 */
function readProjects() {
  const src = readFileSync(PROJECTS_FILE, "utf8");
  // Find every block opening with `id: "..."` and grab id/client/title.
  // We capture stats blocks separately to find the lead value.
  const projects = [];
  const idRe = /\bid:\s*"([a-z0-9-]+)"[\s\S]*?client:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"/g;
  let m;
  while ((m = idRe.exec(src))) {
    const [block, id, client, title] = m;
    // Look ahead a bounded window for stats[] inside the same project object
    const sliceStart = m.index;
    const sliceEnd = Math.min(sliceStart + 4000, src.length);
    const window = src.slice(sliceStart, sliceEnd);
    const statValueMatch = /stats:\s*\[\s*\{\s*value:\s*"([^"]+)"/.exec(window);
    projects.push({
      id,
      client,
      title,
      leadStat: statValueMatch ? statValueMatch[1] : null,
    });
  }
  return projects;
}

/**
 * Pull journal articles from journalArticles.ts via regex.
 * We need id, title (HTML-stripped), category, and `published` flag.
 */
function readArticles() {
  const src = readFileSync(ARTICLES_FILE, "utf8");
  const articles = [];
  // Each article starts with `id: <number>,`
  const blockRe = /\{\s*id:\s*(\d+),[\s\S]*?(?=\n\s*\},?\s*\n\s*\{\s*id:\s*\d+|\n\s*\];)/g;
  let m;
  while ((m = blockRe.exec(src))) {
    const id = Number(m[1]);
    const block = m[0];
    const titleMatch = /title:\s*"([^"]+)"/.exec(block);
    const categoryMatch = /category:\s*"([^"]+)"/.exec(block);
    const publishedMatch = /published:\s*(true|false)/.exec(block);
    const published = publishedMatch ? publishedMatch[1] === "true" : true;
    if (!titleMatch) continue;
    articles.push({
      id,
      title: stripHtml(titleMatch[1]),
      category: categoryMatch ? categoryMatch[1] : "Journal",
      published,
    });
  }
  return articles;
}

// ─── Static route definitions ──────────────────────────────────────────────

const STATIC_ROUTES = [
  {
    name: "home",
    eyebrow: "r352",
    title: "Operator for multi-location brands.",
    subtitle: "Design ops infrastructure. r3loop methodology. Operator, not agency.",
  },
  {
    name: "services",
    eyebrow: "r352",
    title: "Services",
    subtitle: "Strategy. Execution. Operationalization.",
  },
  {
    name: "process",
    eyebrow: "8-step methodology",
    title: "r3loop",
    subtitle: "Diagnose → Map → Standardize → Build → Govern → Ship → Measure → Iterate",
  },
  {
    name: "glossary",
    eyebrow: "r352 vocabulary",
    title: "Glossary",
    subtitle: "r3loop, design ops, multi-location brand operations, and more.",
  },
  {
    name: "work",
    eyebrow: "r352",
    title: "Work",
    subtitle: "Outcomes, not portfolios.",
  },
  {
    name: "journal",
    eyebrow: "r352",
    title: "Journal",
    subtitle: "Insights on design operations & delivery.",
  },
  {
    name: "contact",
    eyebrow: "r352",
    title: "Let's talk",
    subtitle: "Brief, call, or write.",
  },
  {
    name: "faq",
    eyebrow: "r352",
    title: "FAQ",
    subtitle: "Common questions answered.",
  },
];

// ─── Main ──────────────────────────────────────────────────────────────────

function main() {
  const startedAt = Date.now();
  console.log("→ Generating r352 per-route OG images (1200×630)…\n");

  // 1) Static routes
  console.log("[1/3] Static routes:");
  for (const route of STATIC_ROUTES) {
    renderCard(route.name, {
      eyebrow: route.eyebrow,
      title: route.title,
      subtitle: route.subtitle,
    });
  }

  // 2) Case studies — one per project
  console.log("\n[2/3] Case studies:");
  const projects = readProjects();
  for (const p of projects) {
    // Title preference: lead stat (big-number framing) if available, else title.
    const cardTitle = p.leadStat ? p.leadStat : p.title;
    const subtitle = p.leadStat ? p.title : "Case study · r352";
    renderCard(`case-${p.id}`, {
      eyebrow: p.client,
      title: cardTitle,
      subtitle,
    });
  }

  // 3) Journal articles
  console.log("\n[3/3] Journal articles:");
  const articles = readArticles();
  for (const a of articles) {
    renderCard(`article-${a.id}`, {
      eyebrow: a.category,
      title: a.title,
      subtitle: a.published ? "r352 Journal" : "Draft · r352 Journal",
    });
  }

  // 4) Stats summary
  const files = readdirSync(OG_DIR).filter((f) => f.endsWith(".png"));
  const totalBytes = files.reduce(
    (sum, f) => sum + statSync(resolve(OG_DIR, f)).size,
    0,
  );
  const totalMb = (totalBytes / 1024 / 1024).toFixed(2);
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  console.log(
    `\n✓ Generated ${files.length} OG images, total ${totalMb} MB (${elapsed}s).`,
  );
  console.log(`  Output: public/og/`);
}

try {
  main();
} catch (err) {
  console.error("✗ OG generation failed:", err.message);
  process.exitCode = 1;
}
