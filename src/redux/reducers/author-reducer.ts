import { ThunkAction } from "redux-thunk";
import { authorApi } from "../../api/authorApi";
import { AppStoreType } from "../redux-store";

export const addAuthorRequestThunkCreator = (firstName: string, surname: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, any> => {
    return async () => {
        const response = await authorApi.addAuthor(firstName, surname);

        return response.success;
    }
}