import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ActiveBookFilterType, SortBy } from "../../common/models/activeBooks"

export type InitialStateType = {
    allBooksPage: {
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

const initialState: InitialStateType = {
    allBooksPage: {
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
        updatePageNumber: (state, action: PayloadAction<number>) => {
            state.allBooksPage.pageNumber = action.payload;
        },
        updateFilter: (state, action: PayloadAction<ActiveBookFilterType>) => {
            state.allBooksPage.activeBookFilter = action.payload;
        },
        clearFilter: (state) => {
            state.allBooksPage.activeBookFilter = defaultFiler;
        },
        updateTotalCount: (state, action: PayloadAction<number>) => {
            state.allBooksPage.totalCount = action.payload;
        }
    }
})

export const { updatePageNumber, updateFilter, clearFilter, updateTotalCount } = activeBookSlice.actions;

export default activeBookSlice.reducer