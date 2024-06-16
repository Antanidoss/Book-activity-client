import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
  query {
    notifications {
      items {
        id
        description
        fromUser {
          id
          avatarDataBase64
        }
      }
    }
  }
`;

export * from './models';
