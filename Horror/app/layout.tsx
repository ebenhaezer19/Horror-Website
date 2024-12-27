import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navigation/Navbar';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { VideoBackground } from '@/components/ui/VideoBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Horror Gallery',
  description: 'Exploring the depths of human consciousness through dark art',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <VideoBackground />
        <CustomCursor />
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}