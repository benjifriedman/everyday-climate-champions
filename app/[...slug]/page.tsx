import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchGraphQL } from '@/lib/graphql';
import { PAGE_BY_SLUG_QUERY } from '@/lib/queries';
import { cleanWordPressContent } from '@/lib/sanitize';
import type { PageResponse } from '@/types/wordpress';

export const revalidate = 60;

interface CatchAllPageProps {
  params: Promise<{ slug: string[] }>;
}

async function getPage(slug: string) {
  try {
    const data = await fetchGraphQL<PageResponse>(PAGE_BY_SLUG_QUERY, { slug: `/${slug}/` });
    return data.page ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: CatchAllPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug.join('/'));

  if (!page) {
    return { title: 'Page Not Found | Everyday Climate Champions' };
  }

  return {
    title: `${page.title} | Everyday Climate Champions`,
  };
}

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  const { slug } = await params;
  const page = await getPage(slug.join('/'));

  if (!page) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground sm:text-4xl">
        {page.title}
      </h1>
      <div
        className="prose prose-neutral max-w-none text-ecc-warm-700"
        dangerouslySetInnerHTML={{ __html: cleanWordPressContent(page.content) }}
      />
    </main>
  );
}
