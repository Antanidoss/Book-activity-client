import { BookOpinionGraphqlType } from "../types/books/bookOpinionType";
import instanceAxios, { GraphqlResponseType } from "./instanceAxios";

export const bookOpinionApi = {
    update(bookId: string, grade: number, description: string) {
        return instanceAxios.post("/bookOpinion/add", { bookId, grade, description });
    },
    getBookOpinion(bookId: string, userId: string) {
        let query = `query {
            bookOpinions(take: 1, where: {bookId: {eq: "${bookId}"}, and: {userId: {eq: "${userId}"} }}) {
              items {
                id
                description
                grade
              }
            }
          }`

        return instanceAxios.post<GraphqlResponseType<BookOpinionGraphqlType>>(`/graphql`, { query: query }).then(res => res);
    }
} 