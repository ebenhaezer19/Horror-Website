import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navigation/Navbar';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { VideoBackground } from '@/components/ui/VideoBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Horror Gallery',
  description: 'Exploring the depths of human consciousness through dark art',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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