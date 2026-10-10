// Spell UI — https://spell.sh/docs/highlighted-text (MIT, xxtomm/spell-ui)
// Adaptado: a barra usa a cor de destaque do portfólio em vez de preto/branco com mix-blend.
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type From = "left" | "right" | "top" | "bottom";

interface HighlightedTextProps {
  children: React.ReactNode;
  className?: string;
  from?: From;
  delay?: number;
  inView?: boolean;
  once?: boolean;
}

const fromVariants = {
  left: { hidden: { x: "-100%" }, visible: { x: "0%" } },
  right: { hidden: { x: "100%" }, visible: { x: "0%" } },
  top: { hidden: { y: "-100%" }, visible: { y: "0%" } },
  bottom: { hidden: { y: "100%" }, visible: { y: "0%" } },
};

export function HighlightedText({
  children,
  className,
  from = "bottom",
  delay = 0,
  inView = false,
  once = true,
}: HighlightedTextProps) {
  return (
    <motion.span
      className={cn("relative inline-flex overflow-hidden align-baseline", className)}
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once, margin: "-80px" }}
    >
      <motion.span
        className="absolute inset-0 -right-[0.18em] -left-[0.15em] z-0 bg-accent"
        variants={fromVariants[from]}
        transition={{ type: "spring", damping: 30, stiffness: 300, delay }}
      />
      <span className="relative z-10 pr-[0.18em] pl-[0.15em] text-on-accent">{children}</span>
    </motion.span>
  );
}
