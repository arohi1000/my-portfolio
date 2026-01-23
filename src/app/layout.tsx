import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Your Name | Creative Developer Portfolio',
  description: 'A creative developer portfolio showcasing web development, UI/UX design, and digital experiences.',
  keywords: ['portfolio', 'web developer', 'creative developer', 'frontend developer', 'UI/UX'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Your Name | Creative Developer Portfolio',
    description: 'A creative developer portfolio showcasing web development, UI/UX design, and digital experiences.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name | Creative Developer Portfolio',
    description: 'A creative developer portfolio showcasing web development, UI/UX design, and digital experiences.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="light">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
