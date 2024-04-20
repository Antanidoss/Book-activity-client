import { BookOpinionGraphqlType } from "../types/books/bookOpinionType";
import instanceAxios, { GraphqlResponseType } from "./instanceAxios";

export const bookOpinionApi = {
    update(bookId: string, grade: number, description: string) {
        return instanceAxios.post("/bookOpinion/add", { bookId, grade, description });
    },
    getBookOpinion(bookId: string, userId: string) {
        const query = `query {
            bookOpinions(take: 1, where: {bookId: {eq: "${bookId}"}, and: {userId: {eq: "${userId}"} }}) {
              items {
                id
                description
                grade
              }
            }
          }`

        return instanceAxios.post<GraphqlResponseType<BookOpinionGraphqlType>>(`/graphql`, { query: query }).then(res => res);
    },
    addLike(bookId: string, userIdOpinion: string) {
      return instanceAxios.post(`/bookOpinion/addLike?bookId=${bookId}&userIdOpinion=${userIdOpinion}`)
    },
    addDislike(bookId: string, userIdOpinion: string) {
      return instanceAxios.post(`/bookOpinion/addDislike?bookId=${bookId}&userIdOpinion=${userIdOpinion}`)
    },
    removeLike(bookId: string, userIdOpinion: string) {
      return instanceAxios.delete(`/bookOpinion/removeLike?bookId=${bookId}&userIdOpinion=${userIdOpinion}`)
    },
    removeDislike(bookId: string, userIdOpinion: string) {
      return instanceAxios.delete(`/bookOpinion/removeDislike?bookId=${bookId}&userIdOpinion=${userIdOpinion}`)
    }
} 