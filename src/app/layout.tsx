import type { Metadata } from 'next';
import { Inter, Roboto_Flex } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-flex',
});

export const metadata: Metadata = {
  title: 'Agnivesh | Creative Technologist & Founder',
  description: 'Building the web of tomorrow with Next.js, AI, and 3D motion. Founder of Fluxenta and Warden.',
  keywords: ['portfolio', 'web developer', 'creative developer', 'frontend developer', 'UI/UX'],
  authors: [{ name: 'Agnivesh Arohi' }],
  openGraph: {
    title: 'Agnivesh | Creative Technologist & Founder',
    description: 'Building the web of tomorrow with Next.js, AI, and 3D motion. Founder of Fluxenta and Warden.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agnivesh | Creative Technologist & Founder',
    description: 'Building the web of tomorrow with Next.js, AI, and 3D motion. Founder of Fluxenta and Warden.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoFlex.variable}`}>
      <body className="light">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
