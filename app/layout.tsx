import '@/app/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Auth template',
  icons: [{
    rel: 'icon',
    url: '/favicon_32x32.ico',
  },
  //   {
  //   rel: 'apple-touch-icon',
  //   url: 'https:// example. com/ apple-icon. png'
  // }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
