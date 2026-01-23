'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Skills.module.css';

interface Skill {
  name: string;
  icon?: string;
}

const defaultSkills: Skill[] = [
  { name: 'React' },
  { name: 'Next.js' },
  { name: 'TypeScript' },
  { name: 'Node.js' },
  { name: 'Python' },
  { name: 'MongoDB' },
  { name: 'PostgreSQL' },
  { name: 'GraphQL' },
  { name: 'AWS' },
  { name: 'Docker' },
  { name: 'Figma' },
  { name: 'Git' },
];


interface SkillsProps {
  skills?: Skill[];
}

export default function Skills({
  skills = defaultSkills,
}: SkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className={styles.skills} id="about">
      {/* Skills Section */}
      <div className={styles.skillsSection}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.sectionLabel}>What I Do</span>
          <h2 className={styles.sectionTitle}>Skills & Technologies</h2>
        </motion.div>

        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={styles.skillItem}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className={styles.skillContent}>
                <span className={styles.skillName}>{skill.name}</span>
              </div>
              <div className={styles.skillCorners}>
                <span className={styles.skillCorner} />
                <span className={styles.skillCorner} />
                <span className={styles.skillCorner} />
                <span className={styles.skillCorner} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>


    </section>
  );
}
