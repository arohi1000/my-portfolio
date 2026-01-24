'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import styles from './Footer.module.css';

interface FooterProps {
  email?: string;
  phone?: string;
  location?: string;
}

export default function Footer({
  email = 'hello@agnivesharohi.com',
  phone = '+91 8529319774',
  location = 'Delhi, India',
}: FooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(brandRef, { once: true, margin: '-100px' });

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/arohi1000' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/agnivesh-arohi-/' },
    { name: 'Twitter', href: 'https://twitter.com' },
    { name: 'Instagram', href: 'https://www.instagram.com/_agnivesh_arohi_/' },
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase.from('messages').insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <footer ref={containerRef} className={styles.footer} id="contact">
      {/* Contact Section */}
      <div className={styles.contactSection}>
        <div className={styles.contactContent}>
          {/* Left: Text & Info */}
          <motion.div className={styles.contactLeft} style={{ y, opacity }}>
            <span className={styles.contactLabel}>Let&apos;s work together</span>
            <h2 className={styles.contactTitle}>Have a project in mind?</h2>
            <p className={styles.contactSubtitle}>
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>

            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email</span>
                <a href={`mailto:${email}`} className={styles.detailValue}>{email}</a>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location</span>
                <span className={styles.detailValue}>{location}</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            className={styles.contactForm}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className={styles.formInput}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className={styles.formInput}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Tell me about your project"
                className={styles.formTextarea}
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Ping Me'}
            </button>

            {status === 'success' && (
              <p className={`${styles.statusMessage} ${styles.success}`}>Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className={`${styles.statusMessage} ${styles.error}`}>Something went wrong. Please try again.</p>
            )}
          </motion.form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerContent}>
          {/* Brand */}
          <div ref={brandRef} className={styles.footerBrand}>
            <div
              className={styles.brandText}
              style={{
                fontFamily: 'var(--font-birthstone)',
                textTransform: 'none',
                /* Adjust scaling if needed for the new font size */
              }}
            >
              {/* Manual font size adjustment might be needed in CSS module or here if splitText allows */}
              <span style={{ fontSize: '4rem' }}>
                {splitText('PORTFOLIO')}
              </span>
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
          <p>© {new Date().getFullYear()} Agnivesh Arohi. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
