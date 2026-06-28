import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart, Lock, Sparkles } from "lucide-react";
import { CounterFireworks } from "@/components/CounterFireworks";
import { Layout } from "@/components/Layout";
import chapter01Image from "../public/1 - Pedido de Namoro.jpeg";
import chapter02Image from "../public/2 - Ela Aceitou.jpeg";
import chapter03Image from "../public/3 - Primeiro rolé de Motoca (fake) kkkkk.jpeg";
import chapter04Image from "../public/4 - Ganhei uma parceira fitness pra vida.jpeg";
import chapter05Image from "../public/5 - Primeira viagem juntos.jpeg";
import chapter06Image from "../public/6 - Primeira vez vendo a neve e logo ao seu lado.jpeg";
import chapter07Image from "../public/7 - Estilo pra poucos de volta aos anos 80.jpeg";
import chapter08Image from "../public/8 - Primeiro São João e Logo na Barraca do Beijo.jpeg";
import chapter09Image from "../public/9 - 1 ano juntos e enquanto você registra tudo, eu so consigo admirar voce.jpeg";
import chapter10Image from "../public/10 - primeira vez cavalgando ao seu lado rumo ao nosso futuro.jpeg";
import chapter11Image from "../public/11 - Primeira vez no estadio (BRA X USA).jpeg";

export const Route = createFileRoute("/")({
  component: HistoriaPage,
});

// ✏️ EDITE AQUI: momentos da nossa história
const moments = [
  {
    title: "Pedido de namoro",
    date: "O começo oficial",
    text: "O capítulo em que a nossa história ganhou nome, data e aquele frio bom na barriga.",
    image: chapter01Image,
  },
  {
    title: "Ela aceitou",
    date: "O sim mais lindo",
    text: "A resposta que mudou tudo e deixou o mundo inteiro com cara de começo feliz.",
    image: chapter02Image,
  },
  {
    title: "Primeiro rolé de motoca",
    date: "Fake, mas inesquecível",
    text: "Uma memória leve, boba do jeito certo, dessas que viram piada interna e carinho.",
    image: chapter03Image,
  },
  {
    title: "Parceira fitness pra vida",
    date: "Força, cuidado e companhia",
    text: "Descobrir que até treino fica melhor quando é ao lado de quem a gente ama.",
    image: chapter04Image,
  },
  {
    title: "Primeira viagem juntos",
    date: "Só nós dois",
    text: "Lugares novos, risadas no caminho e a certeza de que viajar com você é chegar em casa.",
    image: chapter05Image,
  },
  {
    title: "Primeira vez vendo a neve",
    date: "E logo ao seu lado",
    text: "Um cenário de filme para guardar uma lembrança que ficou quentinha no coração.",
    image: chapter06Image,
  },
  {
    title: "De volta aos anos 80",
    date: "Estilo pra poucos",
    text: "A prova de que a gente combina até quando entra na brincadeira e vira personagem junto.",
    image: chapter07Image,
  },
  {
    title: "Primeiro São João",
    date: "Na barraca do beijo",
    text: "Festa, sorriso, clima bom e um beijo que parecia ter sido colocado ali só pra nós.",
    image: chapter08Image,
  },
  {
    title: "1 ano juntos",
    date: "Enquanto você registra tudo",
    text: "Você tentando guardar o momento, e eu só conseguindo admirar você.",
    image: chapter09Image,
  },
  {
    title: "Cavalgando ao seu lado",
    date: "Rumo ao nosso futuro",
    text: "Mais uma aventura para lembrar que o caminho fica mais bonito quando é nosso.",
    image: chapter10Image,
  },
  {
    title: "Primeira vez no estádio",
    date: "BRA x USA",
    text: "Torcida, energia, novidade e mais uma primeira vez para colocar na nossa coleção.",
    image: chapter11Image,
  },
];

const futureMoments = [
  "Próximo capítulo...",
  "Continua...",
  "Ainda temos muitas memórias para viver",
  "Em breve, mais uma lembrança nossa",
];

const START_DATE = new Date("2024-07-06T00:00:00");

function useTimeTogether() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  let years = now.getFullYear() - START_DATE.getFullYear();
  let months = now.getMonth() - START_DATE.getMonth();
  let days = now.getDate() - START_DATE.getDate();
  let hours = now.getHours() - START_DATE.getHours();
  let minutes = now.getMinutes() - START_DATE.getMinutes();
  let seconds = now.getSeconds() - START_DATE.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prev = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prev.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return { years, months, days, hours, minutes, seconds };
}

function Counter() {
  const t = useTimeTogether();
  const showFireworks = t.years >= 2;
  const items = [
    { label: "anos", value: t.years },
    { label: "meses", value: t.months },
    { label: "dias", value: t.days },
    { label: "horas", value: t.hours },
    { label: "min", value: t.minutes },
    { label: "seg", value: t.seconds },
  ];
  return (
    <div className="relative py-6 px-2">
      {showFireworks && <CounterFireworks />}
      <div className="relative z-10 grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-4">
        {items.map((it) => (
          <div key={it.label} className="glass-card rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-2xl sm:text-4xl font-bold text-gradient font-display tabular-nums">
              {String(it.value).padStart(2, "0")}
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ moment, index }: { moment: (typeof moments)[0]; index: number }) {
  const isLeft = index % 2 === 0;
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-6 ${isLeft ? "" : "md:flex-row-reverse"}`}
    >
      <div className="md:w-1/2 w-full">
        <div className="glass-card rounded-3xl overflow-hidden group hover:scale-[1.02] transition-all duration-500">
          <div className="aspect-square bg-gradient-to-br from-rose/30 via-primary/20 to-gold/20 relative overflow-hidden">
            <img
              src={moment.image}
              alt={moment.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/70 to-transparent" />
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full text-center md:text-left">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider ${isLeft ? "" : "md:flex-row-reverse"}`}
        >
          <Heart className="h-3 w-3" fill="currentColor" /> Capítulo {index + 1}
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mt-3 text-gradient">
          {moment.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 italic">{moment.date}</p>
        <p className="mt-3 text-foreground/80 leading-relaxed">{moment.text}</p>
      </div>
    </div>
  );
}

function HistoriaPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-up">
          <Sparkles className="h-4 w-4" /> Feliz 2 anos de namoro, meu bem
        </div>
        <h1 className="font-display text-5xl sm:text-7xl font-bold mt-6 animate-fade-up text-gradient">
          Nossa História
        </h1>
        <p
          className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Cada momento, cada risada, cada abraço — tudo que vivemos até aqui, em um lugar só.
        </p>

        <div className="mt-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Estamos juntos há
          </p>
          <Counter />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-rose/40 to-gold/40 hidden md:block" />
          <div className="space-y-16">
            {moments.map((m, i) => (
              <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <TimelineItem moment={m} index={i} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-center font-display text-3xl sm:text-4xl font-bold text-gradient mb-8">
            O que ainda vamos viver
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {futureMoments.map((text, i) => (
              <div
                key={i}
                className="glass-card rounded-2xl p-6 flex items-center gap-4 opacity-70 hover:opacity-100 transition-all hover:scale-[1.02]"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <p className="font-display text-lg italic text-foreground/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
