import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { BookFilterType } from "common"

export type InitialBookStateType = {
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

const initialState: InitialBookStateType = {
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
        updateBookPageNumber: (state, action: PayloadAction<number>) => {
            state.allBooksPage.pageNumber = action.payload;
        },
        updateBookFilter: (state, action: PayloadAction<BookFilterType>) => {
            state.allBooksPage.bookFilter = action.payload;
            state.allBooksPage.pageNumber = 1;
        },
        clearBookFilter: (state) => {
            state.allBooksPage.bookFilter = defaultFilter;
        },
        updateBookTotalCount: (state, action: PayloadAction<number>) => {
            state.allBooksPage.totalBookCount = action.payload;
        }
    }
})

export const { updateBookFilter, updateBookPageNumber, updateBookTotalCount, clearBookFilter } = bookSlice.actions;

export default bookSlice.reducer