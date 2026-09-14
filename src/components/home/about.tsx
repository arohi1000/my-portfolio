import { site } from '@/content/site';

const facts = [
  { label: 'Studio', value: 'Fluxenta, founder' },
  { label: 'Focus', value: 'Commerce · Platforms · Launch sites' },
  { label: 'Stack', value: 'Next.js · TypeScript · Postgres' },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 px-(--gutter) py-20 md:py-32">
      <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
        <h2
          id="about-title"
          className="text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]"
        >
          About
        </h2>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">(03)</p>
      </div>

      <p className="reveal mt-12 max-w-[20ch] text-balance text-[clamp(2.25rem,5.6vw,5.5rem)] font-medium leading-none tracking-[-0.045em] md:mt-16">
        I build with a founder’s mindset: product first, speed second, trust in every detail.
      </p>

      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
        <div className="grid gap-5 text-lg leading-relaxed text-muted md:col-span-6 md:col-start-4">
          <p>
            I’m Agnivesh, a full-stack developer based in {site.location.split(',')[0]}. I run{' '}
            <a
              href={site.studio.href}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-line underline-offset-4 transition-[text-decoration-color] duration-200 ease-[ease] hover:decoration-ink"
            >
              {site.studio.name}
            </a>
            , a small product studio that designs, builds and grows web platforms for early-stage companies.
          </p>
          <p>
            Most of my work is TypeScript end to end: Next.js and React on the front, Node, NestJS and Postgres
            behind it.
          </p>
        </div>

        <dl className="grid content-start gap-6 font-mono text-xs uppercase tracking-[0.12em] md:col-span-3 md:col-start-10">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-muted">{fact.label}</dt>
              <dd className="mt-1.5 leading-5">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
