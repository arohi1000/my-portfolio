import fluxentaDesktop from '@/assets/work/fluxenta-desktop.jpg';
import fluxentaServices from '@/assets/work/fluxenta-desktop-1.jpg';
import pockitDesktop from '@/assets/work/pockit-desktop.jpg';
import pockitMobile from '@/assets/work/pockit-mobile.jpg';
import reshmiDesktop from '@/assets/work/reshmi-desktop.jpg';
import reshmiExclusives from '@/assets/work/reshmi-desktop-1.jpg';
import reshmiMobile from '@/assets/work/reshmi-mobile.jpg';
import reshmiOccasions from '@/assets/work/reshmi-desktop-2.jpg';
import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'reshmi-pallu',
    index: '01',
    title: 'Reshmi Pallu',
    category: 'Headless commerce',
    year: '2026',
    summary:
      'A live saree store on a headless Shopify backend, with phone OTP login, Razorpay checkout and automated shipping built in.',
    role: 'Design and full-stack engineering, with Fluxenta',
    live: { href: 'https://www.reshmipallu.com', label: 'reshmipallu.com' },
    cover: {
      src: reshmiDesktop,
      alt: 'Reshmi Pallu home page with a woven silk hero banner above a row of best-selling sarees',
      device: 'desktop',
    },
    brief: [
      'Reshmi Pallu sells premium sarees online. The brand needed a store that felt as considered as the fabric, without giving up Shopify’s reliability behind the scenes.',
      'That meant a custom storefront that handles what a theme doesn’t: phone-number accounts, UPI-friendly payments, pincode-level delivery checks and courier booking, all without leaving the site.',
    ],
    built: [
      {
        title: 'Headless Shopify storefront',
        body: 'Next.js App Router on the Shopify Storefront GraphQL API, with collections, product pages and store policies synced from Shopify.',
      },
      {
        title: 'Phone OTP accounts',
        body: 'Firebase phone authentication with OTP autofill, editable profiles and saved addresses.',
      },
      {
        title: 'Razorpay checkout and offers',
        body: 'Card and UPI payments, a coupon system that covers every wording case, and a first-order discount rule.',
      },
      {
        title: 'Pincode delivery checks',
        body: 'Live pincode lookup fills in city and state, and a server-side endpoint confirms the address is serviceable before checkout.',
      },
      {
        title: 'Automated shipping',
        body: 'Shiprocket order booking, returns, tracking updates and express rates, migrated over from Delhivery, plus receipts that print automatically.',
      },
      {
        title: 'Store customiser',
        body: 'Hero and login imagery the team can change without a deploy, synced through Upstash Redis.',
      },
    ],
    stack: [
      { group: 'Frontend', items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4'] },
      { group: 'Commerce', items: ['Shopify Storefront API (GraphQL)', 'Razorpay', 'Shiprocket'] },
      { group: 'Platform', items: ['NextAuth', 'Firebase Auth', 'Upstash Redis', 'Vercel'] },
    ],
    facts: [
      { label: 'Commits', value: '119' },
      { label: 'Status', value: 'Live' },
    ],
    gallery: [
      {
        src: reshmiExclusives,
        alt: 'Product cards with sale prices above the founder’s exclusive collection',
        device: 'desktop',
      },
      {
        src: reshmiMobile,
        alt: 'The Reshmi Pallu home page on a phone',
        device: 'mobile',
      },
      {
        src: reshmiOccasions,
        alt: 'Chiffon sarees above a shop-by-occasion rail with wedding, festive and office categories',
        device: 'desktop',
      },
    ],
  },
  {
    slug: 'fluxenta',
    index: '02',
    title: 'Fluxenta',
    category: 'Studio platform',
    year: '2026',
    summary:
      'The website and internal tools for the product studio I founded: lead capture, booking, analytics and AI-assisted client notes in one Next.js app.',
    role: 'Founder, design and engineering',
    live: { href: 'https://fluxenta.dev', label: 'fluxenta.dev' },
    cover: {
      src: fluxentaDesktop,
      alt: 'Fluxenta home page headline, “We Engineer High-Performance Web Platforms That Convert”, beside a code editor',
      device: 'desktop',
    },
    brief: [
      'Fluxenta is a small product studio. Its site has one job: explain the offer clearly enough that the right people book a call.',
      'It is also where we run the studio, so the same codebase hosts the client roster and revenue dashboard we use every week.',
    ],
    built: [
      {
        title: 'Lead capture pipeline',
        body: 'Server actions validated with Zod write leads to Supabase, with UTM parameters and the PostHog visitor ID attached.',
      },
      {
        title: 'Booking and nurture emails',
        body: 'Inline Calendly booking, transactional email through Resend, and a webhook that drafts follow-ups with a Groq-hosted Llama model.',
      },
      {
        title: 'Internal dashboards',
        body: 'A client roster with AI-generated summaries and a revenue dashboard, kept behind passcodes in the same App Router project.',
      },
      {
        title: 'Motion and 3D',
        body: 'Framer Motion and GSAP for interface motion, CSS scroll-driven reveals, and Three.js scenes through React Three Fiber.',
      },
      {
        title: 'Content and SEO',
        body: 'Blog, work and legal pages, a sitemap, and generated Open Graph images for every route.',
      },
    ],
    stack: [
      { group: 'Frontend', items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4'] },
      { group: 'Motion', items: ['Framer Motion', 'GSAP', 'Three.js', 'React Three Fiber'] },
      { group: 'Backend', items: ['Supabase', 'Zod', 'Resend', 'Vercel AI SDK', 'Groq'] },
      { group: 'Growth', items: ['PostHog', 'Vercel Analytics', 'Calendly'] },
    ],
    facts: [
      { label: 'Commits', value: '97' },
      { label: 'Status', value: 'Live' },
    ],
    gallery: [
      {
        src: fluxentaServices,
        alt: 'Fluxenta services section with engineering and design cards under the heading “One Accountable Partner”',
        device: 'desktop',
      },
    ],
  },
  {
    slug: 'pockit-engineers',
    index: '03',
    title: 'PockIT Engineers',
    category: 'Marketplace launch site',
    year: '2026',
    summary:
      'The launch site for a doorstep IT-support app, built to earn trust fast and stay smooth on lower-end phones.',
    role: 'Design and frontend engineering, with Fluxenta',
    live: { href: 'https://www.pockitengineers.com', label: 'pockitengineers.com' },
    cover: {
      src: pockitDesktop,
      alt: 'PockIT Engineers home page, “Bharat’s Only IT Services App”, with a technician repairing a desktop PC',
      device: 'desktop',
    },
    brief: [
      'PockIT Engineers sends verified technicians to fix laptops, Wi-Fi, TVs, printers and CCTV at your door. The website has to build trust quickly and get people into the app or onto WhatsApp.',
      'Customers book from their phones, so performance on lower-end devices was a design constraint from the start, not a clean-up task at the end.',
    ],
    built: [
      {
        title: 'Four-theme design system',
        body: 'A CSS-variable theme engine with four brand modes (dark gradient, dark flat, light corporate, light soft) that switch instantly without a React re-render.',
      },
      {
        title: 'Performance pass',
        body: 'Framer Motion kept to transform and opacity, with blurs and looping effects moved to CSS keyframes so scrolling stays smooth on older phones.',
      },
      {
        title: 'Conversion paths',
        body: 'A sticky booking button, WhatsApp chat, Play Store and App Store links, and a floating download prompt.',
      },
      {
        title: 'Trust sections',
        body: 'Headline stats, a service grid, how-it-works steps, testimonials, a social-proof ticker and FAQs.',
      },
      {
        title: 'Technician recruitment',
        body: 'A separate page for technicians who want to join, which opens WhatsApp with their number already filled in.',
      },
    ],
    stack: [
      { group: 'Frontend', items: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS'] },
      { group: 'Motion', items: ['Framer Motion', 'CSS keyframes'] },
      { group: 'Design', items: ['Plus Jakarta Sans', 'Inter', 'Lucide icons'] },
    ],
    facts: [
      { label: 'Commits', value: '42' },
      { label: 'Status', value: 'Live' },
    ],
    gallery: [
      {
        src: pockitMobile,
        alt: 'PockIT Engineers on a phone, with WhatsApp, Google Play and App Store buttons',
        device: 'mobile',
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
