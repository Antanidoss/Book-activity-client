import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { authorApi } from "../../api/authorApi";
import { AppStoreType } from "../redux-store";

export type InitialStateType = {

}

const initialState: InitialStateType = {

}

const authorReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    return state;
}

type ActionsTypes = {};
type GetStateType = () => AppStoreType;

export const addAuthorRequestThunkCreator = (firstName: string, surname: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, any> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await authorApi.addAuthor(firstName, surname);

        return response.success;
    }
}

export default authorReducer;