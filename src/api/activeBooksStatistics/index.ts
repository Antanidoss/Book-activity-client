import instanceAxios, { ResponseType } from "../instanceAxios";
import { ActiveBookStatisticByDay, ActiveBooksStatistic } from "./models";

export const activeBooksStatisticApi = {
    getActiveBooksStatistic(userId?: string) {
        return instanceAxios.get<ActiveBooksStatistic>(`/activeBookStatistic/getActiveBooksStatic?userId=${userId}`);
    },
    getActiveBooksStatisticByDay(day: string, userId?: string) {
        return instanceAxios.get<ResponseType<Array<ActiveBookStatisticByDay>>>(`/activeBookStatistic/getActiveBooksStatisticByDay?day=${day}&userId=${userId}`);
    }
};
