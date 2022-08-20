import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";

export const activeBookApi = {
    addActiveBook(totalNumberPages: number, numberPagesRead: number, bookId: string) {
        return instanceAxios.post<ResponseType>("/activeBook/add", {totalNumberPages, numberPagesRead, bookId})
            .then(res => {
                return res.data
            })
    }
};
