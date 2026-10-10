// 21st.dev — GitHub Graph por unlumen (Unlumen UI)
// https://21st.dev/@unlumen/components/github-graph
// Busca as contribuições públicas e desenha a grade animada.
// Adaptado: no desktop a grade estica até a largura do card; no celular rola na horizontal
// já mostrando as semanas mais recentes.
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Response = { total: Record<string, number>; contributions: Day[] };

const LEVEL_CLASS = [
  "bg-fg/[0.06]",
  "bg-accent-ink/30",
  "bg-accent-ink/55",
  "bg-accent-ink/80",
  "bg-accent-ink",
] as const;

const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

const toWeeks = (days: Day[]) => {
  const weeks: (Day | null)[][] = [];
  if (days.length === 0) return weeks;
  const firstWeekday = new Date(days[0].date + "T12:00:00").getDay();
  let week: (Day | null)[] = Array.from({ length: firstWeekday }, () => null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
};

const formatDate = (iso: string) => {
  const d = new Date(iso + "T12:00:00");
  return `${d.getDate()} de ${MONTHS[d.getMonth()]}`;
};

export function GitHubGraph({ username, className }: { username: string; className?: string }) {
  const [data, setData] = useState<Response | null>(null);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json: Response) => setData(json))
      .catch((err) => {
        if (err?.name !== "AbortError") setFailed(true);
      });
    return () => controller.abort();
  }, [username]);

  const weeks = useMemo(() => toWeeks(data?.contributions ?? []), [data]);
  const total = data ? Object.values(data.total)[0] ?? data.contributions.reduce((s, d) => s + d.count, 0) : null;

  useEffect(() => {
    const el = scrollRef.current;
    if (el && weeks.length) el.scrollLeft = el.scrollWidth;
  }, [weeks.length]);

  return (
    <div ref={ref} className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-sm text-muted">
          {failed ? (
            "Não deu para carregar o gráfico agora."
          ) : total === null ? (
            "Carregando contribuições…"
          ) : (
            <>
              <span className="font-mono text-fg tabular-nums">{total}</span> contribuições no último ano
            </>
          )}
        </p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 font-mono text-xs text-subtle transition-colors hover:text-fg"
        >
          @{username} ↗
        </a>
      </div>

      <div
        ref={scrollRef}
        className="-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max gap-[3px] md:w-full">
          {(weeks.length ? weeks : Array.from({ length: 53 }, () => Array<null>(7).fill(null))).map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px] md:flex-1">
              {week.map((day, di) => (
                <motion.div
                  key={di}
                  title={day ? `${day.count} contribuições em ${formatDate(day.date)}` : undefined}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={inView && weeks.length ? { opacity: 1, scale: 1 } : { opacity: weeks.length ? 0 : 0.5, scale: 1 }}
                  transition={{ duration: 0.3, delay: wi * 0.012 + di * 0.02 }}
                  className={cn(
                    "size-[11px] rounded-[3px] md:aspect-square md:size-auto md:w-full",
                    day ? LEVEL_CLASS[day.level] : weeks.length ? "bg-transparent" : "animate-pulse bg-fg/[0.05]",
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 font-mono text-[10px] text-subtle" aria-hidden>
        menos
        {LEVEL_CLASS.map((c) => (
          <span key={c} className={cn("size-[10px] rounded-[3px]", c)} />
        ))}
        mais
      </div>
    </div>
  );
}
