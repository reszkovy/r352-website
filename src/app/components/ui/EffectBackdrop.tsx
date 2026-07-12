import { useEffect, useRef } from "react";
import { useTheme } from "@/app/context/ThemeContext";

/**
 * EffectBackdrop - toned, audio-less ambient variants of gallery effects for
 * use behind page sections. Self-contained (own GL context, no atlas, no
 * analyser): slow time drift + pointer parallax only, per the site rule
 * "silence = stillness". Dark theme only; pauses off-screen; reduced-motion
 * renders a single still frame; DPR capped.
 *
 * EASY REVERT: every usage sits behind a boolean flag at the call site
 * (PROCESS_PEAK in Process.tsx, NOTFOUND_WARP in App.tsx). Flip to false to
 * restore the previous look exactly; this file can then be deleted.
 */
const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const COMMON = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
vec2 hash2(vec2 p){ p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
`;

// Peak, backdrop cut: dimmer lines, static beacon, no kick ring.
const PEAK_BG = `
void main(){
  vec2 res=u_res;
  vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  float t=u_time;
  vec2 drift=vec2(t*0.016, t*0.010);
  vec2 pos=uv*2.6 + drift + m*0.16;
  vec2 pk=drift + vec2(0.55*sin(t*0.021), 0.40*cos(t*0.017));
  float h=fbm(pos)*0.62 + exp(-dot(pos-pk,pos-pk)*0.9)*0.57;
  float e=0.02;
  float hx=fbm(pos+vec2(e,0.0))*0.62 + exp(-dot(pos+vec2(e,0.0)-pk,pos+vec2(e,0.0)-pk)*0.9)*0.57;
  float hy=fbm(pos+vec2(0.0,e))*0.62 + exp(-dot(pos+vec2(0.0,e)-pk,pos+vec2(0.0,e)-pk)*0.9)*0.57;
  float hpx=max(length(vec2(hx-h,hy-h)/e)*2.6/res.y, 1e-5);
  float N=26.0;
  float dl=abs(fract(h*N)-0.5)/N;
  float line=smoothstep(1.6*hpx,0.5*hpx,dl);
  float major=1.0-step(0.5,mod(floor(h*N),5.0));
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.010);
  vec3 tint=mix(lime*0.42, clay*0.9, smoothstep(0.15,0.52,h));
  tint=mix(tint, lime, smoothstep(0.55,0.95,h));
  float amp=(0.30+0.55*smoothstep(0.1,1.0,h))*0.62;
  col+=tint*line*amp*(0.62+0.38*major);
  vec2 sp=(pk-drift-m*0.16)/2.6;
  float ds=length(uv-sp);
  col+=lime*exp(-ds*22.0)*0.28;
  col+=lime*exp(-ds*5.0)*0.035;
  float v=length(uv); col*=1.0-0.30*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.016;
  gl_FragColor=vec4(col,1.0);
}`;

// Warp, backdrop cut: gentle constant streaks, endless flight (time-driven).
const WARP_BG = `
void main(){
  vec2 res=u_res;
  vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  vec2 o=uv-m*0.14;
  float r=max(length(o),0.02);
  float th=atan(o.y,o.x);
  float t=u_time;
  float stretch=0.34;
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.010);
  for(int L=0;L<3;L++){
    float fl=float(L);
    float rows=18.0+fl*8.0;
    float speed=0.45+fl*0.28;
    vec2 pc=vec2(th/6.2831853*rows, log(r)*3.0 - t*speed + fl*7.3);
    vec2 id=floor(pc);
    for(int jy=-2;jy<=2;jy++){
      vec2 cid=vec2(id.x, id.y+float(jy));
      vec2 rnd=hash2(cid+fl*31.7);
      float on=step(0.55,rnd.x);
      vec2 sp=(rnd-0.5)*0.5;
      vec2 d=pc-(cid+0.5)-sp;
      float len=0.06+stretch*(0.3+0.7*rnd.y);
      float wdt=0.030+0.025*rnd.y;
      float inX=smoothstep(wdt,wdt*0.35,abs(d.x));
      float ry=(d.y+len)/(2.0*len+1e-4);
      float inY=step(0.0,ry)*step(ry,1.0);
      float grad=pow(clamp(ry,0.0,1.0),2.0);
      float tw=0.55+0.45*sin(t*(1.0+rnd.x*2.0)+rnd.y*9.0);
      vec3 tint=mix(lime,clay,step(0.90,rnd.y)*0.7);
      col+=tint*inX*inY*grad*on*tw*0.55*(0.50-fl*0.11)*smoothstep(0.03,0.25,r);
    }
  }
  col+=lime*exp(-r*6.0)*0.035;
  float v=length(uv); col*=1.0-0.30*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.016;
  gl_FragColor=vec4(col,1.0);
}`;

const FRAGS: Record<string, string> = {
  peak: COMMON + PEAK_BG,
  warp: COMMON + WARP_BG,
};

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function EffectBackdrop({
  effect,
  className = "",
  scrim = true,
}: {
  effect: "peak" | "warp";
  className?: string;
  scrim?: boolean;
}) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (theme !== "dark") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAGS[effect]));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const mouse = { x: 0, y: 0 };
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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
    window.addEventListener("pointermove", onMove, { passive: true });

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
    const render = (now: number) => {
      const t = reduced ? 11 : (now - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = reduced || !visible ? 0 : requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [effect, theme]);

  if (theme !== "dark") return null;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
      {scrim && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/55 to-[#0A0A0A]/20" />
      )}
    </div>
  );
}
