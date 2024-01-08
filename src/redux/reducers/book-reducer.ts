import { BookOfListType } from '../../types/books/bookOfListType';
import { AppStoreType } from '../redux-store';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from "redux";
import { bookApi } from '../../api/bookApi';
import { calculateSkip } from '../../types/common/paginationType';
import { isBadStatusCode } from '../../api/instanceAxios';
import { bookOpinionApi } from '../../api/bookOpinionApi';
import { BookFilterType, BookFilterTypeDefault } from '../../types/books/bookFilterType';
import { AddBookType } from '../../types/books/addBookType';
import { AuthorForAddBookType } from '../../types/books/authorForAddBookType';
import { authorApi } from '../../api/authorApi';
import { BookInfoType } from '../../types/books/bookInfoType';
import { BookOpinionType } from '../../types/books/bookOpinionType';

export type InitialStateType = {
    bookOpinion?: BookOpinionType,
    allBooksPage: {
        pageSize: number
        pageNumber: number
        totalBookCount: number
        books: Array<BookOfListType>,
        bookFilter: BookFilterType
    },
    bookInfoPage: {
        bookInfo?: BookInfoType
    },
    addBookPage: {
        authors: Array<AuthorForAddBookType>
    }
}

const initialState: InitialStateType = {
    allBooksPage: {
        pageSize: 10,
        pageNumber: 1,
        totalBookCount: 0,
        books: [] as Array<BookOfListType>,
        bookFilter: BookFilterTypeDefault
    },
    bookInfoPage: {
    },
    addBookPage: {
        authors: [] as Array<AuthorForAddBookType>
    }
}

const UPDATE_PAGE_NUMBER = "UPDATE_PAGE_NUMBER";
const SET_BOOKS_LIST = "SET_BOOKS_LIST";
const SET_ACTIVE_BOOK_STATUS = "SET_ACTIVE_BOOK_STATUS";
const UPDATE_BOOK_RATING = "UPDATE_BOOK_RATING";
const UPDATE_TOTAL_BOOK_COUNT = "UPDATE_TOTAL_BOOK_COUNT";
const UPDATE_BOOK_FILTER = "UPDATE_BOOK_FILTER";
const SET_AUTHORS_FOR_ADD_BOOK = "SET_AUTHORS_FOR_ADD_BOOK";
const SET_BOOK_INFO = "SET_BOOK_INFO";
const SET_BOOK_OPINION = "SET_BOOK_OPINION";
const ADD_BOOK_OPINION_LIKE = "ADD_BOOK_OPINION_LIKE";
const ADD_BOOK_OPINION_DISLIKE = "ADD_BOOK_OPINION_DISLIKE";
const REMOVE_BOOK_OPINION_LIKE = "REMOVE_BOOK_OPINION_LIKE";
const REMOVE_BOOK_OPINION_DISLIKE = "REMOVE_BOOK_OPINION_DISLIKE";

const bookReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case UPDATE_PAGE_NUMBER:
            return {
                ...state,
                allBooksPage: {
                    ...state.allBooksPage,
                    pageNumber: action.newPageNumber
                }
            }
        case SET_BOOKS_LIST:
            return {
                ...state,
                allBooksPage: {
                    ...state.allBooksPage,
                    books: action.books
                }
            }
        case SET_ACTIVE_BOOK_STATUS:
            return {
                ...state,
                allBooksPage: {
                    ...state.allBooksPage,
                    books: state.allBooksPage.books.map(b => {
                        if (b.id === action.bookId) {
                            return {
                                ...b,
                                isActiveBook: true
                            }
                        }

                        return b;
                    })
                }
            }
        case UPDATE_BOOK_RATING:
            return {
                ...state,
                allBooksPage: {
                    ...state.allBooksPage,
                    books: state.allBooksPage.books.map(b => {
                        if (b.id === action.bookId) {
                            return {
                                ...b,
                                averageRating: action.averageRating
                            }
                        }

                        return b;
                    })
                }
            }
        case UPDATE_TOTAL_BOOK_COUNT:
            return {
                ...state,
                allBooksPage: {
                    ...state.allBooksPage,
                    totalBookCount: action.totalBookCount
                }
            }
        case UPDATE_BOOK_FILTER:
            return {
                ...state,
                allBooksPage: {
                    ...state.allBooksPage,
                    bookFilter: {
                        bookTitle: action.bookFilter.bookTitle,
                        averageRatingFrom: action.bookFilter.averageRatingFrom,
                        averageRatingTo: action.bookFilter.averageRatingTo,
                    }
                }
            }
        case SET_BOOK_INFO:
            return {
                ...state,
                bookInfoPage: {
                    ...state.bookInfoPage,
                    bookInfo: action.bookInfo
                }
            }
        case SET_BOOK_OPINION:
            return {
                ...state,
                bookOpinion: action.bookOpinion
            }
        case ADD_BOOK_OPINION_LIKE:
            return {
                ...state,
                bookInfoPage: {
                    ...state.bookInfoPage.bookInfo,
                    bookInfo: {
                        ...state.bookInfoPage.bookInfo as BookInfoType,
                        bookOpinions: (state.bookInfoPage.bookInfo as BookInfoType).bookOpinions.map(o => {
                            if (o.user.id === action.userIdOpinion) {
                                if (action.hasDislike) {
                                    o.dislikesCount--;
                                    o.hasDislike = false;
                                }

                                o.hasLike = true;
                                o.likesCount++;
                            }

                            return o;
                        })
                    }
                }
            }
        case ADD_BOOK_OPINION_DISLIKE:
            return {
                ...state,
                bookInfoPage: {
                    ...state.bookInfoPage.bookInfo,
                    bookInfo: {
                        ...state.bookInfoPage.bookInfo as BookInfoType,
                        bookOpinions: (state.bookInfoPage.bookInfo as BookInfoType).bookOpinions.map(o => {
                            if (o.user.id === action.userIdOpinion) {
                                if (action.hasLike) {
                                    o.likesCount--;
                                    o.hasLike = false;
                                }

                                o.hasDislike = true;
                                o.dislikesCount++;
                            }

                            return o;
                        })
                    }
                }
            }
        case REMOVE_BOOK_OPINION_LIKE:
            return {
                ...state,
                bookInfoPage: {
                    ...state.bookInfoPage.bookInfo,
                    bookInfo: {
                        ...state.bookInfoPage.bookInfo as BookInfoType,
                        bookOpinions: (state.bookInfoPage.bookInfo as BookInfoType).bookOpinions.map(o => {
                            if (o.user.id === action.userIdOpinion) {
                                o.likesCount--;
                                o.hasLike = false;
                            }

                            return o;
                        })
                    }
                }
            }
        case REMOVE_BOOK_OPINION_DISLIKE:
            return {
                ...state,
                bookInfoPage: {
                    ...state.bookInfoPage.bookInfo,
                    bookInfo: {
                        ...state.bookInfoPage.bookInfo as BookInfoType,
                        bookOpinions: (state.bookInfoPage.bookInfo as BookInfoType).bookOpinions.map(o => {
                            if (o.user.id === action.userIdOpinion) {
                                o.dislikesCount--;
                                o.hasDislike = false;
                            }

                            return o;
                        })
                    }
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

type SetBooksListType = {
    type: typeof SET_BOOKS_LIST, books: Array<BookOfListType>
}
export const setBooksList = (books: Array<BookOfListType>): SetBooksListType => ({
    type: SET_BOOKS_LIST, books: books
})

type SetActiveBookStatusType = {
    type: typeof SET_ACTIVE_BOOK_STATUS, bookId: string
}
export const setActiveBookStatus = (bookId: string): SetActiveBookStatusType => ({
    type: SET_ACTIVE_BOOK_STATUS, bookId: bookId
})

type UpdateBookRatingType = {
    type: typeof UPDATE_BOOK_RATING, averageRating: number, bookId: string, description: string, userId: string
}
export const updateBookRating = (averageRating: number, bookId: string, description: string, userId: string): UpdateBookRatingType => ({
    type: UPDATE_BOOK_RATING, averageRating: averageRating, bookId, description, userId
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

type SetAuthorsForAddBookType = {
    type: typeof SET_AUTHORS_FOR_ADD_BOOK, authors: Array<AuthorForAddBookType>
}
export const setAuthorsForAddBook = (authors: Array<AuthorForAddBookType>): SetAuthorsForAddBookType => ({
    type: SET_AUTHORS_FOR_ADD_BOOK, authors
})

type SetBookInfoType = {
    type: typeof SET_BOOK_INFO, bookInfo: BookInfoType
}
export const setBookInfo = (bookInfo: BookInfoType): SetBookInfoType => ({
    type: SET_BOOK_INFO, bookInfo
})

type SetBookOpinionType = {
    type: typeof SET_BOOK_OPINION, bookOpinion: BookOpinionType
}
export const setBookOpinion = (bookOpinion: BookOpinionType): SetBookOpinionType => ({
    type: SET_BOOK_OPINION, bookOpinion
})

type AddBookOpinionLikeType = {
    type: typeof ADD_BOOK_OPINION_LIKE, userIdOpinion: string, bookId: string, hasDislike: boolean
}
export const addBookOpinionLike = (userIdOpinion: string, bookId: string, hasDislike: boolean): AddBookOpinionLikeType => ({
    type: ADD_BOOK_OPINION_LIKE, userIdOpinion, bookId, hasDislike
})

type AddBookOpinionDislikeType = {
    type: typeof ADD_BOOK_OPINION_DISLIKE, userIdOpinion: string, bookId: string, hasLike: boolean
}
export const addBookOpinionDislike = (userIdOpinion: string, bookId: string, hasLike: boolean): AddBookOpinionDislikeType => ({
    type: ADD_BOOK_OPINION_DISLIKE, userIdOpinion, bookId, hasLike
})

type RemoveBookOpinionLikeType = {
    type: typeof REMOVE_BOOK_OPINION_LIKE, userIdOpinion: string, bookId: string
}
export const removeBookOpinionLike = (userIdOpinion: string, bookId: string): RemoveBookOpinionLikeType => ({
    type: REMOVE_BOOK_OPINION_LIKE, userIdOpinion, bookId
})

type RemoveBookOpinionDislikeType = {
    type: typeof REMOVE_BOOK_OPINION_DISLIKE, userIdOpinion: string, bookId: string
}
export const removeBookOpinionDislike = (userIdOpinion: string, bookId: string): RemoveBookOpinionDislikeType => ({
    type: REMOVE_BOOK_OPINION_DISLIKE, userIdOpinion, bookId
})

type ActionsTypes = UpdatePageNumberType | SetBooksListType | SetActiveBookStatusType | UpdateBookRatingType | UpdateTotalBookCountType | UpdateBookFilterType | SetAuthorsForAddBookType | SetBookInfoType | SetBookOpinionType | AddBookOpinionLikeType | AddBookOpinionDislikeType | RemoveBookOpinionLikeType | RemoveBookOpinionDislikeType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const getBooksByFilter = (): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const bookState = getState().bookStore;
        const skip = calculateSkip(bookState.allBooksPage.pageNumber, bookState.allBooksPage.pageSize);
        const response = await bookApi.getBooksByFilter(bookState.allBooksPage.bookFilter, skip, bookState.allBooksPage.pageSize);

        dispatch(setBooksList(response.data.books.items));
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

export const addBookOpinionThunkCreator = (bookId: string, grade: number, description: string, userId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookOpinionApi.update(bookId, grade, description);
        const success = !isBadStatusCode(response.status);
        if (success) {
            dispatch(updateBookRating(grade, bookId, description, userId));
        }

        return success;
    }
}

export const getAuthorsByNameRequestThunkCreator = (name: string): ThunkAction<Promise<Array<AuthorForAddBookType>>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await authorApi.getAuthorsByName(name, 5);
        if (!isBadStatusCode(response.status)) {
            return dispatch(setAuthorsForAddBook(response.data.data.authors.items)).authors;
        }

        return [];
    }
}

export const getBookInfoThunkCreator = (bookId: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookApi.getBookInfo(bookId);
        if (!isBadStatusCode(response.status)) {
            dispatch(setBookInfo(response.data.data.bookById.map(i => ({
                id: i.id,
                title: i.title,
                description: i.description,
                imageDataBase64: i.imageDataBase64,
                bookOpinionsCount: i.bookOpinions.totalCount,
                isActiveBook: i.isActiveBook,
                averageRating: i.averageRating,
                hasOpinion: i.hasOpinion,
                bookAuthorNames: i.bookAuthors.map(a => a.author.firstName + " " + a.author.surname),
                bookOpinions: i.bookOpinions.items.map(o => ({
                    description: o.description,
                    grade: o.grade,
                    likesCount: o.likes.totalCount,
                    dislikesCount: o.dislikes.totalCount,
                    hasLike: o.hasLike,
                    hasDislike: o.hasDislike,
                    user: {
                        id: o.user.id,
                        avatarDataBase64: o.user.avatarDataBase64,
                        userName: o.user.userName
                    }
                }))
            }))[0]));
        }
    }
}

export const getBookOpinionThunkCreator = (bookRatingId: string, userId: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookOpinionApi.getBookOpinion(bookRatingId, userId);

        if (!isBadStatusCode(response.status)) {
            dispatch(setBookOpinion(response.data.data.bookOpinions.items[0]))
        }
    }
}

export const addBookOpinionLikeThunkCreator = (userIdOpinion: string, bookId: string, hasDislike: boolean): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookOpinionApi.addLike(bookId, userIdOpinion);
        const success = !isBadStatusCode(response.status);

        if (success) {
            dispatch(addBookOpinionLike(userIdOpinion, bookId, hasDislike));
        }

        return success;
    }
}

export const addBookOpinionDislikeThunkCreator = (userIdOpinion: string, bookId: string, hasLike: boolean): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookOpinionApi.addDislike(bookId, userIdOpinion);
        const success = !isBadStatusCode(response.status);

        if (success) {
            dispatch(addBookOpinionDislike(userIdOpinion, bookId, hasLike));
        }

        return success;
    }
}

export const removeBookOpinionLikeThunkCreator = (userIdOpinion: string, bookId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookOpinionApi.removeLike(bookId, userIdOpinion);
        const success = !isBadStatusCode(response.status);

        if (success) {
            dispatch(removeBookOpinionLike(userIdOpinion, bookId));
        }

        return success;
    }
}

export const removeBookOpinionDislikeThunkCreator = (userIdOpinion: string, bookId: string): ThunkAction<Promise<boolean>, AppStoreType, unknown, ActionsTypes> => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        const response = await bookOpinionApi.removeDislike(bookId, userIdOpinion);
        const success = !isBadStatusCode(response.status);

        if (success) {
            dispatch(removeBookOpinionDislike(userIdOpinion, bookId));
        }

        return success;
    }
}

export default bookReducer;