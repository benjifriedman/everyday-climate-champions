import type { MetadataRoute } from 'next';
import { fetchGraphQL } from '@/lib/graphql';
import { gql } from 'graphql-request';

const BASE_URL = 'https://www.everydayclimatechampions.org';

const ALL_EPISODE_SLUGS_QUERY = gql`
  query AllEpisodeSlugs {
    episodes(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
        date
      }
    }
  }
`;

interface AllEpisodeSlugsResponse {
  episodes: {
    nodes: { slug: string; date: string }[];
  };
}

const CATEGORY_SLUGS = [
  'air-soil-water',
  'art-music',
  'children-youth-families',
  'climate-justice',
  'energy',
  'food-farming',
  'green-jobs',
  'public-policy-planning',
  'transportation',
  'waste',
];

const STATIC_PAGES = [
  '/',
  '/all-episodes',
  '/about-us',
  '/team',
  '/our-partners-and-sponsors',
  '/take-action',
  '/contact-us',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/podcast-category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  let episodeEntries: MetadataRoute.Sitemap = [];
  try {
    const data = await fetchGraphQL<AllEpisodeSlugsResponse>(ALL_EPISODE_SLUGS_QUERY);
    episodeEntries = data.episodes.nodes.map((episode) => ({
      url: `${BASE_URL}/episodes/${episode.slug}`,
      lastModified: new Date(episode.date),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  } catch {
    // If fetching episodes fails, return sitemap without episode entries
  }

  return [...staticEntries, ...episodeEntries, ...categoryEntries];
}
