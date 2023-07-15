import { BookType } from "../bookType"

export type BooksFilterResultType = {
    books: { 
        totalCount: number,
        items:  BookType[]
    }
}