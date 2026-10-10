// Spell UI — https://spell.sh/docs/tilt-card (MIT, xxtomm/spell-ui)
// Adaptado: só inclina com mouse (no toque o card fica parado e a rolagem não briga com o efeito)
// e o spotlight usa CSS vars em vez de estado React a cada pointermove.
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TiltCardProps {
  tiltLimit?: number;
  scale?: number;
  perspective?: number;
  effect?: "gravitate" | "evade";
  spotlight?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function TiltCard({
  tiltLimit = 15,
  scale = 1.05,
  perspective = 1200,
  effect = "evade",
  spotlight = true,
  className,
  style,
  children,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const dir = effect === "evade" ? -1 : 1;

  const reset = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.setProperty("--spot-o", "0");
  }, [perspective]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = cardRef.current;
      if (!el || e.pointerType !== "mouse") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const xRot = (py - 0.5) * (tiltLimit * 2) * dir;
      const yRot = (px - 0.5) * -(tiltLimit * 2) * dir;
      el.style.transform = `perspective(${perspective}px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(${scale}, ${scale}, ${scale})`;
      el.style.setProperty("--spot-x", `${px * 100}%`);
      el.style.setProperty("--spot-y", `${py * 100}%`);
      el.style.setProperty("--spot-o", "1");
    },
    [tiltLimit, scale, perspective, dir],
  );

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className={cn("relative overflow-hidden will-change-transform", className)}
      style={{
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
      {spotlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
          style={{ opacity: "var(--spot-o, 0)", transition: "opacity 0.3s" }}
        >
          <div
            className="absolute h-[200%] w-[200%] rounded-full opacity-100 dark:opacity-50"
            style={{
              left: "var(--spot-x, 50%)",
              top: "var(--spot-y, 50%)",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 40%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
