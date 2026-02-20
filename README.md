# Everyday Climate Champions

The public frontend for the [Everyday Climate Champions](https://www.everydayclimatechampions.org/) podcast — a show about everyday Bay Area people helping with climate change.

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
| `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` | WordPress GraphQL endpoint |
| `REVALIDATION_SECRET` | Secret token for the on-demand revalidation webhook |

## Pages

- **Home** — Latest episode with Spotify embed + recent episodes grid
- **All Episodes** — Paginated episode listing
- **Episode Detail** — Full episode content, per-episode Spotify player, resource links (recap, transcript, action steps)
- **Category Archive** — Episodes filtered by podcast category
- **About Us, Our Team, Partners & Sponsors, Take Action, Contact Us** — WordPress pages
- **Catch-all** — Any other WordPress page (recaps, transcripts, etc.)

## Deployment

### 1. Deploy to Vercel
- Import this repo in [Vercel](https://vercel.com/new)
- Set environment variables in project settings:
  - `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` — your WordPress GraphQL endpoint
  - `REVALIDATION_SECRET` — generate with `openssl rand -hex 32`

### 2. Move WordPress to a subdomain
- Set up WordPress on a subdomain (e.g. `cms.everydayclimatechampions.org`)
- Point `everydayclimatechampions.org` DNS to Vercel
- Update `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` in Vercel
- Update `next.config.ts` image `remotePatterns` hostname if needed

### 3. Configure WP Webhooks for instant content updates
In WordPress admin → WP Webhooks, create webhooks with:
- **Trigger**: Post published / updated, Page published / updated
- **URL**: `https://everydayclimatechampions.org/api/revalidate`
- **Method**: POST
- **Body** (JSON):
  ```json
  {
    "secret": "<your REVALIDATION_SECRET>",
    "type": "post",
    "slug": "{post_name}"
  }
  ```
  Use `"type": "page"` for page triggers. Omit path/type/slug to revalidate the whole site.

## License

This project is open source.
