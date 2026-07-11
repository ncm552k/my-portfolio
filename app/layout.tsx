import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './tailwind.css';
import './globals.scss';

import { IBM_Plex_Mono, IBM_Plex_Sans, Sora } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-sora',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
});

export const metadata: Metadata = {
  title: 'Nguyen Cong Minh — Front-End Developer',
  description:
    'Front-End Developer in Hanoi, Vietnam. React, Next.js, TypeScript. Performance-focused web applications with real production impact.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${plexSans.variable} ${plexMono.variable}`}>{children}</body>
    </html>
  );
}
