import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Creates a HTTP link to the GraphQL API
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

// creates an Apollo Link that sets the Authorization header for each GraphQL request
const authorizationLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token') || '';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// creates an instance of an ApolloClient object with authorizationLink + httpLink, and the Apollo cache
const client = new ApolloClient({
  link: authorizationLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
