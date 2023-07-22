import instanceAxios, { GraphqlResponseType } from "./instanceAxios";
import { BookFilterType } from "../types/bookFilterType";
import { AddBookModelType } from "../types/api/addBookModelType";
import { BooksFilterResultType } from "../types/api/bookFilterResultType";

export const bookApi = {
    getBooksByFilter(filterModel: BookFilterType, skip: number, take: number) {
        let where = filterModel.bookTitle === undefined ? "" : `where: { title: { contains: ${"\"" + filterModel.bookTitle + "\""} } }`

        let query = `query {
            books(
              skip: ${skip},
              take: ${take},
              averageRatingFrom: ${filterModel.averageRatingFrom},
              averageRatingTo: ${filterModel.averageRatingTo},
              ${where}
            ) {
              totalCount
              items {
                id
                title
                imageData
                isActiveBook
                bookRating {
                  calculateAverageRating
                  bookOpinions {
                    grade
                  }
                }
              }
            }
          }`

        return instanceAxios.post<GraphqlResponseType<BooksFilterResultType>>(`/graphql`, { query: query }).then(res => res.data);
    },
    addBook(addBookModel: AddBookModelType) {
        var formData = new FormData();
        formData.append("title", addBookModel.title);
        formData.append("description", addBookModel.description);
        formData.append("image", addBookModel.image.file.originFileObj as Blob, addBookModel.image.file.originFileObj?.name);

        addBookModel.authorIds.forEach((authorId, index) => {
            formData.append(`authorIds[${index}]`, authorId);
        })

        instanceAxios.defaults.headers.post["Content-Type"] = "multipart/form-data";
        return instanceAxios.post('/book/add', formData)
    }
};
