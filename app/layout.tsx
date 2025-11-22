import type { Metadata } from 'next';
import './globals.css';
import { Open_Sans, Playfair_Display_SC } from 'next/font/google';
import Navigation from '@/components/navigation/navigation';
import MuiRegistry from '@/components/mui-registry';

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
  title: 'Margaret Hardy Portfolio',
  description: 'Collection of my work as an art director and illustrator over the years.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSansLight.variable} ${playfairDisplaySc.variable} h-full`}>
      <body className={'antialiased h-full flex flex-col'}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MuiRegistry>
          <Navigation />
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </MuiRegistry>
      </body>
    </html>
  );
}
