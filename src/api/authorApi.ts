import { AuthorForAddBookGraphqlType } from "../types/books/authorForAddBookType";
import instanceAxios, { GraphqlResponseType } from "./instanceAxios";
import { ResponseType } from "./instanceAxios";

export const authorApi = {
    addAuthor(firstName: string, surname: string) {
        return instanceAxios.post<ResponseType<string>>(`/author/add?firstName=${firstName}&surname=${surname}`)
            .then(r => r.data);
    },
    getAuthorsByName(name: string, take: number) {
        let query = `query {
            authors(where: {firstName: {contains: "${name}"}, or: {surname: {contains: "${name}"} }}, take: ${take}) {
                items {
                    id
                    firstName
                    surname
                }
              }
          }`

        return instanceAxios.post<GraphqlResponseType<AuthorForAddBookGraphqlType>>(`/graphql`, { query: query }).then(res => res);
    },
}