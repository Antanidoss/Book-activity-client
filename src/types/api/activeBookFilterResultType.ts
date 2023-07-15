import { ActiveBook } from "../activeBookType"

export type ActiveBooksFilterResultType = {
    activeBooks: { 
        totalCount: number,
        items:  ActiveBook[]
    }
}