import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';
import { PageTransition } from '@/components/page-transition';
import { getProject, projects } from '@/content/projects';
import type { Shot } from '@/content/types';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [
        {
          url: project.cover.src.src,
          width: project.cover.src.width,
          height: project.cover.src.height,
          alt: project.cover.alt,
        },
      ],
    },
  };
}

const label = 'font-mono text-xs uppercase tracking-[0.12em] text-muted';
const order = (i: number) => ({ '--i': i }) as CSSProperties;

function spanFor(shot: Shot, paired: boolean) {
  if (shot.device === 'mobile') {
    return paired ? 'aspect-[4/5] md:col-span-4 md:aspect-auto' : 'aspect-[4/5] md:col-span-12 md:aspect-[16/9]';
  }
  return paired ? 'md:col-span-8' : 'md:col-span-12';
}

/** A desktop shot and the phone shot next to it share a row; everything else runs full width. */
function galleryLayout(gallery: Shot[]) {
  const spans: string[] = [];
  for (let i = 0; i < gallery.length; i++) {
    const shot = gallery[i];
    const next = gallery[i + 1];
    if (next && next.device !== shot.device) {
      spans.push(spanFor(shot, true), spanFor(next, true));
      i++;
    } else {
      spans.push(spanFor(shot, false));
    }
  }
  return spans;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const position = projects.indexOf(project);
  const next = projects[(position + 1) % projects.length];
  const gallerySpans = galleryLayout(project.gallery);

  return (
    <PageTransition>
      <article className="px-(--gutter) pb-16 pt-8 sm:pt-12">
        <Link
          href="/#work"
          transitionTypes={['nav-back']}
          className={`${label} inline-flex items-center gap-2 transition-colors duration-200 ease-[ease] hover:text-ink`}
        >
          <span aria-hidden="true">←</span> All work
        </Link>

        <header className="mt-10 md:mt-16">
          <p className={label}>
            {project.index} — {project.category}
          </p>
          <h1 className="mt-4 text-[clamp(3.25rem,12.5vw,13rem)] font-semibold leading-[0.85] tracking-[-0.06em]">
            <span className="line-mask">
              <span className="line-in">{project.title}</span>
            </span>
          </h1>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
            <p
              className="fade-in text-balance text-[clamp(1.375rem,2.4vw,2.125rem)] leading-[1.15] tracking-[-0.02em] md:col-span-7"
              style={order(1)}
            >
              {project.summary}
            </p>
            <dl
              className="fade-in grid grid-cols-2 content-start gap-x-6 gap-y-6 md:col-span-4 md:col-start-9"
              style={order(2)}
            >
              <div className="col-span-2">
                <dt className={label}>Role</dt>
                <dd className="mt-1.5">{project.role}</dd>
              </div>
              <div>
                <dt className={label}>Year</dt>
                <dd className="mt-1.5">{project.year}</dd>
              </div>
              {project.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className={label}>{fact.label}</dt>
                  <dd className="mt-1.5">{fact.value}</dd>
                </div>
              ))}
              <div className="col-span-2">
                <dt className={label}>Live</dt>
                <dd className="mt-1.5">
                  <a
                    href={project.live.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-line underline-offset-4 transition-[text-decoration-color] duration-200 ease-[ease] hover:decoration-ink"
                  >
                    {project.live.label} ↗
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <figure className="fade-in mt-14 overflow-hidden rounded-2xl border border-line bg-paper-2 md:mt-20" style={order(3)}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            sizes="(min-width: 1600px) 1520px, 100vw"
            className="h-auto w-full"
          />
        </figure>

        <section aria-labelledby="brief-title" className="mt-24 grid gap-6 md:mt-32 md:grid-cols-12">
          <h2 id="brief-title" className={`${label} md:col-span-3`}>
            The brief
          </h2>
          <div className="reveal grid gap-6 text-[clamp(1.25rem,1.9vw,1.75rem)] leading-[1.3] tracking-[-0.015em] md:col-span-8 md:col-start-5">
            {project.brief.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="built-title" className="mt-24 grid gap-6 md:mt-32 md:grid-cols-12">
          <h2 id="built-title" className={`${label} md:col-span-3`}>
            What I built
          </h2>
          <ol className="grid gap-x-10 border-t border-line sm:grid-cols-2 md:col-span-9 md:col-start-4">
            {project.built.map((item, i) => (
              <li key={item.title} className="reveal border-b border-line py-7">
                <p className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {project.gallery.length > 0 && (
          <section aria-label="Screens" className="mt-24 grid gap-4 md:mt-32 md:grid-cols-12 md:gap-6">
            {project.gallery.map((shot, i) => (
              <figure
                key={shot.src.src}
                className={`reveal relative overflow-hidden rounded-2xl border border-line bg-paper-2 ${gallerySpans[i]}`}
              >
                {shot.device === 'mobile' ? (
                  <div className="absolute inset-6 md:inset-10">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 30vw, 80vw"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    placeholder="blur"
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="h-auto w-full"
                  />
                )}
              </figure>
            ))}
          </section>
        )}

        <section aria-labelledby="stack-title" className="mt-24 grid gap-6 md:mt-32 md:grid-cols-12">
          <h2 id="stack-title" className={`${label} md:col-span-3`}>
            Stack
          </h2>
          <dl className="grid gap-8 sm:grid-cols-2 md:col-span-9 md:col-start-4 lg:grid-cols-3">
            {project.stack.map((group) => (
              <div key={group.group}>
                <dt className="font-medium">{group.group}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav aria-label="Next project" className="mt-28 border-t border-line pt-10 md:mt-40">
          <Link href={`/work/${next.slug}`} transitionTypes={['nav-forward']} className="group block">
            <span className={label}>Next project</span>
            <span className="mt-4 flex items-end justify-between gap-6">
              <span className="text-[clamp(2.75rem,9vw,9rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
                {next.title}
              </span>
              <span
                aria-hidden="true"
                className="mb-[0.15em] text-[clamp(2rem,5vw,5rem)] leading-none transition-transform duration-200 ease-out group-hover:translate-x-3"
              >
                →
              </span>
            </span>
          </Link>
        </nav>
      </article>
    </PageTransition>
  );
}
