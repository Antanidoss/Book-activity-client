import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { BookType } from '../types/bookType';
import { BookFilterType } from "../types/bookFilterType";
import { FilterResultType } from "../types/api/filterResultType";
import { AddBookModelType } from "../types/api/addBookModelType";

export const bookApi = {
    getBooksByFilter(filterModel: BookFilterType, skip: number, take: number) {
        return instanceAxios.get<ResponseType<FilterResultType<BookType>>>("/book/getByFilter", {
            params: {
                bookTitle: filterModel.bookTitle,
                averageRatingFrom: filterModel.averageRatingFrom,
                averageRatingTo: filterModel.averageRatingTo,
                skip,
                take
            }
        }).then(res => res.data)
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
