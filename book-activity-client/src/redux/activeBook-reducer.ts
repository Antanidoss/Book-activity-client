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
const UPDATE_ACTIVE_BOOK = "UPDATE_ACTIVE_BOOK";
const REMOVE_ACTIVE_BOOK = "REMOVE_ACTIVE_BOOK";

const activeBookReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type) {
        case ADD_ACTIVE_BOOK:
            let activeBook: ActiveBook = {
                bookName: actions.bookName,
                id: actions.id,
                numberPagesRead: actions.numberPagesRead,
                totalNumberPages: actions.totalNumberPages,
                bookId: actions.bookId,
                imageData: actions.imageData
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
            case UPDATE_ACTIVE_BOOK:

                return {
                    ...state,
                    activeBooks: state.activeBooks.map(a => {
                        if (a.id == actions.activeBookId){
                            return {
                                ...a,
                                numberPagesRead: actions.numberPagesRead
                            }
                        }

                        return a;
                    })
                }
                case REMOVE_ACTIVE_BOOK:
                    return {
                        ...state,
                        activeBooks: state.activeBooks.filter(a => a.id != actions.activeBookId)
                    }
        default:
            return state;
    }
}

type AddActiveBookType = {
    type: typeof ADD_ACTIVE_BOOK, id: string, bookName: string, numberPagesRead: number, totalNumberPages: number, bookId: string, imageData: ArrayBuffer
}
const addActiveBook = (id: string, bookName: string, numberPagesRead: number, totalNumberPages: number, bookId: string, imageData: ArrayBuffer): AddActiveBookType => ({
    type: ADD_ACTIVE_BOOK, id: id, bookName: bookName, numberPagesRead: numberPagesRead, totalNumberPages: totalNumberPages, bookId: bookId, imageData: imageData
})

type SetActiveBooksType = {
    type: typeof SET_ACTIVE_BOOKS, activeBooks: Array<ActiveBook>
}
const setActiveBooks = (activeBooks: Array<ActiveBook>): SetActiveBooksType => ({
    type: SET_ACTIVE_BOOKS, activeBooks: activeBooks
})

type UpdateActiveBookType = {
    type: typeof UPDATE_ACTIVE_BOOK, activeBookId: string, numberPagesRead: number
}
const updateActiveBook = (activeBookId: string, numberPagesRead: number): UpdateActiveBookType => ({
    type: UPDATE_ACTIVE_BOOK, activeBookId: activeBookId, numberPagesRead: numberPagesRead 
})

type RemoveActiveBookType = {
    type: typeof REMOVE_ACTIVE_BOOK, activeBookId: string
}
const removeActiveBook = (activeBookId: string): RemoveActiveBookType => ({
    type: REMOVE_ACTIVE_BOOK, activeBookId: activeBookId
})

type ActionsTypes = AddActiveBookType | SetActiveBooksType | UpdateActiveBookType | RemoveActiveBookType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const addActiveBookRequestThunkCreator = (numberPagesRead: number, totalNumberPages: number, bookId: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await activeBookApi.addActiveBook(totalNumberPages, numberPagesRead, bookId);
        if (response.success) {
            //Нужно возвращать id активной книги
            const state = getState().activeBookStore;
            const skip = calculateSkip(state.pageNumber, state.pageSize);
            const getActiveBookResponse = await activeBookApi.getActiveBooksByCurrentUser(skip, state.pageSize);
            getActiveBookResponse.result.forEach(a => dispatch(addActiveBook(a.id, a.bookName, a.numberPagesRead, a.totalNumberPages, a.bookId, a.imageData)))
        }
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

export const updateActiveBookThunkCreator = (activeBookId: string, numberPagesRead: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        await activeBookApi.updateActiveBook(activeBookId, numberPagesRead);
        dispatch(updateActiveBook(activeBookId, numberPagesRead));
    }
} 

export const removeActiveBookThunkCreator = (activeBookId: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        await activeBookApi.removeActiveBook(activeBookId);
        dispatch(removeActiveBook(activeBookId))
    }
}

export default activeBookReducer;