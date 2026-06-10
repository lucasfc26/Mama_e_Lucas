import { Link } from "@tanstack/react-router";
import { Heart, Gamepad2, Map, BookHeart } from "lucide-react";
import type { ReactNode } from "react";
import { HeartParticles } from "./HeartParticles";

const links = [
  { to: "/", label: "Nossa História", icon: BookHeart },
  { to: "/games", label: "Games do Casal", icon: Gamepad2 },
  { to: "/caca-ao-tesouro", label: "Caça ao Tesouro", icon: Map },
] as const;

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <HeartParticles />
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-primary/10">
        <nav className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl font-bold text-gradient">Mama</span>
            <Heart className="h-6 w-6 text-primary animate-pulse-heart" fill="currentColor" />
            <span className="font-display text-xl font-bold text-gradient">Lucas</span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
                activeProps={{
                  className:
                    "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:!bg-primary hover:!text-primary-foreground",
                }}
                activeOptions={{ exact: to === "/" }}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 mt-20 py-8 text-center text-sm text-muted-foreground">
        Feito com <Heart className="inline h-4 w-4 text-primary" fill="currentColor" /> para você
      </footer>
    </div>
  );
}
