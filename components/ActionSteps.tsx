interface ActionStepsProps {
  content: string;
}

export default function ActionSteps({ content }: ActionStepsProps) {
  if (!content) return null;

  return (
    <section className="rounded-xl bg-ecc-green-50 p-6">
      <h2 className="mb-4 text-xl font-semibold text-ecc-green-700">
        Action Steps
      </h2>
      <div
        className="prose prose-neutral max-w-none text-ecc-green-800"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
}
