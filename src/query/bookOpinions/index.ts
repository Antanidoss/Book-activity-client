import { gql } from "@apollo/client";

export const GET_BOOK_OPINIONS = gql`
query ($bookId: UUID!, $skip: Int!, $take: Int!) {
    bookOpinions (where: { bookId: { eq: $bookId }}, skip: $skip, take: $take) {
    items {
        user {
            id
            userName
            avatarDataBase64
        }
        description
        hasLike
        hasDislike
        bookId
        grade
        likesCount
        dislikesCount
    }
  }
}
`

export const GET_BOOK_OPINION_BY_USER_ID = gql`
query ($bookId: UUID!, $userId: UUID!) {
    bookOpinions(where: {and: [
                {bookId: {eq: $bookId}},
                {userId: {eq: $userId}}
            ]}) 
        {
        items {
            bookId
            likesCount
            dislikesCount
            grade
            description
            user {
                id
            }
        }
      }
}
`

export * from "./models";