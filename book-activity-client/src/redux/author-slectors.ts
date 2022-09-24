import { AppStoreType } from "./redux-store";

export const getAuthors= (state: AppStoreType) => {
    return state.authorStore.authors
}