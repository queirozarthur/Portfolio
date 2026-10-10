import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const subscribeMedia = (query: string) => (onChange: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

export const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => false,
  );

/** Mouse de verdade: efeitos de hover/tilt só fazem sentido aqui, não no toque. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

type Theme = "dark" | "light";
const THEME_KEY = "aq-theme";

const readTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(readTheme);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.classList.toggle("dark", next === "dark");
      setTheme(next);
    };
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // armazenamento bloqueado: o tema só não fica salvo
    }
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(apply);
    } else {
      apply();
    }
  }, []);

  return { theme, toggle };
};

/** Seção visível no momento, para o indicador da navbar. */
export const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
};
