import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_URI =
  process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4000/graphql';

const httpLink = createHttpLink({ uri: GRAPHQL_URI });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
