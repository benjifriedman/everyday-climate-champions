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
  externalUrl?: string;  // Optional external registration / info link
}

export const EVENTS: EventMeta[] = [
  {
    slug: 'how-on-earth-live-the-sfcw-episode',
    date: '2025-04-19',
    displayDate: 'Sunday, April 19',
    time: '2:30 PM – 4:30 PM',
    location: 'San Francisco, CA',
    externalUrl: 'https://luma.com/6xo6v1s5',
  },
  {
    slug: 'collaborating-for-climate-justice-b-corps-everyday-climate-champions-and-trellis',
    date: '2025-04-20',
    displayDate: 'Monday, April 20',
    time: '5:00 PM – 7:30 PM',
    location: 'Trellis Coworking & Events, San Francisco, CA',
  },
  {
    slug: 'climate-education-day-at-the-california-academy-of-sciences',
    date: '2025-04-25',
    displayDate: 'Saturday, April 25',
    time: '9:30 AM – 4:00 PM',
    location: 'California Academy of Sciences, San Francisco, CA',
    externalUrl: 'https://sites.google.com/calacademy.org/2026climateeducationday/2026',
  },
];
