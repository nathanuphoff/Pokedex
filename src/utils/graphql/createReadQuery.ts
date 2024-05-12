/**
 * Simple wrapper to fetch graphql data with optimistic types.
 * @param endpoint {string} The API endpoint url.
 * @returns {object} The requested data.
 * @todo replace with proper graph-ql library.
 */
export function createReadQueryClient(endpoint: string) {
  return async function query<Data>(query: string): Promise<Data> {
    const headers = new Headers([
      ['Accept', 'application/json'],
      ['Content-Type', 'application/json'],
      ['X-Method-Used', 'graphiql'],
    ]);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
      }),
    });

    const responseData = await response.json();

    console.log('x', query, responseData);

    return responseData.data;
  };
}
