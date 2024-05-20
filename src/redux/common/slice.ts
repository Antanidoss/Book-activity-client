import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type InitialStateType = {
    appInitialized: boolean,
}

const initialState: InitialStateType = {
    appInitialized: false
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        updateAppInitialized: (state, action: PayloadAction<boolean>) => {
            state.appInitialized = action.payload;
        },
    }
})

export const { updateAppInitialized } = commonSlice.actions;

export default commonSlice.reducer