import { ContactForm } from '@/components/contact-form';
import { CopyEmail } from '@/components/copy-email';
import { Magnetic } from '@/components/magnetic';
import { site } from '@/content/site';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 px-(--gutter) pb-24 pt-20 md:pb-32 md:pt-28">
      <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Contact</p>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">(04)</p>
      </div>

      <h2
        id="contact-title"
        className="mt-12 max-w-[12ch] text-[clamp(3.25rem,10vw,10rem)] font-semibold leading-[0.88] tracking-[-0.055em] md:mt-16"
      >
        Have a project in mind?
      </h2>

      <div className="mt-14 grid gap-16 md:mt-20 md:grid-cols-12">
        <div className="flex flex-col gap-10 md:col-span-5">
          <p className="max-w-md text-lg leading-relaxed text-muted">
            Hiring, starting something new, or fixing something that isn’t working? Tell me about it.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="grid size-32 place-items-center rounded-full bg-accent font-medium text-on-accent transition-transform duration-150 ease-out active:scale-[0.97] sm:size-36"
              >
                Email me
              </a>
            </Magnetic>
            <CopyEmail email={site.email} />
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-line underline-offset-4 transition-[text-decoration-color] duration-200 ease-[ease] hover:decoration-ink"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
