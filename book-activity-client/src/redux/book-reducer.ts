import { Book } from '../types/bookType'

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

const bookReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case UPDATE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.newCurrentPage
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

type ActionsTypes = UpdateCurrentPageType;

export default bookReducer;