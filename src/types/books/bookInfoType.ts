export type BookInfoType = {
    id: string,
    title: string,
    description: string,
    imageDataBase64: string,
    bookOpinionsCount: number,
    isActiveBook: boolean,
    averageRating: number,
    hasOpinion: boolean,
    bookAuthorNames: Array<string>
    bookOpinions: Array<BookOpinionForBookInfo>
}

export type BookOpinionForBookInfo = {
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
        bookAuthors: Array<{ author: { firstName: string, surname: string } }>,
        hasOpinion: boolean,
        averageRating: number,
        bookOpinions: {
            totalCount: number,
            items: Array<{
                description: string,
                grade: number
                user: {
                    id: string,
                    avatarDataBase64: string,
                    userName: string
                }
            }>
        },
    }>
}