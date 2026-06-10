import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import portraitUrl from "@/assets/reszek-glass-portrait-cutout.webp";
import depthUrl from "@/assets/reszek-glass-portrait-depth.webp";

/**
 * GlassHero v2 — full-bleed cinematic WebGL "liquid glass" hero.
 *
 * No longer a decorated image in a corner: a single full-viewport canvas
 * renders three parallax layers around the brand glass-humanoid portrait:
 *
 *   BACK   — volumetric lime aurora/fog (domain-warped fbm, near-black,
 *            barely-there, slow drift) massed behind the figure
 *   MID    — the figure itself, now a PSEUDO-3D OBJECT: a build-time depth
 *            map (scripts/generate-depth.mjs — silhouette "balloon"
 *            inflation + luminance relief) drives per-pixel parallax
 *            reprojection so the head TURNS to follow the cursor (spring-
 *            smoothed yaw/pitch, shoulders lag behind the head at 60%
 *            amplitude), plus real relighting: depth-derived normals get a
 *            cursor-anchored lime key light (speculars travel across the
 *            glass), a fixed cool fill, and a fresnel rim. On top of that
 *            the existing liquid stack: refraction flow + cursor push +
 *            a PERSISTENT displacement field (ping-pong FBO — moving the
 *            mouse leaves a slowly-decaying liquid trail, like touching
 *            water) + click ripples + chromatic aberration
 *   FRONT  — procedural micro-dust catching lime light, strongest parallax
 *
 * Layers track the cursor at different rates (true depth), and the camera
 * drifts/breathes continuously even without input. Cinematic finish: lime
 * rim that blooms toward the cursor, pseudo-bloom on hot speculars with an
 * anamorphic horizontal flare hint, fine animated grain, vignette, and an
 * in-shader scrim that keeps the headline zone readable. On GL fade-in a
 * 1.2 s "materialize" plays: distortion settles from high to calm while a
 * rim-light sweep crosses the figure once.
 *
 * Prerender / perf contract (unchanged):
 *   - A static <img> of the portrait is ALWAYS in the DOM (crawlers, SEO,
 *     no-JS, prerender). The canvas only fades in over it after GL init.
 *   - GL never initializes when: navigator.webdriver (headless prerender),
 *     prefers-reduced-motion, viewport < 768px, or WebGL2 unavailable.
 *   - Init is lazy: IntersectionObserver -> requestIdleCallback (post-LCP).
 *   - rAF loop pauses when the tab is hidden or the hero scrolls out.
 *   - devicePixelRatio capped at 1.5 AND total pixels capped (~2.6 MP) so
 *     the full-bleed canvas never explodes fragment cost on 4k displays.
 *   - Trail field runs in a tiny fixed 320×192 RGBA8 ping-pong FBO.
 *   - On context loss the static image is restored. Zero npm deps.
 */

interface GlassHeroProps {
  /** Positioning/sizing classes for the outer wrapper (parent owns layout). */
  className?: string;
  /** Meaningful alt for the always-present static portrait. */
  alt: string;
}

const VERT = `#version 300 es
precision highp float;
layout(location=0) in vec2 aPos;
out vec2 vUv;
void main() {
  // Fullscreen triangle; uv (0,0) = top-left to match texture row order.
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// ---------------------------------------------------------------------------
// PASS 1 — trail field update (ping-pong accumulation buffer).
// RG = displacement vector (0.5-centered), B = disturbance intensity.
// The buffer slowly decays + diffuses: cursor motion writes velocity splats
// that persist for ~2 s — the "touched water" memory the main pass refracts
// through.
// ---------------------------------------------------------------------------
const TRAIL_FRAG = `#version 300 es
precision highp float;
uniform sampler2D uPrev;
uniform vec2  uMouse;   // uv, y down
uniform vec2  uVel;     // smoothed velocity, uv/s
uniform float uDt;
uniform float uAspect;
in vec2 vUv;
out vec4 o;
void main() {
  vec2 px = 1.0 / vec2(textureSize(uPrev, 0));
  vec4 c = texture(uPrev, vUv);
  // gentle diffusion -> the trail spreads like ink in water
  vec4 n = texture(uPrev, vUv + vec2(px.x, 0.0)) + texture(uPrev, vUv - vec2(px.x, 0.0))
         + texture(uPrev, vUv + vec2(0.0, px.y)) + texture(uPrev, vUv - vec2(0.0, px.y));
  c = mix(c, n * 0.25, min(uDt * 22.0, 0.6));
  vec2  d = c.rg - 0.5;
  float k = c.b;
  d *= exp(-uDt * 1.35);          // direction decays
  k *= exp(-uDt * 0.85);          // glow memory lingers a bit longer
  // inject a velocity splat under the cursor
  vec2 dm = (vUv - uMouse) * vec2(uAspect, 1.0);
  float fall = exp(-dot(dm, dm) * 320.0);
  float sp = length(uVel);
  d += uVel * (0.16 * fall);
  k = min(k + fall * min(sp * 2.4, 1.2) * uDt * 16.0, 1.0);
  d = clamp(d, vec2(-0.5), vec2(0.5));
  o = vec4(d + 0.5, k, 1.0);
}`;

// ---------------------------------------------------------------------------
// PASS 2 — composite. Aurora / figure / dust, lit, graded, grained.
// ---------------------------------------------------------------------------
const FRAG = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform sampler2D uTrail;
uniform sampler2D uDepth;  // build-time depth map (balloon + relief)
uniform vec4  uGaze;     // xy = head gaze shift (fig-uv / unit depth), zw = shoulders (lagged)
uniform float uTime;
uniform vec2  uMouse;    // uv space, y down (matches vUv)
uniform vec2  uVel;      // smoothed cursor velocity (springed in JS)
uniform float uEnergy;   // 0..1 spring-decayed interaction energy
uniform float uAspect;   // canvas width / height
uniform vec3  uLime;     // theme-aware accent
uniform float uLight;    // 0 = dark theme, 1 = light theme
uniform float uIntro;    // 0..1 materialize progress (eased in JS)
uniform vec4  uFig;      // xy = figure rect offset (uv), zw = rect size (uv)
uniform vec4  uRipple[4];// xy = uv pos, z = start time, w = 1 when live

in vec2 vUv;
out vec4 fragColor;

// ---- simplex noise (Ashima Arts / Ian McEwan, public domain) ----
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float fbm(vec2 q) {
  float a = 0.0, w = 0.5;
  for (int i = 0; i < 3; i++) {
    a += w * snoise(q);
    q = q * 2.03 + vec2(7.3, -4.1);
    w *= 0.5;
  }
  return a;
}

// procedural dust layer — sparse glints on a jittered grid
float dust(vec2 uvp, float scale, float t, float seed) {
  vec2 g = uvp * scale;
  vec2 id = floor(g);
  vec2 f = fract(g);
  float h = hash21(id + seed);
  vec2 pp = vec2(hash21(id + seed + 1.7), hash21(id + seed + 3.1));
  pp = 0.15 + 0.7 * pp
     + 0.08 * vec2(sin(t * 0.4 + h * 6.28), cos(t * 0.33 + h * 6.28));
  float d = length(f - pp);
  float r = 0.030 + 0.045 * h;
  float tw = 0.5 + 0.5 * sin(t * (0.5 + h * 1.7) + h * 41.0);
  return smoothstep(r, 0.0, d) * tw * tw * step(0.62, h);
}

void main() {
  float t = uTime;
  vec2 mc = uMouse - vec2(0.5, 0.46);          // centered cursor for parallax

  // ---- continuous camera drift + breathe (alive even without cursor)
  vec2 drift = vec2(snoise(vec2(t * 0.045, 3.7)), snoise(vec2(t * 0.038, 11.9))) * 0.006;
  float breath = 0.5 + 0.5 * sin(t * 0.42 + snoise(vec2(t * 0.05, 7.31)) * 0.9);

  // ---- intro materialize: distortion settles high -> calm
  float introE = uIntro * uIntro * (3.0 - 2.0 * uIntro); // smoothstep ease
  float settle = mix(2.8, 1.0, introE);
  float introA = smoothstep(0.0, 0.30, uIntro);

  // ======================================================================
  // BACK LAYER — volumetric lime aurora, massed behind the figure
  // ======================================================================
  vec2 uvB = vUv + mc * 0.018 + drift * 0.6;
  vec2 q = uvB * vec2(uAspect, 1.0) * 1.05 + vec2(t * 0.012, -t * 0.008);
  q += 0.42 * vec2(fbm(q * 0.9 + t * 0.015), fbm(q * 0.9 - 13.0));  // domain warp = curl feel
  float aurN = fbm(q) * 0.5 + 0.5;
  float figCX = uFig.x + uFig.z * 0.52;
  float dxA = (uvB.x - figCX) * 1.15;
  float dyA = uvB.y - 0.40;
  float aurMask = exp(-(dxA * dxA) * 2.4 - dyA * dyA * 1.2);
  float aur = aurN * aurN * aurMask;
  vec3 aurCol = mix(uLime * 0.22, uLime * 0.85, aurN);
  float aurA = aur * mix(0.40, 0.12, uLight) * (0.85 + 0.15 * breath);

  // ======================================================================
  // MID LAYER — the glass figure
  // ======================================================================
  vec2 uvF = vUv + mc * 0.045 + drift;
  vec2 fuv = (uvF - uFig.xy) / uFig.zw;       // figure-local 0..1

  // ---- PSEUDO-3D GAZE — depth-map parallax reprojection -----------------
  // Head turns toward the cursor; shoulders follow at lower amplitude with
  // a delay (uGaze.zw is the JS-lagged copy). HEADC = head optical center
  // (incl. cap, measured from the alpha centroid), H0 = depth pivot plane.
  const vec2 HEADC = vec2(0.51, 0.34);
  const float H0 = 0.46;
  vec2 hdv = (fuv - HEADC) * vec2(1.0, 1.25);
  float headW = exp(-dot(hdv, hdv) * 5.0);        // 1 on head -> 0 on body
  vec2 gz = mix(uGaze.zw, uGaze.xy, headW);

  // the silhouette itself leans into the turn — sells actual rotation,
  // not just an interior warp
  vec2 lean = gz * (0.42 * headW + 0.10);
  vec2 guv = fuv - lean;

  // iterative parallax: march the view ray through the height field
  float hgt = texture(uDepth, clamp(guv, 0.0, 1.0)).r;
  vec2 puv = guv - gz * (hgt - H0);
  hgt = mix(hgt, texture(uDepth, clamp(puv, 0.0, 1.0)).r, 0.65);
  puv = guv - gz * (hgt - H0);
  hgt = mix(hgt, texture(uDepth, clamp(puv, 0.0, 1.0)).r, 0.65);
  puv = guv - gz * (hgt - H0);

  // persistent liquid trail (screen-space accumulation buffer)
  vec4 tr = texture(uTrail, vUv);
  vec2 trailD = (tr.rg - 0.5);
  float trailK = tr.b;

  // click ripples — expanding rings, analytic
  vec2 rippleD = vec2(0.0);
  float rippleGlow = 0.0;
  for (int i = 0; i < 4; i++) {
    if (uRipple[i].w < 0.5) continue;
    float age = t - uRipple[i].z;
    if (age < 0.0 || age > 3.0) continue;
    vec2 rd = (vUv - uRipple[i].xy) * vec2(uAspect, 1.0);
    float r = length(rd);
    float front = r - age * 0.34;
    float ring = exp(-front * front * 260.0) * exp(-age * 1.7);
    rippleD += (rd / max(r, 1e-4)) * ring * 0.014;
    rippleGlow += ring;
  }

  // idle refraction flow (two octaves, opposing drift)
  vec2 pF = fuv * 2.2;
  vec2 flow = vec2(
    snoise(pF + vec2( t * 0.055, -t * 0.040)),
    snoise(pF + vec2(-t * 0.045,  t * 0.060) + 31.4)
  );
  flow += 0.5 * vec2(
    snoise(pF * 2.2 + vec2( t * 0.090,  t * 0.070) + 11.2),
    snoise(pF * 2.2 + vec2( t * 0.060, -t * 0.080) + 91.7)
  );

  // cursor liquid push (velocity + radial bulge, gaussian falloff)
  vec2 dm = (vUv - uMouse) * vec2(uAspect, 1.0);
  float r2 = dot(dm, dm);
  float fall = exp(-r2 * 14.0);
  vec2 push = uVel * fall * 0.045 * (0.3 + 0.7 * uEnergy);
  push += normalize(dm + 1e-5) * fall * uEnergy * 0.012;

  // total displacement in screen-uv, converted to figure-local
  vec2 dispS = flow * (0.0035 + 0.005 * breath) * settle
             + push + trailD * 0.042 + rippleD;
  vec2 disp = dispS / max(uFig.zw, vec2(1e-3));

  // damp near texture borders, micro breathing zoom around optical center
  float borderM = smoothstep(0.0, 0.06, puv.x) * smoothstep(1.0, 0.94, puv.x)
                * smoothstep(0.0, 0.05, puv.y) * smoothstep(1.0, 0.92, puv.y);
  disp *= borderM;
  vec2 suv = (puv - vec2(0.5, 0.46)) * (1.0 - 0.0050 * breath) + vec2(0.5, 0.46) + disp;

  // chromatic aberration scaled by displacement magnitude
  float inFig = step(0.0, suv.x) * step(suv.x, 1.0) * step(0.0, suv.y) * step(suv.y, 1.0)
              * step(0.0, fuv.x) * step(fuv.x, 1.0) * step(0.0, fuv.y) * step(fuv.y, 1.0);
  float dl = length(disp);
  float caK = 0.35 + 1.6 * smoothstep(0.002, 0.013, dl);
  vec2 ca = disp * caK * 0.6;
  vec4 cR = texture(uTex, suv + ca);
  vec4 cG = texture(uTex, suv);
  vec4 cB = texture(uTex, suv - ca);
  vec3 col = vec3(cR.r, cG.g, cB.b);
  float a = cG.a * inFig;

  // ---- RELIGHT — normals from depth (central differences), cursor key ----
  vec2 dpx = 1.5 / vec2(textureSize(uDepth, 0));
  float hL = texture(uDepth, clamp(suv - vec2(dpx.x, 0.0), 0.0, 1.0)).r;
  float hR = texture(uDepth, clamp(suv + vec2(dpx.x, 0.0), 0.0, 1.0)).r;
  float hU = texture(uDepth, clamp(suv - vec2(0.0, dpx.y), 0.0, 1.0)).r;
  float hD = texture(uDepth, clamp(suv + vec2(0.0, dpx.y), 0.0, 1.0)).r;
  vec3 nrm = normalize(vec3((hL - hR) * 5.5, (hU - hD) * 5.5, 1.0));
  // tilt normals with the head turn so shading follows the rotation
  nrm.xy += gz * (hgt - H0) * 4.0;
  nrm = normalize(nrm);

  // lime KEY light anchored at the cursor (z toward viewer, y down space)
  vec2 lp = (uMouse + mc * 0.045 - uFig.xy) / uFig.zw;
  vec3 Lv = normalize(vec3(lp - suv, 0.85) - vec3(0.0, 0.0, hgt * 0.30));
  float ld2 = dot(lp - suv, lp - suv);
  float att = 0.30 + 0.70 * exp(-ld2 * 1.6);
  float diff = max(dot(nrm, Lv), 0.0);
  float spec = pow(max(dot(nrm, normalize(Lv + vec3(0.0, 0.0, 1.0))), 0.0), 64.0);

  // fixed cool FILL from upper-left front
  vec3 Lf = normalize(vec3(-0.45, -0.50, 0.74));
  float diffF = max(dot(nrm, Lf), 0.0);
  float specF = pow(max(dot(nrm, normalize(Lf + vec3(0.0, 0.0, 1.0))), 0.0), 18.0);
  vec3 coolC = vec3(0.62, 0.72, 0.92);

  // fresnel rim from real normals (augments the alpha-band rim below)
  float fres = pow(1.0 - abs(nrm.z), 2.4);

  // material mask: glass (bright) is glossy, the fabric cap (dark) stays
  // matte — keeps the black-cap brand identity instead of lime-flooding it
  float gloss = 0.18 + 0.82 * smoothstep(0.28, 0.62, dot(cG.rgb, vec3(0.299, 0.587, 0.114)));

  col *= 0.74 + 0.42 * diff * att + 0.20 * diffF;
  col += uLime * spec * att * gloss * mix(1.0, 0.5, uLight);
  col += coolC * specF * gloss * 0.20;
  col += mix(uLime, vec3(1.0), 0.35) * fres * (0.35 + 0.65 * gloss) * (0.10 + 0.30 * att) * mix(1.0, 0.5, uLight);

  // bottom dissolve (replaces the old CSS mask — shirt crop melts away)
  float bottomFade = 1.0 - smoothstep(0.58, 0.96, fuv.y);
  a *= bottomFade;

  // focus vignette on the glass head
  col *= 1.0 - 0.20 * smoothstep(0.32, 0.85, length(fuv - vec2(0.5, 0.45)));

  // ---- lime rim: silhouette band; blooms toward the cursor + trail memory
  float edgeA = max(cG.a, max(cR.a, cB.a)) * inFig;
  float rim = pow(clamp(edgeA * (1.0 - cG.a * inFig) * 4.0, 0.0, 1.0), 1.35) * bottomFade;
  float prox = exp(-r2 * 5.5);
  float limeAmt = rim * (0.10 + 0.70 * prox + 0.6 * uEnergy * prox + 0.5 * trailK + rippleGlow * 1.4);

  // intro rim sweep — one diagonal pass of light during materialize
  float sweepPos = mix(-0.35, 1.45, introE);
  float sweep = exp(-pow((fuv.y + 0.30 * fuv.x - sweepPos) * 3.6, 2.0))
              * (1.0 - smoothstep(0.82, 1.0, uIntro));
  limeAmt += rim * sweep * 3.2;
  col += sweep * a * uLime * 0.10;

  // internal speculars catch lime near cursor / disturbance
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float hot = smoothstep(0.74, 0.96, lum);
  float limeSpec = hot * (prox * (0.09 + 0.22 * uEnergy) + trailK * 0.16 + sweep * 0.5);

  // ---- pseudo-bloom halo on hot speculars (4 wide taps)
  float halo = 0.0;
  for (int i = 0; i < 4; i++) {
    vec2 off = vec2(cos(float(i) * 1.5708 + t * 0.2), sin(float(i) * 1.5708 + t * 0.2)) * 0.016;
    vec4 hs = texture(uTex, suv + off);
    halo += smoothstep(0.78, 0.97, dot(hs.rgb, vec3(0.299, 0.587, 0.114))) * hs.a;
  }
  halo *= 0.12 * inFig * bottomFade;

  // ---- anamorphic flare hint — horizontal streak from strongest speculars
  float streak = 0.0;
  for (int i = 1; i <= 3; i++) {
    float ox = float(i) * 0.030;
    float wgt = 1.0 / (float(i) + 1.0);
    vec4 s1 = texture(uTex, suv + vec2(ox, 0.0));
    vec4 s2 = texture(uTex, suv - vec2(ox, 0.0));
    streak += wgt * smoothstep(0.85, 0.98, dot(s1.rgb, vec3(0.333))) * s1.a;
    streak += wgt * smoothstep(0.85, 0.98, dot(s2.rgb, vec3(0.333))) * s2.a;
  }
  streak *= 0.10 * inFig * bottomFade * (0.55 + 0.45 * breath);

  // ======================================================================
  // FRONT LAYER — micro-dust catching lime light (strongest parallax)
  // ======================================================================
  vec2 pScr = vUv * vec2(uAspect, 1.0);
  float dustNear = exp(-pow((vUv.x - figCX) * 1.6, 2.0));      // denser near figure
  float dBack  = dust(pScr + mc * 0.06 + vec2(0.0, t * 0.010), 9.0, t, 0.0);
  float dFront = dust(pScr + mc * 0.13 + vec2(0.0, t * 0.016), 5.0, t, 7.0);
  float dustLit = 0.55 + 1.1 * exp(-r2 * 2.2) + trailK * 0.8;
  float dustA = (dBack * 0.09 + dFront * 0.16) * dustNear * dustLit * mix(1.0, 0.45, uLight);

  // ======================================================================
  // PRESENCE — client direction (2026-06-10): the figure should sit DARK,
  // subtly emerging from the background, not dominate the ATF. One knob:
  // 1.0 = previous hero-dominant look, lower = quieter. Gaze/3D unaffected.
  // ======================================================================
  const float PRESENCE = 0.40;
  col      *= 0.30 + 0.42 * PRESENCE;   // deep exposure cut — silhouette emerges, not poses
  a        *= 0.82 + 0.18 * PRESENCE;   // breath of background through the glass
  limeAmt  *= PRESENCE;
  limeSpec *= 0.35 + 0.65 * PRESENCE;
  halo     *= PRESENCE;
  streak   *= PRESENCE * 0.8;
  dustA    *= 0.45 + 0.55 * PRESENCE;
  aurA     *= 0.55 + 0.45 * PRESENCE;

  // ======================================================================
  // GRADE / COMPOSITE  (premultiplied alpha out)
  // ======================================================================
  float limeScale = mix(1.0, 0.55, uLight);
  vec3 lime = uLime;

  // text scrim — keeps the headline zone readable where it overlaps the scene.
  // Dark theme: darken the figure locally. Light theme: FADE the figure
  // (dark text over the black cap would vanish — let the white page through).
  float scrim = smoothstep(0.84, 0.34, vUv.x) * smoothstep(0.24, 0.52, vUv.y);
  aurA *= 1.0 - 0.85 * scrim;
  dustA *= 1.0 - 0.9 * scrim;
  a *= mix(1.0, 1.0 - 0.72 * scrim, uLight);
  float glowScrim = 1.0 - 0.7 * scrim * uLight;  // no lime spill over light-mode text

  // figure light spill outside the silhouette
  float glowA = (limeAmt * 0.5 + halo * 0.3) * limeScale * glowScrim;
  float outA = clamp(a + glowA + aurA + dustA, 0.0, 1.0);

  vec3 rgb = aurCol * aurA * (1.0 - 0.85 * a);   // aurora stays BEHIND the figure
  rgb += col * a * (1.0 - 0.30 * scrim * (1.0 - uLight));
  rgb += lime * (limeAmt + limeSpec + halo) * limeScale * glowScrim;
  rgb += mix(lime, vec3(1.0), 0.35) * streak * limeScale * glowScrim;
  rgb += mix(lime, vec3(1.0), 0.55) * dustA;
  rgb += lime * rippleGlow * 0.05;

  // vignette — darkens page edges (premultiplied black = pure alpha)
  float vig = smoothstep(0.62, 1.18, length((vUv - vec2(0.5, 0.46)) * vec2(1.15, 1.0)));
  float vigA = vig * mix(0.34, 0.10, uLight);
  rgb *= 1.0 - vig * 0.35;
  outA = clamp(outA + vigA, 0.0, 1.0);

  // fine animated grain
  float g = hash21(gl_FragCoord.xy + vec2(fract(t * 0.61) * 61.0, fract(t * 0.83) * 83.0)) - 0.5;
  rgb += g * 0.035 * (0.35 + 0.65 * outA);
  rgb += lime * g * glowA * 0.15;

  fragColor = vec4(rgb, outA) * introA;
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    // Fail silently in prod — static image remains. Log for dev.
    console.warn("GlassHero shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function link(gl: WebGL2RenderingContext, vsSrc: string, fsSrc: string) {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn("GlassHero link:", gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

const TRAIL_W = 320;
const TRAIL_H = 192;

export function GlassHero({ className, alt }: GlassHeroProps) {
  const { theme } = useTheme();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glReady, setGlReady] = useState(false);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    // ---- hard gates: never init GL for prerender, reduced motion, mobile
    if (typeof navigator !== "undefined" && navigator.webdriver) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    let disposed = false;
    let started = false;
    let initRequested = false;
    let raf = 0;
    let inView = false;
    let running = false;
    let gl: WebGL2RenderingContext | null = null;
    let lastT = 0;
    let introT = -1; // set on first rendered frame -> materialize start
    let rect = { left: 0, top: 0, width: 1, height: 1 };
    let rectAge = 0;
    let resizeObs: ResizeObserver | null = null;

    // mouse spring state (uv space, y down)
    const m = {
      tx: 0.62, ty: 0.42,       // raw target (start near the figure)
      x: 0.62, y: 0.42,         // springed position
      vx: 0, vy: 0,             // smoothed velocity (uv/s)
      energy: 0,
      seen: false,
    };

    // click ripples — ring buffer of 4 (xy uv, start time, live flag)
    const ripples = new Float32Array(16);
    let rippleIdx = 0;
    let nowS = 0;

    const mainU: Record<string, WebGLUniformLocation | null> = {};
    const trailU: Record<string, WebGLUniformLocation | null> = {};
    let mainProg: WebGLProgram | null = null;
    let trailProg: WebGLProgram | null = null;
    let trailTexA: WebGLTexture | null = null;
    let trailTexB: WebGLTexture | null = null;
    let trailFbA: WebGLFramebuffer | null = null;
    let trailFbB: WebGLFramebuffer | null = null;
    let trailFlip = false;
    let portraitTex: WebGLTexture | null = null;
    let depthTex: WebGLTexture | null = null;

    // gaze springs (normalized -1..1). Head leads, shoulders follow at 60%
    // amplitude ~150 ms behind (neck lag). Starts staring off-screen LEFT so
    // the entry materialize ends with the figure turning to face the viewer.
    const gaze = { hx: -1.25, hy: -0.10, sx: -0.75, sy: -0.06 };

    const onPointerMove = (e: PointerEvent) => {
      m.tx = (e.clientX - rect.left) / rect.width;
      m.ty = (e.clientY - rect.top) / rect.height;
      m.seen = true;
    };

    const onPointerDown = (e: PointerEvent) => {
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) return;
      const o = rippleIdx * 4;
      ripples[o] = x; ripples[o + 1] = y; ripples[o + 2] = nowS; ripples[o + 3] = 1;
      rippleIdx = (rippleIdx + 1) % 4;
    };

    const refreshRect = () => {
      const r = canvas.getBoundingClientRect();
      rect = { left: r.left, top: r.top, width: Math.max(r.width, 1), height: Math.max(r.height, 1) };
    };

    // adaptive quality: sustained slow frames step the pixel budget down
    const BUDGETS = [2.6e6, 1.8e6, 1.2e6];
    let qIdx = 0;
    let slowFrames = 0;

    const resize = () => {
      if (!gl) return;
      const cw = Math.max(canvas.clientWidth, 1);
      const ch = Math.max(canvas.clientHeight, 1);
      // DPR cap 1.5 + total-pixel cap — full-bleed safety on 4k / weak iGPUs
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(BUDGETS[qIdx] / (cw * ch)));
      const w = Math.max(1, Math.round(cw * dpr));
      const h = Math.max(1, Math.round(ch * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      refreshRect();
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed || !running || !gl || !mainProg || !trailProg) return;
      const t = now * 0.001;
      nowS = t;
      if (introT < 0) introT = t;
      const dt = Math.min(Math.max(t - (lastT || t), 0.0001), 0.05);
      lastT = t;

      rectAge += dt;
      if (rectAge > 0.5) { rectAge = 0; refreshRect(); }

      // adaptive quality: ~1.5 s of sustained <42 fps -> shrink the buffer
      if (dt > 0.024) {
        if (++slowFrames > 90 && qIdx < BUDGETS.length - 1) {
          qIdx++; slowFrames = 0; resize();
        }
      } else if (slowFrames > 0) slowFrames--;

      // ---- spring physics (inertia feel)
      const ease = 1 - Math.exp(-dt * 6.5);
      const nx = m.x + (m.tx - m.x) * ease;
      const ny = m.y + (m.ty - m.y) * ease;
      const ivx = (nx - m.x) / dt;
      const ivy = (ny - m.y) / dt;
      const vEase = 1 - Math.exp(-dt * 9.0);
      m.vx += (ivx - m.vx) * vEase;
      m.vy += (ivy - m.vy) * vEase;
      m.x = nx; m.y = ny;
      const speed = Math.hypot(m.vx, m.vy);
      m.energy = Math.min(1, m.energy * Math.exp(-dt * 2.1) + Math.min(speed * dt * 3.0, 0.5));
      const vMax = 2.4;
      const vs = speed > vMax ? vMax / speed : 1;
      const velX = m.vx * vs * 0.08;
      const velY = m.vy * vs * 0.08;
      const aspect = rect.width / rect.height;

      // figure rect: right-anchored, ~88% viewport height, slight right bleed
      const figH = 0.88;
      const figW = figH / aspect;            // square texture
      const figX = 1.0 - figW * 0.94;        // small bleed off the right edge
      const figY = 0.035;

      // ---- gaze: head tracks the cursor, shoulders lag behind the head
      const introAge = t - introT;
      const headX = figX + figW * 0.51;
      const headY = figY + figH * 0.34;
      let tgx: number, tgy: number;
      if (introAge < 0.55) {
        // entry: hold the off-screen-left stare, then turn to meet the viewer
        tgx = -1.2; tgy = -0.12;
      } else {
        tgx = Math.max(-1, Math.min(1, (m.x - headX) * 2.6)) + Math.sin(t * 0.33) * 0.045;
        tgy = Math.max(-1, Math.min(1, (m.y - headY) * 3.2)) + Math.sin(t * 0.47 + 1.7) * 0.04;
      }
      // head spring rate ramps up after the intro turn (first sweep graceful)
      const headRate = Math.min(7.0, 2.4 + Math.max(introAge - 0.55, 0) * 2.2);
      const ge = 1 - Math.exp(-dt * headRate);
      gaze.hx += (tgx - gaze.hx) * ge;
      gaze.hy += (tgy - gaze.hy) * ge;
      // shoulders: 60% amplitude, ~150 ms time constant behind the head
      const se = 1 - Math.exp(-dt * 6.6);
      gaze.sx += (gaze.hx * 0.6 - gaze.sx) * se;
      gaze.sy += (gaze.hy * 0.6 - gaze.sy) * se;

      // ================= PASS 1 — trail field (ping-pong, tiny) ==========
      const src = trailFlip ? trailTexB : trailTexA;
      const dst = trailFlip ? trailFbA : trailFbB;
      gl.bindFramebuffer(gl.FRAMEBUFFER, dst);
      gl.viewport(0, 0, TRAIL_W, TRAIL_H);
      gl.useProgram(trailProg);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, src);
      gl.uniform1i(trailU.uPrev, 1);
      gl.uniform2f(trailU.uMouse, m.x, m.y);
      gl.uniform2f(trailU.uVel, velX, velY);
      gl.uniform1f(trailU.uDt, dt);
      gl.uniform1f(trailU.uAspect, aspect);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // ================= PASS 2 — composite ==============================
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(mainProg);
      // unit 0 = portrait (re-bind: trail-target creation/binds can clobber
      // whichever unit was active), unit 1 = freshly written trail field
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, portraitTex);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, trailFlip ? trailTexA : trailTexB);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, depthTex);
      trailFlip = !trailFlip;

      gl.uniform1f(mainU.uTime, t);
      gl.uniform2f(mainU.uMouse, m.x, m.y);
      gl.uniform2f(mainU.uVel, velX, velY);
      gl.uniform1f(mainU.uEnergy, m.energy);
      gl.uniform1f(mainU.uAspect, aspect);
      const light = themeRef.current === "light";
      gl.uniform3f(mainU.uLime, light ? 0.42 : 0.831, light ? 0.561 : 1.0, 0.0);
      gl.uniform1f(mainU.uLight, light ? 1 : 0);
      gl.uniform1f(mainU.uIntro, Math.min(Math.max((t - introT) / 1.2, 0), 1));
      gl.uniform4f(mainU.uFig, figX, figY, figW, figH);
      // gaze in figure-uv shift per unit depth: ±0.075 ≈ ±10° yaw equivalent,
      // ±0.046 ≈ ±6° pitch — hard ceiling before single-view reprojection breaks
      gl.uniform4f(mainU.uGaze, gaze.hx * 0.075, gaze.hy * 0.046, gaze.sx * 0.075, gaze.sy * 0.046);
      gl.uniform4fv(mainU.uRipple, ripples);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };

    const setRunning = (on: boolean) => {
      if (on === running || !gl) return;
      running = on;
      if (on) {
        lastT = 0;
        if (!raf) raf = requestAnimationFrame(frame);
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onVisibility = () => setRunning(!document.hidden && inView && started);

    const makeTrailTarget = (g: WebGL2RenderingContext) => {
      const tex = g.createTexture();
      g.bindTexture(g.TEXTURE_2D, tex);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, TRAIL_W, TRAIL_H, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      const fb = g.createFramebuffer();
      g.bindFramebuffer(g.FRAMEBUFFER, fb);
      g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, tex, 0);
      // neutral field: displacement (0.5,0.5) = zero, intensity 0
      g.clearColor(0.5, 0.5, 0.0, 1.0);
      g.clear(g.COLOR_BUFFER_BIT);
      return { tex, fb };
    };

    const init = () => {
      if (disposed || started) return;
      const img = new Image();
      img.decoding = "async";
      const dimg = new Image();
      dimg.decoding = "async";
      let pending = 2;
      const onLoaded = () => {
        if (--pending > 0 || disposed) return;
        const ctx = canvas.getContext("webgl2", {
          alpha: true,
          antialias: false,
          depth: false,
          stencil: false,
          premultipliedAlpha: true,
          powerPreference: "high-performance",
        });
        if (!ctx) return; // WebGL unavailable -> static image stays
        gl = ctx;

        mainProg = link(gl, VERT, FRAG);
        trailProg = link(gl, VERT, TRAIL_FRAG);
        if (!mainProg || !trailProg) { gl = null; return; }

        // fullscreen triangle (shared by both passes via one VAO)
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

        // portrait texture on unit 0 (row 0 = top, matches vUv; no flip)
        portraitTex = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, portraitTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

        // depth map on unit 2 (grayscale; shader samples .r)
        depthTex = gl.createTexture();
        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, depthTex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, dimg);

        // trail ping-pong targets (tiny, RGBA8 — universally renderable)
        const ta = makeTrailTarget(gl);
        const tb = makeTrailTarget(gl);
        trailTexA = ta.tex; trailFbA = ta.fb;
        trailTexB = tb.tex; trailFbB = tb.fb;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        for (const name of ["uTex", "uTrail", "uDepth", "uGaze", "uTime", "uMouse", "uVel", "uEnergy", "uAspect", "uLime", "uLight", "uIntro", "uFig", "uRipple"]) {
          mainU[name] = gl.getUniformLocation(mainProg, name);
        }
        for (const name of ["uPrev", "uMouse", "uVel", "uDt", "uAspect"]) {
          trailU[name] = gl.getUniformLocation(trailProg, name);
        }
        gl.useProgram(mainProg);
        gl.uniform1i(mainU.uTex, 0);
        gl.uniform1i(mainU.uTrail, 1);
        gl.uniform1i(mainU.uDepth, 2);
        gl.clearColor(0, 0, 0, 0);

        resize();
        resizeObs = new ResizeObserver(resize);
        resizeObs.observe(canvas);

        canvas.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setRunning(false);
          started = false;
          gl = null;
          setGlReady(false); // restore static image
        });

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerdown", onPointerDown, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);

        started = true;
        setGlReady(true); // canvas fades in, img fades out (stays in DOM)
        setRunning(inView && !document.hidden);
      };
      img.onload = onLoaded;
      dimg.onload = onLoaded;
      img.onerror = () => { /* static image stays */ };
      dimg.onerror = () => { /* static image stays */ };
      img.src = portraitUrl;
      dimg.src = depthUrl;
    };

    const scheduleInit = () => {
      if (initRequested) return;
      initRequested = true;
      // post-LCP: wait for idle so GL compile never competes with first paint
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(() => init(), { timeout: 2500 });
      else setTimeout(init, 600);
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        if (inView && !started && !disposed) scheduleInit();
        setRunning(inView && !document.hidden && started);
      },
      { rootMargin: "120px" }
    );
    io.observe(wrap);

    return () => {
      disposed = true;
      io.disconnect();
      resizeObs?.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      gl = null;
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none select-none ${className ?? ""}`}
    >
      {/* Static portrait — ALWAYS in the DOM (prerender/SEO/no-GL fallback).
          Positioned to mirror the GL figure placement (right-anchored,
          ~88% height on desktop). Bottom fade mask hides the shirt crop —
          the shader reproduces the same dissolve once GL takes over. */}
      <img
        src={portraitUrl}
        alt={alt}
        width={1024}
        height={1024}
        decoding="async"
        draggable={false}
        className="absolute aspect-square object-contain transition-opacity duration-700
                   top-[8%] right-[-14%] w-[78vw] opacity-50
                   sm:opacity-70 sm:top-[6%] sm:right-[-4%] sm:w-[58vw]
                   md:opacity-100 md:w-auto md:top-[3.5%] md:right-[-3vw] md:h-[88%]"
        style={{
          opacity: glReady ? 0 : undefined,
          WebkitMaskImage: "linear-gradient(to bottom, black 58%, transparent 97%)",
          maskImage: "linear-gradient(to bottom, black 58%, transparent 97%)",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full transition-opacity duration-700"
        style={{ opacity: glReady ? 1 : 0 }}
      />
    </div>
  );
}
