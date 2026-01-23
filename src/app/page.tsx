'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  useEffect(() => {
    // Prevent scroll during loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  return (
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SmoothScroll>
              {/* Navigation */}
              <Navigation />

              {/* Main Wrapper */}
              <main>
                {/* Hero Section */}
                <Hero
                  name="Agnivesh Arohi"
                  title="Developer | Founder"
                  subtitle="Helping early-stage startups launch faster with scalable MVPs and high-performance architecture. I combine deep technical expertise in modern stacks with a founder's mindset—focusing on product viability, speed, and user trust. Currently building the future of freelance security with Warden."
                />

                {/* Projects Section */}
                <Projects />

                {/* Skills Section */}
                <Skills />

                {/* Footer / Contact Section */}
                <Footer
                  email="hello@agnivesharohi.com"
                  phone="+91 8529319774"
                  location="Delhi, India"
                />
              </main>
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
