'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

// Text animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const lineVariants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const charVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

interface HeroProps {
  name?: string;
  title?: string;
  subtitle?: string;
}

export default function Hero({
  name = "YOUR NAME",
  title = "Creative Developer",
  subtitle = "Building digital experiences with code and creativity"
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        className={styles.char}
        variants={charVariants}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <section ref={containerRef} className={styles.hero} id="hero">
      {/* Background Grid Effect */}
      <div className={styles.gridOverlay}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.gridLine} />
        ))}
      </div>

      {/* Main Hero Content */}
      <motion.div
        className={styles.heroContent}
        style={{ y: y1, opacity }}
      >
        {/* Eyebrow Text */}
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
        </motion.div>

        {/* Main Headline */}
        <motion.div
          className={styles.headline}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.line}>
            <motion.div className={styles.lineInner} variants={lineVariants}>
              {splitText(name)}
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a href="#work" className={styles.ctaButton}>
            <span>View Work</span>
            <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className={styles.ctaButtonOutline}>
            <span>Get in Touch</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
        <span className={styles.scrollText}>Scroll</span>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className={styles.floatingCross}
        style={{ y: y2 }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 45 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <svg viewBox="0 0 100 100" fill="none">
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>
    </section>
  );
}
