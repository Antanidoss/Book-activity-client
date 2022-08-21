import { AppStoreType } from "./redux-store";

export const getActiveBooks = (state: AppStoreType) => {
    return state.activeBookStore.activeBooks;
}