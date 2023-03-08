import { AppStoreType } from "../redux-store";

export const getActiveBooks = (state: AppStoreType) => {
    return state.activeBookStore.activeBooks;
}

export const getPageNumber = (state: AppStoreType) => {
    return state.activeBookStore.pageNumber;
}

export const getTotalActiveBookCount = (state: AppStoreType) => {
    return state.activeBookStore.totalActiveBookCount;
}

export const getPageSize = (state: AppStoreType) => {
    return state.activeBookStore.pageSize;
}

export const getFilter = (state: AppStoreType) => {
    return state.activeBookStore.filter;
}
