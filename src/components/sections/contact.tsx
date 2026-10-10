import { useState, type FormEvent } from "react";
import { ArrowUpRight, FileText, Send } from "lucide-react";
import { CopyButton } from "@/components/spell/copy-button";
import { FloatingDock } from "@/components/21st/dock";
import { BrandIcon } from "@/components/ui/brand-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/content";
import { asset } from "@/lib/utils";

const dockItems = [
  { title: "GitHub", href: profile.links.github, icon: <BrandIcon name="github" className="h-full w-full" /> },
  { title: "LinkedIn", href: profile.links.linkedin, icon: <BrandIcon name="linkedin" className="h-full w-full" /> },
  { title: "Instagram", href: profile.links.instagram, icon: <BrandIcon name="instagram" className="h-full w-full" /> },
  { title: "WhatsApp", href: `https://wa.me/${profile.whatsapp}`, icon: <BrandIcon name="whatsapp" className="h-full w-full" /> },
  { title: "Currículo", href: asset(profile.cv), icon: <FileText className="h-full w-full" strokeWidth={1.75} /> },
];

const inputClass =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-[16px] text-fg placeholder:text-subtle transition-[border-color,box-shadow] outline-none focus:border-line-strong focus:shadow-[0_0_0_4px_rgb(198_244_50/0.15)]";

export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // O formulário só monta a mensagem e abre o WhatsApp; nada é enviado para servidor nenhum.
  const sendWhatsApp = (event: FormEvent) => {
    event.preventDefault();
    const text = `Olá, Arthur! Me chamo ${name.trim()}. ${message.trim()}`;
    window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  return (
    <section id="contato" className="container-page py-20 md:py-28">
      <SectionHeading
        index="04"
        label="Contato"
        title="Vamos conversar?"
        lead="Estou procurando estágio em desenvolvimento de software e topo freelas de site. O caminho mais rápido é e-mail ou WhatsApp."
      />

      <div className="grid gap-4 md:grid-cols-[1.1fr_1fr] md:gap-5">
        <div className="flex flex-col justify-between gap-10 rounded-3xl border border-line bg-surface p-6 md:p-8">
          <div>
            <p className="font-mono text-xs tracking-wider text-subtle uppercase">E-mail</p>
            <div className="mt-3 flex items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="min-w-0 truncate text-[clamp(1.05rem,3.4vw,1.6rem)] font-medium tracking-tight text-fg underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-accent-ink"
              >
                {profile.email}
              </a>
              <CopyButton value={profile.email} className="shrink-0 rounded-full hover:bg-fg/[0.06]" />
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs tracking-wider text-subtle uppercase">Em outros lugares</p>
            <FloatingDock items={dockItems} className="w-fit" />
          </div>

          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            Ver experiência completa no LinkedIn
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <form onSubmit={sendWhatsApp} className="flex flex-col gap-3 rounded-3xl border border-line bg-surface p-6 md:p-8">
          <p className="mb-1 font-mono text-xs tracking-wider text-subtle uppercase">Mandar mensagem no WhatsApp</p>
          <label className="sr-only" htmlFor="contato-nome">
            Seu nome
          </label>
          <input
            id="contato-nome"
            required
            autoComplete="name"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <label className="sr-only" htmlFor="contato-mensagem">
            Sua mensagem
          </label>
          <textarea
            id="contato-mensagem"
            required
            rows={5}
            placeholder="Conta rapidinho o que você precisa"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            className="group mt-1 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-fg px-6 text-[15px] font-semibold text-bg transition-[scale,opacity] hover:opacity-90 active:scale-[0.98]"
          >
            Abrir no WhatsApp
            <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </form>
      </div>
    </section>
  );
}
