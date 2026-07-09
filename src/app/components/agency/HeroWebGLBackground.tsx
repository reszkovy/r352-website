import { useEffect, useRef } from "react";

/**
 * HeroWebGLBackground - a toned-down, ambient version of the /webgl "Flow" shader,
 * used as a living background layer behind the home hero content. Raw WebGL, zero
 * deps. Kept intentionally dark/subtle so the hero interface stays fully legible;
 * a bottom scrim guarantees contrast for the headline + chips + CTAs.
 *
 * Trial feature - gated by HERO_WEBGL in AgencyHero.tsx (dark theme only). To
 * revert: flip that flag to false (original hero background is bg-background +
 * AnimeGrid). See the "home-hero-webgl-trial" memory.
 */
const VERT = `attribute vec2 a_pos; void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse; uniform float u_mdown;
float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }
void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*u_res)/u_res.y;
  vec2 m=(u_mouse-0.5*u_res)/u_res.y;
  float t=u_time*0.05;
  vec2 q=vec2(fbm(uv*1.3+t), fbm(uv*1.3+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(uv*1.3+3.4*q+vec2(1.7,9.2)+t*0.5), fbm(uv*1.3+3.4*q+vec2(8.3,2.8)-t*0.5));
  float f=fbm(uv*1.3+3.4*r);
  float md=length(uv-m); float glow=exp(-md*3.0)*(0.4+0.4*u_mdown); f+=glow*0.30;
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.02);
  col=mix(col, clay*0.30, smoothstep(0.40,0.66,f)*0.20);
  col=mix(col, lime*0.78, smoothstep(0.66,1.04,f)*0.55);
  col+=lime*glow*0.40;
  float v=length(uv); col*=1.0-0.30*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.018;
  col*=0.72; // keep it ambient behind the interface
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

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uDown = gl.getUniformLocation(prog, "u_mdown");

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
    const render = (now: number) => {
      const t = reduced ? 8 : (now - start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uDown, mouse.down);
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
