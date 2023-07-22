import { BookRatingType } from "./bookRatingType"

export type BookOfListType = {
	id: string,
	title: string,
	description: string,
	imageData: ArrayBuffer,
	isActiveBook: boolean,
	bookRating: BookRatingType,
	bookOpinionsCount: number
}