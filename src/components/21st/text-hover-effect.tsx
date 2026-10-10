// 21st.dev — Hover Footer por Md Afsar Mahmud (nurui), feito sobre o Text Hover Effect da Aceternity UI
// https://21st.dev/@mdafsarx/components/hover-footer
// Texto gigante só com contorno que se desenha ao entrar na tela; o gradiente segue o cursor (ou o dedo).
import { useId, useRef, useState } from "react";
import { motion } from "motion/react";

export function TextHoverEffect({ text, duration = 0 }: { text: string; duration?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mask, setMask] = useState({ cx: "50%", cy: "50%" });
  const uid = useId().replace(/:/g, "");
  const gradientId = `tg-${uid}`;
  const revealId = `rm-${uid}`;
  const maskId = `tm-${uid}`;

  const track = (clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMask({
      cx: `${((clientX - rect.left) / rect.width) * 100}%`,
      cy: `${((clientY - rect.top) / rect.height) * 100}%`,
    });
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={(e) => track(e.clientX, e.clientY)}
      className="select-none"
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%" stopColor="#c6f432" />
              <stop offset="35%" stopColor="#5ee7b0" />
              <stop offset="65%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#c6f432" />
            </>
          )}
        </linearGradient>
        <motion.radialGradient
          id={revealId}
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={mask}
          transition={{ duration, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${revealId})`} />
        </mask>
      </defs>
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-line-strong font-sans text-[3.25rem] font-bold tracking-tighter"
        style={{ opacity: hovered ? 0.7 : 0, transition: "opacity .3s" }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-fg/30 font-sans text-[3.25rem] font-bold tracking-tighter"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        whileInView={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        viewport={{ once: true }}
        transition={{ duration: 4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.35"
        mask={`url(#${maskId})`}
        className="fill-transparent font-sans text-[3.25rem] font-bold tracking-tighter"
      >
        {text}
      </text>
    </svg>
  );
}
