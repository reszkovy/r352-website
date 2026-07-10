import { ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  cubicBezier,
  MotionValue,
} from "motion/react";
import { useTheme } from "@/app/context/ThemeContext";

/**
 * LoopPath - scroll-driven "the r3loop draws itself" scene.
 *
 * A single straight SVG line draws left→right along one horizontal baseline
 * through the 8 step nodes (Diagnose … Iterate). The loop closure is a small
 * ↻ glyph after the last node - Iterate feeds back into 01 - not a full
 * return path across the layout (the old wavy zigzag + bottom sweep read as
 * broken geometry).
 *
 * Mechanics:
 *   - 220vh wrapper, sticky h-screen frame; one useScroll per scene.
 *   - pathLength={1} + strokeDasharray 1; strokeDashoffset is a useTransform
 *     of scroll progress (scrubbed, position-driven - never timed).
 *   - Each node carries a lime overlay circle + lime label overlay whose
 *     opacity scrubs in at the path-length fraction where the line passes it.
 *   - Loop-back glyph + closing caption fade in as the line completes.
 *   - Step numbers (above the line) and labels (below the line) are real SVG
 *     <text> - always visible, always in the DOM. transform/opacity-only
 *     animation on top.
 *
 * This component is only mounted in kinetic mode - the parent renders the
 * plain HTML step grid for prerender/bots/reduced-motion/mobile.
 */

const EASE = cubicBezier(0.22, 1, 0.36, 1);
const LIME = "#D4FF00";

/* Theme-aware SVG palette. SVG fills are attributes, not utility classes, so
   the global light-mode CSS overrides can't flip them - resolved here instead.
   Light accent #9abb00 mirrors the text-[#9abb00] dark:text-[#D4FF00] pattern
   used on /process (raw lime is unreadable on the light background). */
interface LoopPalette {
  accent: string;
  ink: string;
  nodeFill: string;
  nodeRing: string;
  ghost: string;
}

const DARK_PALETTE: LoopPalette = {
  accent: LIME,
  ink: "#ffffff",
  nodeFill: "#0a0a0a",
  nodeRing: "rgba(255,255,255,0.3)",
  ghost: "rgba(255,255,255,0.08)",
};

const LIGHT_PALETTE: LoopPalette = {
  accent: "#9abb00",
  ink: "#111111",
  nodeFill: "#F1F6FA",
  nodeRing: "rgba(0,0,0,0.3)",
  ghost: "rgba(0,0,0,0.1)",
};

export interface LoopStep {
  num: string;
  label: string;
}

/* ── Geometry - one horizontal baseline, all 8 nodes on it ─────────────── */
const VB_W = 1600;
const VB_H = 300;
const X0 = 90;
const X1 = 1450;
const BASE_Y = 150;

const xs = Array.from({ length: 8 }, (_, i) => X0 + (i * (X1 - X0)) / 7);
const ys = xs.map(() => BASE_Y);

/* The connecting path is a clean straight line, left → right. */
const PATH_D = `M ${X0} ${BASE_Y} L ${X1} ${BASE_Y}`;

/* Path-length fraction at which the line reaches node i - straight line,
   so exactly i/7 (node 0 lights as soon as the draw starts). */
const nodeFraction = (i: number) => (i === 0 ? 0.01 : i / 7);
/* Scroll progress window in which the path actually draws. */
const DRAW: [number, number] = [0.06, 0.8];
const fractionToProgress = (f: number) => DRAW[0] + (DRAW[1] - DRAW[0]) * f;

/* Loop-back glyph (↻ Iterate → 01 Diagnose) centered after the last node. */
const GX = X1 + 62;
const GY = BASE_Y;
const GR = 13;
/* Open arc from bottom-right around the top to bottom-left (gap at the
   bottom), arrowhead at the bottom-left end pointing back along the cycle. */
const GLYPH_ARC = `M ${GX + GR * 0.5} ${GY + GR * 0.87} A ${GR} ${GR} 0 1 0 ${
  GX - GR * 0.5
} ${GY + GR * 0.87}`;
const GLYPH_HEAD = `M ${GX - GR * 0.5 - 7} ${GY + GR * 0.87 - 4} L ${
  GX - GR * 0.5
} ${GY + GR * 0.87} L ${GX - GR * 0.5 - 1} ${GY + GR * 0.87 - 8.5}`;

/* ── Node: base ring always visible, lime state scrubs in ──────────────── */
function Node({
  p,
  i,
  step,
  palette,
}: {
  p: MotionValue<number>;
  i: number;
  step: LoopStep;
  palette: LoopPalette;
}) {
  const at = fractionToProgress(nodeFraction(i));
  const active = useTransform(p, [at - 0.012, at + 0.012], [0, 1], {
    ease: EASE,
  });
  const halo = useTransform(active, [0, 1], [0, 0.3]);
  const x = xs[i];
  const y = ys[i];
  const labelY = y + 44;
  const numY = y - 28;

  return (
    <g>
      {/* halo */}
      <motion.circle
        cx={x}
        cy={y}
        r={17}
        fill="none"
        stroke={palette.accent}
        strokeWidth={1}
        style={{ opacity: halo }}
      />
      {/* base node */}
      <circle
        cx={x}
        cy={y}
        r={7}
        fill={palette.nodeFill}
        stroke={palette.nodeRing}
        strokeWidth={1.5}
      />
      {/* lit node */}
      <motion.circle cx={x} cy={y} r={7} fill={palette.accent} style={{ opacity: active }} />

      {/* step number - always in DOM */}
      <text
        x={x}
        y={numY}
        textAnchor="middle"
        fontSize="13"
        className="font-display"
        fill={palette.accent}
      >
        {step.num}
      </text>

      {/* label - always visible in ink color, accent overlay scrubs in */}
      <text
        x={x}
        y={labelY}
        textAnchor="middle"
        fontSize="21"
        fontWeight="700"
        fill={palette.ink}
        letterSpacing="-0.02em"
      >
        {step.label}
      </text>
      <motion.text
        aria-hidden="true"
        x={x}
        y={labelY}
        textAnchor="middle"
        fontSize="21"
        fontWeight="700"
        fill={palette.accent}
        letterSpacing="-0.02em"
        style={{ opacity: active }}
      >
        {step.label}
      </motion.text>
    </g>
  );
}

/* ── Scene ──────────────────────────────────────────────────────────────── */
interface LoopPathProps {
  steps: LoopStep[];
  closingLabel: string;
  /** Section header rendered inside the sticky frame, above the loop. */
  children?: ReactNode;
}

export function LoopPath({ steps, closingLabel, children }: LoopPathProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const palette = theme === "dark" ? DARK_PALETTE : LIGHT_PALETTE;

  // Single useScroll for the whole scene (perf constraint).
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // The line draws itself: 1 → 0 dashoffset across the scrub window.
  const dashOffset = useTransform(p, DRAW, [1, 0]);
  // Loop-closing accents - glyph + caption land as the line completes.
  const arrowOpacity = useTransform(p, [0.8, 0.88], [0, 1], { ease: EASE });
  // opacity-only: on SVG elements motion's `y` maps to the y attribute,
  // which would fight the text's absolute position.
  const closingOpacity = useTransform(p, [0.78, 0.88], [0, 1], { ease: EASE });

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {children}

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full h-auto block"
          role="img"
          aria-label={steps.map((s) => s.label).join(" → ")}
        >
          {/* ghost route - the full loop, faint, always visible */}
          <path
            d={PATH_D}
            fill="none"
            stroke={palette.ghost}
            strokeWidth={1.5}
          />

          {/* lime glow under-stroke (same dashoffset, wider, soft) */}
          <motion.path
            d={PATH_D}
            fill="none"
            stroke={palette.accent}
            strokeWidth={6}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1 1"
            opacity={0.16}
            style={{ strokeDashoffset: dashOffset, willChange: "stroke-dashoffset" }}
          />

          {/* the line that draws itself */}
          <motion.path
            d={PATH_D}
            fill="none"
            stroke={palette.accent}
            strokeWidth={2}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1 1"
            style={{ strokeDashoffset: dashOffset, willChange: "stroke-dashoffset" }}
          />

          {/* nodes + labels */}
          {steps.map((step, i) => (
            <Node key={step.num} p={p} i={i} step={step} palette={palette} />
          ))}

          {/* loop-back glyph ↻ - Iterate feeds back into 01 Diagnose */}
          <motion.g style={{ opacity: arrowOpacity }}>
            <path
              d={GLYPH_ARC}
              fill="none"
              stroke={palette.accent}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <path
              d={GLYPH_HEAD}
              fill="none"
              stroke={palette.accent}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* closing caption beneath the baseline */}
          <motion.text
            x={VB_W / 2}
            y={BASE_Y + 96}
            textAnchor="middle"
            fontSize="14"
            className="font-mono"
            fill="#737373"
            style={{ opacity: closingOpacity }}
          >
            {closingLabel}
          </motion.text>
        </svg>
      </div>
    </div>
  );
}
