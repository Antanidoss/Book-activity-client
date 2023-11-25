import { BookOpinionGraphqlType } from "../types/books/bookOpinionType";
import instanceAxios, { GraphqlResponseType } from "./instanceAxios";

export const bookRatingApi = {
    update(bookRatingId: string, grade: number, description: string) {
        return instanceAxios.put("/bookRating/update", { bookRatingId, grade, description });
    },
    getBookOpinion(bookRatingId: string, userId: string) {
        let query = `query {
            bookOpinions(take: 1, where: {bookRatingId: {eq: "${bookRatingId}"}, and: {userId: {eq: "${userId}"} }}) {
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