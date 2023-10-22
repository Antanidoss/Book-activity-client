import { AppStoreType } from "../redux-store";

export const getActiveBooks = (state: AppStoreType) => {
    return state.activeBookStore.allActiveBookPage.activeBooks;
}

export const getPageNumber = (state: AppStoreType) => {
    return state.activeBookStore.allActiveBookPage.pageNumber;
}

export const getTotalActiveBookCount = (state: AppStoreType) => {
    return state.activeBookStore.allActiveBookPage.totalActiveBookCount;
}

export const getPageSize = (state: AppStoreType) => {
    return state.activeBookStore.allActiveBookPage.pageSize;
}

export const getFilter = (state: AppStoreType) => {
    return state.activeBookStore.allActiveBookPage.filter;
}
