import type { StaticImageData } from 'next/image';

export type Shot = {
  src: StaticImageData;
  alt: string;
  device: 'desktop' | 'mobile';
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  /** One line: what it is and why it matters. */
  summary: string;
  role: string;
  live: { href: string; label: string };
  cover: Shot;
  brief: string[];
  built: { title: string; body: string }[];
  stack: { group: string; items: string[] }[];
  facts: { label: string; value: string }[];
  gallery: Shot[];
};
