export interface WPPageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface WPFeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails: {
      width: number;
      height: number;
    };
  };
}

export interface WPCategory {
  name: string;
  slug: string;
  uri: string;
}

export interface WPTag {
  name: string;
  slug: string;
  uri: string;
}

export interface WPEpisode {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage: WPFeaturedImage | null;
  categories?: {
    nodes: WPCategory[];
  };
  tags?: {
    nodes: WPTag[];
  };
  spotifyUrl?: string | null;
  episodeNumber?: string | null;
  recapUrl?: string | null;
  transcriptUrl?: string | null;
  actionStepsUrl?: string | null;
}

export interface WPPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: WPFeaturedImage | null;
}

export interface WPTeamMember {
  id: string;
  title: string;
  teamMemberFields: {
    role: string;
    bio: string;
    photo: {
      sourceUrl: string;
      altText: string;
    };
  };
}

// GraphQL query response types

export interface LatestEpisodeResponse {
  episodes: {
    nodes: WPEpisode[];
  };
}

export interface EpisodeListResponse {
  episodes: {
    nodes: WPEpisode[];
    pageInfo: WPPageInfo;
  };
}

export interface SingleEpisodeResponse {
  episode: WPEpisode;
}

export interface CategoryResponse {
  category: WPCategory & {
    episodes: {
      nodes: WPEpisode[];
      pageInfo: WPPageInfo;
    };
  };
}

export interface PageResponse {
  page: WPPage;
}

export interface TeamResponse {
  teamMembers: {
    nodes: WPTeamMember[];
  };
}
