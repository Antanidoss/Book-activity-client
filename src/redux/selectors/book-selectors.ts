import { AppStoreType } from "../redux-store";

export const getPageNumber = (state: AppStoreType) => {
    return state.bookStore.allBooksPage.pageNumber;
}

export const getPageSize = (state: AppStoreType) => {
    return state.bookStore.allBooksPage.pageSize;
}

export const getBooks = (state: AppStoreType) => {
    return state.bookStore.allBooksPage.books;
}

export const getTotalBookCount = (state: AppStoreType) => {
    return state.bookStore.allBooksPage.totalBookCount;
}

export const getBookById = (state: AppStoreType, id: string) => {
    return state.bookStore.allBooksPage.books.find(b => b.id === id)
}

export const getBookFilter = (state: AppStoreType) => {
    return state.bookStore.allBooksPage.bookFilter
}

export const getAuthorsForAddBook = (state: AppStoreType) => {
    return state.bookStore.addBookPage.authors;
}

export const getBookInfo = (state: AppStoreType) => {
    return state.bookStore.bookInfoPage.bookInfo;
}