// 21st.dev — Floating Dock por Aceternity UI
// https://21st.dev/@manuarora700/components/floating-dock
// Ícones que ampliam perto do cursor, estilo macOS. Adaptado: no toque vira uma fileira simples,
// já que não existe "perto do cursor" no celular.
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useFinePointer } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export type DockItem = { title: string; icon: React.ReactNode; href: string };

export function FloatingDock({ items, className }: { items: DockItem[]; className?: string }) {
  const fine = useFinePointer();
  const mouseX = useMotionValue(Infinity);

  if (!fine) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {items.map((item) => (
          <a
            key={item.title}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={item.title}
            className="flex size-12 items-center justify-center rounded-full border border-line bg-surface-2 text-fg transition-transform active:scale-95"
          >
            <span className="size-5">{item.icon}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn("flex h-16 items-end gap-3 rounded-2xl border border-line bg-surface px-3 pb-2.5", className)}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </div>
  );
}

function IconContainer({ mouseX, title, icon, href }: DockItem & { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - window.scrollX - bounds.width / 2;
  });

  const spring = { mass: 0.1, stiffness: 150, damping: 12 };
  const size = useSpring(useTransform(distance, [-150, 0, 150], [40, 72, 40]), spring);
  const iconSize = useSpring(useTransform(distance, [-150, 0, 150], [20, 36, 20]), spring);

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={title}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-surface-2 text-fg"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 w-fit rounded-md border border-line bg-surface px-2 py-0.5 text-xs whitespace-pre text-fg"
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
        {icon}
      </motion.span>
    </motion.a>
  );
}
