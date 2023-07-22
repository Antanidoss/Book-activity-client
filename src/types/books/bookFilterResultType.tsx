import { BookOfListType } from "./bookOfListType"

export type BooksFilterResultType = {
    books: { 
        totalCount: number,
        items:  BookOfListType[]
    }
}