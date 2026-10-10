// 21st.dev — Project Index por Savva Sicevs
// https://21st.dev/@ssychui/components/project-index
// Lista de projetos com título, o que é, ano e uma seta que avança no hover; as outras linhas
// esmaecem. Adaptado: sem capa flutuante (esses projetos menores não têm imagem) e com etiquetas.
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectIndexItem = {
  title: string;
  detail: string;
  year: string;
  href?: string;
  tag?: string;
};

export function ProjectIndex({ items }: { items: ProjectIndexItem[] }) {
  return (
    <ul className="group/list border-t border-line">
      {items.map((item, i) => {
        const Row = item.href ? "a" : "div";
        return (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-line transition-opacity duration-300 group-hover/list:opacity-45 hover:!opacity-100 has-[:focus-visible]:!opacity-100"
          >
            <Row
              {...(item.href ? { href: item.href, target: "_blank", rel: "noreferrer" } : {})}
              className={cn(
                "group/row grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-4 md:grid-cols-[minmax(0,21rem)_1fr_auto_auto] md:py-5",
                item.href ? "cursor-pointer" : "cursor-default",
              )}
            >
              <span className="flex items-center gap-2 font-medium tracking-tight text-fg">
                {item.title}
                {item.tag && (
                  <span className="rounded-full border border-line-strong px-2 py-px font-mono text-[10px] tracking-wide whitespace-nowrap text-muted uppercase">
                    {item.tag}
                  </span>
                )}
              </span>
              <span className="order-3 col-span-2 text-sm text-muted md:order-none md:col-span-1">{item.detail}</span>
              <span className="font-mono text-xs text-subtle tabular-nums">{item.year}</span>
              <span
                aria-hidden
                className={cn(
                  "hidden size-5 items-center justify-center text-subtle transition-transform duration-300 ease-out md:flex",
                  item.href && "group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:text-fg",
                  !item.href && "opacity-0",
                )}
              >
                <ArrowUpRight size={16} />
              </span>
            </Row>
          </motion.li>
        );
      })}
    </ul>
  );
}
