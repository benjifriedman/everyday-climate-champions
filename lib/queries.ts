import { gql } from 'graphql-request';

export const LATEST_EPISODE_QUERY = gql`
  query LatestEpisode {
    episodes(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        spotifyUrl
        episodeNumber
        recapUrl
        transcriptUrl
        actionStepsUrl
        podcastCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const EPISODE_LIST_QUERY = gql`
  query EpisodeList($first: Int!, $after: String) {
    episodes(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        id
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        podcastCategories {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const SINGLE_EPISODE_QUERY = gql`
  query SingleEpisode($slug: ID!) {
    episode(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      excerpt
      content
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      spotifyUrl
      episodeNumber
      recapUrl
      transcriptUrl
      actionStepsUrl
      podcastCategories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

export const CATEGORY_ARCHIVE_QUERY = gql`
  query CategoryArchive($slug: ID!, $first: Int!, $after: String) {
    podcastCategory(id: $slug, idType: SLUG) {
      name
      slug
      episodes(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const PAGE_BY_SLUG_QUERY = gql`
  query PageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      slug
      content
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;

export const ALL_CATEGORIES_QUERY = gql`
  query AllCategories {
    podcastCategories(first: 100) {
      nodes {
        name
        slug
        count
      }
    }
  }
`;
