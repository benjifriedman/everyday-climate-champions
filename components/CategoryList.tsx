import Link from 'next/link';

interface CategoryListProps {
  categories: { name: string; slug: string }[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/podcast-category/${category.slug}`}
          className="inline-block rounded-full bg-ecc-green-50 px-3 py-1 text-sm font-medium text-ecc-green-700 transition-colors hover:bg-ecc-green-100"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
