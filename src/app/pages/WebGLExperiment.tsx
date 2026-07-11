import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
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
uniform float u_kick; uniform float u_energy;
uniform float u_progress;
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
  float f=fbm(uv*1.4+(3.4+0.7*u_bass+0.8*u_kick)*r);         // the HIT churns the warp
  float md=length(uv-m); float glow=exp(-md*3.2)*(0.6+0.5*u_mdown); f+=glow*0.35;
  f+=u_bass*0.05;
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.021);
  col=mix(col,clay*0.55,smoothstep(0.34,0.62,f)*(0.24+0.22*u_mid));
  col=mix(col,lime,smoothstep(0.58,0.98,f)*(0.75+0.25*u_energy));
  col+=lime*glow*(0.35+0.25*u_bass+0.30*u_kick);
  float edge=smoothstep(0.02,0.0,abs(fract(f*6.0)-0.5)-0.46);
  col+=lime*edge*(0.12+0.26*u_high);                         // highs light the contours
  float v=length(uv); col*=1.0-0.28*v*v; col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.022;
  gl_FragColor=vec4(col,1.0);
}`;

// 2 — Scope: a circular phosphor vector display. The SOUND WALKS THE CIRCLE:
// the trace is a ring displaced radially by the audio bands (bass = slow wide
// waves, mids = mid ripple, highs = fine ripple), and a bright beam head
// orbits the ring once per bar (129 BPM) with a phosphor comet tail decaying
// behind it. A slow counter-rotating clay ghost ring adds depth. CRT
// scanlines + grain, no chrome - just the signal.
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
  float R=(0.34+0.02*sin(t*0.4)+0.03*u_bass+0.045*u_kick)*fit;

  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.010);

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
  col+=lime*(beam*(0.035+0.03*u_energy)+halo*0.004+headGlow*(0.55+0.35*u_energy+0.3*u_kick));
  col+=clay*ghost*0.042;

  col*=0.97+0.03*sin(gl_FragCoord.y*1.57);   // CRT scanlines
  float v=length(uv); col*=1.0-0.20*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.02;
  gl_FragColor=vec4(col,1.0);
}`;

// 2b — Aurora: a living gradient wave, now a real aurora. Above the flowing
// crest rise striated LIGHT CURTAINS (the borealis signature) whose height
// breathes with the mids; a bright SURGE travels along the crest on every
// beat (its strength = the actual hit); light dust drifts upward twinkling
// with the highs; track energy sets how alive the whole sky is.
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
  vec3 clayD=vec3(0.42,0.22,0.16);
  vec3 lime=vec3(0.831,1.0,0.0);
  vec3 col = mix(dark, clayD, smoothstep(0.12,0.9, y + w*0.35 - 0.12));

  // a surge travels the crest left-to-right once per beat; its power is the hit
  float beatT=t*129.0/60.0;
  float sx=(fract(beatT)*2.4-1.2)*ar;
  float surge=exp(-pow((x-sx)/0.22,2.0))*u_kick;

  // main ribbon - breathes with the bass, snaps wider under the surge
  float wl = 0.50 + w*0.42 + mo.y*0.22;
  float th = 0.070 + 0.04*noise(vec2(x, t*0.12)) + 0.012*u_bass + 0.018*u_kick + 0.030*surge;
  float rib = exp(-pow((y-wl)/th, 2.0));
  col += lime * rib * (0.34+0.12*u_bass+0.16*u_kick+0.35*surge)*(0.8+0.30*u_energy);
  // crisp bright core along the crest - the signature line
  col += lime * exp(-pow((y-wl)/(th*0.32), 2.0)) * (0.30+0.20*u_kick+0.35*surge);

  // LIGHT CURTAINS: striated rays rising from the crest, bending with the wave;
  // mids raise the curtain, energy keeps the sky alive
  float str = noise(vec2(x*6.0 + w*2.2, t*0.33))
            * (0.55+0.45*noise(vec2(x*14.0 - t*0.22, 2.2)));
  float above = y - wl;
  float curt = smoothstep(0.0,0.05,above) * exp(-above*(4.6-1.9*u_mid)) * str;
  col += lime * curt * (0.20+0.28*u_energy+0.25*u_high+0.35*surge*exp(-above*2.0));

  // second ribbon (fainter, higher, opposing flow; rides the mids)
  float w2 = (noise(vec2(x*0.8 - t*0.05, 4.0))*0.9 + noise(vec2(x*1.4 + t*0.04, 2.0))*0.5)/1.4;
  float wl2 = 0.72 + w2*0.30;
  col += lime * exp(-pow((y-wl2)/0.13, 2.0)) * (0.20+0.28*u_mid);

  // light dust: sparse sparks drifting upward, twinkling with the highs
  vec2 gp=vec2(x*9.0, (y-0.045*t)*9.0);
  vec2 idp=floor(gp);
  vec2 rp=hash2(idp);
  vec2 fp=fract(gp)-0.5;
  float spark=step(0.90,rp.x)*smoothstep(0.10+0.05*rp.y,0.0,length(fp-(rp-0.5)*0.55));
  float twk=0.5+0.5*sin(t*(1.5+rp.y*3.0)+rp.x*12.0);
  col += lime * spark * twk * (0.10+0.40*u_high) * smoothstep(-0.05,0.35,y-wl+0.15);

  // highs sprinkle a fine sparkle along the crest itself
  col += lime * exp(-pow((y-wl)/(th*0.5), 2.0)) * noise(vec2(x*22.0, t*2.5)) * u_high * 0.22;

  vec2 c = vec2((p.x-0.5)*ar, p.y-0.5);
  float md = length(c - mo);
  col += lime*exp(-md*3.2)*0.30*(0.5+u_mdown);
  col=col/(1.0+0.40*col);                       // soft knee - layers survive the peaks
  col *= 1.0 - 0.28*dot(c,c);
  col += (hash(gl_FragCoord.xy+u_time)-0.5)*0.016;
  gl_FragColor=vec4(col,1.0);
}`;

// 3 — Warp: a spaceship jump through a pixel starfield. Stars streak radially
// from a vanishing point that drifts toward the pointer; the STREAK LENGTH
// (motion blur) rides the music - bass stretches pixels into light-speed
// lines, quiet music lets them settle back into drifting squares. Log-polar
// grid = real perspective; three depth layers for parallax; highs twinkle.
const WARP = `
void main(){
  vec2 res=u_res;
  vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  vec2 o=uv-m*0.18;                     // vanishing point leans toward the pointer
  // the hit shakes the camera - a tiny jolt, gone in a beat
  o+=0.012*u_kick*vec2(hash(vec2(floor(u_time*31.0),1.0))-0.5, hash(vec2(2.0,floor(u_time*29.0)))-0.5);
  float r=max(length(o),0.02);
  float th=atan(o.y,o.x);
  float t=u_time;

  // how far the pixels smear into streaks - the music sets the warp factor
  float stretch=(0.08+1.0*u_bass+0.3*u_mid)*(0.6+0.7*u_energy)+1.1*u_kick;

  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.012);

  for(int L=0;L<3;L++){
    float fl=float(L);
    float rows=18.0+fl*8.0;
    float speed=0.55+fl*0.35;
    vec2 pc=vec2(th/6.2831853*rows, log(r)*3.0 - t*speed + fl*7.3);
    vec2 id=floor(pc);
    // streaks can span cells - scan the radial neighbourhood
    for(int jy=-2;jy<=2;jy++){
      vec2 cid=vec2(id.x, id.y+float(jy));
      vec2 rnd=hash2(cid+fl*31.7);
      float on=step(0.55,rnd.x);
      vec2 sp=(rnd-0.5)*0.5;
      vec2 d=pc-(cid+0.5)-sp;
      float len=0.06+stretch*(0.3+0.7*rnd.y);
      float wdt=0.030+0.025*rnd.y;
      float inX=smoothstep(wdt,wdt*0.35,abs(d.x));
      float ry=(d.y+len)/(2.0*len+1e-4);          // 0 = tail .. 1 = head
      float inY=step(0.0,ry)*step(ry,1.0);
      float grad=pow(clamp(ry,0.0,1.0),2.0);      // bright head, fading tail
      float tw=0.55+0.45*sin(t*(1.0+rnd.x*2.0)+rnd.y*9.0);
      tw*=0.70+0.50*u_high;
      vec3 tint=mix(lime,clay,step(0.90,rnd.y)*0.7);
      col+=tint*inX*inY*grad*on*tw*(0.50-fl*0.11)*smoothstep(0.03,0.25,r);
    }
  }
  // faint engine glow at the vanishing point
  col+=lime*exp(-r*6.0)*(0.03+0.05*u_kick+0.04*u_energy);
  float v=length(uv); col*=1.0-0.30*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.018;
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
  col*=1.0+u_bass*0.08+u_kick*0.14+u_mdown*0.06;          // frame jolts on the true hit
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
  float zoom=1.0+0.07*sin(u_time*0.05)+0.05*u_bass+0.09*u_kick;
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
  col+=lime*(lines*1.0+glow*0.08)*(0.45+0.18*u_bass+0.30*u_kick+0.15*u_high)*(0.85+0.25*u_energy);

  // second plate, offset modes, clay - depth layer
  float f3=cos((b+1.0)*p.y)*cos((a-1.0)*p.x)-cos((a-1.0)*p.y)*cos((b+1.0)*p.x);
  col+=clay*smoothstep(0.12,0.0,abs(f3))*0.20;

  col+=lime*exp(-md*3.2)*0.18*(0.5+u_mdown);
  col=col/(1.0+0.45*col);                                 // soft knee - depth survives the peaks
  float v=length(uv); col*=1.0-0.30*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.02;
  gl_FragColor=vec4(col,1.0);
}`;


// 6 — Peak: a living topographic map. Thin cartographic contour lines drift
// slowly across black; ONE dominant summit rises from the terrain and
// breathes with the bass; every kick sends a wave of light rippling outward
// through the contours from the summit; highs shimmer the minor lines, track
// energy sets how alive the map is. The pointer tilts the map (parallax).
// Different from everything else in the gallery: cartography, not physics.
// And it means something here: pick ONE peak.
const PEAK = `
float terrain(vec2 pos, vec2 pk, float b){
  return fbm(pos)*0.62 + exp(-dot(pos-pk,pos-pk)*0.9)*(0.55+0.10*b);
}
void main(){
  vec2 res=u_res;
  vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  float t=u_time;
  float beat=t*129.0/60.0;

  // slow cartographic drift + gentle parallax toward the pointer
  vec2 drift=vec2(t*0.020, t*0.013);
  vec2 pos=uv*2.6 + drift + m*0.22;
  // the one summit: wanders very slowly near the frame
  vec2 pk=drift + vec2(0.55*sin(t*0.026), 0.40*cos(t*0.021));

  float h=terrain(pos,pk,u_bass);
  // gradient (2 taps) so contour width stays constant across slopes
  float e=0.02;
  vec2 g=vec2(terrain(pos+vec2(e,0.0),pk,u_bass)-h,
              terrain(pos+vec2(0.0,e),pk,u_bass)-h)/e;
  float hpx=max(length(g)*2.6/res.y, 1e-5);   // height change per pixel

  float N=26.0;
  float dl=abs(fract(h*N)-0.5)/N;             // distance to nearest contour (in h)
  float line=smoothstep(1.6*hpx,0.5*hpx,dl);
  float major=1.0-step(0.5,mod(floor(h*N),5.0));  // every 5th line is an index line

  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.012);

  // altitude palette: valley lines cool + dim, mid clay, summits lime-hot
  vec3 tint=mix(lime*0.42, clay*0.9, smoothstep(0.15,0.52,h));
  tint=mix(tint, lime, smoothstep(0.55,0.95,h));
  float amp=(0.30+0.55*smoothstep(0.1,1.0,h))*(0.8+0.3*u_energy);
  col+=tint*line*amp*(0.62+0.38*major)*(0.75+0.25*u_high);

  // the kick ripples outward from the summit through the contours
  float dp=length(pos-pk);
  float ring=exp(-pow((dp-fract(beat)*1.9)*5.0,2.0))*u_kick;
  col+=lime*(0.10+line)*ring*0.85;

  // summit beacon (screen-space) - calm pulse, brighter with the bass
  vec2 sp=(pk-drift-m*0.22)/2.6;
  float ds=length(uv-sp);
  col+=lime*exp(-ds*22.0)*(0.30+0.45*u_bass+0.2*sin(t*2.1));
  col+=lime*exp(-ds*5.0)*0.05;

  float v=length(uv); col*=1.0-0.30*v*v;
  col+=(hash(gl_FragCoord.xy+u_time)-0.5)*0.018;
  gl_FragColor=vec4(col,1.0);
}`;

// 7 — R3loop: the whole gallery as ONE continuous set. Each of the seven
// effects lives as a scene function inside a single shader; the set runs at
// 129 BPM, every scene plays for 8 bars (32 beats), and during the LAST bar
// the current world morphs into the next one - an fbm-threshold dissolve
// (the next world eats into this one organically), a zoom pull toward the
// center (you travel out of one world into the next), and a molten lime seam
// where the two touch. A kick during the morph shoves the dissolve forward.
// nk.studio energy: scenes re-form into each other, never cut.
// Per-scene grain/vignette is stripped from the scene functions and applied
// ONCE at the end; only the active scene (two during morphs) is evaluated -
// the branches are uniform-valued (u_time only), so this is cheap.
const R3LOOP = `
vec3 sceneFlow(vec2 fc){
  vec2 uv=(fc-0.5*u_res)/u_res.y;
  vec2 m=(u_mouse-0.5*u_res)/u_res.y;
  float t=u_time*0.06;
  vec2 q=vec2(fbm(uv*1.4+t), fbm(uv*1.4+vec2(5.2,1.3)-t));
  vec2 r=vec2(fbm(uv*1.4+3.6*q+vec2(1.7,9.2)+t*0.5), fbm(uv*1.4+3.6*q+vec2(8.3,2.8)-t*0.5));
  float f=fbm(uv*1.4+(3.4+0.7*u_bass+0.8*u_kick)*r);
  float md=length(uv-m); float glow=exp(-md*3.2)*(0.6+0.5*u_mdown); f+=glow*0.35;
  f+=u_bass*0.05;
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.021);
  col=mix(col,clay*0.55,smoothstep(0.34,0.62,f)*(0.24+0.22*u_mid));
  col=mix(col,lime,smoothstep(0.58,0.98,f)*(0.75+0.25*u_energy));
  col+=lime*glow*(0.35+0.25*u_bass+0.30*u_kick);
  float edge=smoothstep(0.02,0.0,abs(fract(f*6.0)-0.5)-0.46);
  col+=lime*edge*(0.12+0.26*u_high);
  return col;
}

vec3 sceneAurora(vec2 fc){
  vec2 res=u_res;
  vec2 p=fc/res;
  float ar=res.x/res.y;
  float x=(p.x-0.5)*ar, y=p.y;
  vec2 mo=(u_mouse/res-0.5); mo.x*=ar;
  float t=u_time;
  float w = noise(vec2(x*0.9 + t*0.05, t*0.04))*0.85
          + noise(vec2(x*1.3 - t*0.045, t*0.05))*0.55
          + noise(vec2(x*0.5 + t*0.03, 1.7))*0.5;
  w /= 1.9;
  vec3 dark=vec3(0.028,0.03,0.028);
  vec3 clayD=vec3(0.42,0.22,0.16);
  vec3 lime=vec3(0.831,1.0,0.0);
  vec3 col = mix(dark, clayD, smoothstep(0.12,0.9, y + w*0.35 - 0.12));
  float beatT=t*129.0/60.0;
  float sx=(fract(beatT)*2.4-1.2)*ar;
  float surge=exp(-pow((x-sx)/0.22,2.0))*u_kick;
  float wl = 0.50 + w*0.42 + mo.y*0.22;
  float th = 0.070 + 0.04*noise(vec2(x, t*0.12)) + 0.012*u_bass + 0.018*u_kick + 0.030*surge;
  float rib = exp(-pow((y-wl)/th, 2.0));
  col += lime * rib * (0.34+0.12*u_bass+0.16*u_kick+0.35*surge)*(0.8+0.30*u_energy);
  col += lime * exp(-pow((y-wl)/(th*0.32), 2.0)) * (0.30+0.20*u_kick+0.35*surge);
  float str = noise(vec2(x*6.0 + w*2.2, t*0.33))
            * (0.55+0.45*noise(vec2(x*14.0 - t*0.22, 2.2)));
  float above = y - wl;
  float curt = smoothstep(0.0,0.05,above) * exp(-above*(4.6-1.9*u_mid)) * str;
  col += lime * curt * (0.20+0.28*u_energy+0.25*u_high+0.35*surge*exp(-above*2.0));
  float w2 = (noise(vec2(x*0.8 - t*0.05, 4.0))*0.9 + noise(vec2(x*1.4 + t*0.04, 2.0))*0.5)/1.4;
  float wl2 = 0.72 + w2*0.30;
  col += lime * exp(-pow((y-wl2)/0.13, 2.0)) * (0.20+0.28*u_mid);
  vec2 gp=vec2(x*9.0, (y-0.045*t)*9.0);
  vec2 idp=floor(gp);
  vec2 rp=hash2(idp);
  vec2 fp=fract(gp)-0.5;
  float spark=step(0.90,rp.x)*smoothstep(0.10+0.05*rp.y,0.0,length(fp-(rp-0.5)*0.55));
  float twk=0.5+0.5*sin(t*(1.5+rp.y*3.0)+rp.x*12.0);
  col += lime * spark * twk * (0.10+0.40*u_high) * smoothstep(-0.05,0.35,y-wl+0.15);
  col += lime * exp(-pow((y-wl)/(th*0.5), 2.0)) * noise(vec2(x*22.0, t*2.5)) * u_high * 0.22;
  vec2 c = vec2((p.x-0.5)*ar, p.y-0.5);
  float md = length(c - mo);
  col += lime*exp(-md*3.2)*0.30*(0.5+u_mdown);
  col=col/(1.0+0.40*col);
  return col;
}

vec3 sceneScope(vec2 fc){
  vec2 res=u_res;
  vec2 uv=(fc-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  float t=u_time;
  float beatS=t*129.0/60.0;
  float headA=1.5708-6.2831853*fract(beatS/4.0);
  vec2 c=m*0.10;
  float fit=min(1.0,(res.x/res.y)*0.92);
  float R=(0.34+0.02*sin(t*0.4)+0.03*u_bass+0.045*u_kick)*fit;
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.010);
  float beam=0.0, halo=0.0, headGlow=0.0, ghost=0.0;
  vec2 prev=vec2(0.0); vec2 prevG=vec2(0.0);
  for(int i=0;i<=96;i++){
    float th=6.2831853*float(i)/96.0;
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
      float back=mod(th-headA,6.2831853);
      headGlow+=exp(-d*90.0)*exp(-back*1.1);
    }
    prev=pt;
    float w2=fit*(0.05*u_mid*sin(7.0*th + t*1.2)+0.02*(noise(vec2(th*0.9, t*0.4+3.0))-0.5));
    vec2 pg=c+(R*0.62+w2)*vec2(cos(t*0.1-th), sin(t*0.1-th));
    if(i>0){
      vec2 paG=uv-prevG, baG=pg-prevG;
      float hG=clamp(dot(paG,baG)/max(dot(baG,baG),1e-6),0.0,1.0);
      ghost+=exp(-length(paG-baG*hG)*90.0);
    }
    prevG=pg;
  }
  // 96 segments vs the original 160: same signal, ~1.67x the per-segment
  // energy so the trace keeps its original brightness
  col+=lime*(beam*1.67*(0.035+0.03*u_energy)+halo*1.67*0.004+headGlow*1.67*(0.55+0.35*u_energy+0.3*u_kick));
  col+=clay*ghost*1.67*0.042;
  col*=0.97+0.03*sin(gl_FragCoord.y*1.57);
  return col;
}

vec3 sceneWarp(vec2 fc){
  vec2 res=u_res;
  vec2 uv=(fc-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  vec2 o=uv-m*0.18;
  o+=0.012*u_kick*vec2(hash(vec2(floor(u_time*31.0),1.0))-0.5, hash(vec2(2.0,floor(u_time*29.0)))-0.5);
  float r=max(length(o),0.02);
  float th=atan(o.y,o.x);
  float t=u_time;
  float stretch=(0.22+1.0*u_bass+0.3*u_mid)*(0.6+0.7*u_energy)+1.1*u_kick;
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.012);
  for(int L=0;L<3;L++){
    float fl=float(L);
    float rows=18.0+fl*8.0;
    float speed=0.55+fl*0.35;
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
      tw*=0.70+0.50*u_high;
      vec3 tint=mix(lime,clay,step(0.90,rnd.y)*0.7);
      col+=tint*inX*inY*grad*on*tw*(0.50-fl*0.11)*smoothstep(0.03,0.25,r);
    }
  }
  col+=lime*exp(-r*6.0)*(0.03+0.05*u_kick+0.04*u_energy);
  return col;
}

vec3 sceneEight(vec2 fc){
  vec2 res=u_res;
  vec2 uv=(fc-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  float ar=res.x/res.y;
  vec2 p=fc/res;
  float BPM=129.0;
  float beat=u_time*BPM/60.0;
  float s16=beat*4.0;
  float COLS=16.0;
  vec2 g=vec2(p.x*COLS, p.y*COLS/ar);
  vec2 id=floor(g);
  vec2 mg=vec2((u_mouse.x/res.x)*COLS, (u_mouse.y/res.y)*COLS/ar);
  float seed=floor(s16/16.0);
  float near=exp(-length(uv-m)*2.8)*(0.6+0.9*u_mdown);
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.014);
  for(int yy=-1;yy<=1;yy++) for(int xx=-1;xx<=1;xx++){
    vec2 cell=id+vec2(float(xx),float(yy));
    vec2 dv=mg-(cell+0.5);
    float dl=max(length(dv),0.0001);
    vec2 pull=(dv/dl)*exp(-dl*0.34)*0.24*(1.0+0.5*u_mdown)*smoothstep(0.0,0.5,dl);
    float swell=1.0+0.20*exp(-dl*0.5);
    float on;
    if(cell.y<0.5)      on=1.0-step(0.5,mod(cell.x,4.0));
    else if(cell.y<1.5) on=1.0-step(0.5,abs(mod(cell.x,8.0)-4.0));
    else                on=step(0.62,hash(cell+seed*13.71));
    float tS=mod(s16-cell.x,16.0);
    float env=exp(-tS*1.35);
    float laneAmp;
    if(cell.y<0.5)      laneAmp=0.35+1.30*u_bass;
    else if(cell.y<1.5) laneAmp=0.35+1.15*u_mid;
    else                laneAmp=0.30+0.50*u_mid+0.85*u_high*(0.4+0.6*hash(cell+11.13));
    vec2 rnd=hash2(cell);
    vec2 jit=(rnd-0.5)*0.34;
    float hs=(0.26+0.16*rnd.y)*swell;
    vec2 f=g-(cell+0.5)-jit-pull;
    vec2 lf=f/(2.0*hs)+0.5;
    float inQ=step(0.0,lf.x)*step(lf.x,1.0)*step(0.0,lf.y)*step(lf.y,1.0);
    float gi=floor(hash(cell*2.13+7.7)*3.9999);
    float mask=texture2D(u_glyphs,vec2((clamp(lf.x,0.0,1.0)+gi)*0.25,clamp(lf.y,0.0,1.0))).r*inQ;
    vec3 tint=mix(lime,clay,step(0.92,hash(cell*1.7+3.3)));
    col+=lime*mask*0.030;
    col+=tint*mask*on*(0.05+env*0.85*laneAmp+near*0.35);
  }
  float xph=mod(s16,16.0);
  col+=lime*exp(-pow(g.x-xph,2.0)*1.4)*0.045;
  col*=1.0+u_bass*0.08+u_kick*0.14+u_mdown*0.06;
  col*=0.97+0.03*sin(gl_FragCoord.y*1.57);
  return col;
}

vec3 sceneCymatics(vec2 fc){
  vec2 res=u_res;
  vec2 uv=(fc-0.5*res)/res.y;
  vec2 m=(u_mouse-0.5*res)/res.y;
  float t=u_time*0.12;
  float zoom=1.0+0.07*sin(u_time*0.05)+0.05*u_bass+0.09*u_kick;
  vec2 look=uv/zoom+m*0.07;
  float a=3.0+2.0*sin(t*0.70)+2.2*u_bass;
  float b=a+1.5+0.8*sin(t*0.53+2.1)+1.6*u_mid;
  vec2 p=look*3.14159;
  p+=0.5*vec2(noise(look*1.6+t)-0.5, noise(look*1.6-t+7.3)-0.5);
  float md=length(uv-m);
  p+=(uv-m)*exp(-md*3.0)*1.2*(0.5+u_mdown);
  float f=cos(a*p.x)*cos(b*p.y)-cos(b*p.x)*cos(a*p.y);
  float lines=smoothstep(0.10,0.0,abs(f));
  float glow=smoothstep(0.55,0.0,abs(f));
  float sand=pow(1.0-clamp(abs(f)*0.85,0.0,1.0),3.0);
  vec2 p2=look*8.2+vec2(1.7,4.2);
  float f2=cos((a*0.7+1.0)*p2.x)*cos(b*0.6*p2.y)-cos(b*0.6*p2.x)*cos((a*0.7+1.0)*p2.y);
  float micro=smoothstep(0.10,0.0,abs(f2));
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.012);
  col+=clay*sand*(1.0-glow)*(0.07+0.09*u_mid);
  col+=lime*micro*sand*(0.05+0.10*u_high);
  col+=lime*(lines*1.0+glow*0.08)*(0.45+0.18*u_bass+0.30*u_kick+0.15*u_high)*(0.85+0.25*u_energy);
  float f3=cos((b+1.0)*p.y)*cos((a-1.0)*p.x)-cos((a-1.0)*p.y)*cos((b+1.0)*p.x);
  col+=clay*smoothstep(0.12,0.0,abs(f3))*0.20;
  col+=lime*exp(-md*3.2)*0.18*(0.5+u_mdown);
  col=col/(1.0+0.45*col);
  return col;
}

vec3 scenePeak(vec2 fc){
  vec2 uv=(fc-0.5*u_res)/u_res.y;
  vec2 m=(u_mouse-0.5*u_res)/u_res.y;
  float t=u_time;
  float beat=t*129.0/60.0;
  vec2 drift=vec2(t*0.020, t*0.013);
  vec2 pos=uv*2.6 + drift + m*0.22;
  vec2 pk=drift + vec2(0.55*sin(t*0.026), 0.40*cos(t*0.021));
  float b=u_bass;
  float h=fbm(pos)*0.62 + exp(-dot(pos-pk,pos-pk)*0.9)*(0.55+0.10*b);
  float e=0.02;
  float hx=fbm(pos+vec2(e,0.0))*0.62 + exp(-dot(pos+vec2(e,0.0)-pk,pos+vec2(e,0.0)-pk)*0.9)*(0.55+0.10*b);
  float hy=fbm(pos+vec2(0.0,e))*0.62 + exp(-dot(pos+vec2(0.0,e)-pk,pos+vec2(0.0,e)-pk)*0.9)*(0.55+0.10*b);
  float hpx=max(length(vec2(hx-h,hy-h)/e)*2.6/u_res.y, 1e-5);
  float N=26.0;
  float dl=abs(fract(h*N)-0.5)/N;
  float line=smoothstep(1.6*hpx,0.5*hpx,dl);
  float major=1.0-step(0.5,mod(floor(h*N),5.0));
  vec3 lime=vec3(0.831,1.0,0.0), clay=vec3(0.851,0.463,0.341);
  vec3 col=vec3(0.012);
  vec3 tint=mix(lime*0.42, clay*0.9, smoothstep(0.15,0.52,h));
  tint=mix(tint, lime, smoothstep(0.55,0.95,h));
  float amp=(0.30+0.55*smoothstep(0.1,1.0,h))*(0.8+0.3*u_energy);
  col+=tint*line*amp*(0.62+0.38*major)*(0.75+0.25*u_high);
  float dp=length(pos-pk);
  float ring=exp(-pow((dp-fract(beat)*1.9)*5.0,2.0))*u_kick;
  col+=lime*(0.10+line)*ring*0.85;
  vec2 sp=(pk-drift-m*0.22)/2.6;
  float ds=length(uv-sp);
  col+=lime*exp(-ds*22.0)*(0.30+0.45*u_bass+0.2*sin(t*2.1));
  col+=lime*exp(-ds*5.0)*0.05;
  return col;
}

// only ONE branch runs per call - s is uniform-valued (derived from u_time)
vec3 scenePick(float s, vec2 fc){
  if(s<0.5) return sceneFlow(fc);
  else if(s<1.5) return sceneAurora(fc);
  else if(s<2.5) return sceneScope(fc);
  else if(s<3.5) return sceneWarp(fc);
  else if(s<4.5) return sceneEight(fc);
  else if(s<5.5) return sceneCymatics(fc);
  return scenePeak(fc);
}

void main(){
  vec2 fc=gl_FragCoord.xy;
  vec2 uv=(fc-0.5*u_res)/u_res.y;
  vec3 lime=vec3(0.831,1.0,0.0);

  // SCROLL drives the journey: u_progress in scene units (0..6, Lenis-smoothed
  // upstream). Time keeps each world alive; scroll decides WHERE you are.
  // The morph occupies the last 30% of each unit.
  float block=clamp(u_progress,0.0,6.0);
  float idx=min(floor(block),6.0);
  float nxt=mod(idx+1.0,7.0);
  float ph=block-idx;
  float ease=smoothstep(0.0,1.0,clamp((ph-0.70)/0.30,0.0,1.0));

  vec3 col;
  if(ease<=0.0){
    col=scenePick(idx,fc);                    // steady state: ONE scene only
  } else if(ease>=1.0){
    col=scenePick(nxt,fc);
  } else {
    // the kick shoves the dissolve forward - strongest mid-morph, zero at ends
    float e=clamp(ease+0.15*u_kick*ease*(1.0-ease),0.0,1.0);
    // zoom pull: travel INTO the outgoing world while the next settles in from afar
    vec2 ctr=0.5*u_res;
    vec3 a=scenePick(idx, ctr+(fc-ctr)*(1.0-0.18*ease));
    vec3 b=scenePick(nxt, ctr+(fc-ctr)*(1.0+0.25*(1.0-ease)));
    // fbm-threshold dissolve: the next world eats into this one organically
    float n=fbm(uv*2.6+vec2(idx*7.31,idx*3.17)+u_time*0.03);
    float e2=e*1.7-0.35;                      // sweep covers the whole fbm range
    float mask=smoothstep(0.0,1.0,(e2-n)/0.13+0.5);
    col=mix(a,b,mask);
    // molten seam where the two worlds touch; flares on the kick
    col+=lime*exp(-abs(e2-n)*22.0)*e*(1.0-e)*(0.7+1.8*u_kick);
  }

  // now playing: 7 track dots, the lit one hands over during the morph
  for(int i=0;i<7;i++){
    float fi=float(i);
    float lit=0.0;
    if(abs(fi-idx)<0.5) lit=1.0-ease;
    else if(abs(fi-nxt)<0.5) lit=ease;
    float dotm=smoothstep(0.0045,0.0018,length(uv-vec2((fi-3.0)*0.032,-0.355)));
    col=mix(col,mix(vec3(0.16),lime,lit),dotm*(0.35+0.65*lit));
  }

  // grain + vignette ONCE, on the stable camera (not the zoomed worlds)
  float v=length(uv); col*=1.0-0.28*v*v;
  col+=(hash(fc+u_time)-0.5)*0.02;
  gl_FragColor=vec4(col,1.0);
}`;

const PRESETS = [
  { id: "flow", name: "Flow", frag: PRELUDE + FLOW },
  { id: "aurora", name: "Aurora", frag: PRELUDE + AURORA },
  { id: "scope", name: "Scope", frag: PRELUDE + SCOPE },
  { id: "warp", name: "Warp", frag: PRELUDE + WARP },
  { id: "808", name: "808", frag: PRELUDE + EIGHT08 },
  { id: "cymatics", name: "Cymatics", frag: PRELUDE + CYMATICS },
  { id: "peak", name: "Peak", frag: PRELUDE + PEAK },
  { id: "r3loop", name: "R3loop", frag: PRELUDE + R3LOOP },
];

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error("shader:", gl.getShaderInfoLog(s));
  return s;
}

export function WebGLExperiment() {
  const { language } = useLanguage();
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
    kick: WebGLUniformLocation | null;
    energy: WebGLUniformLocation | null;
    progress: WebGLUniformLocation | null;
  } | null>(null);

  // ── cursor-reactive title: springy 3D tilt + drift toward the pointer ──
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / Math.max(1, window.innerWidth));
      my.set(e.clientY / Math.max(1, window.innerHeight));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);
  const smx = useSpring(mx, { stiffness: 55, damping: 14 });
  const smy = useSpring(my, { stiffness: 55, damping: 14 });
  const rotY = useTransform(smx, [0, 1], [-8, 8]);
  const rotX = useTransform(smy, [0, 1], [6, -6]);
  const tX = useTransform(smx, [0, 1], [-16, 16]);
  const tY = useTransform(smy, [0, 1], [-10, 10]);

  // ── live audio tap (808 sync) - falls back to a 129 BPM clock when silent ──
  const { isPlaying, play, getAnalyser } = useAudio();
  const playingRef = useRef(isPlaying);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const freqRef = useRef<Uint8Array | null>(null);
  const levelRef = useRef({ bass: 0, mid: 0, high: 0, kick: 0, energy: 0.4, lastBass: 0 });
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
    // R3loop journey progress: 1 viewport of scroll = 1 scene unit (Lenis smooths it)
    let scrollY = window.scrollY || 0;
    const onScroll = () => (scrollY = window.scrollY || 0);
    window.addEventListener("scroll", onScroll, { passive: true });

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
        // KICK: bass-flux transient detector - fires on the hit itself, not on
        // sustained low end; sharp attack, ~150ms release. ENERGY: slow follower
        // of the whole track, so builds and breakdowns reshape the scene.
        const flux = Math.max(0, bass - lv.lastBass);
        lv.lastBass = bass;
        lv.kick = Math.max(Math.min(1, flux * 5.5), lv.kick * Math.pow(0.72, fr));
        const level = (bass + mid + high) / 3;
        lv.energy += (level - lv.energy) * Math.min(1, dt * 1.6);
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
        gl.uniform1f(u.kick, lv.kick);
        gl.uniform1f(u.energy, lv.energy);
        gl.uniform1f(u.progress, Math.min(6, scrollY / Math.max(1, window.innerHeight)));
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = reduced ? 0 : requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      glRef.current = null;
    };
  }, []);

  // entering/leaving R3loop: start the journey at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active]);

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
      kick: gl.getUniformLocation(prog, "u_kick"),
      energy: gl.getUniformLocation(prog, "u_energy"),
      progress: gl.getUniformLocation(prog, "u_progress"),
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

        {/* gallery title: the effect name, huge, centered on the canvas */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center px-8">
            <span className="block font-display uppercase tracking-[0.3em] text-[11px] text-[#D4FF00] mb-5">
              {pl ? "WebGL · eksperyment" : "WebGL · experiment"}
            </span>
            <motion.h1
              key={PRESETS[active].id}
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ rotateX: rotX, rotateY: rotY, x: tX, y: tY, transformPerspective: 900 }}
              className="font-display font-normal uppercase text-white !text-[clamp(3.5rem,11vw,12rem)] leading-none tracking-tight [text-shadow:0_2px_60px_rgba(0,0,0,0.7)] mix-blend-screen will-change-transform"
            >
              {PRESETS[active].name}
            </motion.h1>
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
          {PRESETS[active].id === "r3loop" && (
            <span className="flex items-center gap-2 font-display uppercase tracking-[0.2em] text-[10px] text-[#D4FF00]/80">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
              {pl ? "scrolluj, aby podróżować" : "scroll to travel"}
            </span>
          )}
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
      {/* R3loop scroll track: 1 viewport per scene, 7 scenes - the fixed canvas
          reads window.scrollY (Lenis-smoothed) and morphs along the journey */}
      {PRESETS[active].id === "r3loop" && <div style={{ height: "700vh" }} aria-hidden="true" />}
    </>
  );
}
