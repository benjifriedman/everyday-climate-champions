import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchGraphQL } from '@/lib/graphql';
import { ALL_CATEGORIES_QUERY } from '@/lib/queries';
import type { AllCategoriesResponse } from '@/types/wordpress';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Categories | Everyday Climate Champions',
  description:
    'Browse episodes by topic — climate justice, energy, transportation, and more.',
};

export default async function CategoriesPage() {
  try {
    const data = await fetchGraphQL<AllCategoriesResponse>(ALL_CATEGORIES_QUERY);
    const categories = data.podcastCategories.nodes.filter((c) => (c.count ?? 0) > 0);

    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
          Browse by Category
        </h1>
        <p className="mt-2 text-ecc-warm-600">
          Explore episodes by topic.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/podcast-category/${cat.slug}`}
              className="flex items-center justify-between rounded-lg border border-ecc-warm-200 bg-white px-5 py-4 transition-colors hover:border-ecc-green-300 hover:bg-ecc-green-50"
            >
              <span className="font-medium text-foreground">{cat.name}</span>
              <span className="rounded-full bg-ecc-green-50 px-2.5 py-0.5 text-sm text-ecc-green-700">
                {cat.count}
              </span>
            </Link>
          ))}
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
          We&apos;re having trouble loading categories. Please try again later.
        </p>
      </main>
    );
  }
}
