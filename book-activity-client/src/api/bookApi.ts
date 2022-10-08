import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { BookType } from '../types/bookType';
import { UploadFile } from "antd";
import { UploadChangeParam } from "antd/lib/upload";

export type AddBookModelType = {
    title: string,
    description: string,
    image: UploadChangeParam<UploadFile>,
    authorIds: Array<string>
}

export const bookApi = {
    getBooks(skip: number, take: number) {
        return instanceAxios.get<ResponseType<Array<BookType>>>(`/book/get?skip=${skip}&take=${take}`)
            .then(res =>  res.data)
    },
    addBook(addBookModel: AddBookModelType) {
        var formData = new FormData();
        formData.append("title", addBookModel.title);
        formData.append("description", addBookModel.description);
        formData.append("image", addBookModel.image.file.originFileObj as Blob, "123.jpg" );

        addBookModel.authorIds.forEach((authorId, index) => {
            formData.append(`authorIds[${index}]`, authorId);
        })

        instanceAxios.defaults.headers.post["Content-Type"] = "multipart/form-data";
        return instanceAxios.post('/book/add', formData)
    }
};
