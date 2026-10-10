// 21st.dev — COBE Globe por Shu Ding
// https://21st.dev/@shuding/components/cobe-globe
// Globo WebGL de ~5 KB com marcadores, arco e rótulos via CSS Anchor Positioning.
// Adaptado: arrastar com inércia (mouse e toque), cores seguem o tema e o loop para fora da tela.
import { useEffect, useRef } from "react";
import createGlobe, { type Arc, type Marker } from "cobe";
import { cn } from "@/lib/utils";

type GlobeLabel = { id: string; text: string };

type CobeGlobeProps = {
  markers: Marker[];
  arcs?: Arc[];
  labels?: GlobeLabel[];
  focus: [number, number];
  dark: boolean;
  className?: string;
};

const ACCENT: [number, number, number] = [0.776, 0.957, 0.196];
const ACCENT_DARK: [number, number, number] = [0.29, 0.48, 0];

const toAngles = (lat: number, lon: number): [number, number] => [
  Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2),
  (lat * Math.PI) / 180,
];

export function CobeGlobe({ markers, arcs, labels, focus, dark, className }: CobeGlobeProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // O cobe embrulha o canvas num div próprio, então o canvas é criado fora do React.
    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "Globo mostrando Maceió, Recife e Kelowna");
    canvas.className = "block h-full w-full cursor-grab touch-pan-y opacity-0 transition-opacity duration-1000";
    host.append(canvas);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = canvas.offsetWidth;
    const [focusPhi, focusTheta] = toAngles(focus[0], focus[1]);
    let phi = focusPhi;
    let theta = focusTheta * 0.6;
    let velocity = 0;
    let dragging = false;
    let lastX = 0;
    let visible = true;
    let frame = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width,
      height: width,
      phi,
      theta,
      dark: dark ? 1 : 0,
      diffuse: dark ? 1.2 : 1.6,
      mapSamples: 16000,
      mapBrightness: dark ? 5 : 8,
      mapBaseBrightness: dark ? 0 : 0.05,
      baseColor: dark ? [0.22, 0.22, 0.24] : [1, 1, 1],
      markerColor: dark ? ACCENT : ACCENT_DARK,
      glowColor: dark ? [0.12, 0.12, 0.13] : [0.92, 0.92, 0.9],
      arcColor: dark ? ACCENT : ACCENT_DARK,
      arcWidth: 0.6,
      arcHeight: 0.35,
      markerElevation: 0.02,
      markers,
      arcs,
      opacity: dark ? 0.9 : 1,
    });

    const render = () => {
      if (!dragging) {
        if (Math.abs(velocity) > 0.0001) {
          phi += velocity;
          velocity *= 0.95;
        } else if (!reduced) {
          phi += 0.0018;
        }
      }
      globe.update({ phi, theta, width, height: width });
      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(render);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      velocity = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const delta = (e.clientX - lastX) / 200;
      lastX = e.clientX;
      phi += delta;
      velocity = delta;
    };
    const onUp = () => {
      dragging = false;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    const ro = new ResizeObserver(() => {
      width = canvas.offsetWidth;
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    start();
    requestAnimationFrame(() => (canvas.style.opacity = "1"));

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      globe.destroy();
      host.replaceChildren();
    };
  }, [markers, arcs, focus, dark]);

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <div ref={hostRef} className="h-full w-full" />
      {labels?.map((label) => (
        <span
          key={label.id}
          className="cobe-label pointer-events-none absolute rounded-full border border-line-strong bg-bg/80 px-2 py-0.5 font-mono text-[10px] tracking-wide whitespace-nowrap text-fg uppercase backdrop-blur"
          style={
            {
              positionAnchor: `--cobe-${label.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              translate: "-50% -6px",
              opacity: `var(--cobe-visible-${label.id}, 0)`,
              filter: `blur(calc((1 - var(--cobe-visible-${label.id}, 0)) * 8px))`,
              transition: "opacity .3s, filter .3s",
            } as React.CSSProperties
          }
        >
          {label.text}
        </span>
      ))}
    </div>
  );
}
