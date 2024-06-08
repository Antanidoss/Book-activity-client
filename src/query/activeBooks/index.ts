import { gql } from "@apollo/client";

export const GET_ACTIVE_BOOKS = gql`
    query ($skip: Int!, $take: Int!, $withFullRead: Boolean!, $filter: ActiveBookFilterInput, $order: [ActiveBookSortInput!]) {
        activeBooks(
            skip: $skip,
            take: $take,
            withFullRead: $withFullRead,
            order: $order
        where: $filter) {
            totalCount
            items {
                id
                totalNumberPages
                numberPagesRead
                book {
                    id
                    title
                    imageDataBase64
                    averageRating
                    hasOpinion
                }
            }
        }
    }
`

export * from "./models";