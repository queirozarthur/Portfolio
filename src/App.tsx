import { MotionConfig } from "motion/react";
import { Briefcase, Home, Mail, Route, User } from "lucide-react";
import { NavBar, type NavItem } from "@/components/21st/tubelight-navbar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Hero } from "@/components/sections/hero";
import { StackBand } from "@/components/sections/stack-band";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Journey } from "@/components/sections/journey";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { useActiveSection, useTheme } from "@/lib/hooks";

const navItems: NavItem[] = [
  { name: "Início", url: "#inicio", icon: Home },
  { name: "Sobre", url: "#sobre", icon: User },
  { name: "Projetos", url: "#projetos", icon: Briefcase },
  { name: "Trajetória", url: "#trajetoria", icon: Route },
  { name: "Contato", url: "#contato", icon: Mail },
];

const sectionIds = navItems.map((item) => item.url.slice(1));

export default function App() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection(sectionIds);
  const dark = theme === "dark";

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#sobre"
        className="sr-only z-[60] rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Pular para o conteúdo
      </a>
      <NavBar
        items={navItems}
        active={active}
        trailing={
          <>
            <span className="mx-0.5 h-5 w-px bg-line" aria-hidden />
            <ThemeToggle theme={theme} onToggle={toggle} />
          </>
        }
      />
      <main>
        <Hero dark={dark} />
        <StackBand />
        <About dark={dark} />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
