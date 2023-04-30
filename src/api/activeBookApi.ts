import { ActiveBookFilterType, SortBy } from "../types/api/activeBookFilterType";
import instanceAxios, { GraphqlResponseType } from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { PaginationType } from "../types/api/paginationType";
import { ActiveBooksFilterResultType } from "../types/api/activeBookFilterResultType";

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
  getActiveBooksByFilter(filterModel: ActiveBookFilterType, pagination: PaginationType) {
    let order: string

    if (filterModel.sortBy == SortBy.CreateDate) {
      order = `timeOfCreation: ASC`
    } else if (filterModel.sortBy == SortBy.CreateDateDescending) {
      order = `timeOfCreation: DESC`
    } else {
      order = `timeOfUpdate: DESC`
    }

    let query = `query {
            activeBooks(
              skip: ${pagination.skip},
              take: ${pagination.take},
              withFullRead: ${filterModel.withFullRead},
              order: { ${order} }
              where: { book: { title: { contains: ${filterModel.bookTitle === undefined ? "\"\"" : "\"" + filterModel.bookTitle + "\""} } } }
            ) {
              items {
                id
                totalNumberPages
                numberPagesRead
                book {
                  id
                  title
                  imageData
                  bookRating {
                    calculateAverageRating
                  }
                }
              }
            }
          }`

    return instanceAxios.post<GraphqlResponseType<ActiveBooksFilterResultType>>(`/graphql`, { query: query }).then(res => res.data)
  }
};