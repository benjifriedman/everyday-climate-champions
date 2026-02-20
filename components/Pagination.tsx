import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function getPageHref(basePath: string, page: number): string {
  if (page === 1) return basePath;
  return `${basePath}/page/${page}`;
}

export function getPageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [];

  // Always show first page
  pages.push(1);

  if (currentPage <= 3) {
    // Near the start: 1 2 3 4 ... last
    pages.push(2, 3, 4, 'ellipsis', totalPages);
  } else if (currentPage >= totalPages - 2) {
    // Near the end: 1 ... n-3 n-2 n-1 n
    pages.push('ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    // Middle: 1 ... prev curr next ... last
    pages.push('ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
  }

  return pages;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-1">
      {/* Previous link */}
      {currentPage === 1 ? (
        <span
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-ecc-warm-200 text-ecc-warm-400 cursor-not-allowed"
          aria-disabled="true"
        >
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous page</span>
        </span>
      ) : (
        <Link
          href={getPageHref(basePath, currentPage - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-ecc-warm-200 text-foreground hover:bg-ecc-green-50 transition-colors"
        >
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous page</span>
        </Link>
      )}

      {/* Page numbers */}
      {pageNumbers.map((page, index) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-11 w-11 items-center justify-center text-ecc-warm-600"
            aria-hidden="true"
          >
            &hellip;
          </span>
        ) : page === currentPage ? (
          <span
            key={page}
            aria-current="page"
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-ecc-green-600 text-white font-semibold"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={getPageHref(basePath, page)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-ecc-warm-200 text-foreground hover:bg-ecc-green-50 transition-colors"
          >
            {page}
          </Link>
        )
      )}

      {/* Next link */}
      {currentPage === totalPages ? (
        <span
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-ecc-warm-200 text-ecc-warm-400 cursor-not-allowed"
          aria-disabled="true"
        >
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next page</span>
        </span>
      ) : (
        <Link
          href={getPageHref(basePath, currentPage + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-ecc-warm-200 text-foreground hover:bg-ecc-green-50 transition-colors"
        >
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next page</span>
        </Link>
      )}
    </nav>
  );
}
