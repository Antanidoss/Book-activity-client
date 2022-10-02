import { BookRatingType } from "./bookRating"

export type BookType = {
	id: string,
	title: string,
	description: string,
	imageData: ArrayBuffer,
	isActiveBook: boolean,
	bookRating: BookRatingType
}