import { RootState } from "../redux-store";

export const getPageNumber = (state: RootState) => {
    return state.activeBooks.allBooksPage.pageNumber;
}

export const getTotalActiveBookCount = (state: RootState) => {
    return state.activeBooks.allBooksPage.totalCount;
}

export const getPageSize = (state: RootState) => {
    return state.activeBooks.allBooksPage.pageSize;
}

export const getFilter = (state: RootState) => {
    return state.activeBooks.allBooksPage.activeBookFilter;
}

export const getPaginationSkip = (state: RootState) => {
    return state.activeBooks.allBooksPage.pageNumber === 1
        ? 0
        : state.activeBooks.allBooksPage.pageNumber * state.activeBooks.allBooksPage.pageSize;
}