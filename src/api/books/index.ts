import { instanceAxios } from "../instanceAxios";
import { AddBook } from "./models";

export const bookApi = {
  addBook(addBookModel: AddBook) {
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

export * from "./models";