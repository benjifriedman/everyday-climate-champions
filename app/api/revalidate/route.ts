import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-demand revalidation endpoint for WordPress webhook integration.
 *
 * WordPress fires a POST to this route whenever content is published or updated.
 * The route purges the ISR cache for the affected path(s) so the site reflects
 * changes immediately instead of waiting for the revalidate timer.
 *
 * Expected payload from WordPress webhook:
 * {
 *   "secret": "<REVALIDATION_SECRET>",
 *   "path": "/team"           // optional — specific path to revalidate
 *   "paths": ["/", "/team"]   // optional — multiple paths
 *   "type": "post" | "page"   // optional — revalidate by content type
 *   "slug": "my-episode"      // optional — used with type to build path
 * }
 *
 * If no path/paths/type provided, revalidates the entire site.
 */
export async function POST(request: NextRequest) {
  try {
    // Accept secret from query parameter or request body
    const secret = process.env.REVALIDATION_SECRET;
    const querySecret = request.nextUrl.searchParams.get('secret');

    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {
      // Body may not be JSON (e.g. WP Webhooks sends its own format)
    }

    const providedSecret = querySecret || body.secret;

    // Validate secret token
    if (!secret || providedSecret !== secret) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const revalidatedPaths: string[] = [];

    // Option 1: Explicit path(s) provided
    if (body.path) {
      revalidatePath(body.path);
      revalidatedPaths.push(body.path);
    }

    if (body.paths && Array.isArray(body.paths)) {
      for (const p of body.paths) {
        revalidatePath(p);
        revalidatedPaths.push(p);
      }
    }

    // Option 2: Type + slug provided — build the path automatically
    if (body.type && body.slug) {
      if (body.type === 'post') {
        // Revalidate the episode detail page, home, and all-episodes list
        const paths = [`/episodes/${body.slug}`, '/', '/all-episodes'];
        for (const p of paths) {
          revalidatePath(p);
          revalidatedPaths.push(p);
        }
      } else if (body.type === 'page') {
        // WordPress page slugs map directly to our routes
        const slugToPath: Record<string, string> = {
          'about-us': '/about-us',
          'team': '/team',
          'our-partners-and-sponsors': '/our-partners-and-sponsors',
          'take-action': '/take-action',
          'contact-us': '/contact-us',
        };
        const pagePath = slugToPath[body.slug] || `/${body.slug}`;
        revalidatePath(pagePath);
        revalidatedPaths.push(pagePath);
      } else if (body.type === 'category') {
        revalidatePath(`/podcast-category/${body.slug}`);
        revalidatedPaths.push(`/podcast-category/${body.slug}`);
      }
    }

    // Option 3: No specific path — revalidate everything
    if (revalidatedPaths.length === 0) {
      revalidatePath('/', 'layout');
      revalidatedPaths.push('/ (entire site)');
    }

    return NextResponse.json({
      revalidated: true,
      paths: revalidatedPaths,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: `Revalidation failed: ${message}` },
      { status: 500 }
    );
  }
}
