import { ActiveBookFilterType } from "../types/api/activeBookFilterType";
import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { PaginationType } from "../types/api/paginationType";
import { FilterResultType } from "../types/api/filterResultType";

export type ActiveBookByFilter = {
    id: string,
    totalNumberPages: number,
    numberPagesRead: number,
    bookTitle: string,
    bookId: string,
    imageData: ArrayBuffer,
    notes?: Array<{
        id: string,
        note: string,
        noteColor: number
    }>
}

export const activeBookApi = {
    addActiveBook(totalNumberPages: number, numberPagesRead: number, bookId: string) {
        return instanceAxios.post<ResponseType<string>>("/activeBook/add", { totalNumberPages, numberPagesRead, bookId })
            .then(res => res.data)
    },
    updateActiveBook(activeBookId: string, numberPagesRead: number) {
        return instanceAxios.put<ResponseType>("activeBook/updateNumberPagesRead", { activeBookId, numberPagesRead })
            .then(res => res.data)
    },
    getActiveBooksByFilter(filterModel: ActiveBookFilterType, pagination: PaginationType) {
        return instanceAxios.get<ResponseType<FilterResultType<ActiveBookByFilter>>>(`/activeBook/getActiveBooksByFilter`, {
            params: {
                bookTitle: filterModel.bookTitle,
                withFullRead: filterModel.withFullRead,
                sortBy: filterModel.sortBy,
                skip: pagination.skip,
                take: pagination.take
            }
        }).then(res => res.data)
    },
    removeActiveBook(activeBookId: string) {
        return instanceAxios.delete(`/activeBook/remove?activeBookId=${activeBookId}`);
    }
};
