import './global.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Navbar } from '@/components/nav';
import FamilyDrawer from '@/components/drawer/menu';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
    url: 'https://leerob.io',
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
    title: 'Lee Robinson',
    card: 'summary_large_image',
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71',
  },
};

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
        'text-black bg-gray-100 dark:text-white dark:bg-[#111010]',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased">
        <main className="max-w-2xl mx-auto px-2 pt-32 md:px-0">
          <FamilyDrawer />
          {children}

          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
