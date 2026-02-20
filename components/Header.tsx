import Link from 'next/link';
import Image from 'next/image';
import { SITE_TITLE } from '@/lib/constants';
import DesktopNav from '@/components/DesktopNav';
import MobileNav from '@/components/MobileNav';

export default function Header() {
  return (
    <header className="relative border-b border-ecc-warm-200 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={SITE_TITLE}
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-lg font-semibold text-foreground">
            {SITE_TITLE}
          </span>
        </Link>

        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
