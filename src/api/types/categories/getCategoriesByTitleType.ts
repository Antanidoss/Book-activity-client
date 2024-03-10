export type GetCategoriesByNameType = {
    categories: {
        items: Array<{
            id: string,
            title: string
        }>
    }
}