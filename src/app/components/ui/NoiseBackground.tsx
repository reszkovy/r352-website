import { useEffect, useRef } from 'react';

export function NoiseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);

    const loop = () => {
      if (!ctx) return;
      
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000; // Black (little endian: alpha is last byte in standard but depends on endianness. Usually 0xAABBGGRR. wait.)
          // Actually, let's just make it white noise with varying alpha.
          // Or just random pixels.
          
          // Using a simpler approach for performance:
          // Just random grayscale noise.
          // buffer32[i] = (255 << 24) | (val << 16) | (val << 8) | val;
        }
      }
      
      // Let's use a more standard noise generation loop for visual quality
      for (let i = 0; i < len; i++) {
         const val = Math.random() * 255;
         // ABGR or RGBA depending on endianness. 
         // We want white/gray noise with low opacity.
         // Let's rely on CSS opacity for the canvas, and just draw white/black pixels.
         
         const gray = Math.random() > 0.5 ? 255 : 0;
         // Set alpha to 255 (fully opaque) inside the canvas, 
         // we will control the canvas opacity via CSS.
         // 0xff000000 is black full alpha. 0xffffffff is white full alpha.
         
         buffer32[i] = (255 << 24) | (gray << 16) | (gray << 8) | gray; 
      }

      ctx.putImageData(idata, 0, 0);
      animationId = requestAnimationFrame(loop);
    };
    
    // To save battery, we might want to slow down the frame rate or use a smaller canvas scaled up.
    // Let's use a smaller pattern and tile it?
    // Or just run the loop every n frames.
    
    // Optimization: Draw noise once to a small offscreen canvas and tile it?
    // But user wants "animated" noise.
    // Let's do the per-frame noise for that specific "TV static" look.
    // But update only every 2nd or 3rd frame to reduce load?
    
    let animationId: number;
    let frame = 0;
    
    const optimizedLoop = () => {
        frame++;
        if (frame % 5 === 0) { // Update every 5th frame for a slower feel
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;
            
            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.1) { // 10% density
                    buffer32[i] = 0xffffffff; // White
                }
            }
            ctx.putImageData(idata, 0, 0);
        }
        animationId = requestAnimationFrame(optimizedLoop);
    };

    optimizedLoop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none -z-10 opacity-[0.03] mix-blend-overlay"
    />
  );
}