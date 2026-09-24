import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  fadeSpeed: number;
  color: string;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobbleOffset: number;
}

const EMBER_COLORS = [
  "rgba(210, 69, 31, ", // Ember red/orange
  "rgba(234, 88, 12, ", // Warm forge orange
  "rgba(245, 158, 11, ", // Amber
  "rgba(251, 191, 36, ", // Warm gold spark
];

interface EmbersCanvasProps {
  className?: string;
  count?: number;
}

export function EmbersCanvas({ className = "", count = 35 }: EmbersCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respeita prefers-reduced-motion para acessibilidade (RNF-02)
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = Array.from({ length: count }, () => {
      const maxOpacity = 0.25 + Math.random() * 0.55;
      return {
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        size: 1 + Math.random() * 2.2,
        speedY: 0.35 + Math.random() * 0.85,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * maxOpacity,
        maxOpacity,
        fadeSpeed: 0.003 + Math.random() * 0.007,
        color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmp: 0.4 + Math.random() * 0.8,
        wobbleOffset: Math.random() * Math.PI * 2,
      };
    });

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(frame * p.wobbleSpeed + p.wobbleOffset) * p.wobbleAmp * 0.4;
        p.opacity += p.fadeSpeed;

        if (p.opacity > p.maxOpacity) {
          p.opacity = p.maxOpacity;
          p.fadeSpeed = -Math.abs(p.fadeSpeed);
        } else if (p.opacity < 0.05) {
          p.opacity = 0.05;
          p.fadeSpeed = Math.abs(p.fadeSpeed);
        }

        // Se sair pelo topo, ressurge na base
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.opacity = 0.05;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.shadowBlur = p.size * 3.5;
        ctx.shadowColor = "rgba(234, 88, 12, 0.7)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
