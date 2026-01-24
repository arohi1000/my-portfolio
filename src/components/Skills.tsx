import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPython, SiMongodb, SiPostgresql, SiGraphql, SiAmazon, SiDocker, SiFigma, SiGit, SiTailwindcss, SiPrisma } from 'react-icons/si';
import LogoLoop, { LogoItem } from './LogoLoop';
import SkillCursor from './SkillCursor';
import styles from './Skills.module.css';

const techLogos: LogoItem[] = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiPrisma />, title: "Prisma", href: "https://www.prisma.io" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiGraphql />, title: "GraphQL", href: "https://graphql.org" },
  { node: <SiAmazon />, title: "AWS", href: "https://aws.amazon.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiFigma />, title: "Figma", href: "https://www.figma.com" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className={styles.skills} id="about">
      <SkillCursor />

      <div className={styles.sectionHeader}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.sectionLabel}>What I Do</span>
          <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
        </motion.div>
      </div>

      <div style={{ position: 'relative', overflow: 'hidden', padding: '2rem 0' }}>
        <LogoLoop
          logos={techLogos}
          speed={50}
          direction="left"
          logoHeight={50} /* Increased for better visibility */
          gap={80}
          hoverSpeed={0} /* Stop on hover */
          scaleOnHover={true}
          fadeOut={true}
        />

        {/* Optional: Second row in reverse speed/direction */}
        <div style={{ marginTop: '2rem' }}>
          <LogoLoop
            logos={[...techLogos].reverse()}
            speed={50}
            direction="right"
            logoHeight={50}
            gap={80}
            hoverSpeed={0}
            scaleOnHover={true}
            fadeOut={true}
          />
        </div>
      </div>
    </section>
  );
}
