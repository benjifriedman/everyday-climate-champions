import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-ecc-green-700">Page Not Found</h1>
      <p className="mt-4 text-lg text-ecc-warm-600">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or no
        longer exists.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-ecc-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-ecc-green-700 focus:outline-none focus:ring-2 focus:ring-ecc-green-500 focus:ring-offset-2"
      >
        Back to Home
      </Link>
    </main>
  );
}
