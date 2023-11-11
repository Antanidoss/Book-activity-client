export type BookInfoType = {
    id: string,
    title: string,
    description: string,
    imageDataBase64: string,
    bookOpinionsCount: number,
    isActiveBook: boolean,
    averageRating: number,
    hasOpinion: boolean,
    bookRatingId: string,
    bookAuthorNames: Array<string>
}

export type BookInfoGraphqlType = {
    bookById: Array<{
        id: string,
        title: string,
        description: string,
        imageDataBase64: string,
        bookOpinionsCount: number,
        isActiveBook: boolean,
        averageRating: number,
        bookAuthors: Array<{ author: { firstName: string, surname: string } }>,
    }>
}