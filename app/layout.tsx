import type { Metadata } from 'next';
import { Oswald, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-oswald'
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-mono'
});

export const metadata: Metadata = {
  title: 'PropSite Pro - Build Your Professional Property Website',
  description: 'The #1 website builder for Malaysian property agents. Attract more clients, close more deals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={`${oswald.variable} ${ibmPlexMono.variable} font-body`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
