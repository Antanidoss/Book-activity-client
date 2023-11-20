export type BookOfListType = {
	id: string,
	title: string,
	description: string,
	imageDataBase64: string,
	isActiveBook: boolean,
	bookRating: {
		id: string,
		averageRating: number,
		bookOpinions: {
			totalCount: number
		}
	},
}