import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { authorApi } from "../../api/authorApi";
import { AuthorType } from "../../types/authors/authorType";
import { AppStoreType } from "../redux-store";

export type InitialStateType = {
    authors: Array<AuthorType>
}

const initialState: InitialStateType = {
    authors: []
}

const ADD_AUTHOR = "ADD_AUTHOR";
const SET_AUTHORS = "SET_AUTHORS"

const authorReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_AUTHOR:
            const author: AuthorType = {
                id: action.id,
                firstName: action.firstName,
                surname: action.surname,
            }

            return {
                ...state,
                authors: state.authors.concat(author)
            }
        case SET_AUTHORS:
            return {
                ...state,
                authors: action.authors
            }
        default:
            return state
    }
}

type AddAuthorType = {
    type: typeof ADD_AUTHOR, id: string, firstName: string, surname: string
}
export const addAuthor = (id: string, firstName: string, surname: string): AddAuthorType => ({
    type: ADD_AUTHOR, id: id, firstName: firstName, surname: surname
})

type SetAuthors = {
    type: typeof SET_AUTHORS, authors: Array<AuthorType>
}
export const setAuthors = (authors: Array<AuthorType>): SetAuthors => ({
    type: SET_AUTHORS, authors: authors
})

type ActionsTypes = AddAuthorType | SetAuthors;
type GetStateType = () => AppStoreType;

export const addAuthorRequestThunkCreator = (firstName: string, surname: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await authorApi.addAuthor(firstName, surname);
        if (response.success) {
            dispatch(addAuthor(response.result, firstName, surname));
        }

        return response.success;
    }
}

export const getAuthorsByNameRequestThunkCreator = (name: string): ThunkAction<Promise<Array<AuthorType>>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await authorApi.getAuthorsByName(name, 5);
        if (response.success) {
            dispatch(setAuthors(response.result));
        }

        return getState().authorStore.authors;
    }
}

export default authorReducer;