// 21st.dev — Bento Grid por Magic UI
// https://21st.dev/@dillionverma/components/bento-grid
// Adaptado: grade de 6 colunas (cada card escolhe quanto ocupa) e entrada suave ao rolar.
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid w-full grid-cols-1 gap-3 md:grid-cols-6 md:gap-4", className)}>{children}</div>;
}

type BentoCardProps = {
  children: React.ReactNode;
  className?: string;
  index?: number;
};

export function BentoCard({ children, className, index = 0 }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface",
        "shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
