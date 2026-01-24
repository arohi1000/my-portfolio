'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import styles from './SkillCursor.module.css';

export default function SkillCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [activeSkill, setActiveSkill] = useState<string | null>(null);

    const springConfig = { damping: 20, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        // Listen for custom event from LogoLoop
        const handleSkillHover = (e: CustomEvent<{ skill: string | null }>) => {
            setActiveSkill(e.detail.skill);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('skill-hover' as any, handleSkillHover as any);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('skill-hover' as any, handleSkillHover as any);
        };
    }, [cursorX, cursorY]);

    return (
        <AnimatePresence>
            {activeSkill && (
                <motion.div
                    className={styles.cursor}
                    style={{ x: cursorXSpring, y: cursorYSpring }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className={styles.label}>{activeSkill}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
