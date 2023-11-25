export type BookOpinionType = {
    id: string,
    grade: number,
    description: string
}

export type BookOpinionGraphqlType = {
    bookOpinions: {
        items: Array<BookOpinionType>
    }
}