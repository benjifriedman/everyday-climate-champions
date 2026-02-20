import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEpisodesPage } from '@/lib/api';
import EpisodeListPage from '@/components/EpisodeListPage';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  if (isNaN(pageNum) || pageNum < 1) {
    return { title: 'All Episodes | Everyday Climate Champions' };
  }

  const title = `All Episodes - Page ${pageNum} | Everyday Climate Champions`;
  const description = `Browse page ${pageNum} of all Everyday Climate Champions podcast episodes.`;

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary', title, description },
  };
}

export default async function AllEpisodesPageN({ params }: PageProps) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  if (isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  // Redirect page 1 to the canonical /all-episodes URL
  if (pageNum === 1) {
    const { redirect } = await import('next/navigation');
    redirect('/all-episodes');
  }

  try {
    const result = await getEpisodesPage(pageNum);

    // If the requested page has no episodes, it doesn't exist
    if (result.episodes.length === 0) {
      notFound();
    }

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
