import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { Book } from '../types/bookType';

export const bookApi = {
    getBooks(skip: number, take: number) {
        return instanceAxios.get<ResponseType<Array<Book>>>(`/book/get/${skip}&${take}`)
            .then(res => {
                return res.data
            })
    }
};
