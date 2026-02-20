import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchGraphQL } from '@/lib/graphql';
import { SINGLE_EPISODE_QUERY } from '@/lib/queries';
import type { SingleEpisodeResponse } from '@/types/wordpress';
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
    if (parsed.pathname.match(/\.\w+$/)) return url; // keep external file links (PDFs, etc.)
    return parsed.pathname.replace(/\/+$/, '') || '/';
  } catch {
    return url;
  }
}

export const revalidate = 60;

interface EpisodePageProps {
  params: Promise<{ slug: string }>;
}

async function getEpisode(slug: string) {
  try {
    const data = await fetchGraphQL<SingleEpisodeResponse>(SINGLE_EPISODE_QUERY, { slug });
    return data.episode ?? null;
  } catch {
    return null;
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisode(slug);

  if (!episode) {
    return { title: 'Episode Not Found | Everyday Climate Champions' };
  }

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
}

export default async function EpisodeDetailPage({ params }: EpisodePageProps) {
  const { slug } = await params;

  let episode;
  try {
    const data = await fetchGraphQL<SingleEpisodeResponse>(SINGLE_EPISODE_QUERY, { slug });
    episode = data.episode;
  } catch {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Content Temporarily Unavailable
        </h1>
        <p className="mt-4 text-ecc-warm-600">
          We&apos;re having trouble loading this episode. Please try again later.
        </p>
      </main>
    );
  }

  if (!episode) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {episode.title}
          </h1>
          <time dateTime={episode.date} className="mt-2 block text-sm text-ecc-warm-600">
            {formatDate(episode.date)}
          </time>
        </header>

        {episode.featuredImage && (
          <div className="mb-8 overflow-hidden rounded-xl">
            <Image
              src={episode.featuredImage.node.sourceUrl}
              alt={episode.featuredImage.node.altText || episode.title}
              width={episode.featuredImage.node.mediaDetails.width}
              height={episode.featuredImage.node.mediaDetails.height}
              className="h-auto w-full"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-neutral max-w-none text-ecc-warm-700"
          dangerouslySetInnerHTML={{ __html: episode.content }}
        />

        {/* Spotify Player */}
        <div className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            {episode.spotifyUrl ? 'Listen to This Episode' : 'Listen on Spotify'}
          </h2>
          <iframe
            style={{ borderRadius: '12px' }}
            src={getSpotifyEmbedUrl(episode.spotifyUrl)}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`Listen to ${episode.title} on Spotify`}
          />
        </div>

        {/* Episode Resources */}
        {(episode.recapUrl || episode.transcriptUrl || episode.actionStepsUrl) && (
          <div className="mt-8 rounded-xl bg-ecc-warm-50 p-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Episode Resources</h2>
            <div className="flex flex-wrap gap-4">
              {episode.recapUrl && (
                <a
                  href={toLocalPath(episode.recapUrl)}
                  className="inline-flex items-center gap-2 rounded-lg bg-ecc-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ecc-green-800"
                >
                  📝 Recap
                </a>
              )}
              {episode.transcriptUrl && (
                <a
                  href={toLocalPath(episode.transcriptUrl)}
                  className="inline-flex items-center gap-2 rounded-lg bg-ecc-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ecc-green-800"
                >
                  📄 Transcript
                </a>
              )}
              {episode.actionStepsUrl && (
                <a
                  href={toLocalPath(episode.actionStepsUrl)}
                  className="inline-flex items-center gap-2 rounded-lg bg-ecc-green-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ecc-green-800"
                >
                  🌱 Take Action
                </a>
              )}
            </div>
          </div>
        )}

        {/* Episode Number */}
        {episode.episodeNumber && (
          <p className="mt-4 text-sm text-ecc-warm-500">{episode.episodeNumber}</p>
        )}
      </article>
    </main>
  );
}
