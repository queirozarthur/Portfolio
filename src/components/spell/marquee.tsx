// Spell UI — https://spell.sh/docs/marquee (MIT, xxtomm/spell-ui)
// Adaptado: keyframes em index.css (o original usava styled-jsx do Next) e pausa via CSS.
import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  fade?: boolean;
  fadeAmount?: number;
}

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  ...props
}: MarqueeProps) {
  const items = React.Children.toArray(children);
  const mask = `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`;

  return (
    <div
      className={cn("group flex w-full overflow-hidden", className)}
      style={fade ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      {...props}
    >
      <div
        className={cn("flex shrink-0", pauseOnHover && "group-hover:[animation-play-state:paused]")}
        style={{
          animation: `${direction === "left" ? "marquee-x" : "marquee-x-reverse"} ${duration}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex shrink-0" aria-hidden={index >= items.length || undefined}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
