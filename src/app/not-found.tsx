import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="px-(--gutter) py-32">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">404</p>
      <h1 className="mt-4 text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
        Nothing here.
      </h1>
      <Link
        href="/"
        className="mt-10 inline-block rounded-full bg-ink px-7 py-4 font-medium text-paper transition-transform duration-150 ease-out active:scale-[0.97]"
      >
        Back to the work
      </Link>
    </section>
  );
}
