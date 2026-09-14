import type { Metadata, Viewport } from 'next';
import { Geist_Mono, Inter_Tight } from 'next/font/google';
import { IntroLoader } from '@/components/intro-loader';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { site } from '@/content/site';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

const fullTitle = `${site.name} — ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: fullTitle, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: fullTitle,
    description: site.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: fullTitle,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ecebe6' },
    { media: '(prefers-color-scheme: dark)', color: '#121211' },
  ],
};

/**
 * Runs before first paint: applies a saved theme so it never flashes, and decides
 * whether to play the intro (first visit in a tab, motion allowed). Any key or
 * click skips it. Self-contained because it is serialised into an inline script.
 */
function boot() {
  const root = document.documentElement;

  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'light' || theme === 'dark') root.dataset.theme = theme;
  } catch {
    // Storage blocked: fall back to the system theme.
  }

  try {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('intro')) return;
    sessionStorage.setItem('intro', 'seen');
    root.dataset.intro = 'play';
    root.dataset.introDelay = '';

    const finish = () => {
      delete root.dataset.intro;
      removeEventListener('keydown', skip);
      removeEventListener('pointerdown', skip);
    };
    const skip = () => {
      if (root.dataset.intro !== 'play') return;
      root.dataset.intro = 'skip';
      delete root.dataset.introDelay;
      setTimeout(finish, 250);
    };

    addEventListener('keydown', skip);
    addEventListener('pointerdown', skip);
    setTimeout(finish, 2400);
    // Kept until every hero reveal has finished, so removing it can't make one jump.
    setTimeout(() => delete root.dataset.introDelay, 3400);
  } catch {
    // Storage blocked: skip the intro rather than replay it on every page.
  }
}

const bootScript = `(${boot.toString()})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${interTight.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <IntroLoader />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
