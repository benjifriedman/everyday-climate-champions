'use client';

import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-ecc-green-700">Something went wrong</h1>
      <p className="mt-4 text-lg text-ecc-warm-600">
        We ran into an unexpected issue loading this page. Please try again, or head back to the
        home page.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-ecc-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ecc-green-700 focus:outline-none focus:ring-2 focus:ring-ecc-green-500 focus:ring-offset-2"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-ecc-green-300 px-6 py-3 text-sm font-semibold text-ecc-green-700 transition-colors hover:bg-ecc-green-50 focus:outline-none focus:ring-2 focus:ring-ecc-green-500 focus:ring-offset-2"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
