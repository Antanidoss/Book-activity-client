import bookReducer from "./books/slice";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './users/slice';
import activeBookReducer from './activeBooks/slice';
import commonReducer from './common/slice';

export const store = configureStore({
  reducer: {
    books: bookReducer,
    activeBooks: activeBookReducer,
    users: userReducer,
    common: commonReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch