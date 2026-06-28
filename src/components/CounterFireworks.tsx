import { useEffect, useRef } from "react";

const COLORS = ["#e11d48", "#fbbf24", "#f472b6", "#a855f7", "#fb7185", "#fcd34d"];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  decay: number;
};

type Rocket = {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: string;
};

export function CounterFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let particles: Particle[] = [];
    let rockets: Rocket[] = [];
    let frameId = 0;
    let lastLaunch = 0;

    const launch = () => {
      rockets.push({
        x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
        y: canvas.height,
        vy: -6 - Math.random() * 3,
        targetY: Math.random() * canvas.height * 0.45 + canvas.height * 0.08,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const count = 36 + Math.floor(Math.random() * 16);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.15;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          decay: 0.012 + Math.random() * 0.008,
        });
      }
    };

    const tick = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (time - lastLaunch > 700 + Math.random() * 500) {
        launch();
        lastLaunch = time;
      }

      rockets = rockets.filter((r) => {
        r.y += r.vy;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();

        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color);
          return false;
        }
        return true;
      });

      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.alpha -= p.decay;
        if (p.alpha <= 0) return false;

        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-10 opacity-75"
      aria-hidden
    />
  );
}
