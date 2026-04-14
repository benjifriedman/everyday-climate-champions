import type { Metadata } from 'next';
import { fetchGraphQL } from '@/lib/graphql';
import { PAGES_BY_SLUGS_QUERY } from '@/lib/queries';
import type { PagesBySlugResponse, WPPage } from '@/types/wordpress';
import { EVENTS } from '@/lib/events';
import EventCard from '@/components/EventCard';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Events | Everyday Climate Champions',
  description:
    'Upcoming events from Everyday Climate Champions — panels, live shows, and community gatherings around climate action in the Bay Area.',
};

export default async function EventsPage() {
  try {
    const slugs = EVENTS.map((e) => e.slug);
    const data = await fetchGraphQL<PagesBySlugResponse>(PAGES_BY_SLUGS_QUERY, {
      slugs,
    });

    const pageMap = new Map<string, WPPage>();
    for (const page of data.pages.nodes) {
      pageMap.set(page.slug, page);
    }

    // Sort events by date
    const sortedEvents = [...EVENTS].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return (
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="page-title text-3xl font-bold sm:text-4xl">Events</h1>
        <p className="mt-2 text-ecc-warm-600">
          Join us at upcoming community events around climate action in the Bay
          Area.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedEvents.map((meta) => {
            const page = pageMap.get(meta.slug);
            if (!page) return null;
            return <EventCard key={meta.slug} page={page} meta={meta} />;
          })}
        </div>
      </main>
    );
  } catch {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Content Temporarily Unavailable
        </h1>
        <p className="mt-4 text-ecc-warm-600">
          We&apos;re having trouble loading events. Please try again later.
        </p>
      </main>
    );
  }
}
