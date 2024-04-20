import instanceAxios, { GraphqlResponseType } from "./instanceAxios";
import { AddBookType } from "./types/books/addBookType";
import { GetBooksByFilterType } from "./types/books/getBooksByFilterType";
import { GetBooksByFilterResultType } from "./types/books/getBooksByFilterResultType";
import { GetBookInfoType } from "./types/books/getBookInfoType";

export const bookApi = {
  getBooksByFilter(filterModel: GetBooksByFilterType, skip: number, take: number) {
    const titleFilter = filterModel.bookTitle === undefined ? "" : `title: { contains: ${"\"" + filterModel.bookTitle + "\""} }`
    const categoriesFilter = !filterModel.categories.length ? "" : `bookCategories: 
    {
      all: {
        category: {
          or: [${filterModel.categories.map(c => `{id: {eq: "${c.value}"}}`).join(",")}]
        }
      }
    }`

    let where = ""

    if (titleFilter !== "" && categoriesFilter !== "") {
      where = `where: {${titleFilter} or ${categoriesFilter}}`
    } else if (titleFilter === "" && categoriesFilter !== "") {
      where = `where: {${categoriesFilter}}`
    } else if (titleFilter !== "" && categoriesFilter === "") {
      where = `where: {${titleFilter}}`
    }

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

    return instanceAxios.post<GraphqlResponseType<GetBooksByFilterResultType>>(`/graphql`, { query }).then(res => res.data);
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
          bookCategories {
            category {
              id
              title
            }
          }
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

    return instanceAxios.post<GraphqlResponseType<GetBookInfoType>>(`/graphql`, { query }).then(res => res);
  },
  addBook(addBookModel: AddBookType) {
    const formData = new FormData();
    formData.append("title", addBookModel.title);
    formData.append("description", addBookModel.description);
    formData.append("image", addBookModel.image);

    addBookModel.authorIds.forEach((authorId, index) => {
      formData.append(`authorIds[${index}]`, authorId);
    })

    addBookModel.categoryIds.forEach((categoryId, index) => {
      formData.append(`categoryIds[${index}]`, categoryId);
    })

    instanceAxios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    return instanceAxios.post('/book/add', formData)
  }
};