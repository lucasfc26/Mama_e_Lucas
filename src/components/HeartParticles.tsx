import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function HeartParticles({ count = 15 }: { count?: number }) {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
        size: 12 + Math.random() * 20,
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-float-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          <Heart
            className="text-primary/40"
            style={{ width: h.size, height: h.size }}
            fill="currentColor"
          />
        </div>
      ))}
    </div>
  );
}
