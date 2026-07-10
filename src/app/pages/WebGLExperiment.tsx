import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/app/context/LanguageContext";
import { useAudio } from "@/app/context/AudioContext";
import { uploadGlyphAtlas } from "@/app/lib/logoGlyphAtlas";

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
uniform float u_bass; uniform float u_mid; uniform float u_high;
uniform sampler2D u_glyphs;
float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
vec2 hash2(vec2 p){ p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
`;

// 1 — Flow: domain-warped energy field. AUDIO-REACTIVE, structurally: the kick
// deepens the domain warp itself (the shapes churn), mids warm the clay
// underlayer, highs light the contour lines. 129 BPM clock when silent.
const FLOW = `
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*u_res)/u_res.y;
  vec2 m=(u_mouse-0.5*u_res)/u_res.y;
  float t=u_time*0.06;
  vec2 q=vec2(fbm(uv*1.4+t), fbm(uv*1.4+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(uv*1.4+3.6*q+vec2(1.7,9.2)+t*0.5), fbm(uv*1.4+3.6*q+vec2(8.3,2.8)-t*0.5));
  float f=fbm(uv*1.4+(3.6+1.1*u_bass)*r);                    // kick churns the warp itself
  float md=length(uv-m); float glow=exp(-md*3.2)*(0.6+0.5*u_mdown); f+=glow*0.35;
  f+=u_bass*0.05;
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.021);
  col=mix(col,clay*0.55,smoothstep(0.34,0.62,f)*(0.24+0.22*u_mid));
  col=mix(col,lime,smoothstep(0.58,0.98,f));
  col+=lime*glow*(0.45+0.30*u_bass);
  float edge=smoothstep(0.02,0.0,abs(fract(f*6.0)-0.5)-0.46);
  col+=lime*edge*(0.12+0.26*u_high);                         // highs light the contours
  float v=length(uv); col*=1.0-0.28*v*v; col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.022;
  gl_FragColor=vec4(col,1.0);
}`;

// 2 — Scope: a circular phosphor vector display. The SOUND WALKS THE CIRCLE:
// the trace is a ring displaced radially by the audio bands (bass = slow wide
// waves, mids = mid ripple, highs = fine ripple), and a bright beam head
// orbits the ring once per bar (129 BPM) with a phosphor comet tail decaying
// behind it. A slow counter-rotating clay ghost ring adds depth. Concentric
// graticule + CRT scanlines + grain.
const SCOPE = `
void main(){
  vec2 res=u_res;
  vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  float t=u_time;
  float beat=t*129.0/60.0;
  // the beam head orbits once per bar (4 beats), clockwise from 12 o'clock
  float headA=1.5708-6.2831853*fract(beat/4.0);

  vec2 c=m*0.10;                        // the whole instrument drifts to the pointer
  float fit=min(1.0,(res.x/res.y)*0.92);   // aspect-safe: shrink the instrument on portrait
  float R=(0.34+0.02*sin(t*0.4)+0.05*u_bass)*fit;

  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.010);

  // circular graticule: concentric reference rings
  float rr=length(uv-c);
  float ring=smoothstep(0.0035,0.0,abs(rr-0.34*fit))
            +smoothstep(0.003,0.0,abs(rr-0.55*fit))*0.7
            +smoothstep(0.003,0.0,abs(rr-0.16*fit))*0.6
            +smoothstep(0.003,0.0,abs(rr-0.80*fit))*0.5;
  col+=lime*ring*0.10;

  // the signal walks the circle: a ring displaced radially by the audio bands,
  // traced as segments; the phosphor trail decays behind the orbiting head
  float beam=0.0, halo=0.0, headGlow=0.0, ghost=0.0;
  vec2 prev=vec2(0.0); vec2 prevG=vec2(0.0);
  for(int i=0;i<=160;i++){
    float th=6.2831853*float(i)/160.0;
    float w=fit*(0.085*u_bass*sin(5.0*th - t*1.8)
           +0.050*u_mid*sin(11.0*th + t*2.4)
           +0.020*u_high*sin(17.0*th - t*4.0)
           +0.020*(noise(vec2(th*1.2, t*0.5))-0.5));
    vec2 pt=c+(R+w)*vec2(cos(th), sin(th));
    if(i>0){
      vec2 pa=uv-prev, ba=pt-prev;
      float h=clamp(dot(pa,ba)/max(dot(ba,ba),1e-6),0.0,1.0);
      float d=length(pa-ba*h);
      beam+=exp(-d*110.0);
      halo+=exp(-d*10.0);
      float back=mod(th-headA,6.2831853);        // angular distance behind the head
      headGlow+=exp(-d*90.0)*exp(-back*1.1);     // comet tail around the ring
    }
    prev=pt;
    // ghost: slow counter-rotating inner ring in clay
    float w2=fit*(0.05*u_mid*sin(7.0*th + t*1.2)+0.02*(noise(vec2(th*0.9, t*0.4+3.0))-0.5));
    vec2 pg=c+(R*0.62+w2)*vec2(cos(t*0.1-th), sin(t*0.1-th));
    if(i>0){
      vec2 paG=uv-prevG, baG=pg-prevG;
      float hG=clamp(dot(paG,baG)/max(dot(baG,baG),1e-6),0.0,1.0);
      ghost+=exp(-length(paG-baG*hG)*90.0);
    }
    prevG=pg;
  }
  col+=lime*(beam*0.05+halo*0.004+headGlow*0.70);
  col+=clay*ghost*0.042;

  col*=0.97+0.03*sin(gl_FragCoord.y*1.57);   // CRT scanlines
  float v=length(uv); col*=1.0-0.20*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.02;
  gl_FragColor=vec4(col,1.0);
}`;

// 3 — Pixels: a field of drifting, twinkling lime pixels (one floating square per
// grid cell, varied size + brightness, a few warm ones). Reacts to the pointer.
// AUDIO-REACTIVE: highs drive the twinkle, the kick knocks a subset off orbit.
const PIXELS = `
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*u_res)/u_res.y;
  vec2 m=(u_mouse/u_res-0.5); m.x*=u_res.x/u_res.y;
  float t=u_time;
  float scale=20.0;
  vec2 gv=uv*scale;
  vec2 id=floor(gv);
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.016);
  float near = exp(-length(uv-m)*2.6) * (0.5 + 0.9*u_mdown);
  for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){
    vec2 cell=id+vec2(float(x),float(y));
    vec2 rnd=hash2(cell);
    float on=step(0.40, rnd.x);                 // ~60% of cells host a pixel
    vec2 drift=0.34*vec2(sin(t*(0.35+rnd.x*0.6)+rnd.y*6.283),
                         cos(t*(0.30+rnd.y*0.6)+rnd.x*6.283));
    drift*=1.0+1.1*u_bass*step(0.82,rnd.x);     // the kick knocks some pixels off orbit
    vec2 pos=cell+0.5+drift;
    vec2 d=gv-pos;
    float sz=0.06+rnd.y*0.10;                    // varied pixel size
    float sq=step(max(abs(d.x),abs(d.y)), sz);
    float tw=0.30+0.70*(0.5+0.5*sin(t*(0.8+rnd.x*1.6)+rnd.y*10.0)); // twinkle
    tw *= 0.65+0.55*u_high;                      // highs drive the shimmer
    tw += near*1.6;                              // brighten near the pointer
    vec3 tint=mix(lime, clay, step(0.90,rnd.y)*0.6); // a few warm pixels
    col += tint*sq*tw*on*0.8;
  }
  float v=length(uv); col*=1.0-0.28*v*v;
  gl_FragColor=vec4(col,1.0);
}`;

// 4 — 808: a step-sequencer grid running at Planet Rock tempo (~129 BPM).
// 16 columns of pads; bottom lane = kick on quarters, lane 2 = snare on 2+4,
// the rest is a random pattern reshuffled every 2 bars. A playhead sweeps the
// grid and hit pads flash and decay. AUDIO-REACTIVE: u_bass/u_mid/u_high come
// from a live analyser on the site track when music plays (kick lane follows
// bass, snare lane mids, the rest highs) - or from a 129 BPM clock when silent.
// Pads are gently MAGNETIC: they lean toward and swell near the pointer.
const EIGHT08 = `
void main(){
  vec2 res=u_res;
  vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  float ar=res.x/res.y;
  vec2 p=gl_FragCoord.xy/res;

  float BPM=129.0;                        // Planet Rock
  float beat=u_time*BPM/60.0;
  float s16=beat*4.0;                     // 16th-note clock

  float COLS=16.0;
  vec2 g=vec2(p.x*COLS, p.y*COLS/ar);     // square pads, 16 steps wide
  vec2 id=floor(g);
  vec2 mg=vec2((u_mouse.x/res.x)*COLS, (u_mouse.y/res.y)*COLS/ar);
  float seed=floor(s16/16.0);             // reshuffle on every left-to-right sweep

  float near=exp(-length(uv-m)*2.8)*(0.6+0.9*u_mdown);
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.014);

  // 3x3 neighbourhood so magnet-displaced pads can cross cell borders
  // without getting clipped at the edges of their own cell
  for(int yy=-1;yy<=1;yy++) for(int xx=-1;xx<=1;xx++){
    vec2 cell=id+vec2(float(xx),float(yy));

    // magnetic pull: pads lean toward the pointer and swell slightly near it;
    // smoothstep ramps the pull to zero at the cursor so the field is continuous
    vec2 dv=mg-(cell+0.5);
    float dl=max(length(dv),0.0001);
    vec2 pull=(dv/dl)*exp(-dl*0.34)*0.24*(1.0+0.5*u_mdown)*smoothstep(0.0,0.5,dl);
    float swell=1.0+0.20*exp(-dl*0.5);

    // pattern: kick lane on quarters, snare lane on 2+4, rest random (reseed per sweep)
    float on;
    if(cell.y<0.5)      on=1.0-step(0.5,mod(cell.x,4.0));
    else if(cell.y<1.5) on=1.0-step(0.5,abs(mod(cell.x,8.0)-4.0));
    else                on=step(0.62,hash(cell+seed*13.71));

    float tS=mod(s16-cell.x,16.0);          // 16th-notes since this column was hit
    float env=exp(-tS*1.35);                // flash + decay

    // audio-reactive lane gain: kick lane rides the bass, snare lane the mids,
    // free pads shimmer with the highs (per-pad sensitivity varies)
    float laneAmp;
    if(cell.y<0.5)      laneAmp=0.35+1.30*u_bass;
    else if(cell.y<1.5) laneAmp=0.35+1.15*u_mid;
    else                laneAmp=0.30+0.50*u_mid+0.85*u_high*(0.4+0.6*hash(cell+11.13));

    // r352 glyph instead of a square: random pick of [R-circle|3|5|2] per cell,
    // scattered off-grid (static jitter) with varied size for an irregular field
    vec2 rnd=hash2(cell);
    vec2 jit=(rnd-0.5)*0.34;
    float hs=(0.26+0.16*rnd.y)*swell;                    // glyph half-size
    vec2 f=g-(cell+0.5)-jit-pull;
    vec2 lf=f/(2.0*hs)+0.5;                              // 0..1 inside the glyph quad
    float inQ=step(0.0,lf.x)*step(lf.x,1.0)*step(0.0,lf.y)*step(lf.y,1.0);
    float gi=floor(hash(cell*2.13+7.7)*3.9999);          // which glyph tile
    float mask=texture2D(u_glyphs,vec2((clamp(lf.x,0.0,1.0)+gi)*0.25,clamp(lf.y,0.0,1.0))).r*inQ;

    vec3 tint=mix(lime,clay,step(0.92,hash(cell*1.7+3.3)));  // a few warm glyphs
    col+=lime*mask*0.030;                                     // idle field
    col+=tint*mask*on*(0.05+env*0.85*laneAmp+near*0.35);
  }
  float xph=mod(s16,16.0);
  col+=lime*exp(-pow(g.x-xph,2.0)*1.4)*0.045;             // playhead band
  col*=1.0+u_bass*0.16+u_mdown*0.06;                      // frame breathes on the kick
  col*=0.97+0.03*sin(gl_FragCoord.y*1.57);                // faint scanlines
  float v=length(uv); col*=1.0-0.28*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.018;
  gl_FragColor=vec4(col,1.0);
}`;

// 5 — Cymatics: sound made visible, IMMERSIVE. Chladni standing-wave nodal
// lines of a vibrating plate; you sit inside it: breathing zoom (bass pushes
// in), pointer parallax, a warm "sand" wash collecting between the lines, and
// a micro-scale plate woven within for depth. Bass retunes the modes, mids
// detune the cross-axis + warm the wash, highs shimmer the micro layer. The
// pointer bends the plate locally. Physics of the site's soundtrack.
const CYMATICS = `
void main(){
  vec2 res=u_res;
  vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  float t=u_time*0.12;

  // you are INSIDE the plate: breathing zoom (bass pushes in) + pointer parallax
  float zoom=1.0+0.07*sin(u_time*0.05)+0.10*u_bass;
  vec2 look=uv/zoom+m*0.07;

  float a=3.0+2.0*sin(t*0.70)+2.2*u_bass;
  float b=a+1.5+0.8*sin(t*0.53+2.1)+1.6*u_mid;   // derived from a: modes can never collide

  vec2 p=look*3.14159;
  p+=0.5*vec2(noise(look*1.6+t)-0.5, noise(look*1.6-t+7.3)-0.5);
  float md=length(uv-m);
  p+=(uv-m)*exp(-md*3.0)*1.2*(0.5+u_mdown);

  float f=cos(a*p.x)*cos(b*p.y)-cos(b*p.x)*cos(a*p.y);
  float lines=smoothstep(0.10,0.0,abs(f));
  float glow=smoothstep(0.55,0.0,abs(f));

  // sand wash: energy collects between the nodal lines and fills the frame
  float sand=pow(1.0-clamp(abs(f)*0.85,0.0,1.0),3.0);

  // micro plate woven inside the macro one - second scale of depth
  vec2 p2=look*8.2+vec2(1.7,4.2);
  float f2=cos((a*0.7+1.0)*p2.x)*cos(b*0.6*p2.y)-cos(b*0.6*p2.x)*cos((a*0.7+1.0)*p2.y);
  float micro=smoothstep(0.10,0.0,abs(f2));

  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.012);
  col+=clay*sand*(1.0-glow)*(0.07+0.09*u_mid);            // warm wash, gated off the lime zone
  col+=lime*micro*sand*(0.05+0.10*u_high);                // micro shimmer inside the wash
  col+=lime*(lines*1.0+glow*0.08)*(0.55+0.28*u_bass+0.18*u_high);

  // second plate, offset modes, clay - depth layer
  float f3=cos((b+1.0)*p.y)*cos((a-1.0)*p.x)-cos((a-1.0)*p.y)*cos((b+1.0)*p.x);
  col+=clay*smoothstep(0.12,0.0,abs(f3))*0.20;

  col+=lime*exp(-md*3.2)*0.18*(0.5+u_mdown);
  col=col/(1.0+0.45*col);                                 // soft knee - depth survives the peaks
  float v=length(uv); col*=1.0-0.30*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.02;
  gl_FragColor=vec4(col,1.0);
}`;

const PRESETS = [
  { id: "flow", name: "Flow", frag: PRELUDE + FLOW },
  { id: "scope", name: "Scope", frag: PRELUDE + SCOPE },
  { id: "pixels", name: "Pixels", frag: PRELUDE + PIXELS },
  { id: "808", name: "808", frag: PRELUDE + EIGHT08 },
  { id: "cymatics", name: "Cymatics", frag: PRELUDE + CYMATICS },
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
    bass: WebGLUniformLocation | null;
    mid: WebGLUniformLocation | null;
    high: WebGLUniformLocation | null;
  } | null>(null);

  // ── live audio tap (808 sync) - falls back to a 129 BPM clock when silent ──
  const { isPlaying, play, getAnalyser } = useAudio();
  const playingRef = useRef(isPlaying);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const freqRef = useRef<Uint8Array | null>(null);
  const levelRef = useRef({ bass: 0, mid: 0, high: 0 });
  useEffect(() => {
    playingRef.current = isPlaying;
    if (isPlaying && !analyserRef.current) analyserRef.current = getAnalyser();
  }, [isPlaying, getAnalyser]);

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

    // logo-glyph atlas on unit 0 (stays bound; programs read it via u_glyphs)
    uploadGlyphAtlas(gl);

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
    let lastFrame = start;
    const render = (now: number) => {
      const prog = progRef.current;
      const u = uniRef.current;
      if (prog && u) {
        const tsec = reduced ? 8 : (now - start) / 1000;

        // audio levels: live FFT when the site track plays, 129 BPM clock otherwise
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
          // band edges derived from the real sample rate (44.1k vs 48k devices)
          const hzPerBin = an.context.sampleRate / an.fftSize;
          const bin = (hz: number) =>
            Math.max(1, Math.min(an.frequencyBinCount, Math.round(hz / hzPerBin)));
          bass = Math.min(1, avg(0, bin(345)) * 2.4);
          mid = Math.min(1, avg(bin(345), bin(4130)) * 3.0);
          high = Math.min(1, avg(bin(4130), bin(12050)) * 3.8);
        } else {
          const beat = (tsec * 129) / 60;
          bass = Math.exp(-(beat % 1) * 5);            // kick on quarters
          mid = Math.exp(-((beat + 1) % 2) * 4.5) * 0.9; // snare on 2 + 4
          high = 0.22 + 0.12 * Math.sin(tsec * 7.3);
        }
        // fast attack, slow release - time-based so decay looks the same at
        // any display refresh rate (tuned against a 60fps baseline)
        const dt = Math.min(0.1, (now - lastFrame) / 1000);
        lastFrame = now;
        const fr = dt * 60;
        const lv = levelRef.current;
        lv.bass = Math.max(bass, lv.bass * Math.pow(0.88, fr));
        lv.mid = Math.max(mid, lv.mid * Math.pow(0.86, fr));
        lv.high = Math.max(high, lv.high * Math.pow(0.82, fr));

        gl.useProgram(prog);
        gl.uniform2f(u.res, canvas.width, canvas.height);
        gl.uniform1f(u.time, tsec);
        gl.uniform2f(u.mouse, mouse.x, mouse.y);
        gl.uniform1f(u.down, mouse.down);
        gl.uniform1f(u.bass, lv.bass);
        gl.uniform1f(u.mid, lv.mid);
        gl.uniform1f(u.high, lv.high);
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
      // null in presets that don't read audio - uniform1f(null, x) is a no-op
      bass: gl.getUniformLocation(prog, "u_bass"),
      mid: gl.getUniformLocation(prog, "u_mid"),
      high: gl.getUniformLocation(prog, "u_high"),
    };
    // glyph atlas sampler (only the 808 program has it) - texture unit 0
    gl.uniform1i(gl.getUniformLocation(prog, "u_glyphs"), 0);
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
              {(pl ? "WebGL · eksperyment" : "WebGL · experiment") + " · " + PRESETS[active].name}
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

        <div className="pointer-events-none absolute bottom-8 right-8 hidden md:flex flex-col items-end gap-2.5">
          {(isPlaying ? (
              <span className="flex items-center gap-2 font-display uppercase tracking-[0.2em] text-[10px] text-[#D4FF00]/80">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
                {pl ? "sync: audio na żywo" : "sync: live audio"}
              </span>
            ) : (
              <button
                onClick={play}
                className="pointer-events-auto flex items-center gap-2 font-display uppercase tracking-[0.2em] text-[10px] text-white/45 hover:text-[#D4FF00] transition-colors duration-300"
              >
                <span className="inline-block w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-current" />
                {pl ? "włącz muzykę · sync na żywo" : "play music · live sync"}
              </button>
            ))}
          <span className="flex items-center gap-2 font-display uppercase tracking-[0.2em] text-[10px] text-white/45">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
            {pl ? "rusz kursorem · kliknij" : "move cursor · click"}
          </span>
        </div>
      </div>
    </>
  );
}
