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
    },
    likesCount: number,
    dislikesCount: number,
    hasLike: boolean,
    hasDislike: boolean,
}