import { BookOfListType } from '../../types/books/bookOfListType';
import { AppStoreType } from '../redux-store';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from "redux";
import { bookApi } from '../../api/bookApi';
import { calculateSkip } from '../../types/common/paginationType';
import { isBadStatusCode } from '../../api/instanceAxios';
import { bookRatingApi } from '../../api/bookRatingApi';
import { BookFilterType, BookFilterTypeDefault } from '../../types/books/bookFilterType';
import { AddBookType } from '../../types/books/addBookType';

export type InitialStateType = {
    pageSize: number
    pageNumber: number
    totalBookCount: number
    books: Array<BookOfListType>,
    bookFilter: BookFilterType
}

const initialState: InitialStateType = {
    pageSize: 10,
    pageNumber: 1,
    totalBookCount: 0,
    books: [] as Array<BookOfListType>,
    bookFilter: BookFilterTypeDefault
}

const UPDATE_PAGE_NUMBER = "UPDATE_PAGE_NUMBER";
const SET_BOOKS_DATA = "SET_BOOKS_DATA";
const SET_ACTIVE_BOOK_STATUS = "SET_ACTIVE_BOOK_STATUS";
const UPDATE_BOOK_RATING = "UPDATE_BOOK_RATING";
const UPDATE_TOTAL_BOOK_COUNT = "UPDATE_TOTAL_BOOK_COUNT";
const UPDATE_BOOK_FILTER = "UPDATE_BOOK_FILTER";

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
                books: action.books
            }
        case SET_ACTIVE_BOOK_STATUS:
            return {
                ...state,
                books: state.books.map(b => {
                    if (b.id === action.bookId) {
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
                    if (b.bookRating.id === action.bookRatingId) {
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
        case UPDATE_TOTAL_BOOK_COUNT:
            return {
                ...state,
                totalBookCount: action.totalBookCount
            }
        case UPDATE_BOOK_FILTER:
            return {
                ...state,
                bookFilter: {
                    bookTitle: action.bookFilter.bookTitle,
                    averageRatingFrom: action.bookFilter.averageRatingFrom,
                    averageRatingTo: action.bookFilter.averageRatingTo,
                }
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
    type: typeof SET_BOOKS_DATA, books: Array<BookOfListType>
}
export const setBooksData = (books: Array<BookOfListType>): SetBooksDataType => ({
    type: SET_BOOKS_DATA, books: books
})

type SetActiveBookStatusType = {
    type: typeof SET_ACTIVE_BOOK_STATUS, bookId: string
}
export const setActiveBookStatus = (bookId: string): SetActiveBookStatusType => ({
    type: SET_ACTIVE_BOOK_STATUS, bookId: bookId
})

type UpdateBookRatingType = {
    type: typeof UPDATE_BOOK_RATING, grade: number, bookRatingId: string, description: string, userId: string
}
export const updateBookRating = (grade: number, bookRatingId: string, description: string, userId: string): UpdateBookRatingType => ({
    type: UPDATE_BOOK_RATING, grade: grade, bookRatingId: bookRatingId, description: description, userId: userId
})

type UpdateTotalBookCountType = {
    type: typeof UPDATE_TOTAL_BOOK_COUNT, totalBookCount: number
}
export const updateTotalBookCountType = (totalBookCount: number): UpdateTotalBookCountType => ({
    type: UPDATE_TOTAL_BOOK_COUNT, totalBookCount: totalBookCount
})

type UpdateBookFilterType = {
    type: typeof UPDATE_BOOK_FILTER, bookFilter: BookFilterType
}
export const updateBookFilter = (bookFilter: BookFilterType): UpdateBookFilterType => ({
    type: UPDATE_BOOK_FILTER, bookFilter: bookFilter
})

type ActionsTypes = UpdatePageNumberType | SetBooksDataType | SetActiveBookStatusType | UpdateBookRatingType | UpdateTotalBookCountType | UpdateBookFilterType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const getBooksByFilter = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const bookState = getState().bookStore;
        const skip = calculateSkip(bookState.pageNumber, bookState.pageSize);
        const response = await bookApi.getBooksByFilter(bookState.bookFilter, skip, bookState.pageSize);
        
        dispatch(setBooksData(response.data.books.items));
        dispatch(updateTotalBookCountType(response.data.books.totalCount));
    }
}

export const addBookRequestThunkCreator = (addBookModel: AddBookType): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookApi.addBook(addBookModel);
        const success = !isBadStatusCode(response.status);

        return success;
    }
}

export const updateBookRatingRequestThunkCreator = (bookRatingId: string, grade: number, description: string, userId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookRatingApi.update(bookRatingId, grade, description);
        const success = !isBadStatusCode(response.status);
        if (success) {
            dispatch(updateBookRating(grade, bookRatingId, description, userId));
        }

        return success;
    }
}

export default bookReducer;