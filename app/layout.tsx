import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { AudioPlayerProvider } from '@/components/AudioPlayerProvider';
import PageShell from '@/components/PageShell';
import PersistentAudioPlayer from '@/components/PersistentAudioPlayer';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Everyday Climate Champions',
  description:
    'A podcast about everyday Bay Area people helping with climate change. Listen to inspiring stories, actionable steps, and community voices making a difference.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased pb-20`}>
        <AudioPlayerProvider>
          <PageShell>{children}</PageShell>
          <PersistentAudioPlayer />
        </AudioPlayerProvider>
        <Analytics />
      </body>
    </html>
  );
}
