import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Unlock, MapPin, Key, Heart, Sparkles, Gift } from "lucide-react";
import { Layout } from "@/components/Layout";

export const Route = createFileRoute("/caca-ao-tesouro")({
  component: TesouroPage,
});

// ✏️ EDITE AQUI as senhas (configuráveis)
const PHASES = [
  {
    title: "Fase 1 — Atrás dos temperos",
    riddle: "Onde os sabores se escondem e a comida ganha amor, procure atrás dos temperos para encontrar o próximo valor.",
    password: "tempero",
  },
  {
    title: "Fase 2 — Armários da dispensa",
    riddle: "Nem tudo que está guardado é comida. Entre portas e prateleiras, sua próxima pista está escondida.",
    password: "dispensa",
  },
  {
    title: "Fase 3 — Centro de mesa da sala de jantar",
    riddle: "Onde a família se reúne e os momentos ficam no ar, olhe bem no centro da mesa para a próxima pista encontrar.",
    password: "mesa",
  },
  {
    title: "Fase 4 — Debaixo do roteador de internet",
    riddle: "Onde o sinal conecta tudo e aproxima quem está distante, procure debaixo dele por algo importante.",
    password: "roteador",
  },
  {
    title: "Fase 5 — Dentro do porta-luvas",
    riddle: "No carro existe um pequeno esconderijo, guardado e discreto. Abra com carinho e siga para perto do seu presente secreto.",
    password: "carro",
  },
];

function PhaseCard({
  phase,
  index,
  status,
  onUnlock,
}: {
  phase: typeof PHASES[0];
  index: number;
  status: "locked" | "active" | "done";
  onUnlock: (input: string) => boolean;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onUnlock(input.trim());
    if (!ok) {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  if (status === "locked") {
    return (
      <div className="glass-card rounded-3xl p-6 opacity-60 grayscale">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Fase {index + 1}</p>
            <h3 className="font-display text-lg font-bold">Bloqueada</h3>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground italic">
          Complete a fase anterior para desbloquear.
        </p>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="glass-card rounded-3xl p-6 border-2 border-primary/40 animate-fade-up">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Unlock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">Fase {index + 1} — concluída</p>
            <h3 className="font-display text-lg font-bold text-gradient">{phase.title}</h3>
          </div>
        </div>
        <p className="mt-3 text-sm text-foreground/70 italic">✓ Senha aceita. Próxima pista liberada.</p>
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-3xl p-6 border-2 border-primary/60 shadow-xl shadow-primary/20 animate-fade-up ${error ? "animate-pulse" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
          <MapPin className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-semibold">Sua missão atual</p>
          <h3 className="font-display text-xl font-bold text-gradient">{phase.title}</h3>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-primary/5 border border-primary/20 p-5">
        <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2 flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> Charada
        </p>
        <p className="font-display text-lg italic leading-relaxed text-foreground/90">"{phase.riddle}"</p>
      </div>

      <form onSubmit={submit} className="mt-5 space-y-3">
        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1">
          <Key className="h-3 w-3" /> Digite a senha encontrada
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="senha secreta..."
          className={`w-full px-4 py-3 rounded-full bg-background border-2 transition-all outline-none ${error ? "border-destructive" : "border-primary/30 focus:border-primary"}`}
        />
        {error && <p className="text-sm text-destructive">Senha incorreta. Tente de novo, meu bem 💔</p>}
        <button
          type="submit"
          className="w-full px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/40 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
        >
          <Unlock className="h-4 w-4" /> Desbloquear próxima pista
        </button>
      </form>
    </div>
  );
}

function TesouroPage() {
  const [unlocked, setUnlocked] = useState(0); // index of current active phase
  const finished = unlocked >= PHASES.length;

  const tryUnlock = (i: number, input: string) => {
    if (input.toLowerCase() === PHASES[i].password.toLowerCase()) {
      setUnlocked(i + 1);
      return true;
    }
    return false;
  };

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 py-12 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-up">
          <MapPin className="h-4 w-4" /> Missão especial
        </div>
        <h1 className="font-display text-5xl sm:text-7xl font-bold mt-6 text-gradient animate-fade-up">
          Caça ao Tesouro
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up">
          Cinco pistas. Cinco lugares pela casa. Um tesouro no final. Preparada, meu bem?
        </p>

        <div className="mt-8 flex items-center justify-center gap-2">
          {PHASES.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${i < unlocked ? "w-8 bg-primary" : i === unlocked ? "w-12 bg-primary/60" : "w-4 bg-muted"}`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 space-y-6">
        {PHASES.map((phase, i) => (
          <PhaseCard
            key={i}
            phase={phase}
            index={i}
            status={i < unlocked ? "done" : i === unlocked ? "active" : "locked"}
            onUnlock={(input) => tryUnlock(i, input)}
          />
        ))}

        {finished && (
          <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center animate-fade-up gradient-romantic text-white shadow-2xl">
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 20 }).map((_, i) => (
                <Heart
                  key={i}
                  className="absolute text-white animate-sparkle"
                  fill="currentColor"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${10 + Math.random() * 20}px`,
                    height: `${10 + Math.random() * 20}px`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
            <div className="relative z-10">
              <Gift className="h-16 w-16 mx-auto mb-4 animate-pulse-heart" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold">Parabéns, meu bem!</h2>
              <p className="mt-6 font-display text-xl sm:text-2xl italic leading-relaxed max-w-2xl mx-auto">
                Agora vá até o seu quarto. Lá está o verdadeiro tesouro... mas a verdade é que o meu maior presente sempre foi você ❤️
              </p>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
