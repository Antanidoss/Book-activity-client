import { BookOpinionType } from "./bookOpinion"

export type BookRatingType = {
    id: string,
    bookOpinions: Array<BookOpinionType>,
    averageRating: number
}