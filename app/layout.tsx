import './globals.css';
import type { Metadata } from 'next';
import { Alumni_Sans } from 'next/font/google';
import SEO from '@/components/SEO';
import WalletProvider from '@/components/WalletProvider';
import { AuthProvider } from '@/components/auth/AuthProvider';

const alumniSans = Alumni_Sans({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-alumni-sans'
});

export const metadata: Metadata = {
  title: 'MILLIONBONE ($MBONE) - HODL THE BONE, HUNT THE MOON',
  description: 'MILLIONBONE is a premium community-driven meme coin built for diamond hands. Join the pack and hunt the moon with $MBONE.',
  openGraph: {
    title: 'MILLIONBONE ($MBONE) - Premium Meme Coin',
    description: 'Community-driven meme coin with auto-burn mechanics and holder rewards. HODL THE BONE, HUNT THE MOON!',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
        width: 1200,
        height: 630,
        alt: 'MILLIONBONE Logo'
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MILLIONBONE ($MBONE) - Premium Meme Coin',
    description: 'Community-driven meme coin with auto-burn mechanics and holder rewards. HODL THE BONE, HUNT THE MOON!',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
        alt: 'MILLIONBONE Logo'
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${alumniSans.variable} font-sans`}>
        <AuthProvider>
          <WalletProvider>
            <SEO />
            {children}
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  );
}