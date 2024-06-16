import { instanceAxios } from '../instanceAxios';

export const bookOpinionApi = {
  update(bookId: string, grade: number, description: string) {
    return instanceAxios.post('/bookOpinion/add', { bookId, grade, description });
  },
  addLike(bookId: string, userIdOpinion: string) {
    return instanceAxios.post(
      `/bookOpinion/addLike?bookId=${bookId}&userIdOpinion=${userIdOpinion}`,
    );
  },
  addDislike(bookId: string, userIdOpinion: string) {
    return instanceAxios.post(
      `/bookOpinion/addDislike?bookId=${bookId}&userIdOpinion=${userIdOpinion}`,
    );
  },
  removeLike(bookId: string, userIdOpinion: string) {
    return instanceAxios.delete(
      `/bookOpinion/removeLike?bookId=${bookId}&userIdOpinion=${userIdOpinion}`,
    );
  },
  removeDislike(bookId: string, userIdOpinion: string) {
    return instanceAxios.delete(
      `/bookOpinion/removeDislike?bookId=${bookId}&userIdOpinion=${userIdOpinion}`,
    );
  },
};
