import { BookType } from '../types/bookType';
import { AppStoreType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from "redux";
import { activeBookApi } from '../api/activeBookApi';
import { ActiveBook } from '../types/activeBookType';
import { calculateSkip } from '../pagination/pagination';

export type InitialStateType = {
    pageSize: number
    pageNumber: number
    totalBookCount: number | null
    activeBooks: Array<ActiveBook>,
}

let initialState: InitialStateType = {
    pageSize: 5,
    pageNumber: 1,
    totalBookCount: 0,
    activeBooks: [] as Array<ActiveBook>,
}

const ADD_ACTIVE_BOOK = "ADD_ACTIVE_BOOK";
const SET_ACTIVE_BOOKS = "SET_ACTIVE_BOOKS";

const activeBookReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type) {
        case ADD_ACTIVE_BOOK:
            let activeBook: ActiveBook = {
                id: actions.id,
                numberPagesRead: actions.numberPagesRead,
                totalNumberPages: actions.totalNumberPages,
                bookId: actions.bookId
            }

            return {
                ...state,
                activeBooks: state.activeBooks.concat(activeBook)
            }
            case SET_ACTIVE_BOOKS:
                return {
                    ...state,
                    activeBooks: actions.activeBooks
                }
        default:
            return state;
    }
}

type AddActiveBookType = {
    type: typeof ADD_ACTIVE_BOOK, id: string, numberPagesRead: number, totalNumberPages: number, bookId: string
}

const addActiveBook = (id: string, numberPagesRead: number, totalNumberPages: number, bookId: string): AddActiveBookType => ({
    type: ADD_ACTIVE_BOOK, id: id, numberPagesRead: numberPagesRead, totalNumberPages: totalNumberPages, bookId: bookId
})

type SetActiveBooksType = {
    type: typeof SET_ACTIVE_BOOKS, activeBooks: Array<ActiveBook>
}

const setActiveBooks = (activeBooks: Array<ActiveBook>): SetActiveBooksType => ({
    type: SET_ACTIVE_BOOKS, activeBooks: activeBooks
})

type ActionsTypes = AddActiveBookType | SetActiveBooksType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const addActiveBookRequestThunkCreator = (numberPagesRead: number, totalNumberPages: number, bookId: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await activeBookApi.addActiveBook(totalNumberPages, numberPagesRead, bookId);
        dispatch(addActiveBook("", numberPagesRead, totalNumberPages, bookId))
    }
}

export const getActiveBooksByCurrentUserThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const state = getState().activeBookStore;
        let skip = calculateSkip(state.pageNumber, state.pageSize);
        let response = await activeBookApi.getActiveBooksByCurrentUser(skip, state.pageSize);
        dispatch(setActiveBooks(response.result));
    }
}

export default activeBookReducer;