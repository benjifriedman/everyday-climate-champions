import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL!;

const client = new GraphQLClient(endpoint);

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  try {
    return await client.request<T>(query, variables);
  } catch (error) {
    throw new GraphQLFetchError('Failed to fetch content from CMS', { cause: error });
  }
}

export class GraphQLFetchError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'GraphQLFetchError';
  }
}
