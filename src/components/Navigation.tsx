'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import styles from './Navigation.module.css';
import { useLenis } from './SmoothScroll';

const navLinks = [
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/arohi1000' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/agnivesh-arohi-/' },
  { name: 'Twitter', href: 'https://twitter.com' },
  { name: 'Instagram', href: 'https://www.instagram.com/_agnivesh_arohi_/' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  /* Hook for smooth scroll */
  const lenis = useLenis();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      // Fallback
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }

    // For mobile menu
    if (menuOpen) closeMenu();
  };

  return (
    <>
      {/* HUD Navigation */}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContent}>
          {/* Brand Logo */}
          <motion.a
            href="#"
            className={styles.brand}
            onClick={(e) => handleLinkClick(e, '#intro')} // Assuming top is intro or just preventing reload
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className={styles.brandText}>PORTFOLIO</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <motion.div
              className={styles.navLinks}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={styles.navLink}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  <span className={styles.linkText}>{link.name}</span>
                  <span className={styles.linkUnderline} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            className={styles.socialLinks}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={link.name}
              >
                {link.name === 'GitHub' && (
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                )}
                {link.name === 'LinkedIn' && (
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
                {link.name === 'Twitter' && (
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.socialIcon}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
              </a>
            ))}
          </motion.div>

          {/* Theme Toggle */}
          <motion.button
            className={styles.themeToggle}
            onClick={toggleTheme}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            aria-label="Toggle theme"
          >
            <div className={styles.toggleTrack}>
              <div className={`${styles.toggleThumb} ${theme === 'dark' ? styles.dark : ''}`} />
            </div>
          </motion.button>

          {/* Menu Button */}
          <motion.button
            className={`${styles.menuButton} ${menuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <div className={styles.menuLines}>
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
            </div>
          </motion.button>
        </div>
      </nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.fullscreenMenu}
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 3rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 3rem)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className={styles.menuContent}>
              <nav className={styles.menuNav}>
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={styles.menuLink}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <span className={styles.menuLinkNumber}>0{index + 1}</span>
                    <span className={styles.menuLinkText}>{link.name}</span>
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className={styles.menuFooter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className={styles.menuSocial}>
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.menuSocialLink}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                <p className={styles.menuEmail}>hello@agnivesharohi.com</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
