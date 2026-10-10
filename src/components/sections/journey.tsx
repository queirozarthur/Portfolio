import { Timeline } from "@/components/21st/timeline";
import { SectionHeading } from "@/components/ui/section-heading";
import { journey } from "@/data/content";
import { asset } from "@/lib/utils";

export function Journey() {
  const data = journey.map((item) => ({
    title: item.when,
    content: (
      <div className="max-w-2xl rounded-3xl border border-line bg-surface p-6 md:p-7">
        <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">{item.place}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg md:text-2xl">{item.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
        {item.image && (
          <img
            src={asset(item.image.src)}
            alt={item.image.alt}
            loading="lazy"
            decoding="async"
            className="mt-5 aspect-[4/3] w-full rounded-2xl object-cover object-[50%_38%]"
          />
        )}
      </div>
    ),
  }));

  return (
    <section id="trajetoria" className="container-page py-20 md:py-28">
      <SectionHeading
        index="03"
        label="Trajetória"
        title="Até aqui"
      />
      <Timeline data={data} />
    </section>
  );
}
