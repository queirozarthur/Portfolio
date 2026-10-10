// 21st.dev — Tubelight Navbar por Ayushmaan Singh (Serenity UI)
// https://21st.dev/@ayushmxxn/components/tubelight-navbar
// Adaptado: seção ativa vem do scroll (não só do clique), barra embaixo no celular respeitando
// a safe area do iPhone, e um botão extra para alternar o tema.
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavItem = { name: string; url: string; icon: LucideIcon };

type NavBarProps = {
  items: NavItem[];
  active: string;
  trailing?: React.ReactNode;
  className?: string;
};

export function NavBar({ items, active, trailing, className }: NavBarProps) {
  return (
    <nav
      aria-label="Navegação principal"
      className={cn(
        "fixed bottom-0 left-1/2 z-50 -translate-x-1/2 pb-[max(1rem,env(safe-area-inset-bottom))] sm:top-0 sm:bottom-auto sm:pt-5 sm:pb-0",
        className,
      )}
    >
      <div className="flex items-center gap-1 rounded-full border border-line bg-bg/70 p-1 shadow-[0_8px_30px_rgb(0_0_0/0.12)] backdrop-blur-xl sm:gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.url.slice(1);

          return (
            <a
              key={item.name}
              href={item.url}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex h-10 min-w-11 cursor-pointer items-center justify-center rounded-full px-3.5 text-sm font-medium transition-colors md:px-5",
                "text-muted hover:text-fg",
                isActive && "text-fg",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden" aria-hidden>
                <Icon size={18} strokeWidth={2.25} />
              </span>
              <span className="sr-only md:hidden">{item.name}</span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 -z-10 w-full rounded-full bg-fg/[0.06]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-accent sm:-top-[5px]">
                    <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-accent/25 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-accent/25 blur-md" />
                    <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-accent/25 blur-sm" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
        {trailing}
      </div>
    </nav>
  );
}
