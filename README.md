# Everyday Climate Champions

The public frontend for the [Everyday Climate Champions](https://everyday-climate-champions.vercel.app/) podcast — a show about everyday Bay Area people helping with climate change.

Built with [Next.js](https://nextjs.org/) (App Router), using the existing WordPress site as a headless CMS via [WPGraphQL](https://www.wpgraphql.com/).

## Tech Stack

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for styling
- **WordPress + WPGraphQL** as the headless CMS
- **graphql-request** for data fetching
- **ISR** (Incremental Static Regeneration) + on-demand revalidation via webhook

## Getting Started

1. Copy the example env file and fill in the values:
   ```bash
   cp .env.local.example .env.local
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` | WordPress GraphQL endpoint (e.g. `https://www.everydayclimatechampions.org/graphql`) |
| `REVALIDATION_SECRET` | Secret token for the on-demand revalidation webhook |

## Pages

| Route | Description |
|---|---|
| `/` | Home — latest episode with Spotify embed, recent episodes grid |
| `/all-episodes` | Paginated episode listing |
| `/episodes/[slug]` | Episode detail — content, per-episode Spotify player, resource links |
| `/podcast-category/[slug]` | Episodes filtered by podcast category |
| `/about-us` | About Us (WordPress page) |
| `/team` | Our Team (WordPress page) |
| `/our-partners-and-sponsors` | Partners & Sponsors (WordPress page) |
| `/take-action` | Take Action (WordPress page) |
| `/contact-us` | Contact Us — links to feedback survey, guest suggestions, collaboration form, email |
| `/[...slug]` | Catch-all for any other WordPress page (recaps, transcripts, etc.) |

## Architecture

### Data Flow

WordPress stores all content (episodes, pages). The Next.js frontend fetches content via WPGraphQL at build/request time using ISR. When content is updated in WordPress, WP Webhooks sends a POST to `/api/revalidate` which purges the ISR cache so changes appear within seconds.

### WordPress Setup

The WordPress site uses a custom `podcast` post type (registered with WPGraphQL as `episodes`/`episode`). Episode metadata (Spotify URL, episode number, recap/transcript/action steps links) is exposed via custom GraphQL fields added in `functions.php`.

Required WordPress plugins:
- **WPGraphQL** — exposes content via GraphQL API
- **WP Webhooks** — triggers on-demand revalidation when content changes

### Key Files

| Path | Purpose |
|---|---|
| `lib/queries.ts` | All GraphQL queries |
| `lib/graphql.ts` | GraphQL client with error handling |
| `lib/api.ts` | Data fetching functions |
| `lib/constants.ts` | Nav links, site title, Spotify show ID |
| `types/wordpress.ts` | TypeScript types for WP data |
| `app/api/revalidate/route.ts` | On-demand ISR revalidation endpoint |
| `app/globals.css` | Global styles including WordPress content styling |

## Contributing

1. Fork the repo and create a feature branch
2. Make sure `npm run build` passes before submitting a PR
3. WordPress content changes should be made in the WordPress admin, not in code
4. Episode metadata fields are managed via `functions.php` on the WordPress side

## Remaining To-Do

- Move WordPress to a subdomain (e.g. `cms.everydayclimatechampions.org`) and point the main domain DNS to Vercel
- Re-create Elementor-based pages (About Us, Take Action, etc.) in the WordPress block editor for cleaner rendering
- Register `podcast_category` and `podcast_tag` taxonomies with WPGraphQL for category/tag filtering
- Configure WP Mail SMTP or similar plugin if email delivery from WordPress is needed

## License

This project is open source.
