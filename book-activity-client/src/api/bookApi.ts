import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { BookType } from '../types/bookType';

export const bookApi = {
    getBooks(skip: number, take: number) {
        return instanceAxios.get<ResponseType<Array<BookType>>>(`/book/get?skip=${skip}&take=${take}`)
            .then(res => {
                return res.data
            })
    }
};
