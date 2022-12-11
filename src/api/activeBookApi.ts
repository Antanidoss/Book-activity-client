import { ActiveBookFilterType } from "../types/api/activeBookFilterType";
import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { PaginationType } from "../types/api/paginationType";
import { FilterResultType } from "../types/api/filterResultType";
import { ActiveBookFilterResultType } from "../types/api/activeBookFilterResultType";

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
        return instanceAxios.get<ResponseType<FilterResultType<ActiveBookFilterResultType>>>(`/activeBook/getActiveBooksByFilter`, {
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
