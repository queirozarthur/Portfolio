import { BlurReveal } from "@/components/spell/blur-reveal";
import { SpecialText } from "@/components/spell/special-text";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  lead?: string;
  className?: string;
};

export function SectionHeading({ index, label, title, lead, className }: SectionHeadingProps) {
  return (
    <header className={cn("mb-10 flex flex-col gap-4 md:mb-14", className)}>
      <p className="flex items-center gap-3 text-xs text-subtle">
        <span className="font-mono tabular-nums">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden />
        <span className="sr-only">{label}</span>
        <span aria-hidden className="tracking-wider uppercase">
          <SpecialText inView speed={18}>
            {label}
          </SpecialText>
        </span>
      </p>
      <BlurReveal
        as="h2"
        inView
        speedReveal={2.4}
        className="max-w-3xl text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-fg"
      >
        {title}
      </BlurReveal>
      {lead && <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">{lead}</p>}
    </header>
  );
}
