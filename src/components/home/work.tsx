import { projects } from '@/content/projects';
import { WorkIndex } from './work-index';

export function Work() {
  const items = projects.map(({ slug, index, title, category, year, summary, cover }) => ({
    slug,
    index,
    title,
    category,
    year,
    summary,
    cover,
  }));

  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16 px-(--gutter) py-20 md:py-28">
      <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
        <h2
          id="work-title"
          className="text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]"
        >
          Selected work
        </h2>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">(01)</p>
      </div>

      <WorkIndex items={items} />
    </section>
  );
}
