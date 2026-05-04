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
    <article className="overflow-hidden rounded-xl border border-ecc-warm-200 bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        {meta.imageUrl && (
          <div className="relative hidden aspect-square shrink-0 overflow-hidden sm:ml-4 sm:block sm:w-44 md:w-52">
            <Image
              src={meta.imageUrl}
              alt={page.title}
              width={300}
              height={300}
              className="h-full w-full object-contain"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="text-sm font-semibold text-ecc-green-700">
            {meta.displayDate} · {meta.time}
          </p>

          <Link
            href={`/${meta.slug}`}
            className="mt-1 text-xl font-bold leading-snug text-foreground transition-colors hover:text-ecc-green-700"
          >
            {page.title}
          </Link>

          <p className="mt-1 text-sm text-ecc-warm-600">
            <span aria-hidden="true" className="mr-1">📍</span>
            {meta.location}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-foreground/80">
            {meta.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {meta.ticketUrl && !meta.past && (
              <a
                href={meta.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-ecc-green-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ecc-green-800"
              >
                {meta.ticketLabel || 'Get Tickets'}
              </a>
            )}
            <Link
              href={`/${meta.slug}`}
              className="text-sm font-medium text-ecc-green-700 underline underline-offset-2 transition-colors hover:text-ecc-green-800"
            >
              Full Details →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
