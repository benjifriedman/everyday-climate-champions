/**
 * Event configuration.
 *
 * Each entry maps a WordPress page slug to its event-specific metadata
 * (date/time, location, etc.). The page title, featured image, and content
 * are pulled from WordPress automatically.
 *
 * To add a new event, create a WordPress page and add an entry here.
 */

export interface EventMeta {
  slug: string;
  date: string;          // ISO date string for sorting, e.g. "2025-04-19"
  displayDate: string;   // Human-friendly date
  time: string;
  location: string;
  description: string;   // Short blurb shown on the events listing page
  ticketUrl?: string;    // Optional link to tickets / registration
  ticketLabel?: string;  // Button text, defaults to "Get Tickets"
  imageUrl?: string;     // Optional thumbnail image URL
  past?: boolean;        // Mark as past event
}

export const EVENTS: EventMeta[] = [
  {
    slug: 'how-on-earth-live-the-sfcw-episode',
    date: '2025-04-19',
    displayDate: 'Sunday, April 19',
    time: '2:30 PM – 4:30 PM',
    location: '981 Mission St, San Francisco, CA',
    description:
      'A makeover-style live show where climate meets improv. Five Earth Archetypes team up to help one San Franciscan tackle a real-life climate question. Think Queer Eye meets our climate reality — with YOU shaping the outcome.',
    ticketUrl: 'https://luma.com/6xo6v1s5',
    ticketLabel: 'Get Tickets on Lu.ma',
    imageUrl:
      'https://www.praxisinaction.org/ecc/wp-content/uploads/2026/04/42a00e1b-7fe3-4b7b-bad9-77cdb98ae7cf-300x300.avif',
    past: true,
  },
  {
    slug: 'collaborating-for-climate-justice-b-corps-everyday-climate-champions-and-trellis',
    date: '2025-04-20',
    displayDate: 'Monday, April 20',
    time: '5:00 PM – 7:30 PM',
    location: 'Trellis Coworking & Events, San Francisco, CA',
    description:
      'A lively panel discussion bringing together Bay Area community and business voices at the intersection of climate justice and community resilience. Network, listen, learn, and build relationships with Bay Area B Corps and others committed to climate action.',
    ticketUrl: 'https://luma.com/f60foer9',
    ticketLabel: 'Get Tickets on Lu.ma',
    imageUrl:
      'https://www.praxisinaction.org/ecc/wp-content/uploads/2026/04/2112075d-bafc-41cb-be55-7e40b2b05654-300x300.avif',
    past: true,
  },
  {
    slug: 'climate-education-day-at-the-california-academy-of-sciences',
    date: '2025-04-25',
    displayDate: 'Saturday, April 25',
    time: '9:30 AM – 4:00 PM',
    location: 'California Academy of Sciences, San Francisco, CA',
    description:
      'Bringing together youth, scholars, educators, community organizations, and local government leaders to spotlight the powerful climate education, action, and justice work happening across San Francisco.',
    ticketUrl:
      'https://luma.com/7jxp5e3t',
    ticketLabel: 'See Schedule & Register',
    imageUrl:
      'https://www.praxisinaction.org/ecc/wp-content/uploads/2026/04/unnamed-300x211.jpg',
    past: true,
  },
];
