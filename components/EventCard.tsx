import Link from 'next/link';
import Image from 'next/image';
import type { WPPage } from '@/types/wordpress';
import type { EventMeta } from '@/lib/events';

interface EventCardProps {
  page: WPPage;
  meta: EventMeta;
}

export default function EventCard({ page, meta }: EventCardProps) {
  return (
    <Link
      href={`/${meta.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-ecc-warm-200 bg-white shadow-sm transition-all hover:border-ecc-green-300 hover:shadow-lg"
    >
      {page.featuredImage ? (
        <div className="relative aspect-[3/2] w-full overflow-hidden">
          <Image
            src={page.featuredImage.node.sourceUrl}
            alt={page.featuredImage.node.altText || page.title}
            width={page.featuredImage.node.mediaDetails.width}
            height={page.featuredImage.node.mediaDetails.height}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-3 pt-8">
            <p className="text-sm font-semibold text-white drop-shadow">
              {meta.displayDate}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-end bg-gradient-to-br from-ecc-green-600 to-ecc-green-800 px-5 pb-4 pt-10">
          <p className="text-sm font-semibold text-white">{meta.displayDate}</p>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {meta.time && (
          <p className="text-sm text-ecc-green-700">{meta.time}</p>
        )}
        <h2 className="mt-1 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-ecc-green-700">
          {page.title}
        </h2>
        <div className="mt-auto flex h-[3em] items-start pt-4">
          <p className="text-sm leading-snug text-ecc-warm-600">
            <span aria-hidden="true" className="mr-1">📍</span>
            {meta.location}
          </p>
        </div>
      </div>
    </Link>
  );
}
