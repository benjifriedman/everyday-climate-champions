import EpisodeCard from '@/components/EpisodeCard';
import Pagination from '@/components/Pagination';
import type { EpisodesPageResult } from '@/lib/api';

interface EpisodeListPageProps {
  result: EpisodesPageResult;
}

export default function EpisodeListPage({ result }: EpisodeListPageProps) {
  const { episodes, totalPages, currentPage } = result;

  if (episodes.length === 0) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground">All Episodes</h1>
        <p className="mt-4 text-ecc-warm-600">No episodes available yet. Check back soon!</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground sm:text-4xl">All Episodes</h1>
      {currentPage > 1 && (
        <p className="mt-2 text-ecc-warm-600">Page {currentPage}</p>
      )}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/all-episodes"
      />
    </main>
  );
}
