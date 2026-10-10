import { useMemo } from "react";
import { GraduationCap, FlaskConical, Hammer } from "lucide-react";
import type { Arc, Marker } from "cobe";
import { BentoCard, BentoGrid } from "@/components/21st/bento-grid";
import { CobeGlobe } from "@/components/21st/cobe-globe";
import { GitHubGraph } from "@/components/21st/github-graph";
import { HighlightedText } from "@/components/spell/highlighted-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/content";
import { asset } from "@/lib/utils";

const RECIFE: [number, number] = [-8.0476, -34.877];
const MACEIO: [number, number] = [-9.6658, -35.735];
const KELOWNA: [number, number] = [49.888, -119.496];

export function About({ dark }: { dark: boolean }) {
  const markers = useMemo<Marker[]>(
    () => [
      { location: RECIFE, size: 0.07, id: "recife" },
      { location: MACEIO, size: 0.04, id: "maceio" },
      { location: KELOWNA, size: 0.06, id: "kelowna" },
    ],
    [],
  );
  const arcs = useMemo<Arc[]>(() => [{ from: RECIFE, to: KELOWNA, id: "recife-kelowna" }], []);
  const focus = useMemo<[number, number]>(() => [18, -72], []);

  return (
    <section id="sobre" className="container-page py-20 md:py-28">
      <SectionHeading index="01" label="Sobre" title="Aprendo construindo coisas que alguém vai usar." />

      <BentoGrid>
        <BentoCard index={0} className="md:col-span-4 md:row-span-2 md:flex-row">
          <div className="flex flex-1 flex-col justify-between gap-8 p-6 md:p-8">
            <div className="space-y-4 text-[15px] leading-relaxed text-muted md:text-base">
              <p className="text-fg">
                Curso Ciência da Computação na CESAR School, com formatura prevista para 2028, e faço sites como freelancer.
              </p>
              <p>
                No back-end uso Python com Django ou FastAPI. No front, React com TypeScript, ou HTML, CSS e JavaScript puro
                quando o projeto pede algo mais simples.
              </p>
              <p>
                Boa parte do que está aqui começou com{" "}
                <HighlightedText inView delay={0.2}>
                  o problema de alguém
                </HighlightedText>
                : uma rádio que precisava de site novo, um delivery de sushi que recebe pedidos pelo WhatsApp, eu querendo
                entender para onde vai o meu dinheiro.
              </p>
            </div>
            <p className="font-mono text-xs text-subtle">Também sou monitor de Infraestrutura de Software na faculdade.</p>
          </div>
          <div className="relative min-h-72 overflow-hidden md:w-[42%] md:min-h-0">
            <img
              src={asset("me/apresentando.webp")}
              alt="Arthur apresentando um projeto em sala de aula"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_30%] grayscale-[35%] transition-[filter,scale] duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent md:bg-gradient-to-r md:from-surface md:via-surface/10" />
          </div>
        </BentoCard>

        <BentoCard index={1} className="md:col-span-2 md:row-span-2">
          <div className="p-6 pb-0 md:p-7 md:pb-0">
            <p className="font-mono text-xs tracking-wider text-subtle uppercase">Maceió → Recife → Kelowna</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg">Nasci em Maceió, moro em Recife.</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Em 2021 morei quase um ano em Kelowna, no Canadá. Voltei com inglês fluente.
            </p>
          </div>
          <div className="relative mt-auto -mb-[18%] px-2">
            <CobeGlobe
              markers={markers}
              arcs={arcs}
              focus={focus}
              dark={dark}
              labels={[
                { id: "recife", text: "Recife" },
                { id: "kelowna", text: "Kelowna" },
              ]}
            />
          </div>
        </BentoCard>

        <BentoCard index={2} className="p-6 md:col-span-2 md:p-7">
          <GraduationCap className="size-5 text-accent-ink" strokeWidth={1.75} />
          <p className="mt-6 font-mono text-3xl font-medium tracking-tight text-fg">CS50x</p>
          <p className="mt-1 text-sm text-muted">Harvard University · 2026</p>
          <p className="mt-4 text-sm leading-relaxed text-subtle">C, Python, SQL e web. Projeto final em Python.</p>
        </BentoCard>

        <BentoCard index={3} className="p-6 md:col-span-2 md:p-7">
          <FlaskConical className="size-5 text-accent-ink" strokeWidth={1.75} />
          <p className="mt-6 text-lg leading-snug font-semibold tracking-tight text-fg">Monitor de Infraestrutura de Software</p>
          <p className="mt-1 text-sm text-muted">CESAR School · 2026 — hoje</p>
          <p className="mt-4 text-sm leading-relaxed text-subtle">Correção com bateria de testes e avaliação de relatórios técnicos.</p>
        </BentoCard>

        <BentoCard index={4} className="p-6 md:col-span-2 md:p-7">
          <div className="flex items-center justify-between">
            <Hammer className="size-5 text-accent-ink" strokeWidth={1.75} />
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-subtle uppercase">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-[pulse-ring_2s_ease-out_infinite] rounded-full bg-accent" />
                <span className="relative size-1.5 rounded-full bg-accent" />
              </span>
              Agora
            </span>
          </div>
          <p className="mt-6 text-lg leading-snug font-semibold tracking-tight text-fg">Um app de finanças pessoais</p>
          <p className="mt-4 text-sm leading-relaxed text-subtle">
            Django REST com JWT no back, React no front. Saldo calculado, nunca armazenado.
          </p>
        </BentoCard>

        <BentoCard index={5} className="p-6 md:col-span-6 md:p-7">
          <GitHubGraph username={profile.github} />
        </BentoCard>
      </BentoGrid>
    </section>
  );
}
