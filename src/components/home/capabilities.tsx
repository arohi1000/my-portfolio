const capabilities = [
  {
    title: 'Commerce that runs a business',
    body: 'Headless Shopify storefronts with real checkout, payments, shipping and accounts, built for how Indian customers actually buy.',
    tools: ['Shopify Storefront API', 'Razorpay', 'Shiprocket', 'Firebase Auth', 'NextAuth'],
  },
  {
    title: 'Product platforms',
    body: 'Full-stack apps with typed APIs, authentication, and the internal dashboards teams run their day on.',
    tools: ['Next.js', 'React', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Supabase', 'Redis'],
  },
  {
    title: 'Launch sites with motion',
    body: 'Marketing sites where animation earns its place and scrolling stays smooth on lower-end phones.',
    tools: ['Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js', 'PostHog'],
  },
];

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="bg-ink text-paper">
      <div className="px-(--gutter) py-20 md:py-28">
        <div className="flex items-end justify-between gap-6 border-b border-paper/15 pb-6">
          <h2
            id="capabilities-title"
            className="text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-none tracking-[-0.04em]"
          >
            What I build
          </h2>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-paper/65">(02)</p>
        </div>

        <ol className="grid md:grid-cols-3">
          {capabilities.map((capability, i) => (
            <li
              key={capability.title}
              className="reveal border-b border-paper/15 py-10 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <p className="font-mono text-xs text-paper/65">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-6 text-balance text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
                {capability.title}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-paper/75">{capability.body}</p>
              <p className="mt-8 font-mono text-xs leading-6 text-paper/65">{capability.tools.join(' · ')}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
