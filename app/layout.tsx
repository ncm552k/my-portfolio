import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './tailwind.css';
import './globals.scss';

import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';

import BackgroundVideo from '@/components/modules/BackgroundVideo';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Nguyen Cong Minh — Software Engineer',
  description: `Minh is a Hanoi-based Frontend Developer with over three years of experience specializing in React, Next.js, and TypeScript. He currently builds for CareerViet, a leading Vietnamese recruitment platform, at MOR Software, and has previously delivered projects at AIT Corporation and NTQ Solution — including work for Nick Scali (Australia) and Viettel Post. He's currently expanding into full-stack development, with a focus on clean architecture and end-to-end feature ownership.`,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <BackgroundVideo />
        {children}
      </body>
    </html>
  );
}
