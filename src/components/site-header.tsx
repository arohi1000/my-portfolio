import Link from 'next/link';
import { site } from '@/content/site';
import { ThemeToggle } from './theme-toggle';

const navigation = [
  { label: 'Work', href: '/#work', compact: true },
  { label: 'About', href: '/#about', compact: false },
  { label: 'Contact', href: '/#contact', compact: true },
];

export function SiteHeader() {
  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md"
    >
      <div className="flex h-16 items-center justify-between gap-6 px-(--gutter)">
        <Link
          href="/"
          transitionTypes={['nav-back']}
          className="inline-flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em]"
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          {site.name}
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-5 text-[15px] sm:gap-7">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              transitionTypes={['nav-back']}
              className={`transition-colors duration-200 ease-[ease] hover:text-muted ${item.compact ? '' : 'hidden sm:inline'}`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
