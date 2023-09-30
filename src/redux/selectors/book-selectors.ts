import { AppStoreType } from "../redux-store";

export const getPageNumber = (state: AppStoreType) => {
    return state.bookStore.pageNumber;
}

export const getPageSize = (state: AppStoreType) => {
    return state.bookStore.pageSize;
}

export const getBooks = (state: AppStoreType) => {
    return state.bookStore.books;
}

export const getTotalBookCount = (state: AppStoreType) => {
    return state.bookStore.totalBookCount;
}

export const getBookById = (state: AppStoreType, id: string) => {
    return state.bookStore.books.find(b => b.id === id)
}

export const getBookFilter = (state: AppStoreType) => {
    return state.bookStore.bookFilter
}