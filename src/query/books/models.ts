export type GetBooks = {
    books: {
        totalCount: number,
        items: Array<GetBooksItem>
    }
}

export type GetBooksItem = {
    id: string,
    title: string,
    description: string,
    imageDataBase64: string,
    isActiveBook: boolean,
    averageRating: number,
    bookOpinionsCount: number
}

export type GetBookInfo = {
    bookById: Array<{
        id: string,
        title: string,
        description: string,
        imageDataBase64: string,
        isActiveBook: boolean,
        bookAuthors: Array<{ author: { firstName: string, surname: string } }>,
        hasOpinion: boolean,
        averageRating: number,
        bookOpinionCount: number,
        bookCategories: Array<{
            category: {
                id: string,
                title: string
            }
        }>,
    }>
}