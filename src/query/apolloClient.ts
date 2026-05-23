import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const Order = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `${import.meta.env.VITE_SERVER_ADDRESS}/graphql`,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
