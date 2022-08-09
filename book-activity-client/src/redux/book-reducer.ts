import { Book } from '../types/bookType'
import { AppStoreType } from './redux-store'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from "redux";
import { bookApi } from '../api/bookApi';
import { calculateSkip } from '../pagination/pagination'

export type InitialStateType = {
    pageSize: number
    pageNumber: number
    totalBookCount: number | null
    currentPage: number
    books: Array<Book>,
    currentBook: Book
}

let initialState: InitialStateType = {
    pageSize: 5,
    pageNumber: 1,
    totalBookCount: 0,
    currentPage: 1,
    books: [] as Array<Book>,
    currentBook: {} as Book,
}

const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE";
const SET_BOOKS_DATA = "SET_BOOKS_DATA";

const bookReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case UPDATE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.newCurrentPage
            }
        case SET_BOOKS_DATA:
            return {
                ...state,
                books: action.books
            }
        default:
            return state;
    }
}

type UpdateCurrentPageType = {
    type: typeof UPDATE_CURRENT_PAGE, newCurrentPage: number
}
export const updateCurrentPage = (newCurrentPage: number): UpdateCurrentPageType => ({
    type: UPDATE_CURRENT_PAGE, newCurrentPage: newCurrentPage
})

type SetBooksDataType = {
    type: typeof SET_BOOKS_DATA, books: Array<Book>
}
export const setBooksDataType = (books: Array<Book>): SetBooksDataType => ({
    type: SET_BOOKS_DATA, books: books
})

type ActionsTypes = UpdateCurrentPageType | SetBooksDataType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const getBooksRequestThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let skip = calculateSkip(currentPage, pageSize);
        let respnse = await bookApi.getBooks(skip, pageSize);
        dispatch(setBooksDataType(respnse.data))
    }
}


export default bookReducer;