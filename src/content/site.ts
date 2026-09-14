export const site = {
  name: 'Agnivesh Arohi',
  title: 'Full-stack developer & founder of Fluxenta',
  description:
    'Full-stack developer and founder of Fluxenta. I design and build storefronts, product platforms and launch sites with Next.js, TypeScript and Postgres.',
  // The apex domain redirects to www on Vercel, so www is the canonical host.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.agnivesharohi.com',
  email: 'hello@agnivesharohi.com',
  location: 'Delhi, India',
  studio: { name: 'Fluxenta', href: 'https://fluxenta.dev' },
  socials: [
    { label: 'GitHub', href: 'https://github.com/arohi1000' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/agnivesh-arohi-/' },
    { label: 'Instagram', href: 'https://www.instagram.com/_agnivesh_arohi_/' },
  ],
} as const;
