# Agnivesh Arohi — portfolio

Personal site for Agnivesh Arohi, full-stack developer and founder of [Fluxenta](https://fluxenta.dev).

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4 and Motion. Every page is statically generated.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

The contact form writes to a Supabase `messages` table (schema in `supabase_schema.sql`). It needs these in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=   # optional, used for canonical URLs, the sitemap and Open Graph images
```

Without them the form shows an "email me instead" message; the rest of the site works.

## Editing content

| What | Where |
| --- | --- |
| Name, email, location, social links | `src/content/site.ts` |
| Case studies (copy, stack, screenshots) | `src/content/projects.ts` |
| Home page sections | `src/components/home/*` |
| Colours, easing curves, motion | `src/app/globals.css` |

Screenshots live in `src/assets/work/` and are imported statically, so Next.js generates sizes and blur placeholders automatically. To add a project, drop its screenshots there and add an entry to `projects`; its case study page at `/work/<slug>` is generated from that entry.

## How the motion works

- **The intro loader** plays on the first visit in a browser tab: words flash while a counter runs to 100, then two layers of columns lift away to reveal the page (about 2.4 seconds). It is pure CSS, controlled by the inline script in `src/app/layout.tsx`; any key or click skips it, and it never plays with reduced motion. The page underneath is already rendered, so search engines and screen readers aren't affected. To replay it, open the site in a new tab.

- **Hero and title reveals** are CSS animations, so the text is in the server-rendered HTML and readable before any JavaScript runs.
- **Scroll reveals** use CSS scroll-driven animations where the browser supports them, and are skipped otherwise.
- **The work index preview** follows the mouse with a spring (Motion). On touch devices each row shows its screenshot inline instead.
- **Page transitions** use React's `<ViewTransition>`: links into a case study slide forward, links home slide back, and the header stays put.
- Everything respects `prefers-reduced-motion`: movement is removed and only fades remain.
