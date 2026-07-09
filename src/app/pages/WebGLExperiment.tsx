import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/app/context/LanguageContext";

/**
 * WebGLExperiment - /webgl sandbox. A full-viewport GLSL fragment shader in the
 * r352 language (near-black + electric lime, a whisper of clay), domain-warped
 * flow that reacts to the pointer. Raw WebGL, zero dependencies. Not in nav -
 * experimental surface for immersive / Awwwards-style motion trials.
 */
const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;   // pixels, gl-space (y up)
uniform float u_mdown;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  float a = hash(i), b = hash(i+vec2(1.0,0.0));
  float c = hash(i+vec2(0.0,1.0)), d = hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<6;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*u_res) / u_res.y;
  vec2 m  = (u_mouse       - 0.5*u_res) / u_res.y;
  float t = u_time * 0.06;

  // domain warping - flowing, systematic energy field
  vec2 q = vec2(fbm(uv*1.4 + t), fbm(uv*1.4 + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(uv*1.4 + 3.6*q + vec2(1.7,9.2) + t*0.5),
                fbm(uv*1.4 + 3.6*q + vec2(8.3,2.8) - t*0.5));
  float f = fbm(uv*1.4 + 3.6*r);

  // pointer glow + local push
  float md = length(uv - m);
  float glow = exp(-md*3.2) * (0.6 + 0.5*u_mdown);
  f += glow*0.35;

  vec3 lime = vec3(0.831, 1.0, 0.0);   // #D4FF00
  vec3 clay = vec3(0.851, 0.463, 0.341); // #D97757

  vec3 col = vec3(0.021);
  col = mix(col, clay*0.55, smoothstep(0.34, 0.62, f)*0.30);
  col = mix(col, lime,      smoothstep(0.58, 0.98, f));
  col += lime * glow * 0.55;

  // thin bright filaments where the field folds
  float edge = smoothstep(0.02, 0.0, abs(fract(f*6.0)-0.5)-0.46);
  col += lime * edge * 0.20;

  float v = length(uv);
  col *= 1.0 - 0.28*v*v;                          // vignette
  col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.022; // grain
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("shader:", gl.getShaderInfoLog(s));
  }
  return s;
}

export function WebGLExperiment() {
  const { language, t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    // fullscreen triangle
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uDown = gl.getUniformLocation(prog, "u_mdown");

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const mouse = { x: 0, y: 0, down: 0 };
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (rect.height - (e.clientY - rect.top)) * dpr; // flip y for gl
    };
    const onDown = () => (mouse.down = 1);
    const onUp = () => (mouse.down = 0);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      const t = reduced ? 8 : (now - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uDown, mouse.down);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = reduced ? 0 : requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  const pl = language === "pl";

  return (
    <>
      <Helmet>
        <title>WebGL · r352</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="fixed inset-0 bg-[#0A0A0A]">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Scrim - darkens the left where the copy sits, keeps the top-right glow punchy. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0A0A0A]/92 via-[#0A0A0A]/45 to-transparent" />

        {/* Home hero, living on the WebGL background (the real r352 header sits on top). */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="w-full max-w-[1800px] mx-auto px-8 md:px-14">
            <span className="block font-display uppercase tracking-[0.25em] text-[11px] text-[#D4FF00] mb-5">
              {pl ? "WebGL · eksperyment" : "WebGL · experiment"}
            </span>
            <h1
              className="font-display font-normal text-white !text-[clamp(2.5rem,5.6vw,7rem)] leading-[0.98] tracking-tight [text-shadow:0_2px_44px_rgba(0,0,0,0.65)]"
              dangerouslySetInnerHTML={{ __html: t("hero.title") }}
            />
            <p className="mt-7 max-w-2xl text-base md:text-2xl text-white/80 leading-snug [text-shadow:0_1px_22px_rgba(0,0,0,0.65)]">
              {t("hero.description_title")}
            </p>
            <Link
              href="/brief"
              className="pointer-events-auto mt-10 inline-flex items-center gap-3 bg-[#D4FF00] text-black font-display uppercase tracking-widest text-sm px-7 py-4 rounded-none hover:bg-white transition-colors duration-300"
            >
              {pl ? "Rozpocznij projekt" : "Start a project"}
            </Link>
          </div>
        </div>

        {/* interaction hint, bottom-right */}
        <div className="pointer-events-none absolute bottom-6 right-8 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
          <span className="font-display uppercase tracking-[0.2em] text-[10px] text-white/50">
            {pl ? "rusz kursorem · kliknij" : "move cursor · click"}
          </span>
        </div>
      </div>
    </>
  );
}
