import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchGraphQL } from '@/lib/graphql';
import { CATEGORY_ARCHIVE_QUERY } from '@/lib/queries';
import type { CategoryResponse } from '@/types/wordpress';
import EpisodeCard from '@/components/EpisodeCard';
import Pagination from '@/components/Pagination';

export const revalidate = 60;

const EPISODES_PER_PAGE = 12;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await fetchGraphQL<CategoryResponse>(CATEGORY_ARCHIVE_QUERY, {
      slug,
      first: 1,
      after: null,
    });

    if (!data.podcastCategory) {
      return { title: 'Category Not Found | Everyday Climate Champions' };
    }

    const title = `${data.podcastCategory.name} | Everyday Climate Champions`;
    const description = `Browse episodes in the ${data.podcastCategory.name} category of the Everyday Climate Champions podcast.`;

    return {
      title,
      description,
      openGraph: { title, description },
      twitter: { card: 'summary', title, description },
    };
  } catch {
    return { title: 'Category | Everyday Climate Champions' };
  }
}

export default async function CategoryArchivePage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const data = await fetchGraphQL<CategoryResponse>(CATEGORY_ARCHIVE_QUERY, {
      slug,
      first: EPISODES_PER_PAGE,
      after: null,
    });

    if (!data.podcastCategory) {
      notFound();
    }

    const { name, episodes: episodesData } = data.podcastCategory;
    const episodes = episodesData.nodes;
    const hasNextPage = episodesData.pageInfo.hasNextPage;
    const totalPages = hasNextPage ? 2 : 1;

    if (episodes.length === 0) {
      return (
        <main className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">{name}</h1>
          <p className="mt-4 text-ecc-warm-600">
            No episodes in this category yet. Check back soon!
          </p>
        </main>
      );
    }

    return (
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/categories"
          className="mb-3 inline-flex items-center gap-1 text-sm text-ecc-green-700 hover:text-ecc-green-800"
        >
          ← All Categories
        </Link>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{name}</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
        <Pagination
          currentPage={1}
          totalPages={totalPages}
          basePath={`/podcast-category/${slug}`}
        />
      </main>
    );
  } catch {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Content Temporarily Unavailable
        </h1>
        <p className="mt-4 text-ecc-warm-600">
          We&apos;re having trouble loading this category. Please try again later.
        </p>
      </main>
    );
  }
}
