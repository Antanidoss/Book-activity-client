import { BookType } from '../types/bookType';
import { AppStoreType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from "redux";
import { AddBookModelType, bookApi } from '../api/bookApi';
import { calculateSkip } from '../pagination/pagination';

export type InitialStateType = {
    pageSize: number
    pageNumber: number
    totalBookCount: number
    books: Array<BookType>,
    currentBook: BookType
}

let initialState: InitialStateType = {
    pageSize: 8,
    pageNumber: 1,
    totalBookCount: 0,
    books: [] as Array<BookType>,
    currentBook: {} as BookType,
}

const UPDATE_PAGE_NUMBER = "UPDATE_PAGE_NUMBER";
const SET_BOOKS_DATA = "SET_BOOKS_DATA";
const SET_ACTIVE_BOOK_STATUS = "SET_ACTIVE_BOOK_STATUS";
const ADD_BOOK = "ADD_BOOK";

const bookReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case UPDATE_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: action.newPageNumber
            }
        case SET_BOOKS_DATA:
            return {
                ...state,
                books: action.books,
                totalBookCount: action.books.length
            }
        case SET_ACTIVE_BOOK_STATUS:
            return {
                ...state,
                books: state.books.map(b => {
                    if (b.id == action.bookId) {
                        return {
                            ...b,
                            isActiveBook: true
                        }
                    }

                    return b;
                })
            }
        default:
            return state;
    }
}

type UpdatePageNumberType = {
    type: typeof UPDATE_PAGE_NUMBER, newPageNumber: number
}
export const updateCurrentPage = (newPageNumber: number): UpdatePageNumberType => ({
    type: UPDATE_PAGE_NUMBER, newPageNumber: newPageNumber
})

type SetBooksDataType = {
    type: typeof SET_BOOKS_DATA, books: Array<BookType>
}
export const setBooksDataType = (books: Array<BookType>): SetBooksDataType => ({
    type: SET_BOOKS_DATA, books: books
})

type SetActiveBookStatusType = {
    type: typeof SET_ACTIVE_BOOK_STATUS, bookId: string
}
export const setActiveBookStatus = (bookId: string): SetActiveBookStatusType => ({
    type: SET_ACTIVE_BOOK_STATUS, bookId: bookId
})

type AddBookType = {
    type: typeof ADD_BOOK, addBookModel: AddBookModelType
}
export const addBook = (addBookModel: AddBookModelType): AddBookType => ({
    type: ADD_BOOK, addBookModel: addBookModel
})

type ActionsTypes = UpdatePageNumberType | SetBooksDataType | SetActiveBookStatusType | AddBookType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const getBooksRequestThunkCreator = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let state = getState().bookStore;
        let skip = calculateSkip(state.pageNumber, state.pageSize);
        let respnse = await bookApi.getBooks(skip, state.pageSize);
        dispatch(setBooksDataType(respnse.result))
    }
}

export const addBookRequestThunkCreator = (addBookModel: AddBookModelType): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        var response = await bookApi.addBook(addBookModel);
        if (response.status == 200) {
            dispatch(addBook(addBookModel))
            return true;
        }

        return false;
    }
}

export default bookReducer;