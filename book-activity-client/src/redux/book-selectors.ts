import { AppStoreType } from "./redux-store";

export const getPageNumber = (state: AppStoreType) => {
    return state.book.pageNumber;
}

export const getPageSize = (state: AppStoreType) => {
    return state.book.pageSize;
}

export const getBooks = (state: AppStoreType) => {
    return state.book.books;
}