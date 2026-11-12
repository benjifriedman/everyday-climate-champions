import type { Metadata } from 'next';
import { getEpisodesPage } from '@/lib/api';
import EpisodeListPage from '@/components/EpisodeListPage';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'All Episodes',
  description:
    'Browse all episodes of the Everyday Climate Champions podcast. Discover stories of everyday Bay Area people helping with climate change.',
  openGraph: {
    title: 'Everyday Climate Champions | All Episodes',
    description:
      'Browse all episodes of the Everyday Climate Champions podcast. Discover stories of everyday Bay Area people helping with climate change.',
  },
  twitter: {
    card: 'summary',
    title: 'Everyday Climate Champions | All Episodes',
    description:
      'Browse all episodes of the Everyday Climate Champions podcast. Discover stories of everyday Bay Area people helping with climate change.',
  },
};

export default async function AllEpisodesPage() {
  const result = await getEpisodesPage(1);
  return <EpisodeListPage result={result} />;
}
