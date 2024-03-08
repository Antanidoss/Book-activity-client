import { SortBy } from "../../../redux/types/activeBooks/activeBookFilter"

export type GetActiveBooksByFilterType = {
    bookTitle?: string,
    withFullRead: boolean,
    sortBy: SortBy
}