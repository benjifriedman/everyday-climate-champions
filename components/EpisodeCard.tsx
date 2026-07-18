import Link from 'next/link';
import Image from 'next/image';
import type { WPEpisode } from '@/types/wordpress';

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&hellip;/g, '…')
    .trim();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface EpisodeCardProps {
  episode: Pick<WPEpisode, 'title' | 'slug' | 'date' | 'excerpt' | 'featuredImage'>;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const { title, slug, date, excerpt, featuredImage } = episode;
  const description = stripHtml(excerpt);

  return (
    <Link
      href={`/episodes/${slug}`}
      className="group block overflow-hidden rounded-xl bg-ecc-warm-50 shadow-sm transition-shadow hover:shadow-md"
    >
      {featuredImage && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ecc-warm-100">
          {(() => {
            const { width, height } = featuredImage.node.mediaDetails;
            const isSquareOrPortrait = height >= width;
            return (
              <Image
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText || title}
                width={width}
                height={height}
                className={`h-full w-full transition-transform group-hover:scale-105 ${
                  isSquareOrPortrait ? 'object-contain' : 'object-cover'
                }`}
              />
            );
          })()}
        </div>
      )}
      <div className="p-4">
        <time dateTime={date} className="text-sm text-ecc-warm-600">
          {formatDate(date)}
        </time>
        <h3 className="mt-1 text-lg font-semibold text-foreground transition-colors group-hover:text-ecc-green-700">
          {title}
        </h3>
        {description && (
          <p className="mt-2 line-clamp-3 text-sm text-ecc-warm-700">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
