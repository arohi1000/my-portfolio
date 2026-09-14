import type { CSSProperties } from 'react';
import { LocalTime } from '@/components/local-time';
import { Magnetic } from '@/components/magnetic';
import { site } from '@/content/site';

const order = (i: number) => ({ '--i': i }) as CSSProperties;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-(--gutter) pb-20 pt-8 sm:pt-12 md:pb-28">
      <h1
        id="hero-title"
        className="text-[clamp(3.5rem,21vw,22rem)] font-semibold leading-[0.8] tracking-[-0.06em]"
      >
        <span className="line-mask">
          <span className="line-in" style={order(0)}>
            Agnivesh
          </span>
        </span>
        <span className="line-mask text-right">
          <span className="line-in" style={order(1)}>
            Arohi
          </span>
        </span>
      </h1>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
        <p
          className="fade-in text-balance text-[clamp(1.375rem,2.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] md:col-span-7 lg:col-span-6"
          style={order(2)}
        >
          Full-stack developer and founder of{' '}
          <a
            href={site.studio.href}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-line decoration-1 underline-offset-[0.18em] transition-[text-decoration-color] duration-200 ease-[ease] hover:decoration-ink"
          >
            {site.studio.name}
          </a>
          . I design and build web products, from the database to the last hover state.
        </p>

        <div
          className="fade-in flex items-end justify-between gap-6 md:col-span-5 md:col-start-8"
          style={order(3)}
        >
          <dl className="grid gap-4 font-mono text-xs uppercase tracking-[0.12em]">
            <div>
              <dt className="text-muted">Based in</dt>
              <dd className="mt-1.5">
                {site.location} · <LocalTime />
              </dd>
            </div>
            <div>
              <dt className="text-muted">Currently</dt>
              <dd className="mt-1.5">Building at {site.studio.name}</dd>
            </div>
          </dl>

          <Magnetic>
            <a
              href="#contact"
              className="grid size-28 shrink-0 place-items-center rounded-full bg-accent text-center text-sm font-medium leading-tight text-on-accent transition-transform duration-150 ease-out active:scale-[0.97] sm:size-36 sm:text-base"
            >
              Get in
              <br />
              touch
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
