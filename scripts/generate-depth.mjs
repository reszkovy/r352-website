/**
 * generate-depth.mjs — one-shot build tool for GlassHero pseudo-3D.
 *
 * Computes a depth map for src/assets/reszek-glass-portrait-cutout.webp
 * from the cutout's alpha channel:
 *
 *   1. "Balloon" inflation — chamfer distance transform of the silhouette,
 *      normalized and shaped with pow(smoothstep(d), 0.7): edges are far
 *      (0), the medial axis is near (1). Reads as a soft 3D inflation of
 *      the 2D shape.
 *   2. Luminance-assisted relief — glass speculars are local high points.
 *      A high-passed luminance layer (lum - gaussian(sigma 6)) is blended
 *      in at ~20% to give the surface micro-relief so shader normals pick
 *      up real facial/glass structure, not just the silhouette balloon.
 *   3. Vertical bias — the cap/head region is rounder than the shoulders:
 *      depth is scaled up toward the top of the figure, compressed below.
 *   4. Final gaussian (sigma 2) to keep in-shader central-difference
 *      normals noise-free, then masked by alpha.
 *
 * Output: src/assets/reszek-glass-portrait-depth.webp (grayscale, same
 * dimensions). Normals are derived in-shader from this depth — no normals
 * file is shipped.
 *
 * Run once (and re-run only if the portrait changes):
 *   node scripts/generate-depth.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "src/assets/reszek-glass-portrait-cutout.webp");
const OUT = path.join(ROOT, "src/assets/reszek-glass-portrait-depth.webp");

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;
const N = W * H;

// ---- 1. binary mask + chamfer 3-4 distance transform (distance to edge) --
const mask = new Uint8Array(N);
for (let i = 0; i < N; i++) mask[i] = data[i * 4 + 3] > 40 ? 1 : 0;

const INF = 1e9;
const dist = new Float32Array(N);
for (let i = 0; i < N; i++) dist[i] = mask[i] ? INF : 0;
// forward
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (dist[i] === 0) continue;
    let d = dist[i];
    if (x > 0) d = Math.min(d, dist[i - 1] + 3);
    if (y > 0) {
      d = Math.min(d, dist[i - W] + 3);
      if (x > 0) d = Math.min(d, dist[i - W - 1] + 4);
      if (x < W - 1) d = Math.min(d, dist[i - W + 1] + 4);
    }
    dist[i] = d;
  }
}
// backward
for (let y = H - 1; y >= 0; y--) {
  for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x;
    if (dist[i] === 0) continue;
    let d = dist[i];
    if (x < W - 1) d = Math.min(d, dist[i + 1] + 3);
    if (y < H - 1) {
      d = Math.min(d, dist[i + W] + 3);
      if (x < W - 1) d = Math.min(d, dist[i + W + 1] + 4);
      if (x > 0) d = Math.min(d, dist[i + W - 1] + 4);
    }
    dist[i] = d;
  }
}
let maxD = 0;
for (let i = 0; i < N; i++) if (dist[i] < INF && dist[i] > maxD) maxD = dist[i];

// ---- balloon shape: pow(smoothstep(normalized dist), 0.7) ---------------
const base = new Float32Array(N);
for (let i = 0; i < N; i++) {
  if (!mask[i]) continue;
  // saturate before the global max so broad regions (head) round out fully,
  // but cap below 1.0 so the luminance relief layer never clips
  const dn = Math.min((dist[i] / maxD) * 1.3, 1);
  const ss = dn * dn * (3 - 2 * dn); // smoothstep(0,1,dn)
  base[i] = Math.pow(ss, 0.7) * 0.8;
}

// ---- 2. luminance high-pass relief ---------------------------------------
const lum = Buffer.alloc(N);
for (let i = 0; i < N; i++) {
  const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
  lum[i] = (0.299 * r + 0.587 * g + 0.114 * b) | 0;
}
// NOTE: sharp may widen 1-channel raw input to 3 channels through the
// pipeline — force b-w and verify so downstream indexing stays 1 byte/px.
const gray1 = async (buf, sigma) => {
  const { data: out, info: oi } = await sharp(buf, {
    raw: { width: W, height: H, channels: 1 },
  })
    .blur(sigma)
    .toColourspace("b-w")
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (oi.channels === 1) return out;
  const g = Buffer.alloc(N);
  for (let i = 0; i < N; i++) g[i] = out[i * oi.channels];
  return g;
};
const lumBlur = await gray1(lum, 6);

// ---- head centroid (for shader pivot) + vertical bias --------------------
let cx = 0, cy = 0, cn = 0;
for (let y = 0; y < Math.floor(H * 0.6); y++)
  for (let x = 0; x < W; x++)
    if (mask[y * W + x]) { cx += x; cy += y; cn++; }
console.log(`head centroid (alpha, y<0.6): (${(cx / cn / W).toFixed(3)}, ${(cy / cn / H).toFixed(3)})  maxDist=${(maxD / 3).toFixed(1)}px`);

const depth = Buffer.alloc(N);
for (let y = 0; y < H; y++) {
  const yn = y / H;
  // head (top) rounder, shoulders flatter: 1.0 above y=0.55 -> 0.74 at bottom
  const tA = Math.min(Math.max((yn - 0.55) / 0.35, 0), 1);
  const vBias = 1 - 0.26 * (tA * tA * (3 - 2 * tA));
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (!mask[i]) { depth[i] = 0; continue; }
    const hp = (lum[i] - lumBlur[i]) / 255; // signed high-pass, ~[-0.5, 0.5]
    let d = base[i] * vBias + hp * 0.42; // ~20% relief contribution
    depth[i] = Math.round(Math.min(Math.max(d, 0), 1) * 255);
  }
}

// ---- 4. final smooth + alpha mask, encode grayscale webp ------------------
const smoothed = await gray1(depth, 2);
for (let i = 0; i < N; i++) if (!mask[i]) smoothed[i] = 0;

await sharp(smoothed, { raw: { width: W, height: H, channels: 1 } })
  .webp({ quality: 80 })
  .toFile(OUT);
const { size } = await import("node:fs").then((fs) => fs.promises.stat(OUT));
console.log(`wrote ${OUT} (${(size / 1024).toFixed(1)} KB, ${W}x${H})`);
