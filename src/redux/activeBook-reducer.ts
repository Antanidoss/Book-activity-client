import { AppStoreType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from "redux";
import { activeBookApi } from '../api/activeBookApi';
import { ActiveBook } from '../types/activeBookType';
import { calculateSkip, PaginationType } from '../types/api/paginationType';
import { getBookById } from './book-selectors';
import { BookType } from '../types/bookType';
import { isBadStatusCode } from '../api/instanceAxios';
import { NoteColor } from '../types/bookNoteType';
import { bookNoteApi } from '../api/bookNoteApi';
import { ActiveBookFilterType } from '../types/api/activeBookFilterType';

export type InitialStateType = {
    pageSize: number
    pageNumber: number
    totalActiveBookCount: number
    activeBooks: Array<ActiveBook>,
    filter: ActiveBookFilterType
}

const initialState: InitialStateType = {
    pageSize: 8,
    pageNumber: 1,
    totalActiveBookCount: 0,
    activeBooks: [] as Array<ActiveBook>,
    filter: { sortBy: 1, withFullRead: true }
}

const ADD_ACTIVE_BOOK = "ADD_ACTIVE_BOOK";
const SET_ACTIVE_BOOKS = "SET_ACTIVE_BOOKS";
const UPDATE_ACTIVE_BOOK = "UPDATE_ACTIVE_BOOK";
const REMOVE_ACTIVE_BOOK = "REMOVE_ACTIVE_BOOK";
const ADD_BOOK_NOTE = "ADD_BOOK_NOTE";
const UPDATE_FILTER = "UPDATE_FILTER"
const UPDATE_CURRENT_PAGE_NUMBER = "UPDATE_CURRENT_PAGE_NUMBER";
const UPDATE_TOTAL_COUNT = "UPDATE_TOTAL_BOOK_COUNT";

const activeBookReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type) {
        case ADD_ACTIVE_BOOK:
            const activeBook: ActiveBook = {
                id: actions.id,
                numberPagesRead: actions.numberPagesRead,
                totalNumberPages: actions.totalNumberPages,
                bookId: actions.book.id,
                bookTitle: actions.book.title,
                imageData: actions.book.imageData
            }

            return {
                ...state,
                activeBooks: state.activeBooks.concat(activeBook)
            }
        case SET_ACTIVE_BOOKS:
            return {
                ...state,
                activeBooks: actions.activeBooks,
                totalActiveBookCount: actions.activeBooks.length
            }
        case UPDATE_ACTIVE_BOOK:

            return {
                ...state,
                activeBooks: state.activeBooks.map(a => {
                    if (a.id == actions.activeBookId) {
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
        case UPDATE_FILTER:
            return {
                ...state,
                filter: actions.filter
            }
        case UPDATE_CURRENT_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: actions.pageNumber
            }
        case UPDATE_TOTAL_COUNT:
            return {
                ...state,
                totalActiveBookCount: actions.totalCount
            }
        default:
            return state;
    }
}

type AddActiveBookType = {
    type: typeof ADD_ACTIVE_BOOK, id: string, numberPagesRead: number, totalNumberPages: number, book: BookType
}
const addActiveBook = (id: string, numberPagesRead: number, totalNumberPages: number, book: BookType): AddActiveBookType => ({
    type: ADD_ACTIVE_BOOK, id: id, numberPagesRead: numberPagesRead, totalNumberPages: totalNumberPages, book: book
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

type AddBookNoteType = {
    type: typeof ADD_BOOK_NOTE, activeBookId: string, note: string, noteColor: NoteColor
}
const addBookNote = (activeBookId: string, note: string, noteColor: NoteColor): AddBookNoteType => ({
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

type ActionsTypes = AddActiveBookType | SetActiveBooksType | UpdateActiveBookType | RemoveActiveBookType | AddBookNoteType | UpdateFilterType | UpdateCurrentPageNumberType | UpdateTotalCountType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const addActiveBookRequestThunkCreator = (numberPagesRead: number, totalNumberPages: number, bookId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await activeBookApi.addActiveBook(totalNumberPages, numberPagesRead, bookId);
        if (response.success) {
            var book = getBookById(getState(), bookId);
            dispatch(addActiveBook(response.result, numberPagesRead, totalNumberPages, book as BookType))
            return true;
        }

        return false;
    }
}

export const getActiveBooksByFilterThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const state = getState().activeBookStore;
        const skip = calculateSkip(state.pageNumber, state.pageSize);
        const pagination: PaginationType = { skip: skip, take: state.pageSize };
        const response = await activeBookApi.getActiveBooksByFilter(state.filter, pagination);

        const activeBooks = response.result.entities.map(a => {
            return {
                id: a.id,
                bookId: a.bookId,
                bookTitle: a.bookTitle,
                imageData: a.imageData,
                totalNumberPages: a.totalNumberPages,
                numberPagesRead: a.numberPagesRead,
                notes: a.notes?.map(n => { return { id: n.id, note: n.note, color: n.noteColor } })
            }
        });

        dispatch(setActiveBooks(activeBooks));
        dispatch(updateTotalCount(response.result.totalCount));
    }
}

export const updateActiveBookThunkCreator = (activeBookId: string, numberPagesRead: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        await activeBookApi.updateActiveBook(activeBookId, numberPagesRead);
        dispatch(updateActiveBook(activeBookId, numberPagesRead));
    }
}

export const removeActiveBookThunkCreator = (activeBookId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await activeBookApi.removeActiveBook(activeBookId);
        if (!isBadStatusCode(response.status)) {
            dispatch(removeActiveBook(activeBookId))
            return true;
        }

        return false;
    }
}

export const addBookNoteThunkCreator = (activeBookId: string, note: string, noteColor: NoteColor): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookNoteApi.addBookNote(activeBookId, note, noteColor);
        if (!isBadStatusCode(response.status)) {
            dispatch(addBookNote(activeBookId, note, noteColor))
            return true;
        }

        return false;
    }
}

export default activeBookReducer;