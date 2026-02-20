'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';

const DESKTOP_HIDDEN = new Set(['/categories', '/team']);

function isActive(href: string, pathname: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(href + '/');
}

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className="hidden nav:block">
      <ul className="flex items-center gap-1">
        {NAV_LINKS.filter((link) => !DESKTOP_HIDDEN.has(link.href)).map((link) => {
          const active = isActive(link.href, pathname);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-ecc-green-50 text-ecc-green-700 underline underline-offset-4'
                    : 'text-foreground/80 hover:bg-ecc-green-50 hover:text-ecc-green-700'
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
