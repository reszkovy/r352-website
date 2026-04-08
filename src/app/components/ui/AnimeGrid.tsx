import { useEffect, useRef } from "react";
import svgPaths from "@/imports/svg-9vxan0q60f";
import { useLenis } from "lenis/react";

export function AnimeGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position
  const scrollYRef = useRef(0);
  
  useLenis((lenis) => {
    scrollYRef.current = lenis.scroll;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    
    // New paths from the "R" logo
    const pathR = new Path2D(svgPaths.p3111bb80);
    const pathCircle = new Path2D(svgPaths.p37835f00);
    
    // Center point is roughly (328, 337)
    const centerX = 328;
    const centerY = 337;

    // Configuration
    const baseScale = 0.35; 
    const gridSize = 600; 
    const activeRadius = 650; 
    
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.scale(dpr, dpr);
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    class Point {
      originX: number;
      originY: number;
      x: number;
      y: number;
      scale: number;
      angle: number;
      parallaxFactor: number;
      
      constructor(x: number, y: number) {
        this.originX = x;
        this.originY = y;
        this.x = x;
        this.y = y;
        this.scale = baseScale;
        this.angle = 0;
        // Random parallax factor between 0.1 and 0.5
        // Negative so they move UP when scrolling DOWN (standard parallax)
        this.parallaxFactor = -(0.1 + Math.random() * 0.4); 
      }

      update() {
        // Calculate scroll offset
        const scrollOffset = scrollYRef.current * this.parallaxFactor;
        
        // Effective origin Y includes scroll offset
        const effectiveOriginY = this.originY + scrollOffset;

        const dx = mouseX - this.originX;
        const dy = mouseY - effectiveOriginY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = this.originX;
        let targetY = effectiveOriginY;
        let targetScale = baseScale;
        let targetAngle = 0;

        if (distance < activeRadius) {
          const force = (activeRadius - distance) / activeRadius;
          const easedForce = force * force; 
          
          // Magnet Pull
          const pullStrength = 180; 
          targetX = this.originX + (dx / distance) * (force * pullStrength);
          targetY = effectiveOriginY + (dy / distance) * (force * pullStrength);

          // Scale Up
          targetScale = baseScale + (easedForce * 0.20); 

          // Rotate
          targetAngle = Math.atan2(dy, dx) + Math.PI / 2; 
        }

        // Smooth transition
        this.x += (targetX - this.x) * 0.08;
        this.y += (targetY - this.y) * 0.08;
        this.scale += (targetScale - this.scale) * 0.08;
        this.angle += (targetAngle - this.angle) * 0.08;
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.scale(this.scale, this.scale);
        
        // Center the shape
        context.translate(-centerX, -centerY);
        
        // Dynamic opacity based on size/interaction
        const opacity = 0.15 + (this.scale - baseScale) * 2.0; 
        const isLight = document.body.classList.contains('global-light-mode') || document.body.classList.contains('lime-theme');
        const multiplier = isLight ? 0.5 : 1.0; // 50% opacity for light mode
        
        context.fillStyle = `rgba(0, 0, 0, ${Math.min(opacity * multiplier, 0.9 * multiplier)})`;
        
        // Draw both parts of the logo
        context.fill(pathR);
        context.fill(pathCircle);
        
        context.restore();
      }
    }

    let points: Point[] = [];

    const initPoints = () => {
      points = [];
      const { width, height } = container.getBoundingClientRect();
      const padding = 500;
      
      // Expand vertical range to account for parallax movement
      for (let y = -padding; y < height + padding + 1000; y += gridSize) {
        const row = Math.floor(y / gridSize);
        const xOffset = row % 2 === 0 ? 0 : gridSize / 2;
        
        for (let x = -padding; x < width + padding; x += gridSize) {
          points.push(new Point(x + xOffset, y));
        }
      }
    };

    const animate = () => {
      const { width, height } = container.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      
      // Lamp / Spotlight Effect
      if (mouseX > -500) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, activeRadius * 1.2);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.05)"); 
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
      
      points.forEach(point => {
        point.update();
        point.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resize();
      initPoints();
    };
    
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    
    resizeObserver.observe(container);
    
    resize();
    initPoints();
    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />
    </div>
  );
}
