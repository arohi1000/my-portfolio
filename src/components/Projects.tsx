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
    title: 'WARDEN',
    category: 'Trust Protocol',
    year: '2026',
    image: '/warden-project.png',
    color: '#667eea',
  },
  // Commented out remaining projects for now
  // {
  //   id: 2,
  //   title: 'Project Beta',
  //   category: 'UI/UX Design',
  //   year: '2024',
  //   image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  //   color: '#f093fb',
  // },
  // {
  //   id: 3,
  //   title: 'Project Gamma',
  //   category: 'Mobile App',
  //   year: '2023',
  //   image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  //   color: '#4facfe',
  // },
  // {
  //   id: 4,
  //   title: 'Project Delta',
  //   category: 'Branding',
  //   year: '2023',
  //   image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  //   color: '#43e97b',
  // },
  // {
  //   id: 5,
  //   title: 'Project Epsilon',
  //   category: 'Web Development',
  //   year: '2023',
  //   image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  //   color: '#fa709a',
  // },
  // {
  //   id: 6,
  //   title: 'Project Zeta',
  //   category: 'E-commerce',
  //   year: '2022',
  //   image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  //   color: '#a8edea',
  // },
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
            Coming Soon
          </motion.h2>
        </div>
        
        <motion.p
          className={styles.sectionDescription}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Sneak peeks at my current builds. A mix of personal ventures and technical experiments in progress.
        </motion.p>
      </div>

      {/* Project Showcase */}
      <div className={styles.showcase}>
        {/* Left side - Project Tile */}
        <div className={styles.projectTile}>
          {projects.slice(0, 1).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Right side - Project Description */}
        <div className={styles.projectDescription}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className={styles.descriptionTitle}>The Problem: The Payment Standoff</h3>
            <p className={styles.descriptionText}>
              Founders fear being ghosted; developers fear working for free.
            </p>

            <h3 className={styles.descriptionTitle}>The Solution: Warden</h3>
            <p className={styles.descriptionText}>
              The world's first technical escrow protocol. We replace subjective human trust with automated Code Verification. Funds remain locked in the Vault and are only released when the code is verified, running, and passes strict technical gates.
            </p>
          </motion.div>
        </div>
      </div>

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
      <a href="https://usewarden.com/" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
        {/* Project Image */}
        <div className={styles.projectImageWrapper}>
          <motion.div
            className={styles.projectImage}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            {project.image.startsWith('/') ? (
              <img
                src={project.image}
                alt={project.title}
                className={styles.projectImageFile}
              />
            ) : (
              <div style={{ background: project.image }} className={styles.projectImageBackground} />
            )}
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
