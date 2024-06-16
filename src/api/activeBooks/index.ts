import { instanceAxios, ResponseType } from 'api';

export const activeBookApi = {
  addActiveBook(totalNumberPages: number, numberPagesRead: number, bookId: string) {
    return instanceAxios
      .post<ResponseType<string>>('/activeBook/add', { totalNumberPages, numberPagesRead, bookId })
      .then((res) => res.data);
  },
  updateActiveBook(activeBookId: string, numberPagesRead: number) {
    return instanceAxios
      .put<ResponseType>('activeBook/updateNumberPagesRead', { activeBookId, numberPagesRead })
      .then((res) => res);
  },
  removeActiveBook(activeBookId: string) {
    return instanceAxios.delete(`/activeBook/remove?activeBookId=${activeBookId}`);
  },
};
