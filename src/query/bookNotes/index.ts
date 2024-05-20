import { gql } from "@apollo/client";

export const GET_LAST_BOOK_NOTES = gql`
    query ($take: Int!, $userId: String!) {
        bookNotes(,
            take: $take,
            order: { timeOfCreation: DESC },
            userId: $userId
        ) {
            items {
                id
                note
                noteColor
                noteTextColor
                activeBook {
                    book {
                        id
                        title
                    }
                }
            }
        }
    }
`