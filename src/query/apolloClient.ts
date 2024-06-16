import { ApolloClient, InMemoryCache } from '@apollo/client';

export const Order = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export const apolloClient = new ApolloClient({
  uri: `${process.env.REACT_APP_SERVER_ADDRESS}/graphql`,
  cache: new InMemoryCache(),
});
