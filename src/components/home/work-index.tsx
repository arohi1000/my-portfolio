'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, type PointerEvent } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useSpring } from 'motion/react';
import type { Project } from '@/content/types';

type Item = Pick<Project, 'slug' | 'index' | 'title' | 'category' | 'year' | 'summary' | 'cover'>;

const follow = { type: 'spring', duration: 0.5, bounce: 0.2 } as const;

/**
 * Big project rows. With a mouse, a screenshot preview trails the cursor and
 * slides between projects; on touch, each row shows its screenshot inline.
 */
export function WorkIndex({ items }: { items: Item[] }) {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(0);
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, follow);
  const y = useSpring(0, follow);
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;

  function handleEnter(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== 'mouse') return;
    // Start at the cursor instead of springing in from the corner of the screen.
    x.jump(event.clientX);
    y.jump(event.clientY);
  }

  function handleMove(event: PointerEvent<HTMLUListElement>) {
    if (event.pointerType !== 'mouse') return;
    if (reduceMotion) {
      x.jump(event.clientX);
      y.jump(event.clientY);
    } else {
      x.set(event.clientX);
      y.set(event.clientY);
    }
  }

  return (
    <>
      <ul
        className="work-list"
        onPointerEnter={handleEnter}
        onPointerMove={handleMove}
        onPointerLeave={() => setVisible(false)}
      >
        {items.map((item, i) => (
          <li key={item.slug} className="border-b border-line">
            <Link
              href={`/work/${item.slug}`}
              transitionTypes={['nav-forward']}
              onPointerEnter={() => {
                setShown(i);
                setVisible(true);
              }}
              className="work-row grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-7 md:py-10"
            >
              <span className="col-span-2 font-mono text-xs text-muted md:col-span-1">{item.index}</span>
              <span className="col-span-10 text-[clamp(2.5rem,6.5vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] md:col-span-8">
                {item.title}
              </span>
              <span className="col-span-10 col-start-3 text-muted md:col-span-2 md:col-start-auto">
                {item.category}
              </span>
              <span className="hidden text-right font-mono text-xs text-muted md:col-span-1 md:block">
                {item.year}
              </span>
              <span className="touch-only col-span-12 mt-3 overflow-hidden rounded-xl border border-line bg-paper-2">
                <Image
                  src={item.cover.src}
                  alt=""
                  sizes="100vw"
                  placeholder="blur"
                  className="h-auto w-full"
                />
              </span>
              <span className="col-span-12 max-w-xl text-muted md:col-span-6 md:col-start-2">
                {item.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <motion.div
        aria-hidden="true"
        style={{ transform }}
        className="pointer-only pointer-events-none fixed left-0 top-0 z-30"
      >
        <div
          data-visible={visible}
          className="preview -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-paper-2 shadow-2xl shadow-black/25"
        >
          <div className="relative aspect-[16/10] w-[clamp(18rem,28vw,28rem)]">
            <div
              className="preview-stack absolute inset-x-0 top-0"
              style={{
                height: `${items.length * 100}%`,
                transform: `translateY(-${(shown * 100) / items.length}%)`,
              }}
            >
              {items.map((item) => (
                <div key={item.slug} className="relative w-full" style={{ height: `${100 / items.length}%` }}>
                  <Image src={item.cover.src} alt="" fill sizes="28rem" className="object-cover object-top" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
