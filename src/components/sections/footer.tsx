import { ArrowUp } from "lucide-react";
import { TextHoverEffect } from "@/components/21st/text-hover-effect";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pb-28 sm:pb-10">
      <div className="container-page">
        <div className="-mx-2 h-[clamp(5rem,20vw,15rem)] sm:-mx-6">
          <TextHoverEffect text="QUEIROZ" />
        </div>
        <div className="flex flex-col gap-4 border-t border-line pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Arthur Queiroz · Recife, PE</p>
          <p className="font-mono text-xs">
            React, Tailwind, componentes do{" "}
            <a href="https://spell.sh" target="_blank" rel="noreferrer" className="text-muted underline-offset-4 hover:text-fg hover:underline">
              Spell UI
            </a>{" "}
            e do{" "}
            <a href="https://21st.dev" target="_blank" rel="noreferrer" className="text-muted underline-offset-4 hover:text-fg hover:underline">
              21st.dev
            </a>
          </p>
          <a href="#inicio" className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg">
            Voltar ao topo
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
