'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './Projects.module.css';

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  color: string;
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'Project Alpha',
    category: 'Web Development',
    year: '2024',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#667eea',
  },
  {
    id: 2,
    title: 'Project Beta',
    category: 'UI/UX Design',
    year: '2024',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f093fb',
  },
  {
    id: 3,
    title: 'Project Gamma',
    category: 'Mobile App',
    year: '2023',
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#4facfe',
  },
  {
    id: 4,
    title: 'Project Delta',
    category: 'Branding',
    year: '2023',
    image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: '#43e97b',
  },
  {
    id: 5,
    title: 'Project Epsilon',
    category: 'Web Development',
    year: '2023',
    image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    color: '#fa709a',
  },
  {
    id: 6,
    title: 'Project Zeta',
    category: 'E-commerce',
    year: '2022',
    image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    color: '#a8edea',
  },
];

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects = defaultProjects }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className={styles.projects} id="work">
      {/* Section Header */}
      <div className={styles.header}>
        <div ref={titleRef} className={styles.titleWrapper}>
          <motion.div
            className={styles.line}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <motion.span
              className={styles.sectionLabel}
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            >
              Selected Work
            </motion.span>
          </motion.div>
          
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            Featured Projects
          </motion.h2>
        </div>
        
        <motion.p
          className={styles.sectionDescription}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A selection of projects I&apos;ve worked on, ranging from web applications to mobile apps and branding.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        className={styles.viewAllWrapper}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <a href="#" className={styles.viewAllButton}>
          <span>View All Projects</span>
          <svg viewBox="0 0 24 24" fill="none" className={styles.viewAllArrow}>
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </motion.div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      className={styles.projectCard}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
    >
      <a href="#" className={styles.projectLink}>
        {/* Project Image */}
        <div className={styles.projectImageWrapper}>
          <motion.div
            className={styles.projectImage}
            style={{ background: project.image }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.projectOverlay}>
              <span className={styles.viewProject}>
                View Project
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Project Info */}
        <div className={styles.projectInfo}>
          <div className={styles.projectMeta}>
            <span className={styles.projectCategory}>{project.category}</span>
            <span className={styles.projectYear}>{project.year}</span>
          </div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
        </div>

        {/* Corner Decorations */}
        <div className={styles.cornerDecorations}>
          <span className={styles.corner} />
          <span className={styles.corner} />
          <span className={styles.corner} />
          <span className={styles.corner} />
        </div>
      </a>
    </motion.div>
  );
}
