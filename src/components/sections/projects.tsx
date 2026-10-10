import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/spell/tilt-card";
import { ProjectIndex } from "@/components/21st/project-index";
import { ProjectCover } from "@/components/ui/project-cover";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProjects, moreProjects, type Project } from "@/data/content";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projetos" className="container-page py-20 md:py-28">
      <SectionHeading
        index="02"
        label="Projetos"
        title="Projetos selecionados"
        lead="Sites para clientes, sistemas feitos em grupo na CESAR School e dois jogos escritos em C."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {featuredProjects.map((project, i) => {
          const isLast = i === featuredProjects.length - 1;
          // O primeiro e o último ocupam a linha inteira; com 6 projetos o grid fecha sem buraco.
          return <ProjectCard key={project.slug} project={project} index={i} featured={i === 0 || isLast} reverse={isLast} />;
        })}
      </div>

      <div className="mt-24 md:mt-32">
        <div className="mb-6 flex items-end justify-between gap-6">
          <h3 className="text-2xl font-semibold tracking-tight text-fg md:text-3xl">Mais coisas que fiz</h3>
          <a
            href="https://github.com/queirozarthur?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 font-mono text-xs text-subtle transition-colors hover:text-fg"
          >
            todos os repositórios ↗
          </a>
        </div>
        <ProjectIndex items={moreProjects} />
      </div>
    </section>
  );
}

type ProjectCardProps = { project: Project; index: number; featured?: boolean; reverse?: boolean };

function ProjectCard({ project, index, featured = false, reverse = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: featured ? 0 : ((index + 1) % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(featured && "md:col-span-2")}
    >
      <TiltCard tiltLimit={featured ? 2.5 : 4} scale={1.01} effect="gravitate" className="h-full rounded-3xl">
        <article
          className={cn(
            "group/card flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface",
            featured && "md:grid md:grid-cols-[1.35fr_1fr]",
            featured && reverse && "md:grid-cols-[1fr_1.35fr]",
          )}
        >
          <ProjectCover cover={project.cover} title={project.title} className={cn(featured && "md:aspect-auto md:h-full md:min-h-[26rem]", reverse && "md:order-last")} />

          <div className={cn("flex flex-1 flex-col p-6 md:p-7", featured && "md:p-9")}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-wide text-subtle uppercase">
              <span>{project.kicker}</span>
              {project.year && (
                <>
                  <span aria-hidden>·</span>
                  <span className="tabular-nums">{project.year}</span>
                </>
              )}
              {project.badge && (
                <span className="ml-auto flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-0.5 text-accent-ink">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {project.badge}
                </span>
              )}
            </div>

            <h3 className={cn("mt-4 text-2xl font-semibold tracking-tight text-fg", featured && "md:text-4xl")}>{project.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

            <ul className="mt-5 space-y-2 text-sm text-muted">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-[0.6em] h-px w-3 shrink-0 bg-accent-ink" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-7">
              <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologias">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                    {s}
                  </li>
                ))}
              </ul>
              {project.links.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-1 text-sm font-medium text-fg"
                    >
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover/link:bg-[length:100%_1px]">
                        {link.label}
                      </span>
                      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      <span className="sr-only">: {project.title}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-6 border-t border-line pt-5 font-mono text-xs text-subtle">Sem link público</p>
              )}
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}
