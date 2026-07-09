import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/app/context/LanguageContext";

/**
 * WebGLExperiment - /webgl sandbox, now a small LIBRARY of on-brand fragment-shader
 * effects (Flow / Grid / Cells) you can switch between, over the real r352 header +
 * home hero. Raw WebGL, zero dependencies. One context is kept alive; switching a
 * preset just relinks the program. Not in nav, noindex.
 */
const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const PRELUDE = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_mdown;
float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
vec2 hash2(vec2 p){ p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
`;

// 1 — Flow: domain-warped energy field
const FLOW = `
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*u_res)/u_res.y;
  vec2 m=(u_mouse-0.5*u_res)/u_res.y;
  float t=u_time*0.06;
  vec2 q=vec2(fbm(uv*1.4+t), fbm(uv*1.4+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(uv*1.4+3.6*q+vec2(1.7,9.2)+t*0.5), fbm(uv*1.4+3.6*q+vec2(8.3,2.8)-t*0.5));
  float f=fbm(uv*1.4+3.6*r);
  float md=length(uv-m); float glow=exp(-md*3.2)*(0.6+0.5*u_mdown); f+=glow*0.35;
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.021);
  col=mix(col,clay*0.55,smoothstep(0.34,0.62,f)*0.30);
  col=mix(col,lime,smoothstep(0.58,0.98,f));
  col+=lime*glow*0.55;
  float edge=smoothstep(0.02,0.0,abs(fract(f*6.0)-0.5)-0.46); col+=lime*edge*0.20;
  float v=length(uv); col*=1.0-0.28*v*v; col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.022;
  gl_FragColor=vec4(col,1.0);
}`;

// 2 — Aurora: flowing bands of light (wave-displaced gradient, opposing flows).
// The "premium gradient" technique - layered noise displaces soft ribbons; nothing
// rigid. Dark -> clay field with two flowing lime light ribbons.
const AURORA = `
void main(){
  vec2 res=u_res;
  vec2 p=gl_FragCoord.xy/res;
  float ar=res.x/res.y;
  float x=(p.x-0.5)*ar, y=p.y;
  vec2 mo=(u_mouse/res-0.5); mo.x*=ar;
  float t=u_time;
  float w = noise(vec2(x*0.9 + t*0.05, t*0.04))*0.85
          + noise(vec2(x*1.3 - t*0.045, t*0.05))*0.55
          + noise(vec2(x*0.5 + t*0.03, 1.7))*0.5;
  w /= 1.9;
  vec3 dark=vec3(0.028,0.03,0.028);
  vec3 clay=vec3(0.42,0.22,0.16);
  vec3 lime=vec3(0.831,1.0,0.0);
  vec3 col = mix(dark, clay, smoothstep(0.12,0.9, y + w*0.35 - 0.12));
  // ribbon 1 (soft gaussian, flows + follows pointer y)
  float wl = 0.50 + w*0.42 + mo.y*0.22;
  float th = 0.085 + 0.05*noise(vec2(x, t*0.12));
  col += lime * exp(-pow((y-wl)/th, 2.0)) * 0.95;
  // ribbon 2 (fainter, higher, opposing flow)
  float w2 = (noise(vec2(x*0.8 - t*0.05, 4.0))*0.9 + noise(vec2(x*1.4 + t*0.04, 2.0))*0.5)/1.4;
  float wl2 = 0.72 + w2*0.30;
  col += lime * exp(-pow((y-wl2)/0.13, 2.0)) * 0.35;
  vec2 c = vec2((p.x-0.5)*ar, p.y-0.5);
  float md = length(c - mo);
  col += lime*exp(-md*3.2)*0.30*(0.5+u_mdown);
  col *= 1.0 - 0.28*dot(c,c);
  col += (hash(gl_FragCoord.xy+u_time)-0.5)*0.016;
  gl_FragColor=vec4(col,1.0);
}`;

// 3 — Liquid: raymarched merging metaballs with lime rim-light + a volumetric halo.
// Real depth + glossy organic surface - the dimensional, "wow" one.
const LIQUID = `
float smin(float a,float b,float k){ float h=clamp(0.5+0.5*(b-a)/k,0.0,1.0); return mix(b,a,h)-k*h*(1.0-h); }
float map(vec3 q){
  float t=u_time*0.5;
  float d=1e5;
  d=smin(d, length(q-vec3(sin(t*0.7)*1.2, cos(t*0.9)*0.8, sin(t*0.5)*0.5))-0.72, 0.85);
  d=smin(d, length(q-vec3(cos(t*0.8)*1.05, sin(t*0.6)*1.05, cos(t*0.7)*0.5))-0.62, 0.85);
  d=smin(d, length(q-vec3(sin(t*0.5+2.0)*0.95, cos(t*0.4+1.0)*0.9, sin(t*0.8)*0.6))-0.66, 0.85);
  return d;
}
vec3 nrm(vec3 q){ vec2 e=vec2(0.001,0.0);
  return normalize(vec3(map(q+e.xyy)-map(q-e.xyy), map(q+e.yxy)-map(q-e.yxy), map(q+e.yyx)-map(q-e.yyx))); }
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*u_res)/u_res.y;
  vec2 mo=(u_mouse/u_res-0.5); mo.x*=u_res.x/u_res.y;
  vec3 ro=vec3(0.0,0.0,4.3);
  vec3 rd=normalize(vec3(uv+mo*0.28, -1.7));
  float t=0.0, glow=0.0; bool hit=false; vec3 q=ro;
  for(int i=0;i<84;i++){
    q=ro+rd*t; float d=map(q);
    glow += 0.015/(0.02+d*d*8.0);
    if(d<0.001){ hit=true; break; }
    if(t>9.0) break;
    t += max(d,0.016);
  }
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.02);
  if(hit){
    vec3 n=nrm(q);
    vec3 ld=normalize(vec3(0.5,0.7,0.6));
    float diff=max(dot(n,ld),0.0);
    float rim=pow(1.0-max(dot(n,-rd),0.0),2.4);
    col=vec3(0.028);
    col += clay*0.22*diff;
    col += lime*rim*1.15;
    vec3 hh=normalize(ld-rd);
    col += lime*pow(max(dot(n,hh),0.0),44.0)*0.7;
  }
  col += lime*glow*0.06;
  float md=length(uv-mo); col += lime*exp(-md*3.5)*0.22*u_mdown;
  float v=length(uv); col*=1.0-0.26*v*v;
  gl_FragColor=vec4(col,1.0);
}`;

const PRESETS = [
  { id: "flow", name: "Flow", frag: PRELUDE + FLOW },
  { id: "aurora", name: "Aurora", frag: PRELUDE + AURORA },
  { id: "liquid", name: "Liquid", frag: PRELUDE + LIQUID },
];

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error("shader:", gl.getShaderInfoLog(s));
  return s;
}

export function WebGLExperiment() {
  const { language, t } = useLanguage();
  const pl = language === "pl";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);

  const glRef = useRef<WebGLRenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const uniRef = useRef<{
    res: WebGLUniformLocation | null;
    time: WebGLUniformLocation | null;
    mouse: WebGLUniformLocation | null;
    down: WebGLUniformLocation | null;
  } | null>(null);

  // ── one-time GL init + render loop ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;
    glRef.current = gl;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

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
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (r.height - (e.clientY - r.top)) * dpr;
    };
    const onDown = () => (mouse.down = 1);
    const onUp = () => (mouse.down = 0);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    let raf = 0;
    const start = performance.now();
    const render = (now: number) => {
      const prog = progRef.current;
      const u = uniRef.current;
      if (prog && u) {
        const tsec = reduced ? 8 : (now - start) / 1000;
        gl.useProgram(prog);
        gl.uniform2f(u.res, canvas.width, canvas.height);
        gl.uniform1f(u.time, tsec);
        gl.uniform2f(u.mouse, mouse.x, mouse.y);
        gl.uniform1f(u.down, mouse.down);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
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
      glRef.current = null;
    };
  }, []);

  // ── (re)build the program when the preset changes ──
  useEffect(() => {
    const gl = glRef.current;
    if (!gl) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, PRESETS[active].frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const prev = progRef.current;
    progRef.current = prog;
    uniRef.current = {
      res: gl.getUniformLocation(prog, "u_res"),
      time: gl.getUniformLocation(prog, "u_time"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      down: gl.getUniformLocation(prog, "u_mdown"),
    };
    if (prev) gl.deleteProgram(prev);
  }, [active]);

  return (
    <>
      <Helmet>
        <title>WebGL · r352</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="fixed inset-0 bg-[#0A0A0A]">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* legibility scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0A0A0A]/92 via-[#0A0A0A]/45 to-transparent" />

        {/* home hero, living on the WebGL background */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="w-full max-w-[1800px] mx-auto px-8 md:px-14">
            <span className="block font-display uppercase tracking-[0.25em] text-[11px] text-[#D4FF00] mb-5">
              {(pl ? "WebGL · eksperyment" : "WebGL · experiment") + " — " + PRESETS[active].name}
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

        {/* effect library switcher */}
        <div className="pointer-events-auto absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-white/12 bg-[#0A0A0A]/70 p-1.5 backdrop-blur">
          {PRESETS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-1.5 font-display uppercase tracking-[0.18em] text-[11px] transition-colors ${
                i === active ? "bg-[#D4FF00] text-black" : "text-white/60 hover:text-white"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-8 right-8 hidden md:flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
          <span className="font-display uppercase tracking-[0.2em] text-[10px] text-white/45">
            {pl ? "rusz kursorem · kliknij" : "move cursor · click"}
          </span>
        </div>
      </div>
    </>
  );
}
