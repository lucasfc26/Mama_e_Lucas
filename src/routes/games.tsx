import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  CircleHelp,
  Gamepad2,
  Heart,
  RotateCw,
  Skull,
  Sparkles,
  Type,
} from "lucide-react";
import { Layout } from "@/components/Layout";

const GAME_IDS = ["roleta", "forca", "palavra", "terminar"] as const;
type GameId = (typeof GAME_IDS)[number];

export const Route = createFileRoute("/games")({
  validateSearch: (search: Record<string, unknown>): { game?: GameId } => {
    const game = search.game;
    return {
      game:
        typeof game === "string" && GAME_IDS.includes(game as GameId)
          ? (game as GameId)
          : undefined,
    };
  },
  component: GamesPage,
});

// ✏️ EDITE AQUI
const ROULETTE_OPTIONS = [
  "Assistir um filme agarradinhos",
  "Fazer uma sobremesa juntos",
  "Sair para comer algo diferente",
  "Fazer uma massagem",
  "Relembrar fotos antigas",
  "Dançar uma música romântica",
  "Uma noite sem celular",
  "Planejar nossa próxima viagem",
];

const HANGMAN_WORDS = [
  "AMOR",
  "NAMORO",
  "VIAGEM",
  "SAUDADE",
  "BEIJO",
  "CARINHO",
  "DATE",
  "PRESENTE",
];
const TERMO_WORDS = ["AMOR", "BEIJO", "DATE", "VIDA", "CASAL"];

const GAME_CARDS = [
  {
    id: "roleta",
    title: "Roleta do Casal",
    subtitle: "Deixa o destino decidir nossa próxima vibe.",
    icon: RotateCw,
  },
  {
    id: "forca",
    title: "Jogo da Forca",
    subtitle: "Adivinhe a palavra antes de perder todos os corações.",
    icon: Skull,
  },
  {
    id: "palavra",
    title: "Adivinhe a Palavra",
    subtitle: "Estilo Termo, mas romântico.",
    icon: Type,
  },
  {
    id: "terminar",
    title: "Última pergunta",
    subtitle: "Cuidado para não clicar no errado.",
    icon: CircleHelp,
  },
] as const satisfies ReadonlyArray<{
  id: GameId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}>;

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-8">
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-gradient">{children}</h2>
      {sub && <p className="text-muted-foreground mt-2">{sub}</p>}
    </div>
  );
}

function GameCards() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 pb-20 sm:grid-cols-2 lg:grid-cols-4">
      {GAME_CARDS.map(({ id, title, subtitle, icon: Icon }) => (
        <Link
          key={id}
          to="/games"
          search={{ game: id }}
          className="group glass-card rounded-2xl p-5 text-left transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        >
          <div className="flex h-full min-h-52 flex-col justify-between">
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{subtitle}</p>
            </div>
            <span className="mt-8 inline-flex items-center text-sm font-semibold text-primary">
              Jogar agora
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}

/* ---------- Roleta ---------- */
function Roulette() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const n = ROULETTE_OPTIONS.length;
  const slice = 360 / n;

  const spin = () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);
    const winner = Math.floor(Math.random() * n);
    const finalAngle = 360 - winner * slice - slice / 2;
    setRotation((prev) => {
      const currentAngle = ((prev % 360) + 360) % 360;
      const correction = (finalAngle - currentAngle + 360) % 360;
      return prev + 360 * 6 + correction;
    });
    setTimeout(() => {
      setSpinning(false);
      setResult(ROULETTE_OPTIONS[winner]);
    }, 4200);
  };

  const colors = ["var(--color-primary)", "var(--rose)", "var(--wine)", "var(--gold)"];
  const splitLabel = (label: string) => label.split(" ").slice(0, 4);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col items-center">
        <div className="relative w-72 h-72 sm:w-96 sm:h-96">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent border-t-primary drop-shadow-lg" />
          <div
            className="w-full h-full rounded-full shadow-2xl border-8 border-primary/30 overflow-hidden transition-transform duration-[4000ms]"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionTimingFunction: "cubic-bezier(0.17, 0.67, 0.21, 0.99)",
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {ROULETTE_OPTIONS.map((opt, i) => {
                const a1 = (i * slice - 90) * (Math.PI / 180);
                const a2 = ((i + 1) * slice - 90) * (Math.PI / 180);
                const x1 = 100 + 100 * Math.cos(a1);
                const y1 = 100 + 100 * Math.sin(a1);
                const x2 = 100 + 100 * Math.cos(a2);
                const y2 = 100 + 100 * Math.sin(a2);
                const textAngle = i * slice + slice / 2;
                const textRadians = (textAngle - 90) * (Math.PI / 180);
                return (
                  <g key={i}>
                    <path
                      d={`M100,100 L${x1},${y1} A100,100 0 0,1 ${x2},${y2} Z`}
                      fill={colors[i % colors.length]}
                      stroke="white"
                      strokeWidth="1"
                    />
                    {splitLabel(opt).map((word, wi) => {
                      const radius = 82 - wi * 12;
                      const tx = 100 + radius * Math.cos(textRadians);
                      const ty = 100 + radius * Math.sin(textRadians);
                      return (
                        <text
                          key={`${opt}-${word}-${wi}`}
                          x={tx}
                          y={ty}
                          fill="white"
                          fontSize={word.length > 10 ? "5.4" : "6.2"}
                          fontWeight="800"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textAngle}, ${tx}, ${ty})`}
                        >
                          {word}
                        </text>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-xl">
            <Heart className="h-6 w-6 text-primary" fill="currentColor" />
          </div>
        </div>

        <button
          onClick={spin}
          disabled={spinning}
          className="mt-8 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/40 hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <RotateCw className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} />
          {spinning ? "Girando..." : "Girar Roleta"}
        </button>

        {result && (
          <div className="mt-6 animate-fade-up glass-card rounded-2xl px-6 py-4 text-center">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">
              Vamos fazer:
            </p>
            <p className="font-display text-xl sm:text-2xl mt-1 text-gradient">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Forca ---------- */
function Hangman() {
  const [word, setWord] = useState(
    () => HANGMAN_WORDS[Math.floor(Math.random() * HANGMAN_WORDS.length)],
  );
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const wrong = [...guessed].filter((l) => !word.includes(l));
  const MAX = 6;
  const won = [...word].every((l) => guessed.has(l));
  const lost = wrong.length >= MAX;
  const done = won || lost;

  const press = (l: string) => {
    if (done || guessed.has(l)) return;
    setGuessed(new Set([...guessed, l]));
  };

  const restart = () => {
    setWord(HANGMAN_WORDS[Math.floor(Math.random() * HANGMAN_WORDS.length)]);
    setGuessed(new Set());
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground">Tentativas restantes</p>
        <div className="flex gap-1 my-2">
          {Array.from({ length: MAX }).map((_, i) => (
            <Heart
              key={i}
              className={`h-6 w-6 transition-all ${i < MAX - wrong.length ? "text-primary" : "text-muted-foreground/30"}`}
              fill="currentColor"
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 my-6">
          {[...word].map((l, i) => (
            <div
              key={i}
              className="w-10 h-12 sm:w-12 sm:h-14 border-b-4 border-primary flex items-center justify-center font-display text-2xl sm:text-3xl font-bold"
            >
              {guessed.has(l) || lost ? l : ""}
            </div>
          ))}
        </div>

        {done && (
          <div className="text-center mb-4 animate-fade-up">
            {won ? (
              <p className="font-display text-2xl text-gradient">🎉 Você acertou, meu bem!</p>
            ) : (
              <p className="font-display text-2xl text-wine">
                Quase! A palavra era <span className="text-gradient">{word}</span>
              </p>
            )}
            <button
              onClick={restart}
              className="mt-3 px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:scale-105 transition-transform"
            >
              Jogar de novo
            </button>
          </div>
        )}

        <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 max-w-xl">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => {
            const used = guessed.has(l);
            const ok = used && word.includes(l);
            const bad = used && !word.includes(l);
            return (
              <button
                key={l}
                onClick={() => press(l)}
                disabled={used || done}
                className={`h-9 w-9 sm:h-10 sm:w-10 rounded-lg font-semibold text-sm transition-all
                  ${ok ? "bg-primary text-primary-foreground" : ""}
                  ${bad ? "bg-muted text-muted-foreground line-through opacity-50" : ""}
                  ${!used ? "bg-background border border-primary/20 hover:bg-primary/10 hover:scale-110" : ""}
                `}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Termo ---------- */
function Termo() {
  const [word, setWord] = useState(
    () => TERMO_WORDS[Math.floor(Math.random() * TERMO_WORDS.length)],
  );
  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const MAX_TRIES = 6;
  const len = word.length;
  const won = guesses[guesses.length - 1] === word;
  const lost = !won && guesses.length >= MAX_TRIES;
  const done = won || lost;

  const submit = () => {
    if (current.length !== len || done) return;
    setGuesses([...guesses, current]);
    setCurrent("");
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k === "ENTER") handleKey("ENTER");
      else if (k === "BACKSPACE") handleKey("BACK");
      else if (/^[A-Z]$/.test(k)) handleKey(k);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  });

  const letterStatus = useMemo(() => {
    const map = new Map<string, "correct" | "present" | "absent">();
    guesses.forEach((g) =>
      [...g].forEach((l, i) => {
        const s = word[i] === l ? "correct" : word.includes(l) ? "present" : "absent";
        const cur = map.get(l);
        if (s === "correct" || !cur || (s === "present" && cur === "absent")) map.set(l, s);
      }),
    );
    return map;
  }, [guesses, word]);

  const restart = () => {
    setWord(TERMO_WORDS[Math.floor(Math.random() * TERMO_WORDS.length)]);
    setGuesses([]);
    setCurrent("");
  };

  const rows = Array.from({ length: MAX_TRIES }).map((_, i) => {
    if (i < guesses.length) return guesses[i];
    if (i === guesses.length) return current.padEnd(len, " ");
    return " ".repeat(len);
  });

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground mb-4">Adivinhe a palavra de {len} letras</p>
        <div className="space-y-1.5 mb-6">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-1.5">
              {[...row].map((l, ci) => {
                const submitted = ri < guesses.length;
                let cls = "bg-background border-primary/20 text-foreground";
                if (submitted) {
                  if (word[ci] === l) cls = "bg-primary text-primary-foreground border-primary";
                  else if (word.includes(l)) cls = "bg-gold text-wine border-gold";
                  else cls = "bg-muted text-muted-foreground border-muted";
                }
                return (
                  <div
                    key={ci}
                    className={`w-11 h-11 sm:w-12 sm:h-12 border-2 rounded-lg flex items-center justify-center font-display font-bold text-xl uppercase transition-all ${cls}`}
                  >
                    {l.trim()}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {done && (
          <div className="text-center mb-4 animate-fade-up">
            {won ? (
              <p className="font-display text-2xl text-gradient">💖 Acertou em cheio!</p>
            ) : (
              <p className="font-display text-2xl text-wine">
                A palavra era <span className="text-gradient">{word}</span>
              </p>
            )}
            <button
              onClick={restart}
              className="mt-3 px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:scale-105 transition-transform"
            >
              Nova palavra
            </button>
          </div>
        )}

        <div className="space-y-1.5 w-full max-w-md">
          {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, ri) => (
            <div key={ri} className="flex gap-1 justify-center">
              {ri === 2 && (
                <button
                  onClick={() => handleKey("ENTER")}
                  className="px-2 h-10 rounded-md bg-primary text-primary-foreground text-xs font-bold"
                >
                  ↵
                </button>
              )}
              {[...row].map((l) => {
                const s = letterStatus.get(l);
                let cls = "bg-background border border-primary/20";
                if (s === "correct") cls = "bg-primary text-primary-foreground";
                else if (s === "present") cls = "bg-gold text-wine";
                else if (s === "absent") cls = "bg-muted text-muted-foreground";
                return (
                  <button
                    key={l}
                    onClick={() => handleKey(l)}
                    className={`w-7 h-10 sm:w-8 sm:h-10 rounded-md text-sm font-bold transition-all hover:scale-110 ${cls}`}
                  >
                    {l}
                  </button>
                );
              })}
              {ri === 2 && (
                <button
                  onClick={() => handleKey("BACK")}
                  className="px-2 h-10 rounded-md bg-muted text-xs font-bold"
                >
                  ⌫
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Botão Terminar ---------- */
function BreakupButton() {
  const [corner, setCorner] = useState<number | null>(null);
  const [msg, setMsg] = useState<"yes" | "no" | null>(null);
  const nextCornerRef = useRef(0);

  const flee = () => {
    nextCornerRef.current = (nextCornerRef.current + 1 + Math.floor(Math.random() * 3)) % 4;
    setCorner(nextCornerRef.current);
  };

  const cornerClasses = [
    "fixed left-4 top-24 z-50",
    "fixed right-4 top-24 z-50",
    "fixed right-4 bottom-4 z-50",
    "fixed left-4 bottom-4 z-50",
  ];
  const yesPosition =
    corner === null
      ? "absolute left-1/2 top-1/2 -translate-x-[5.75rem] -translate-y-1/2"
      : cornerClasses[corner];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-10 text-center">
      <h3 className="font-display text-2xl sm:text-3xl font-bold text-gradient">
        Você não me aguenta mais e quer terminar comigo?
      </h3>

      <div className="relative mt-10 h-64 overflow-hidden rounded-2xl border border-primary/10 bg-background/40">
        <button
          onMouseEnter={flee}
          onMouseDown={flee}
          onTouchStart={flee}
          onFocus={flee}
          onClick={() => setMsg("yes")}
          className={`${yesPosition} px-6 py-3 rounded-full bg-destructive text-destructive-foreground font-semibold shadow-lg transition-none`}
        >
          Sim
        </button>
        <button
          onClick={() => setMsg("no")}
          className="absolute left-1/2 top-1/2 translate-x-3 -translate-y-1/2 rounded-full bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/40 transition-transform hover:scale-110"
        >
          Não ❤️
        </button>
      </div>

      {msg && (
        <p className="mt-4 animate-fade-up font-display text-xl text-gradient">
          {msg === "yes"
            ? "Muito bem... mas essa opção não existe de verdade 😌"
            : "Eu sabia! Você está presa comigo para sempre ❤️"}
        </p>
      )}
    </div>
  );
}

function GamesPage() {
  const { game } = Route.useSearch();
  const selectedGame = GAME_CARDS.find((item) => item.id === game);
  const gameContent = selectedGame
    ? {
        roleta: <Roulette />,
        forca: <Hangman />,
        palavra: <Termo />,
        terminar: <BreakupButton />,
      }[selectedGame.id]
    : null;

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-12 text-center sm:py-20">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary animate-fade-up">
          <Gamepad2 className="h-4 w-4" /> Diversão a dois
        </div>
        <h1 className="font-display mt-6 text-5xl font-bold text-gradient animate-fade-up sm:text-7xl">
          Games do Casal
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground animate-fade-up">
          Quatro joguinhos pra rir, competir e se apaixonar de novo.
        </p>
      </section>

      {!selectedGame ? (
        <GameCards />
      ) : (
        <section className="mx-auto max-w-4xl px-4 pb-20">
          <div className="mb-8">
            <Link
              to="/games"
              search={{}}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar aos jogos
            </Link>
          </div>
          <SectionTitle sub={selectedGame.subtitle}>
            {selectedGame.id === "terminar" ? (
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-7 w-7 text-gold" /> {selectedGame.title}
              </span>
            ) : (
              selectedGame.title
            )}
          </SectionTitle>
          {gameContent}
        </section>
      )}
    </Layout>
  );
}
