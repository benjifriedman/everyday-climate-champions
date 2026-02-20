import Link from 'next/link';
import Image from 'next/image';
import type { WPEpisode } from '@/types/wordpress';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
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
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={featuredImage.node.sourceUrl}
            alt={featuredImage.node.altText || title}
            width={featuredImage.node.mediaDetails.width}
            height={featuredImage.node.mediaDetails.height}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
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
