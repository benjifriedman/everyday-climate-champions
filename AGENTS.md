# AGENTS.md

Guidance for AI coding assistants and human contributors working on this repo. See [README.md](README.md) for the general project overview.

## What this project is

The public frontend for the Everyday Climate Champions podcast (https://www.everydayclimatechampions.org). It is a headless Next.js site. All content (episodes, pages) lives in WordPress and is read through WPGraphQL. There is no database and no test framework.

## Stack

- Next.js 16 (App Router), React 19, React Compiler enabled (`reactCompiler: true` in `next.config.ts`)
- TypeScript, Tailwind CSS 4
- `graphql-request` for data fetching
- Vercel hosting and Vercel Analytics

Next.js 16 has breaking changes from older versions. For example, `params` in pages and `generateMetadata` is a `Promise` and must be awaited. Check the docs for the installed version before using an API from memory.

## Commands

```bash
npm install
npm run dev     # dev server at http://localhost:3000
npm run build   # production build; fetches from WordPress at build time
npm run lint    # ESLint
```

Run `npm run lint` and `npm run build` before opening a PR. The build needs a reachable WordPress endpoint.

Do not start long-running processes (like `npm run dev`) from an automated agent session unless the user asks for it.

## Environment

Copy `.env.local.example` to `.env.local`.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` | WordPress GraphQL endpoint. Production: `https://www.praxisinaction.org/ecc/?graphql` |
| `REVALIDATION_SECRET` | Shared secret for the `/api/revalidate` webhook |

Never commit `.env*` files (except `.env.local.example`) or `wp-config.php`. Never put secrets in code, logs, or commit messages.

## Layout

```
app/                  Routes (App Router). One folder per route.
  [...slug]/          Catch-all: renders any other WordPress page by slug (donate, recaps, transcripts, ...)
  episodes/[slug]/    Episode detail
  all-episodes/       Paginated episode list (/all-episodes/page/[page])
  podcast-category/   Episodes by category
  events/             Events listing
  api/revalidate/     On-demand ISR revalidation webhook
  error.tsx           Client error boundary for uncaught server errors
  sitemap.ts          Sitemap (has a hard-coded category slug list)
components/           React components (nav, cards, audio player, etc.)
lib/
  graphql.ts          GraphQL client + fetchGraphQL()
  queries.ts          All GraphQL queries
  api.ts              Higher-level data fetching (e.g. episode pagination)
  constants.ts        NAV_LINKS, SITE_TITLE, SPOTIFY_SHOW_ID
  events.ts           Event metadata, keyed by WordPress page slug
  sanitize.ts         cleanWordPressContent() for WordPress HTML
types/                TypeScript types for WordPress data and the audio player
```

Imports use the `@/` alias (e.g. `@/lib/graphql`).

## Content model (WordPress)

- Custom post type `episode`, queried in GraphQL as `episodes`. Custom fields: `spotifyUrl`, `episodeNumber`, `recapUrl`, `transcriptUrl`, `actionStepsUrl`. Categories use the custom taxonomy `podcastCategories`, not the default WordPress categories.
- Pages (about-us, team, partners, take-action, etc.) are standard WordPress pages fetched by slug.
- Images are served from `www.praxisinaction.org/ecc/`. Any new image host must be added to `images.remotePatterns` in `next.config.ts`.
- Content edits belong in WordPress admin, not in code. The custom GraphQL fields are registered in `functions.php` on the WordPress side, which is not in this repo.

## Conventions

- Fetch data in server components with `fetchGraphQL<T>()` and put queries in `lib/queries.ts`. Add response types to `types/wordpress.ts`.
- Render WordPress HTML with `dangerouslySetInnerHTML` only after passing it through `cleanWordPressContent()`. The HTML comes from our own CMS, but treat any new source of HTML as untrusted.
- Colors come from the `ecc-green-*` and `ecc-warm-*` tokens defined in the `@theme` block of `app/globals.css`. Prefer those over raw hex values. Note that `ecc-warm-600` and `ecc-warm-700` are both `#1a1a1a`.
- Keep the existing file style: single quotes, semicolons, 2-space indent, `@/` imports.
- Keep changes scoped. Do not refactor unrelated code in a feature PR.

## Caching and revalidation

Pages use ISR with a `revalidate` export. Most pages use `86400` (24 hours); the home page uses `3600`. Freshness mostly comes from the webhook, not the timer.

WordPress (WP Webhooks plugin) sends a POST to `/api/revalidate?secret=<REVALIDATION_SECRET>` on "Post created" and "Post updated". Payload options:

```json
{ "secret": "...", "type": "post", "slug": "episode-slug" }
{ "secret": "...", "type": "page", "slug": "about-us" }
{ "secret": "...", "type": "category", "slug": "energy" }
{ "secret": "...", "path": "/about-us" }
{ "secret": "...", "paths": ["/", "/all-episodes"] }
```

With no path or type, it revalidates the whole site. If you add a route whose WordPress slug differs from its URL, update the `slugToPath` map in `app/api/revalidate/route.ts`.

### Known pitfall: errors can be cached

Many page components wrap their fetch in `try/catch` and render a "Content Temporarily Unavailable" message (or `notFound()`) instead of letting the error propagate. If WordPress is down during a regeneration, that fallback can be cached for the full revalidate period. The intended design is for errors to bubble up to `app/error.tsx`, which Next.js does not cache. When you touch a page's fetch logic, prefer letting errors propagate over adding another inline catch. Do not do a broad cleanup unless asked.

## Adding common things

**A new event.** Create a WordPress page for the event, then add an entry to `EVENTS` in `lib/events.ts` with the page's slug. Title, image, and body come from WordPress; date, time, location, and ticket link come from the entry. Set `past: true` once the event has happened.

**A new static page.** If it is a plain WordPress page, no code is needed: the `[...slug]` catch-all renders it. To add it to the nav, edit `NAV_LINKS` in `lib/constants.ts`. Create a dedicated route only if it needs custom layout.

**A new GraphQL field.** Confirm the field exists in WPGraphQL first (query the endpoint directly), then update `lib/queries.ts` and `types/wordpress.ts` together.

## WordPress event page HTML

When cleaning up or writing HTML for event pages in WordPress, follow this structure, top to bottom:

1. Image: a plain `<img>` with a meaningful `alt`, no WordPress classes (`alignnone`, `size-medium`, `wp-image-*`).
2. Date and time: one `<strong>` line, e.g. `Saturday, April 25, 2026 · 9:30 AM – 4:00 PM` (full day and month names, middot separator, en-dash between times).
3. Venue and city: plain text on its own line. Link the venue name if there is a map link.
4. Ticket or registration link: an `<a>` on its own line with a clear call to action.
5. Description: each paragraph in `<p>`.
6. Section labels (speakers, agenda): `<strong><em>Label:</em></strong>`.
7. Lists: `<ul>` / `<li>`, with no `<p>` inside list items.

Cleanup rules: remove `jsx-*` classes, empty `class=""` and `dir` attributes, empty `<div></div>`, unnecessary `<div>` wrappers, and zero-width spaces (`\u200B`). Use en-dashes for ranges. Write dates in full (`April 25, 2026`, not `4/25`).

## Troubleshooting

If the site shows "Content Temporarily Unavailable" or blank pages:

1. Check that WordPress GraphQL is up:
   ```bash
   curl -s -X POST "https://www.praxisinaction.org/ecc/?graphql" \
     -H "Content-Type: application/json" \
     -d '{"query":"{ generalSettings { title } }"}'
   ```
2. Force revalidation of the whole site: `POST https://www.everydayclimatechampions.org/api/revalidate?secret=<SECRET>` with no body.
3. Redeploy from the Vercel dashboard.
4. Check Vercel function logs for the failing route.

## Deployment

Pushes to `main` deploy automatically to Vercel. There is no staging branch; use Vercel's PR previews to check changes.

**Never push directly to `main`.** Work on a feature branch (e.g. `feature/short-description` or `fix/short-description`) and open a pull request. This applies to humans and AI agents alike.

## Safety notes for agents

- Do not make write requests to the production WordPress site or call the production revalidation endpoint unless the user asks.
- Do not add dependencies without a reason the user can review.
- There are no automated tests. Verify changes with `npm run lint`, `npm run build`, and by checking the affected pages in the browser.
