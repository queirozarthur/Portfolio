import { Marquee } from "@/components/spell/marquee";
import { BrandIcon, type BrandName } from "@/components/ui/brand-icon";
import { stack } from "@/data/content";

export function StackBand() {
  return (
    <section aria-label="Tecnologias que uso" className="border-y border-line bg-surface/40 py-5">
      <div className="container-page flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
        <p className="shrink-0 font-mono text-xs tracking-wider text-subtle uppercase">Ferramentas do dia a dia</p>
        <Marquee duration={38} pauseOnHover fadeAmount={8}>
          {stack.map((name) => (
            <span key={name} className="mr-7 flex items-center gap-2 text-sm whitespace-nowrap text-muted transition-colors hover:text-fg">
              <BrandIcon name={name as BrandName} className="size-4 opacity-80" />
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
