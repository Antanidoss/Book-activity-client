export type GetAuthorsByNameType = {
    authors: {
        items: Array<{
            id: string,
            firstName: string,
            surname: string,
        }>
    }
}