import { AppStoreType } from "./redux-store";

export const getPageNumber = (state: AppStoreType) => {
    return state.bookStore.pageNumber;
}

export const getPageSize = (state: AppStoreType) => {
    return state.bookStore.pageSize;
}

export const getBooks = (state: AppStoreType) => {
    return state.bookStore.books;
}