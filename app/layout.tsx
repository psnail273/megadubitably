import type { Metadata } from 'next';
import './globals.css';
import { Open_Sans, Playfair_Display_SC } from 'next/font/google';
import Navigation from '@/components/navigation/navigation';
import MuiRegistry from '@/components/mui-registry';
import Footer from '@/components/footer/footer';
import DevModeBanner from '@/components/dev-banner/devBanner';

const openSansLight = Open_Sans({
  variable: '--font-open-sans-light',
  subsets: ['latin'], 
});

const playfairDisplaySc = Playfair_Display_SC({
  variable: '--font-playfair-display-sc',
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Margaret Hardy Portfolio',
  description: 'Collection of my work as an art director and illustrator over the years.',
  openGraph: {
    images: [
      {
        url: '/posters/070_1350x2000.jpeg',
        width: 1350,
        height: 2000,
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSansLight.variable} ${playfairDisplaySc.variable} min-h-full`}>
      <body className={'antialiased min-h-full flex flex-col'}>
        <DevModeBanner />
        <MuiRegistry>
          <Navigation />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MuiRegistry>
      </body>
    </html>
  );
}
