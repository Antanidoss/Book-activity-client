import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { authorApi } from "../api/authorApi";
import { AuthorType } from "../types/authorType";
import { AppStoreType } from "./redux-store";

export type InitialStateType = {
    authors: Array<AuthorType>
}

let initialState: InitialStateType = {
    authors: []
}

const ADD_AUTHOR = "ADD_AUTHOR";
const SET_AUTHORS = "SET_AUTHORS"

const authorReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_AUTHOR:
            let author: AuthorType = {
                id: action.id,
                firstName: action.firstName,
                surname: action.surname,
                patronymic: action.patronymic
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
    type: typeof ADD_AUTHOR, id: string, firstName: string, surname: string, patronymic: string
}
export const addAuthor = (id: string, firstName: string, surname: string, patronymic: string): AddAuthorType => ({
    type: ADD_AUTHOR, id: id, firstName: firstName, surname: surname, patronymic: patronymic
})

type SetAuthors = {
    type: typeof SET_AUTHORS, authors: Array<AuthorType>
}
export const setAuthors = (authors: Array<AuthorType>): SetAuthors => ({
    type: SET_AUTHORS, authors: authors
})

type ActionsTypes = AddAuthorType | SetAuthors;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>
type GetStateType = () => AppStoreType;

export const addAuthorRequestThunkCreator = (firstName: string, surname: string, patronymic: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await authorApi.addAuthor(firstName, surname, patronymic);
        if (response.success) {
            dispatch(addAuthor(response.result, firstName, surname, patronymic));
        }
    }
}

export const getAuthorsByNameRequestThunkCreator = (name: string): ThunkAction<Promise<Array<AuthorType>>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await authorApi.getAuthorsByName(name, 5);
        if (response.success) {
            dispatch(setAuthors(response.result));
        }

        return getState().authorStore.authors;
    }
}

export const getAllAuthorsRequestThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await authorApi.getAllAuthors();
        if (response.success) {
            dispatch(setAuthors(response.result));
        }
    }
}

export default authorReducer;