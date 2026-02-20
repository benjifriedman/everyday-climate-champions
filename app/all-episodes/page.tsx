import type { Metadata } from 'next';
import { getEpisodesPage } from '@/lib/api';
import EpisodeListPage from '@/components/EpisodeListPage';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'All Episodes | Everyday Climate Champions',
  description:
    'Browse all episodes of the Everyday Climate Champions podcast. Discover stories of everyday Bay Area people helping with climate change.',
  openGraph: {
    title: 'All Episodes | Everyday Climate Champions',
    description:
      'Browse all episodes of the Everyday Climate Champions podcast. Discover stories of everyday Bay Area people helping with climate change.',
  },
  twitter: {
    card: 'summary',
    title: 'All Episodes | Everyday Climate Champions',
    description:
      'Browse all episodes of the Everyday Climate Champions podcast. Discover stories of everyday Bay Area people helping with climate change.',
  },
};

export default async function AllEpisodesPage() {
  try {
    const result = await getEpisodesPage(1);
    return <EpisodeListPage result={result} />;
  } catch {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Content Temporarily Unavailable
        </h1>
        <p className="mt-4 text-ecc-warm-600">
          We&apos;re having trouble loading episodes. Please try again later.
        </p>
      </main>
    );
  }
}
