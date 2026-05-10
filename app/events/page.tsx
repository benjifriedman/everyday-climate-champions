import type { Metadata } from 'next';
import { fetchGraphQL } from '@/lib/graphql';
import { PAGES_BY_SLUGS_QUERY } from '@/lib/queries';
import type { PagesBySlugResponse, WPPage } from '@/types/wordpress';
import { EVENTS } from '@/lib/events';
import EventCard from '@/components/EventCard';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Events | Everyday Climate Champions',
  description:
    'Events from Everyday Climate Champions — panels, live shows, and community gatherings around climate action in the Bay Area.',
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

    const upcoming = [...EVENTS]
      .filter((e) => !e.past)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const past = [...EVENTS]
      .filter((e) => e.past)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="page-title text-3xl font-semibold sm:text-4xl">Events</h1>

        {upcoming.length > 0 && (
          <section className="mt-6">
            <p className="text-ecc-warm-600">
              Join us at upcoming community events around climate action in the
              Bay Area.
            </p>
            <div className="mt-6 space-y-6">
              {upcoming.map((meta) => {
                const page = pageMap.get(meta.slug);
                if (!page) return null;
                return <EventCard key={meta.slug} page={page} meta={meta} />;
              })}
            </div>
          </section>
        )}

        {upcoming.length === 0 && (
          <p className="mt-4 text-ecc-warm-600">
            No upcoming events right now; check back soon!
          </p>
        )}

        {past.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground">Past Events</h2>
            <div className="mt-6 space-y-6">
              {past.map((meta) => {
                const page = pageMap.get(meta.slug);
                if (!page) return null;
                return <EventCard key={meta.slug} page={page} meta={meta} />;
              })}
            </div>
          </section>
        )}
      </main>
    );
  } catch {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Content Temporarily Unavailable
        </h1>
        <p className="mt-4 text-ecc-warm-600">
          We&apos;re having trouble loading events. Please try again later.
        </p>
      </main>
    );
  }
}
