import { BookOpinionType } from "./bookOpinionType"

export type BookRatingType = {
    id: string,
    bookOpinions: Array<BookOpinionType>,
    averageRating: number,
}