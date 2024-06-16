import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CurrentUserType, UserFilterType } from 'common';

export type InitialUserStateType = {
  currentUser: CurrentUserType | null;
  isAuthenticated: boolean;
  allUsersPage: {
    pageNumber: number;
    totalUserCount: number;
    pageSize: number;
    userFilter: UserFilterType;
  };
};

const initialState: InitialUserStateType = {
  currentUser: null,
  isAuthenticated: false,
  allUsersPage: {
    pageNumber: 1,
    totalUserCount: 0,
    pageSize: 12,
    userFilter: {
      name: null,
    },
  },
};

export const userSlice = createSlice({
  name: 'activeBook',
  initialState,
  reducers: {
    updateUserPageNumber: (state, action: PayloadAction<number>) => {
      state.allUsersPage.pageSize = action.payload;
    },
    updateUserFilter: (state, action: PayloadAction<UserFilterType>) => {
      state.allUsersPage.userFilter = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<CurrentUserType>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = state.currentUser !== null;
    },
  },
});

export const { updateUserPageNumber, updateUserFilter, setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
