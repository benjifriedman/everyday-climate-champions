import { fetchGraphQL } from '@/lib/graphql';
import { EPISODE_LIST_QUERY } from '@/lib/queries';
import type { EpisodeListResponse, WPEpisode } from '@/types/wordpress';

const EPISODES_PER_PAGE = 12;

export interface EpisodesPageResult {
  episodes: WPEpisode[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}

/**
 * Fetches a specific page of episodes using cursor-based pagination.
 *
 * WPGraphQL uses cursor-based pagination (first/after), but our URL structure
 * is offset-based (/all-episodes/page/2). To bridge this, we fetch all items
 * up to the requested page and slice the last page's worth of episodes.
 */
export async function getEpisodesPage(page: number): Promise<EpisodesPageResult> {
  const validPage = Math.max(1, Math.floor(page));
  const totalToFetch = validPage * EPISODES_PER_PAGE;

  // Fetch enough episodes to cover the requested page.
  // We request one extra to determine if there's a next page beyond our slice.
  const data = await fetchGraphQL<EpisodeListResponse>(EPISODE_LIST_QUERY, {
    first: totalToFetch + 1,
  });

  const allNodes = data.episodes.nodes;
  const totalFetched = allNodes.length;

  // Determine if there are more episodes beyond the current page
  const hasMoreBeyondPage = totalFetched > totalToFetch;

  // Slice out just the episodes for the requested page
  const startIndex = (validPage - 1) * EPISODES_PER_PAGE;
  const episodes = allNodes.slice(startIndex, startIndex + EPISODES_PER_PAGE);

  // Calculate total pages: if we got more than totalToFetch, there are more pages.
  // We can't know the exact total without fetching everything, so we estimate.
  // If hasNextPage from GraphQL is true or we got extra items, there's at least one more page.
  const hasNextPage = hasMoreBeyondPage || data.episodes.pageInfo.hasNextPage;

  // For total pages, we know at least `validPage` pages exist.
  // If there are more episodes, add 1 (conservative estimate for pagination UI).
  const totalPages = hasNextPage ? validPage + 1 : validPage;

  return {
    episodes,
    totalPages,
    currentPage: validPage,
    hasNextPage,
  };
}
