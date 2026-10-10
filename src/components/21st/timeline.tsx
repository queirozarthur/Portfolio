// 21st.dev — Timeline por Aceternity UI
// https://21st.dev/@manuarora700/components/timeline
// A linha se preenche conforme a rolagem. Adaptado: espaçamento mais curto e a cor de destaque do site.
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export type TimelineEntry = { title: string; content: React.ReactNode };

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.getBoundingClientRect().height));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 10%", "end 50%"] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="w-full">
      <div ref={ref} className="relative pb-8">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-16 first:md:pt-4">
            <div className="sticky top-28 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-[22rem]">
              <div className="absolute left-0 flex h-9 w-9 items-center justify-center rounded-full bg-bg md:left-0">
                <div className="h-3.5 w-3.5 rounded-full border border-line-strong bg-surface-2" />
              </div>
              <h3 className="hidden text-2xl font-semibold tracking-[-0.03em] text-subtle tabular-nums md:block md:pl-16 lg:text-3xl">
                {item.title}
              </h3>
            </div>
            <div className="relative w-full pr-0 pl-14 md:pl-4">
              <h3 className="mb-3 block font-mono text-sm text-subtle md:hidden">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          aria-hidden
          style={{ height: `${height}px` }}
          className="absolute top-0 left-[17px] w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,var(--line-strong)_10%,var(--line-strong)_90%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-accent from-0% via-accent/60 via-10% to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
