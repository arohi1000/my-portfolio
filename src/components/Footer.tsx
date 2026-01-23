'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import styles from './Footer.module.css';

interface FooterProps {
  email?: string;
  phone?: string;
  location?: string;
}

export default function Footer({
  email = 'hello@yourportfolio.com',
  phone = '+1 234 567 890',
  location = 'New York, USA',
}: FooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(brandRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
  ];

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  // Split text animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        className={styles.char}
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.8,
          delay: index * 0.03,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <footer ref={containerRef} className={styles.footer} id="contact">
      {/* Contact Section */}
      <div className={styles.contactSection}>
        <motion.div
          className={styles.contactHeader}
          style={{ y, opacity }}
        >
          <span className={styles.contactLabel}>Let&apos;s work together</span>
          <h2 className={styles.contactTitle}>
            Have a project in mind?
          </h2>
          <p className={styles.contactSubtitle}>
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </motion.div>

        <motion.a
          href={`mailto:${email}`}
          className={styles.emailLink}
          style={{ y, opacity }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{email}</span>
          <svg viewBox="0 0 24 24" fill="none" className={styles.emailArrow}>
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.a>

        <motion.div
          className={styles.contactInfo}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Phone</span>
            <span className={styles.infoValue}>{phone}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Location</span>
            <span className={styles.infoValue}>{location}</span>
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerContent}>
          {/* Brand */}
          <div ref={brandRef} className={styles.footerBrand}>
            <div className={styles.brandText}>
              {splitText('PORTFOLIO')}
            </div>
          </div>

          {/* Navigation */}
          <motion.nav
            className={styles.footerNav}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={styles.footerNavLink}>
                {link.name}
              </a>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            className={styles.footerSocial}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerSocialLink}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className={styles.footerCopyright}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p>
            Built with{' '}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
              Next.js
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
