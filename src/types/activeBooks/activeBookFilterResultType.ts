import { ActiveBookOfListType } from "./activeBookOfListType"

export type ActiveBooksFilterResultType = {
    activeBooks: { 
        totalCount: number,
        items:  ActiveBookOfListType[]
    }
}