import { gql } from "@apollo/client";

export const GET_CATEGORIES_BY_TITLE = gql`
    query ($title: String!, $take: Int!) {
        categories(where: {title: {contains: $title}}, take: $take) {
            items {
                id
                title
            }
        }
    }
`