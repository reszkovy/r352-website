import { useEffect, useRef } from "react";
import { useAudio } from "@/app/context/AudioContext";
import { uploadGlyphAtlas } from "@/app/lib/logoGlyphAtlas";

/**
 * HeroWebGLBackground - ambient variant of the /webgl "808" effect behind the
 * home hero: r352 logo glyphs (R-in-circle / 3 / 5 / 2) scattered off-grid,
 * pulsing on a 129 BPM sequencer clock, synced to the live site track when the
 * music plays, with a gentle magnetic response to the pointer. Everything is
 * tuned several notches dimmer/slower than /webgl so the interface stays the
 * hero - this is texture, not a show.
 *
 * Trial feature - gated by HERO_WEBGL in AgencyHero.tsx (dark theme only). To
 * revert: flip that flag to false (original background is bg-background +
 * AnimeGrid). See the "home-hero-webgl-trial" memory.
 */
const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_mdown;
uniform float u_bass; uniform float u_mid; uniform float u_high;
uniform sampler2D u_glyphs;
float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
vec2 hash2(vec2 p){ p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453); }
void main(){
  vec2 res=u_res;
  vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  float ar=res.x/res.y;
  vec2 p=gl_FragCoord.xy/res;

  float BPM=129.0;
  float beat=u_time*BPM/60.0;
  float s16=beat*4.0;
  float seed=floor(beat/16.0);            // reshuffle every 4 bars (calmer)

  float COLS=15.0;
  vec2 g=vec2(p.x*COLS, p.y*COLS/ar);
  vec2 id=floor(g);
  vec2 mg=vec2((u_mouse.x/res.x)*COLS, (u_mouse.y/res.y)*COLS/ar);

  float near=exp(-length(uv-m)*2.6)*(0.35+0.5*u_mdown);
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.0);

  for(int yy=-1;yy<=1;yy++) for(int xx=-1;xx<=1;xx++){
    vec2 cell=id+vec2(float(xx),float(yy));

    // gentle magnet: glyphs lean toward the pointer, force vanishing at it
    vec2 dv=mg-(cell+0.5);
    float dl=max(length(dv),0.0001);
    vec2 pull=(dv/dl)*exp(-dl*0.34)*0.16*(1.0+0.4*u_mdown)*smoothstep(0.0,0.5,dl);
    float swell=1.0+0.12*exp(-dl*0.5);

    // sparser pattern than /webgl - most glyphs stay idle
    float on=step(0.74,hash(cell+seed*13.71));
    float tS=mod(s16-cell.x,16.0);
    float env=exp(-tS*1.1);
    float amp=0.30+0.55*u_bass+0.45*u_high*(0.3+0.7*hash(cell+11.13));

    vec2 rnd=hash2(cell);
    vec2 jit=(rnd-0.5)*0.34;
    float hs=(0.24+0.15*rnd.y)*swell;
    vec2 f=g-(cell+0.5)-jit-pull;
    vec2 lf=f/(2.0*hs)+0.5;
    float inQ=step(0.0,lf.x)*step(lf.x,1.0)*step(0.0,lf.y)*step(lf.y,1.0);
    float gi=floor(hash(cell*2.13+7.7)*3.9999);
    float mask=texture2D(u_glyphs,vec2((clamp(lf.x,0.0,1.0)+gi)*0.25,clamp(lf.y,0.0,1.0))).r*inQ;

    vec3 tint=mix(lime,clay,step(0.93,hash(cell*1.7+3.3)));
    col+=lime*mask*0.036;                          // idle field
    col+=tint*mask*on*(0.03+env*0.51*amp+near*0.33);
  }

  col*=1.0+u_bass*0.10;                            // faint breath on the kick
  float v=length(uv); col*=1.0-0.30*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.014;
  col*=0.85;                                       // ambient behind the interface
  gl_FragColor=vec4(col,1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function HeroWebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // live audio tap - same pattern as /webgl 808, BPM-clock fallback when silent
  const { isPlaying, getAnalyser } = useAudio();
  const playingRef = useRef(isPlaying);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const freqRef = useRef<Uint8Array | null>(null);
  const levelRef = useRef({ bass: 0, mid: 0, high: 0 });
  useEffect(() => {
    playingRef.current = isPlaying;
    if (isPlaying && !analyserRef.current) analyserRef.current = getAnalyser();
  }, [isPlaying, getAnalyser]);

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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    uploadGlyphAtlas(gl);
    gl.uniform1i(gl.getUniformLocation(prog, "u_glyphs"), 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uDown = gl.getUniformLocation(prog, "u_mdown");
    const uBass = gl.getUniformLocation(prog, "u_bass");
    const uMid = gl.getUniformLocation(prog, "u_mid");
    const uHigh = gl.getUniformLocation(prog, "u_high");

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const mouse = { x: 0, y: 0, down: 0 };
    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
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

    // Pause the loop when the hero scrolls out of view (perf on a landing page).
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && !reduced && raf === 0) raf = requestAnimationFrame(render);
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    let raf = 0;
    const start = performance.now();
    let lastFrame = start;
    const render = (now: number) => {
      const t = reduced ? 8 : (now - start) / 1000;

      let bass: number, mid: number, high: number;
      const an = analyserRef.current;
      if (an && playingRef.current && an.context.state === "running") {
        const bins =
          freqRef.current && freqRef.current.length === an.frequencyBinCount
            ? freqRef.current
            : (freqRef.current = new Uint8Array(an.frequencyBinCount));
        an.getByteFrequencyData(bins);
        const avg = (a: number, b: number) => {
          let s = 0;
          const to = Math.min(b, bins.length);
          for (let i = a; i < to; i++) s += bins[i];
          return s / (Math.max(1, to - a) * 255);
        };
        const hzPerBin = an.context.sampleRate / an.fftSize;
        const bin = (hz: number) =>
          Math.max(1, Math.min(an.frequencyBinCount, Math.round(hz / hzPerBin)));
        bass = Math.min(1, avg(0, bin(345)) * 2.4);
        mid = Math.min(1, avg(bin(345), bin(4130)) * 3.0);
        high = Math.min(1, avg(bin(4130), bin(12050)) * 3.8);
      } else {
        const beat = (t * 129) / 60;
        bass = Math.exp(-(beat % 1) * 5);
        mid = Math.exp(-((beat + 1) % 2) * 4.5) * 0.9;
        high = 0.22 + 0.12 * Math.sin(t * 7.3);
      }
      const dt = Math.min(0.1, (now - lastFrame) / 1000);
      lastFrame = now;
      const fr = dt * 60;
      const lv = levelRef.current;
      lv.bass = Math.max(bass, lv.bass * Math.pow(0.9, fr));
      lv.mid = Math.max(mid, lv.mid * Math.pow(0.88, fr));
      lv.high = Math.max(high, lv.high * Math.pow(0.85, fr));

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uDown, mouse.down);
      gl.uniform1f(uBass, lv.bass);
      gl.uniform1f(uMid, lv.mid);
      gl.uniform1f(uHigh, lv.high);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = reduced || !visible ? 0 : requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* Bottom-weighted scrim so the headline / chips / CTAs keep full contrast. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/15" />
    </div>
  );
}
