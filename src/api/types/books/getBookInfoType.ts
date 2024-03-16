export type GetBookInfoType = {
    bookById: Array<{
        id: string,
        title: string,
        description: string,
        imageDataBase64: string,
        isActiveBook: boolean,
        bookAuthors: Array<{ author: { firstName: string, surname: string } }>,
        hasOpinion: boolean,
        averageRating: number,
        bookCategories: Array<{
            category: {
                id: string,
                title: string
            }
        }>,
        bookOpinions: {
            totalCount: number,
            items: Array<{
                hasLike: boolean,
                hasDislike: boolean
                likes: {
                    totalCount: number
                },
                dislikes: {
                    totalCount: number
                }
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