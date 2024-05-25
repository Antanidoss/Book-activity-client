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