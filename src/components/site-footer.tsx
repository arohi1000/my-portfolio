import { site } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-(--gutter) py-8">
      <div className="flex flex-col gap-5 font-mono text-xs uppercase tracking-[0.12em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {site.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 ease-[ease] hover:text-ink"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
        <p>Portfolio v2 · 2026</p>
      </div>
    </footer>
  );
}
