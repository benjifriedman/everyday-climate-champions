import posthog from 'posthog-js';

// Next.js runs this file once in the browser, before the app hydrates.
// Analytics stay off when the token is missing (e.g. local dev, CI builds).
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    // Pins PostHog's default behavior to a dated snapshot, including
    // automatic pageviews on client-side route changes.
    defaults: '2026-08-30',
  });
}
