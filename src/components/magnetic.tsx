'use client';

import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useSpring } from 'motion/react';

const spring = { type: 'spring', duration: 0.5, bounce: 0.2 } as const;

/** Pulls its child toward the cursor. Mouse only; off for reduced motion. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;

  function handleMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ transform }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
