import type { Cover } from "@/data/content";
import { asset, cn } from "@/lib/utils";

/** Capa de projeto: print real dentro de uma janela de navegador, imagem cheia ou capa tipográfica. */
export function ProjectCover({ cover, title, className }: { cover: Cover; title: string; className?: string }) {
  return (
    <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-surface-2", className)}>
      {cover.kind === "browser" && <BrowserCover cover={cover} title={title} />}
      {cover.kind === "image" && (
        <img
          src={asset(cover.src)}
          alt={`Tela do ${title}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
          style={{ objectPosition: cover.position ?? "center" }}
        />
      )}
      {cover.kind === "brand" && <BrandCover src={cover.src} tint={cover.tint} title={title} />}
      {cover.kind === "newspaper" && <NewspaperCover />}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-fg/[0.06] ring-inset" />
    </div>
  );
}

function BrowserCover({ cover, title }: { cover: Extract<Cover, { kind: "browser" }>; title: string }) {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,var(--surface-2),var(--bg))] p-4 pb-0 sm:p-6 sm:pb-0">
      <div className="relative h-full overflow-hidden rounded-t-xl border border-b-0 border-line-strong bg-surface shadow-[0_-10px_40px_rgb(0_0_0/0.25)] transition-transform duration-700 ease-out group-hover/card:-translate-y-1">
        <div className="flex h-7 items-center gap-1.5 border-b border-line px-3">
          <span className="size-2 rounded-full bg-fg/15" />
          <span className="size-2 rounded-full bg-fg/15" />
          <span className="size-2 rounded-full bg-fg/15" />
          <span className="ml-3 truncate rounded-md bg-fg/[0.05] px-2 py-0.5 font-mono text-[10px] text-subtle">{cover.url}</span>
        </div>
        <img
          src={asset(cover.src)}
          alt={`Página inicial do ${title}`}
          loading="lazy"
          decoding="async"
          className="w-full object-cover object-top"
        />
      </div>
    </div>
  );
}

function BrandCover({ src, tint, title }: { src: string; tint: string; title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#06090a]">
      <div
        className="absolute -inset-1/4 opacity-60 blur-3xl transition-opacity duration-700 group-hover/card:opacity-90"
        style={{ background: `radial-gradient(40% 35% at 50% 60%, ${tint}55, transparent 70%)` }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden>
        <defs>
          <pattern id="sense-dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sense-dots)" />
      </svg>
      <div className="relative flex w-[62%] flex-col items-center gap-5">
        <img src={asset(src)} alt={`Logo do ${title}`} loading="lazy" className="w-full" />
        <div className="flex w-full items-end gap-1.5" aria-hidden>
          {[38, 52, 46, 64, 58, 72, 49, 81, 76, 88, 70, 92].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm transition-[height] duration-700 ease-out"
              style={{ height: `${h * 0.42}px`, background: i === 6 ? "#ff6b6b" : tint, opacity: 0.35 + i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NewspaperCover() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#f3efe6] p-5 text-[#141414] sm:p-7" aria-label="Capa ilustrativa de um portal de notícias" role="img">
      <div className="flex items-center justify-between border-b-2 border-[#141414] pb-2 font-mono text-[9px] tracking-widest uppercase sm:text-[10px]">
        <span>Recife · Edição digital</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-[pulse-ring_1.6s_ease-out_infinite] rounded-full bg-[#d7263d]" />
            <span className="relative size-2 rounded-full bg-[#d7263d]" />
          </span>
          Ao vivo
        </span>
      </div>
      <p className="mt-3 font-serif text-[clamp(1.6rem,4.4vw,2.6rem)] leading-none font-black tracking-tight italic">
        Jornal do Commercio
      </p>
      <div className="mt-3 inline-flex w-fit items-center gap-2 bg-[#d7263d] px-2 py-1 font-mono text-[9px] font-semibold tracking-widest text-white uppercase sm:text-[10px]">
        Breaking news
      </div>
      <div className="mt-3 grid flex-1 grid-cols-3 gap-3 border-t border-[#141414]/20 pt-3">
        <div className="col-span-2 flex flex-col gap-1.5">
          <span className="h-2.5 w-11/12 rounded-sm bg-[#141414]/80" />
          <span className="h-2.5 w-3/4 rounded-sm bg-[#141414]/80" />
          <span className="mt-1 h-1.5 w-full rounded-sm bg-[#141414]/20" />
          <span className="h-1.5 w-full rounded-sm bg-[#141414]/20" />
          <span className="h-1.5 w-5/6 rounded-sm bg-[#141414]/20" />
        </div>
        <div className="flex flex-col gap-1.5 border-l border-[#141414]/20 pl-3">
          <span className="aspect-[4/3] w-full rounded-sm bg-[#141414]/10" />
          <span className="h-1.5 w-full rounded-sm bg-[#141414]/20" />
          <span className="h-1.5 w-2/3 rounded-sm bg-[#141414]/20" />
        </div>
      </div>
    </div>
  );
}
