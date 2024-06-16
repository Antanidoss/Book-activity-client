import { gql } from '@apollo/client';

export const GET_AUTHORS_BY_NAME = gql`
  query ($name: String!, $take: Int!) {
    authors(
      where: { or: [{ firstName: { contains: $name } }, { surname: { contains: $name } }] }
      take: $take
    ) {
      items {
        id
        firstName
        surname
      }
    }
  }
`;

export * from './models';
