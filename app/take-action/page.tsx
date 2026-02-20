import type { Metadata } from 'next';
import { fetchGraphQL } from '@/lib/graphql';
import { PAGE_BY_SLUG_QUERY } from '@/lib/queries';
import { cleanWordPressContent } from '@/lib/sanitize';
import type { PageResponse } from '@/types/wordpress';


export const revalidate = 3600;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await fetchGraphQL<PageResponse>(PAGE_BY_SLUG_QUERY, {
      slug: 'take-action',
    });

    if (!data.page) {
      return { title: 'Take Action | Everyday Climate Champions' };
    }

    const title = `${data.page.title} | Everyday Climate Champions`;
    const description = stripHtml(data.page.content).slice(0, 160);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        ...(data.page.featuredImage && {
          images: [{ url: data.page.featuredImage.node.sourceUrl }],
        }),
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    };
  } catch {
    return { title: 'Take Action | Everyday Climate Champions' };
  }
}

export default async function TakeActionPage() {
  try {
    const data = await fetchGraphQL<PageResponse>(PAGE_BY_SLUG_QUERY, {
      slug: 'take-action',
    });

    if (!data.page) {
      return (
        <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Take Action</h1>
          <p className="mt-4 text-ecc-warm-600">
            This page is not available right now. Please check back later.
          </p>
        </main>
      );
    }

    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          {data.page.title}
        </h1>
        <div
          className="prose prose-neutral mt-8 max-w-none text-ecc-warm-700"
          dangerouslySetInnerHTML={{ __html: cleanWordPressContent(data.page.content) }}
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
          We&apos;re having trouble loading this page. Please try again later.
        </p>
      </main>
    );
  }
}
