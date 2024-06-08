import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ActiveBookFilterType, SortBy } from "common"

type InitialActiveBookStateType = {
    allActiveBooksPage: {
        pageSize: number
        pageNumber: number
        totalCount: number
        activeBookFilter: ActiveBookFilterType
    }
}

const defaultFiler: ActiveBookFilterType = {
    withFullRead: true,
    sortBy: SortBy.CreateDateDescending
}

const initialState: InitialActiveBookStateType = {
    allActiveBooksPage: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 0,
        activeBookFilter: defaultFiler
    }
}

export const activeBookSlice = createSlice({
    name: 'activeBook',
    initialState,
    reducers: {
        updateActiveBookPageNumber: (state, action: PayloadAction<number>) => {
            state.allActiveBooksPage.pageNumber = action.payload;
        },
        updateActiveBookFilter: (state, action: PayloadAction<ActiveBookFilterType>) => {
            state.allActiveBooksPage.activeBookFilter = action.payload;
        },
        clearActiveBookFilter: (state) => {
            state.allActiveBooksPage.activeBookFilter = defaultFiler;
        },
        updateActiveBookTotalCount: (state, action: PayloadAction<number>) => {
            state.allActiveBooksPage.totalCount = action.payload;
        }
    }
})

export const { updateActiveBookPageNumber, updateActiveBookFilter, clearActiveBookFilter, updateActiveBookTotalCount } = activeBookSlice.actions;

export default activeBookSlice.reducer