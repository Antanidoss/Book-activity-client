import { BookType } from '../types/bookType';
import { AppStoreType } from './redux-store';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from "redux";
import { AddBookModelType, bookApi } from '../api/bookApi';
import { calculateSkip } from '../types/paginationType';
import { isBadStatusCode } from '../api/instanceAxios';
import { bookRatingApi } from '../api/bookRatingApi';
import { BookFilterType } from '../types/bookFilterType';

export type InitialStateType = {
    pageSize: number
    pageNumber: number
    totalBookCount: number
    books: Array<BookType>,
    currentBook: BookType
}

const initialState: InitialStateType = {
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
const UPDATE_BOOK_RATING = "UPDATE_BOOK_RATING";

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
        case UPDATE_BOOK_RATING:
            return {
                ...state,
                books: state.books.map(b => {
                    if (b.bookRating.id == action.bookRatingId) {
                        return {
                            ...b,
                            bookRating: {
                                ...b.bookRating,
                                bookOpinions: b.bookRating.bookOpinions.concat({ grade: action.grade, description: action.description, userId: action.userId })
                            }
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
export const setBooksData = (books: Array<BookType>): SetBooksDataType => ({
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

type UpdateBookRatingType = {
    type: typeof UPDATE_BOOK_RATING, grade: number, bookRatingId: string, description: string, userId: string
}
export const updateBookRating = (grade: number, bookRatingId: string, description: string, userId: string): UpdateBookRatingType => ({
    type: UPDATE_BOOK_RATING, grade: grade, bookRatingId: bookRatingId, description: description, userId: userId
})

type ActionsTypes = UpdatePageNumberType | SetBooksDataType | SetActiveBookStatusType | AddBookType | UpdateBookRatingType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const getBooksByFilter = (bookFilterModel?: BookFilterType): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const state = getState().bookStore;
        const skip = calculateSkip(state.pageNumber, state.pageSize);
        if (bookFilterModel === undefined) {
            bookFilterModel = {
                averageRatingFrom: 0,
                averageRatingTo: 5,
                skip: skip,
                take: state.pageSize
            }
        }
        else {
            bookFilterModel.skip = skip;
            bookFilterModel.take = state.pageSize;
        }

        const response = await bookApi.getBooksByFilter(bookFilterModel);
        if (response.success) {
            dispatch(setBooksData(response.result))
        }
    }
}


export const addBookRequestThunkCreator = (addBookModel: AddBookModelType): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookApi.addBook(addBookModel);
        if (!isBadStatusCode(response.status)) {
            dispatch(addBook(addBookModel))
            return true;
        }

        return false;
    }
}

export const updateBookRatingRequestThunkCreator = (bookRatingId: string, grade: number, description: string, userId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookRatingApi.update(bookRatingId, grade, description);
        if (!isBadStatusCode(response.status)) {
            dispatch(updateBookRating(grade, bookRatingId, description, userId));
            return true;
        }

        return false;
    }
}

export default bookReducer;