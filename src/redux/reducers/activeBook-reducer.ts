import { AppStoreType } from '../redux-store';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from "redux";
import { activeBookApi } from '../../api/activeBookApi';
import { calculateSkip, PaginationType } from '../../types/common/paginationType';
import { isBadStatusCode } from '../../api/instanceAxios';
import { bookNoteApi } from '../../api/bookNoteApi';
import { ActiveBookOfListType } from '../types/activeBooks/activeBookOfListType';
import { ActiveBookFilterType } from '../types/activeBooks/activeBookFilter';

export type ActiveBookInitialStateType = {
    allActiveBookPage: {
        pageSize: number
        pageNumber: number
        totalActiveBookCount: number
        activeBooks: Array<ActiveBookOfListType>,
        filter: ActiveBookFilterType,
    }
}

const initialState: ActiveBookInitialStateType = {
    allActiveBookPage: {
        pageSize: 10,
        pageNumber: 1,
        totalActiveBookCount: 0,
        activeBooks: [],
        filter: { sortBy: 1, withFullRead: true }
    }
}

const SET_ACTIVE_BOOKS = "SET_ACTIVE_BOOKS";
const UPDATE_ACTIVE_BOOK = "UPDATE_ACTIVE_BOOK";
const REMOVE_ACTIVE_BOOK = "REMOVE_ACTIVE_BOOK";
const ADD_BOOK_NOTE = "ADD_BOOK_NOTE";
const UPDATE_FILTER = "UPDATE_FILTER"
const UPDATE_CURRENT_PAGE_NUMBER = "UPDATE_CURRENT_PAGE_NUMBER";
const UPDATE_TOTAL_COUNT = "UPDATE_TOTAL_BOOK_COUNT";

const activeBookReducer = (state = initialState, actions: ActionsTypes): ActiveBookInitialStateType => {
    switch (actions.type) {
        case SET_ACTIVE_BOOKS:
            return {
                ...state,
                allActiveBookPage: {
                    ...state.allActiveBookPage,
                    activeBooks: actions.activeBooks,
                }
            }
        case UPDATE_ACTIVE_BOOK:
            return {
                ...state,
                allActiveBookPage: {
                    ...state.allActiveBookPage,
                    activeBooks: state.allActiveBookPage.activeBooks.map(a => {
                        if (a.id === actions.activeBookId) {
                            return {
                                ...a,
                                numberPagesRead: actions.numberPagesRead
                            }
                        }

                        return a;
                    })
                }
            }
        case REMOVE_ACTIVE_BOOK:
            return {
                ...state,
                allActiveBookPage: {
                    ...state.allActiveBookPage,
                    activeBooks: state.allActiveBookPage.activeBooks.filter(a => a.id !== actions.activeBookId)
                }
            }
        case UPDATE_FILTER:
            return {
                ...state,
                allActiveBookPage: {
                    ...state.allActiveBookPage,
                    filter: actions.filter
                }
            }
        case UPDATE_CURRENT_PAGE_NUMBER:
            return {
                ...state,
                allActiveBookPage: {
                    ...state.allActiveBookPage,
                    pageNumber: actions.pageNumber
                }
            }
        case UPDATE_TOTAL_COUNT:
            return {
                ...state,
                allActiveBookPage: {
                    ...state.allActiveBookPage,
                    totalActiveBookCount: actions.totalCount
                }
            }
        default:
            return state;
    }
}

type SetActiveBooksType = {
    type: typeof SET_ACTIVE_BOOKS, activeBooks: Array<ActiveBookOfListType>
}
const setActiveBooks = (activeBooks: Array<ActiveBookOfListType>): SetActiveBooksType => ({
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

type AddBookNoteType = {
    type: typeof ADD_BOOK_NOTE, activeBookId: string, note: string, noteColor: string
}
const addBookNote = (activeBookId: string, note: string, noteColor: string): AddBookNoteType => ({
    type: ADD_BOOK_NOTE, activeBookId: activeBookId, note: note, noteColor: noteColor
})

type UpdateFilterType = {
    type: typeof UPDATE_FILTER, filter: ActiveBookFilterType
}
export const updateFilter = (filter: ActiveBookFilterType): UpdateFilterType => ({
    type: UPDATE_FILTER, filter: filter
})

type UpdateCurrentPageNumberType = {
    type: typeof UPDATE_CURRENT_PAGE_NUMBER, pageNumber: number
}
export const updateCurrentPageNumber = (pageNumber: number) => ({
    type: UPDATE_CURRENT_PAGE_NUMBER, pageNumber: pageNumber
})

type UpdateTotalCountType = {
    type: typeof UPDATE_TOTAL_COUNT, totalCount: number
}
export const updateTotalCount = (totalCount: number): UpdateTotalCountType => ({
    type: UPDATE_TOTAL_COUNT, totalCount: totalCount
})


type ActionsTypes = SetActiveBooksType | UpdateActiveBookType | RemoveActiveBookType | AddBookNoteType | UpdateFilterType | UpdateCurrentPageNumberType | UpdateTotalCountType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const addActiveBookRequestThunkCreator = (numberPagesRead: number, totalNumberPages: number, bookId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async () => {
        const response = await activeBookApi.addActiveBook(totalNumberPages, numberPagesRead, bookId);
        if (response.success) {
            getActiveBooksByFilterThunkCreator();
        }

        return response.success;
    }
}

export const getActiveBooksByFilterThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const state = getState().activeBookStore;
        const skip = calculateSkip(state.allActiveBookPage.pageNumber, state.allActiveBookPage.pageSize);
        const pagination: PaginationType = { skip: skip, take: state.allActiveBookPage.pageSize };
        const response = await activeBookApi.getActiveBooksByFilter(state.allActiveBookPage.filter, pagination);

        dispatch(setActiveBooks(response.data.activeBooks.items.map(a => ({
            id: a.id,
            book: {
                id: a.book.id,
                averageRating: a.book.averageRating,
                imageDataBase64: a.book.imageDataBase64,
                title: a.book.title,
                hasOpinion: a.book.hasOpinion,
            },
            numberPagesRead: a.numberPagesRead,
            totalNumberPages: a.totalNumberPages
        }))));
        
        dispatch(updateTotalCount(response.data.activeBooks.totalCount));
    }
}

export const updateActiveBookThunkCreator = (activeBookId: string, numberPagesRead: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        await activeBookApi.updateActiveBook(activeBookId, numberPagesRead);
        dispatch(updateActiveBook(activeBookId, numberPagesRead));
    }
}

export const removeActiveBookThunkCreator = (activeBookId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        const response = await activeBookApi.removeActiveBook(activeBookId);
        const success = !isBadStatusCode(response.status);
        if (success) {
            dispatch(removeActiveBook(activeBookId))
        }

        return success;
    }
}

export const addBookNoteThunkCreator = (activeBookId: string, note: string, noteColor: string, noteTextColor: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        const response = await bookNoteApi.addBookNote(activeBookId, note, noteColor, noteTextColor);
        const success = !isBadStatusCode(response.status);
        if (success) {
            dispatch(addBookNote(activeBookId, note, noteColor))
        }

        return success;
    }
}

export default activeBookReducer;