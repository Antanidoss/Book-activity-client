import instanceAxios, { GraphqlResponseType } from "./instanceAxios";
import { GetCategoriesByNameType } from "./types/categories/getCategoriesByTitleType";

export const categoryApi = {
    getCategorieByTitle(title: string, take: number) {
        const query = `query {
            categories(where: {title: {contains: "${title}"}}, take: ${take}) {
                items {
                    id
                    title
                }
              }
          }`

        return instanceAxios.post<GraphqlResponseType<GetCategoriesByNameType>>(`/graphql`, { query: query }).then(res => res);
    },
}