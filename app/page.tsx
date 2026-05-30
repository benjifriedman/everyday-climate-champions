import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchGraphQL } from '@/lib/graphql';
import { LATEST_EPISODE_QUERY, EPISODE_LIST_QUERY, ALL_CATEGORIES_QUERY } from '@/lib/queries';
import type { LatestEpisodeResponse, EpisodeListResponse, AllCategoriesResponse } from '@/types/wordpress';
import EpisodeCard from '@/components/EpisodeCard';
import { SPOTIFY_SHOW_ID } from '@/lib/constants';

function getSpotifyEmbedUrl(spotifyUrl?: string | null): string {
  if (spotifyUrl) {
    const match = spotifyUrl.match(/episode\/([a-zA-Z0-9]+)/);
    if (match) {
      return `https://open.spotify.com/embed/episode/${match[1]}?utm_source=generator&theme=0`;
    }
  }
  return `https://open.spotify.com/embed/show/${SPOTIFY_SHOW_ID}?utm_source=generator&theme=0`;
}

function toLocalPath(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.pathname.match(/\.\w+$/)) return url;
    return parsed.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return url;
  }
}

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await fetchGraphQL<LatestEpisodeResponse>(LATEST_EPISODE_QUERY);
    const episode = data.episodes.nodes[0];
    if (!episode) return { title: 'Everyday Climate Champions' };

    const description = episode.excerpt.replace(/<[^>]*>/g, '').trim();
    const title = `${episode.title} | Everyday Climate Champions`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        ...(episode.featuredImage && {
          images: [{ url: episode.featuredImage.node.sourceUrl }],
        }),
      },
      twitter: { card: 'summary_large_image', title, description },
    };
  } catch {
    return { title: 'Everyday Climate Champions' };
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function HomePage() {
  let latestEpisode;
  let recentEpisodes;
  let categories;

  try {
    const [latestData, recentData, categoriesData] = await Promise.all([
      fetchGraphQL<LatestEpisodeResponse>(LATEST_EPISODE_QUERY),
      fetchGraphQL<EpisodeListResponse>(EPISODE_LIST_QUERY, { first: 7 }),
      fetchGraphQL<AllCategoriesResponse>(ALL_CATEGORIES_QUERY),
    ]);

    latestEpisode = latestData.episodes.nodes[0] ?? null;
    const allRecent = recentData.episodes.nodes;
    recentEpisodes = latestEpisode
      ? allRecent.filter((ep) => ep.slug !== latestEpisode!.slug).slice(0, 6)
      : allRecent.slice(0, 6);
    categories = categoriesData.podcastCategories.nodes.filter((c) => (c.count ?? 0) > 0);
  } catch {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Content Temporarily Unavailable
        </h1>
        <p className="mt-4 text-ecc-warm-600">
          We&apos;re having trouble loading the latest episodes. Please try again later.
        </p>
      </main>
    );
  }

  if (!latestEpisode) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Everyday Climate Champions
        </h1>
        <p className="mt-4 text-ecc-warm-600">No episodes available yet. Check back soon!</p>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative lg:mx-auto lg:max-w-5xl lg:px-4 lg:pt-8 xl:px-6">
        <div className="relative overflow-hidden lg:rounded-2xl">
          <Image
            src="/san-francisco.jpg"
            alt="San Francisco Bay Area skyline"
            width={1920}
            height={600}
            className="h-[350px] w-full object-cover sm:h-[400px]"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="max-w-2xl text-lg leading-relaxed text-white drop-shadow-lg sm:text-xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
              How are San Francisco Bay Area residents taking climate action?{' '}
              <em>Everyday Climate Champions</em> are people like YOU, transforming
              concern into effective climate resilience and restoration.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://open.spotify.com/episode/26uHhvqyv43HIrjy9XPrDn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-ecc-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ecc-green-800"
              >
                Trailer: About Everyday Climate Champions
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Take Action Guide */}
      <section className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          New Take Action Guide
        </h2>
        <p className="mx-auto mt-2 text-sm text-foreground">
          Hidden Voices of Climate Justice — practical steps you can take to make a difference in your community.
        </p>
        <a
          href="https://www.praxisinaction.org/ecc/wp-content/uploads/2025/11/Take-Action-Guide_Hidden-Voices-of-Climate-Justice.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-lg bg-ecc-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ecc-green-800"
        >
          Download the Guide
        </a>
      </section>

      {/* SF Climate Week Events — commented out, uncomment when new events are added
      <section className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          Upcoming Events During SF Climate Week 2026
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-foreground">
          Join us for live shows, panels, and community gatherings across San Francisco — April 19–25.
        </p>
        <Link
          href="/events"
          className="mt-4 inline-block rounded-lg bg-ecc-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ecc-green-800"
        >
          See All Events
        </Link>
      </section>
      */}

      {/* Latest Episode */}
      <section aria-labelledby="latest-episode-title">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          {latestEpisode.featuredImage && (
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={latestEpisode.featuredImage.node.sourceUrl}
                alt={latestEpisode.featuredImage.node.altText || latestEpisode.title}
                width={latestEpisode.featuredImage.node.mediaDetails.width}
                height={latestEpisode.featuredImage.node.mediaDetails.height}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          )}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-medium uppercase tracking-wide text-ecc-green-600">
              Latest Episode
            </span>
            <h1 id="latest-episode-title" className="text-3xl font-semibold text-foreground sm:text-4xl">
              {latestEpisode.title}
            </h1>
            <time dateTime={latestEpisode.date} className="text-sm text-ecc-green-700">
              {formatDate(latestEpisode.date)}
            </time>
            <div
              className="prose prose-neutral max-w-none text-ecc-warm-700"
              dangerouslySetInnerHTML={{ __html: latestEpisode.excerpt }}
            />
            <Link
              href={`/episodes/${latestEpisode.slug}`}
              className="self-start rounded-lg bg-ecc-green-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ecc-green-800"
            >
              Read more
            </Link>
          </div>
        </div>

        {/* Spotify Player for Latest Episode */}
        <div className="mt-8">
          <iframe
            style={{ borderRadius: '12px' }}
            src={getSpotifyEmbedUrl(latestEpisode.spotifyUrl)}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`Listen to ${latestEpisode.title} on Spotify`}
          />
        </div>

        {/* Episode Resources */}
        {(latestEpisode.recapUrl || latestEpisode.transcriptUrl || latestEpisode.actionStepsUrl) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {latestEpisode.recapUrl && (
              <a
                href={toLocalPath(latestEpisode.recapUrl)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-ecc-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ecc-green-800"
              >
                Recap
              </a>
            )}
            {latestEpisode.transcriptUrl && (
              <a
                href={toLocalPath(latestEpisode.transcriptUrl)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-ecc-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ecc-green-800"
              >
                Transcript
              </a>
            )}
            {latestEpisode.actionStepsUrl && (
              <a
                href={toLocalPath(latestEpisode.actionStepsUrl)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-ecc-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-ecc-green-800"
              >
                Take Action
              </a>
            )}
          </div>
        )}
      </section>

      {/* Recent Episodes */}
      {recentEpisodes && recentEpisodes.length > 0 && (
        <section className="mt-16" aria-labelledby="recent-episodes-heading">
          <h2 id="recent-episodes-heading" className="text-2xl font-semibold text-foreground">
            Recent Episodes
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </section>
      )}

      {/* Browse by Category */}
      {categories && categories.length > 0 && (
        <section className="mt-16" aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="text-2xl font-semibold text-foreground">
            Browse by Category
          </h2>
          <p className="mt-2 text-ecc-warm-600">
            Explore episodes by topic.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/podcast-category/${cat.slug}`}
                className="flex items-center justify-between rounded-lg border border-ecc-warm-200 bg-white px-5 py-4 transition-colors hover:border-ecc-green-300 hover:bg-ecc-green-50"
              >
                <span className="font-medium text-foreground">{cat.name}</span>
                <span className="rounded-full bg-ecc-green-50 px-2.5 py-0.5 text-sm text-ecc-green-700">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
      </div>
    </main>
  );
}
