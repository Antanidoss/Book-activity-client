export type AuthorForAddBookType = {
    id: string,
    firstName: string,
    surname: string
}

export type AuthorForAddBookGraphqlType = {
    authors: {
        items: Array<AuthorForAddBookType>
    }
}