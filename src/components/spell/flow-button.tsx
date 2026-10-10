// Spell UI — https://spell.sh/docs/flow-button (MIT, xxtomm/spell-ui)
// Adaptado: renderiza <a> (links e download) sem depender do Radix Slot, e mede com ResizeObserver.
import * as React from "react";
import { cn } from "@/lib/utils";

type SizeVariant = "sm" | "default" | "lg";

interface FlowButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  size?: SizeVariant;
  borderColor?: string;
}

const sizeMap: Record<SizeVariant, string> = {
  sm: "h-8 rounded-full gap-1.5 px-3 text-sm",
  default: "h-9 px-4 py-2 text-sm rounded-full",
  lg: "h-12 rounded-full px-6 text-[15px]",
};

const borderRadiusMap: Record<SizeVariant, number> = { sm: 16, default: 18, lg: 24 };

const roundedRectPath = (w: number, h: number, r: number) =>
  `M${r},0.5 H${w - r} A${r},${r} 0 0 1 ${w - 0.5},${r} V${h - r} A${r},${r} 0 0 1 ${w - r},${h - 0.5} H${r} A${r},${r} 0 0 1 0.5,${h - r} V${r} A${r},${r} 0 0 1 ${r},0.5 Z`;

export function FlowButton({
  children,
  size = "default",
  borderColor = "var(--rotating-border-color, currentColor)",
  className,
  ...props
}: FlowButtonProps) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [dim, setDim] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setDim({ width: el.offsetWidth, height: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const radius = borderRadiusMap[size];

  return (
    <div className="group pointer-events-none relative inline-block">
      <div
        className="pointer-events-none absolute inset-[2px] z-10 opacity-0 transition-all duration-200 ease-out group-hover:inset-0 group-hover:opacity-100 group-focus-within:inset-0 group-focus-within:opacity-100"
        style={{ borderRadius: `${radius}px` }}
      >
        {dim.width > 0 && (
          <svg
            width={dim.width}
            height={dim.height}
            viewBox={`0 0 ${dim.width} ${dim.height}`}
            aria-hidden="true"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
          >
            <path
              d={roundedRectPath(dim.width, dim.height, radius)}
              fill="none"
              stroke={borderColor}
              strokeWidth="1"
              strokeDasharray="6,4"
              className="group-hover:animate-[dash-flow_1s_linear_infinite]"
            />
          </svg>
        )}
      </div>
      <a
        ref={ref}
        className={cn(
          "pointer-events-auto relative z-0 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-[550] whitespace-nowrap transition-colors select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          "bg-surface-2 text-fg hover:bg-transparent",
          sizeMap[size],
          className,
        )}
        {...props}
      >
        {children}
      </a>
    </div>
  );
}
