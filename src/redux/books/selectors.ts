import { RootState } from "../redux-store";

export const getPageNumber = (state: RootState) => {
    return state.books.allBooksPage.pageNumber;
}

export const getPageSize = (state: RootState) => {
    return state.books.allBooksPage.pageSize;
}

export const getTotalBookCount = (state: RootState) => {
    return state.books.allBooksPage.totalBookCount;
}

export const getBookFilter = (state: RootState) => {
    return state.books.allBooksPage.bookFilter
}

export const getPaginationSkip = (state: RootState) => {
    return state.books.allBooksPage.pageNumber === 1
        ? 0
        : state.books.allBooksPage.pageNumber * state.books.allBooksPage.pageSize;
}