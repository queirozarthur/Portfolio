import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeToggleProps = { theme: "dark" | "light"; onToggle: () => void; className?: string };

export function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      className={cn(
        "relative flex size-10 cursor-pointer items-center justify-center rounded-full text-muted transition-[color,scale] hover:text-fg active:scale-[0.96]",
        className,
      )}
    >
      <Sun
        size={17}
        className={cn("absolute transition-[opacity,scale,filter] duration-300", isDark ? "scale-50 opacity-0 blur-[2px]" : "scale-100 opacity-100 blur-0")}
      />
      <Moon
        size={17}
        className={cn("absolute transition-[opacity,scale,filter] duration-300", isDark ? "scale-100 opacity-100 blur-0" : "scale-50 opacity-0 blur-[2px]")}
      />
    </button>
  );
}
