import { RootState } from '../redux-store';

export const activeBookSelectors = {
  pageNumber: (state: RootState) => {
    return state.activeBooks.allActiveBooksPage.pageNumber;
  },
  totalCount: (state: RootState) => {
    return state.activeBooks.allActiveBooksPage.totalCount;
  },
  pageSize: (state: RootState) => {
    return state.activeBooks.allActiveBooksPage.pageSize;
  },
  filter: (state: RootState) => {
    return state.activeBooks.allActiveBooksPage.activeBookFilter;
  },
  paginationSkip: (state: RootState) => {
    return (
      (state.activeBooks.allActiveBooksPage.pageNumber - 1) *
      state.activeBooks.allActiveBooksPage.pageSize
    );
  },
};
