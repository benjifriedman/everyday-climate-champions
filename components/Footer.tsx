import Link from 'next/link';
import { NAV_LINKS, SITE_TITLE } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-ecc-warm-200 bg-ecc-warm-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Social */}
          <div>
            <p className="text-lg font-semibold text-foreground">{SITE_TITLE}</p>
            <p className="mt-2 text-sm text-foreground/70">
              Everyday Bay Area people helping with climate change.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61581962133286"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex items-center justify-center text-[#1877F2] transition-opacity hover:opacity-75"
              >
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/everydayclimatechampions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center justify-center text-[#E4405F] transition-opacity hover:opacity-75"
              >
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/everyday-climate-champions/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center text-[#0A66C2] transition-opacity hover:opacity-75"
              >
                <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            {/* Podcast Platforms */}
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                Listen On
              </p>
              <div className="mt-2 flex gap-4">
                <a
                  href="https://open.spotify.com/show/2vRZ4S9f7mxWKH3IWksX0X"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Spotify"
                  className="inline-flex items-center justify-center text-[#1DB954] transition-opacity hover:opacity-75"
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </a>
                <a
                  href="https://podcasts.apple.com/us/podcast/everyday-climate-champions/id1646342166"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Apple Podcasts"
                  className="inline-flex items-center justify-center text-[#9933CC] transition-opacity hover:opacity-75"
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.6-.12 1.2-.6 1.5-.48.3-1.08.24-1.5-.18-.3-.3-.42-.66-.36-1.08-.24-1.2-.78-2.28-1.68-3.18-1.32-1.32-2.94-1.98-4.8-1.92-3.12.12-5.76 2.88-5.76 6.12 0 1.77.66 3.3 1.86 4.44.36.36.48.84.3 1.32-.18.48-.6.78-1.08.84-.36 0-.66-.12-.9-.36C3.492 15.168 2.58 12.984 2.58 10.62c0-2.508.984-4.884 2.796-6.66A9.096 9.096 0 0111.865 2.568zM12 7.092c1.68 0 3.18.78 4.2 2.1.78 1.02 1.14 2.16 1.14 3.42 0 .6-.48 1.08-1.08 1.08s-1.08-.48-1.08-1.08c0-.84-.24-1.56-.72-2.22-.66-.84-1.56-1.26-2.64-1.2-1.68.12-3.06 1.56-3.06 3.36 0 .6-.48 1.08-1.08 1.08s-1.08-.48-1.08-1.08c0-1.44.54-2.76 1.5-3.78a5.124 5.124 0 013.9-1.68zm-.12 5.244c1.2 0 2.16.96 2.16 2.16 0 .78-.42 1.5-1.08 1.86v4.92c0 .6-.48 1.08-1.08 1.08s-1.08-.48-1.08-1.08v-4.92c-.66-.36-1.08-1.08-1.08-1.86 0-1.2.96-2.16 2.16-2.16z" />
                  </svg>
                </a>
                <a
                  href="https://music.amazon.com/podcasts/bcf6965f-d3e4-4406-a74a-bd5b831f2d12/everyday-climate-champions"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Amazon Music"
                  className="inline-flex items-center justify-center text-[#FF9900] transition-opacity hover:opacity-75"
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 01-.753.077c-1.06-.876-1.25-1.281-1.829-2.115-1.748 1.784-2.985 2.318-5.249 2.318-2.68 0-4.764-1.653-4.764-4.96 0-2.583 1.4-4.339 3.392-5.2 1.726-.753 4.137-.889 5.98-1.097v-.41c0-.753.058-1.642-.384-2.292-.384-.578-1.118-.816-1.767-.816-1.2 0-2.27.616-2.531 1.891-.054.282-.261.56-.546.574l-3.06-.33c-.257-.058-.543-.266-.47-.66C6.057 1.926 9.311.5 12.243.5c1.5 0 3.46.398 4.642 1.533 1.5 1.398 1.356 3.264 1.356 5.297v4.8c0 1.442.6 2.074 1.163 2.853.197.282.24.618-.012.824-.63.527-1.752 1.506-2.369 2.055l.12-.068zM21.779 20.799C19.461 22.482 16.058 23.5 13.103 23.5c-4.407 0-8.377-1.629-11.377-4.34-.236-.213-.025-.504.258-.339 3.24 1.884 7.247 3.02 11.387 3.02 2.792 0 5.862-.578 8.688-1.779.426-.18.783.282.364.601l.356.136z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/playlist?list=PLZOgNNgBcnP8CLrbjiKv8qk3VtvCsNSPx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="inline-flex items-center justify-center text-[#FF0000] transition-opacity hover:opacity-75"
                >
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              Navigation
            </p>
            <nav aria-label="Footer navigation" className="mt-3">
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 transition-colors hover:text-ecc-green-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Land Acknowledgment */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-foreground/60">
              Land Acknowledgment
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              We acknowledge that we live and work on the unceded ancestral homeland of the
              Ohlone people. We pay our respects to them as the traditional stewards of this
              land and waterways, and honor their legacy and contributions.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-ecc-warm-200 pt-6 text-center">
          <p className="text-sm text-foreground/60">
            &copy; {currentYear} {SITE_TITLE}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
