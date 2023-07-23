import { BookRatingType } from "./bookRatingType"

export type BookOfListType = {
	id: string,
	title: string,
	description: string,
	imageDataBase64: string,
	isActiveBook: boolean,
	bookRating: BookRatingType,
	bookOpinionsCount: number
}