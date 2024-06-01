import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query ($skip: Int!, $take: Int!, $averageRatingFrom: Int, $averageRatingTo: Int, $filter: BookFilterInput) {
      books(
        skip: $skip,
        take: $take,
        averageRatingFrom: $averageRatingFrom,
        averageRatingTo: $averageRatingTo,
        where: $filter) {
        totalCount
        items {
          id
          title
          isActiveBook
          imageDataBase64
          averageRating
          bookOpinionsCount
        }
      }
    }
`

export const GET_BOOK_INFO = gql`
  query ($bookId: UUID!) {
    bookById(bookId: $bookId) {
      id
      title
      description,
      isActiveBook,
      imageDataBase64
      hasOpinion
      averageRating
      bookOpinionsCount
      bookAuthors {
        author {
          surname
          firstName
        }
      }
      bookCategories {
        category {
          id
          title
        }
      }
    }
  }
`

