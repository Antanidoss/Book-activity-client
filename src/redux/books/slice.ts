import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BookFilterType } from "../../common/models/books"

export type InitialStateType = {
    allBooksPage: {
        pageSize: number
        pageNumber: number
        totalBookCount: number
        bookFilter: BookFilterType
    }
}

const defaultFilter: BookFilterType = {
    averageRatingFrom: 0,
    averageRatingTo: 5,
    categories: []
}

const initialState: InitialStateType = {
    allBooksPage: {
        pageSize: 10,
        pageNumber: 1,
        totalBookCount: 0,
        bookFilter: defaultFilter
    }
}

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        updatePageNumber: (state, action: PayloadAction<number>) => {
            state.allBooksPage.pageNumber = action.payload;
        },
        updateBookFilter: (state, action: PayloadAction<BookFilterType>) => {
            state.allBooksPage.bookFilter = action.payload;
            state.allBooksPage.pageNumber = 1;
        },
        clearFilter: (state) => {
            state.allBooksPage.bookFilter = defaultFilter;
        }
    }
})

export const { updatePageNumber, updateBookFilter, clearFilter } = bookSlice.actions;

export default bookSlice.reducer