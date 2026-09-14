import { About } from '@/components/home/about';
import { Capabilities } from '@/components/home/capabilities';
import { Contact } from '@/components/home/contact';
import { Hero } from '@/components/home/hero';
import { Work } from '@/components/home/work';
import { PageTransition } from '@/components/page-transition';

export default function HomePage() {
  return (
    <PageTransition>
      <div>
        <Hero />
        <Work />
        <Capabilities />
        <About />
        <Contact />
      </div>
    </PageTransition>
  );
}
