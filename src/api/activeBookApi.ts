import instanceAxios, { GraphqlResponseType } from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { PaginationType } from "../types/common/paginationType";
import { GetActiveBooksByFilterResultType } from "./types/activeBooks/getActiveBooksByFilterResultType";
import { GetActiveBooksByFilterType } from "./types/activeBooks/getActiveBooksByFilterType";
import { SortBy } from "../redux/types/activeBooks/activeBookFilter";

export const activeBookApi = {
  addActiveBook(totalNumberPages: number, numberPagesRead: number, bookId: string) {
    return instanceAxios.post<ResponseType<string>>("/activeBook/add", { totalNumberPages, numberPagesRead, bookId })
      .then(res => res.data)
  },
  updateActiveBook(activeBookId: string, numberPagesRead: number) {
    return instanceAxios.put<ResponseType>("activeBook/updateNumberPagesRead", { activeBookId, numberPagesRead })
      .then(res => res.data)
  },
  removeActiveBook(activeBookId: string) {
    return instanceAxios.delete(`/activeBook/remove?activeBookId=${activeBookId}`);
  },
  getActiveBooksByFilter(filterModel: GetActiveBooksByFilterType, pagination: PaginationType) {
    let order: string

    if (filterModel.sortBy === SortBy.CreateDate) {
      order = `timeOfCreation: ASC`
    } else if (filterModel.sortBy === SortBy.CreateDateDescending) {
      order = `timeOfCreation: DESC`
    } else {
      order = `timeOfUpdate: DESC`
    }

    const where = filterModel.bookTitle === undefined ? "" : `where: { book: { title: { contains: ${"\"" + filterModel.bookTitle + "\""} } } }`

    const query = `query {
            activeBooks(
              skip: ${pagination.skip},
              take: ${pagination.take},
              withFullRead: ${filterModel.withFullRead},
              order: { ${order} }
              ${where}
            ) {
              totalCount
              items {
                id
                totalNumberPages
                numberPagesRead
                book {
                  id
                  title
                  imageDataBase64
                  averageRating
                  hasOpinion
                }
              }
            }
          }`

    return instanceAxios.post<GraphqlResponseType<GetActiveBooksByFilterResultType>>(`/graphql`, { query }).then(res => res.data);
  }
};