import { ActiveBook } from "../types/activeBookType";
import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";

export const activeBookApi = {
    addActiveBook(totalNumberPages: number, numberPagesRead: number, bookId: string) {
        return instanceAxios.post<ResponseType<string>>("/activeBook/add", { totalNumberPages, numberPagesRead, bookId })
            .then(res => res.data)
    },
    updateActiveBook(activeBookId: string, numberPagesRead: number) {
        return instanceAxios.put<ResponseType>("activeBook/updateNumberPagesRead", { activeBookId, numberPagesRead })
            .then(res => res.data)
    },
    getActiveBooksByCurrentUser(skip: number, take: number) {
        return instanceAxios.get<ResponseType<Array<ActiveBook>>>(`/activeBook/getActiveBooksByCurrentUser/${skip}/${take}`)
            .then(res => res.data)
    },
    removeActiveBook(activeBookId: string) {
        return instanceAxios.delete(`/activeBook/remove?activeBookId=${activeBookId}`);
    }
};
