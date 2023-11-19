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
    bookOpinions: Array<BookOpinionForBookInfo>
}

export type BookOpinionForBookInfo = {
    id: string,
    description: string,
    grade: number
    user: {
        id: string,
        avatarDataBase64: string,
        userName: string
    }
}

export type BookInfoGraphqlType = {
    bookById: Array<{
        id: string,
        title: string,
        description: string,
        imageDataBase64: string,
        isActiveBook: boolean,
        averageRating: number,
        bookAuthors: Array<{ author: { firstName: string, surname: string } }>,
        bookRating: {
            id: string,
            bookOpinions: {
                totalCount: number,
                items: Array<{
                    id: string,
                    description: string,
                    grade: number
                    user: {
                        id: string,
                        avatarDataBase64: string,
                        userName: string
                    }
                }>
            },
            averageRating: number,
        }
    }>
}