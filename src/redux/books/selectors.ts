import { RootState } from '../redux-store';

export const bookSelectors = {
  pageNumber: (state: RootState) => {
    return state.books.allBooksPage.pageNumber;
  },
  pageSize: (state: RootState) => {
    return state.books.allBooksPage.pageSize;
  },
  totalCount: (state: RootState) => {
    return state.books.allBooksPage.totalBookCount;
  },
  filter: (state: RootState) => {
    return state.books.allBooksPage.bookFilter;
  },
  paginationSkip: (state: RootState) => {
    return (state.books.allBooksPage.pageNumber - 1) * state.books.allBooksPage.pageSize;
  },
};
