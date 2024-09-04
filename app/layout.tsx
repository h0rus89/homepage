import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Caveat } from 'next/font/google';
import FamilyDrawer from '@/components/drawer/menu';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { cn } from "@/lib/utils";
import DotPattern from "@/components/ac/DotPattern";

export const metadata: Metadata = {
  metadataBase: new URL('https://leerob.io'),
  title: {
    default: 'Graf-Anton-Schule',
    template: '%s | Graf-Anton-Schule',
  },
  description: 'Gemeinschaftsschule des Landkreises Merzig-Wadern',
  openGraph: {
    title: 'Graf-Anton-Schule',
    description: 'Gemeinschaftsschule des Landkreises Merzig-Wadern',
    url: 'https://gaswadern.vercel.app',
    siteName: 'Graf-Anton-Schule',
    locale: 'de_DE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Graf-Anton-Schule',
    card: 'summary_large_image',
  },
};

const caveat = Caveat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
});

const cx = (...classes) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-gray-100 relative',
        GeistSans.variable,
        GeistMono.variable,
        caveat.variable
      )}
    >
      <body className="antialiased">
        <DotPattern
          className={cn(
            "fixed inset-0 [mask-image:radial-gradient(50vw_circle_at_center,white,transparent)] h-full w-full -z-10",
          )}
        />
        <main className="relative max-w-2xl mx-auto px-2 md:px-0 pt-24 pb-8">
          <FamilyDrawer />
          {children}
          
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
