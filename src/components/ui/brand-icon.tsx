import {
  siC,
  siDjango,
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siGithubactions,
  siInstagram,
  siJavascript,
  siLinux,
  siNetlify,
  siPostgresql,
  siPython,
  siRaylib,
  siReact,
  siTailwindcss,
  siTypescript,
  siWhatsapp,
} from "simple-icons";
import { Cloud } from "lucide-react";

// O simple-icons tirou o LinkedIn a pedido da marca; este é o glifo oficial do "in".
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

const paths = {
  github: siGithub.path,
  linkedin: LINKEDIN_PATH,
  instagram: siInstagram.path,
  whatsapp: siWhatsapp.path,
  Python: siPython.path,
  Django: siDjango.path,
  FastAPI: siFastapi.path,
  React: siReact.path,
  TypeScript: siTypescript.path,
  JavaScript: siJavascript.path,
  "Tailwind CSS": siTailwindcss.path,
  PostgreSQL: siPostgresql.path,
  Docker: siDocker.path,
  C: siC.path,
  Raylib: siRaylib.path,
  Linux: siLinux.path,
  Git: siGit.path,
  "GitHub Actions": siGithubactions.path,
  Netlify: siNetlify.path,
} as const;

export type BrandName = keyof typeof paths | "Azure";

export function BrandIcon({ name, className }: { name: BrandName; className?: string }) {
  if (name === "Azure") return <Cloud className={className} strokeWidth={1.75} aria-hidden />;
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={paths[name]} />
    </svg>
  );
}
