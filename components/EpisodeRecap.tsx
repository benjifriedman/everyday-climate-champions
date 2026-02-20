interface EpisodeRecapProps {
  content: string;
}

export default function EpisodeRecap({ content }: EpisodeRecapProps) {
  if (!content) return null;

  return (
    <details className="rounded-xl border border-ecc-warm-200 bg-ecc-warm-50">
      <summary className="cursor-pointer px-6 py-4 text-lg font-semibold text-foreground select-none hover:text-ecc-green-700 transition-colors">
        Recap
      </summary>
      <div
        className="prose prose-neutral max-w-none px-6 pb-6 text-ecc-warm-800"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </details>
  );
}
