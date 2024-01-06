import instanceAxios, { GraphqlResponseType } from "./instanceAxios";
import { BookFilterType } from "../types/books/bookFilterType";
import { AddBookType } from "../types/books/addBookType";
import { BooksFilterResultType } from "../types/books/bookFilterResultType";
import { BookInfoGraphqlType } from "../types/books/bookInfoType";

export const bookApi = {
  getBooksByFilter(filterModel: BookFilterType, skip: number, take: number) {
    const where = filterModel.bookTitle === undefined ? "" : `where: { title: { contains: ${"\"" + filterModel.bookTitle + "\""} } }`

    const query = `query {
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
                isActiveBook
                imageDataBase64
                averageRating
                bookOpinions {
                  totalCount
                }
              }
            }
          }`

    return instanceAxios.post<GraphqlResponseType<BooksFilterResultType>>(`/graphql`, { query }).then(res => res.data);
  },
  getBookInfo(bookId: string) {
    const query = `query {
        bookById(bookId: "${bookId}") {
          id
          title
          description,
          isActiveBook,
          imageDataBase64
          bookAuthors {
            author {
              surname
              firstName
            }
          }
          hasOpinion
          averageRating
          bookOpinions(take: 4) {
            totalCount
            items {
              bookId
              grade
              description
              likes {
                totalCount
              }
              dislikes {
                totalCount
              }
              hasLike
              hasDislike
              user {
                id,
                avatarDataBase64
                userName
              }
            }
          }
        }
      }`

    return instanceAxios.post<GraphqlResponseType<BookInfoGraphqlType>>(`/graphql`, { query }).then(res => res);
  },
  addBook(addBookModel: AddBookType) {
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