import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { BookType } from '../types/bookType';
import { UploadFile } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { BookFilterType } from "../types/bookFilterType";

export type AddBookModelType = {
    title: string,
    description: string,
    image: UploadChangeParam<UploadFile>,
    authorIds: Array<string>
}

export const bookApi = {
    getBooksByFilter(filterModel: BookFilterType) {
        return instanceAxios.get<ResponseType<Array<BookType>>>("/book/getByFilter", {
            params: filterModel
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
