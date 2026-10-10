import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { LightRays } from "@/components/spell/light-rays";
import { BlurReveal } from "@/components/spell/blur-reveal";
import { FlowButton } from "@/components/spell/flow-button";
import { FlipWords } from "@/components/21st/flip-words";
import { GridPattern } from "@/components/21st/grid-pattern";
import { profile } from "@/data/content";
import { asset } from "@/lib/utils";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const recifeTime = () =>
  new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Recife" }).format(new Date());

function LocalClock() {
  const [time, setTime] = useState(recifeTime);
  useEffect(() => {
    const id = window.setInterval(() => setTime(recifeTime()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time}</span>;
}

export function Hero({ dark }: { dark: boolean }) {
  return (
    <section id="inicio" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden>
        <LightRays
          className="opacity-45 dark:opacity-80"
          color1={dark ? "#f4ffd9" : "#9fd11a"}
          color2={dark ? "#ffffff" : "#c6f432"}
          intensity={dark ? 10 : 6}
          rays={30}
          reach={14}
          position={62}
        />
        <GridPattern
          width={56}
          height={56}
          squares={[[4, 2], [9, 1], [13, 4], [7, 5], [16, 2]]}
          className="[mask-image:radial-gradient(70%_60%_at_60%_0%,black,transparent)]"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="container-page flex min-h-[100svh] flex-col pt-6 pb-28 sm:pb-16">
        <div className="flex h-12 items-center justify-between font-mono text-xs">
          <a href="#inicio" className="flex items-center gap-2 text-fg" aria-label="Arthur Queiroz, voltar ao início">
            <span className="flex size-7 items-center justify-center rounded-full bg-fg text-[10px] font-bold text-bg">AQ</span>
            <span className="hidden sm:inline">arthur queiroz</span>
          </a>
          <span className="flex items-center gap-2 rounded-full border border-line bg-bg/50 px-3 py-1.5 text-fg/85 backdrop-blur">
            Recife <span className="text-subtle">·</span> <LocalClock />
          </span>
        </div>

        <div className="flex flex-1 flex-col justify-center pt-16 sm:pt-20">
          <BlurReveal
            as="h1"
            delay={0.15}
            speedReveal={1.2}
            speedSegment={0.45}
            className="text-[clamp(3.4rem,13vw,9.5rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-fg"
          >
            {profile.name}
          </BlurReveal>

          <motion.div {...fadeUp(0.55)} className="mt-7 max-w-2xl text-[clamp(1.125rem,2.4vw,1.5rem)] leading-snug tracking-tight text-muted">
            <p>Estudante de Ciência da Computação na CESAR School e dev freelancer.</p>
            <p className="relative mt-1 min-h-[2.8em] sm:min-h-[1.4em]" aria-hidden>
              Hoje eu faço <FlipWords words={profile.roles} className="text-fg" />
            </p>
            <p className="sr-only">Hoje eu faço {profile.roles.join(", ")}.</p>
          </motion.div>

          <motion.div {...fadeUp(0.7)} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projetos"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-on-accent transition-[scale,box-shadow] hover:shadow-[0_0_0_6px_rgb(198_244_50/0.18)] active:scale-[0.97]"
            >
              Ver projetos
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <FlowButton size="lg" href={asset(profile.cv)} download>
              <Download size={16} />
              Baixar currículo
            </FlowButton>
          </motion.div>
        </div>

        <motion.ul
          {...fadeUp(0.9)}
          className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-xs text-subtle"
        >
          {profile.facts.map((fact) => (
            <li key={fact} className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-fg/30" aria-hidden />
              {fact}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
