import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { fetchGraphQL } from '@/lib/graphql';
import { LATEST_EPISODE_QUERY, EPISODE_LIST_QUERY } from '@/lib/queries';
import type { LatestEpisodeResponse, EpisodeListResponse } from '@/types/wordpress';
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

export const revalidate = 60;

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

  try {
    const [latestData, recentData] = await Promise.all([
      fetchGraphQL<LatestEpisodeResponse>(LATEST_EPISODE_QUERY),
      fetchGraphQL<EpisodeListResponse>(EPISODE_LIST_QUERY, { first: 7 }),
    ]);

    latestEpisode = latestData.episodes.nodes[0] ?? null;
    const allRecent = recentData.episodes.nodes;
    recentEpisodes = latestEpisode
      ? allRecent.filter((ep) => ep.slug !== latestEpisode!.slug).slice(0, 6)
      : allRecent.slice(0, 6);
  } catch {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">
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
        <h1 className="text-2xl font-bold text-foreground">
          Everyday Climate Champions
        </h1>
        <p className="mt-4 text-ecc-warm-600">No episodes available yet. Check back soon!</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section - Latest Episode */}
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
            <h1 id="latest-episode-title" className="text-3xl font-bold text-foreground sm:text-4xl">
              {latestEpisode.title}
            </h1>
            <time dateTime={latestEpisode.date} className="text-sm text-ecc-warm-600">
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-ecc-green-700 px-4 py-2 text-sm font-medium text-ecc-green-700 transition-colors hover:bg-ecc-green-50"
              >
                Recap
              </a>
            )}
            {latestEpisode.transcriptUrl && (
              <a
                href={toLocalPath(latestEpisode.transcriptUrl)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-ecc-green-700 px-4 py-2 text-sm font-medium text-ecc-green-700 transition-colors hover:bg-ecc-green-50"
              >
                Transcript
              </a>
            )}
            {latestEpisode.actionStepsUrl && (
              <a
                href={toLocalPath(latestEpisode.actionStepsUrl)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-ecc-green-700 px-4 py-2 text-sm font-medium text-ecc-green-700 transition-colors hover:bg-ecc-green-50"
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
          <h2 id="recent-episodes-heading" className="text-2xl font-bold text-foreground">
            Recent Episodes
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
