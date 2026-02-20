import Link from 'next/link';

interface TagListProps {
  tags: { name: string; slug: string }[];
}

export default function TagList({ tags }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={`/tag/${tag.slug}`}
          className="inline-block rounded-full bg-ecc-warm-100 px-3 py-1 text-sm text-ecc-warm-700 transition-colors hover:bg-ecc-warm-200"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  );
}
