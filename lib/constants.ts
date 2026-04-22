export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'All Episodes', href: '/all-episodes' },
  { label: 'Categories', href: '/categories' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Team', href: '/team' },
  { label: 'Partners & Sponsors', href: '/our-partners-and-sponsors' },
  { label: 'Events', href: '/events' },
  { label: 'Take Action', href: '/take-action' },
  { label: 'Donate', href: '/donate' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const SITE_TITLE = 'Everyday Climate Champions';

export const SPOTIFY_SHOW_ID = '2vRZ4S9f7mxWKH3IWksX0X';

export const DONATE_URL =
  'https://secure.givelively.org/donate/the-praxis-group/everyday-climate-champions';
