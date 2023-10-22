import { ThunkAction } from "redux-thunk";
import { AppStoreType } from "../redux-store";
import { getCurrentUserRequestThunkCreator } from "./user-reducer";

export type InitialStateType = {
    initialized: boolean,
}

const initialState: InitialStateType = {
    initialized: false
}

const INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS";

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessType => ({
    type: INITIALIZED_SUCCESS
})

type ActionsTypes = InitializedSuccessType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>;

export const initializeThunkCreator = (): ThunkType => {
    return async (dispatch, getState) => {
        var promise = dispatch(getCurrentUserRequestThunkCreator());

        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess())
        })
    }
}

export default appReducer;