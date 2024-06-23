import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query ($skip: Int, $take: Int, $filter: AppUserFilterInput) {
    users(skip: $skip, take: $take, where: $filter) {
      items {
        id
        userName
        avatarDataBase64
        isSubscribed
        isSubscription
        activeBookCount
        bookOpinionCount
      }
      totalCount
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query ($userId: UUID!) {
    userById(userId: $userId) {
      id
      userName
      avatarDataBase64
      subscriptionsCount
      subscribersCount
      isSubscribed
      description
      activeBooks {
        id
        totalNumberPages
        numberPagesRead
        book {
          id
          title
          imageDataBase64
        }
      }
    }
  }
`;

export * from './models';
