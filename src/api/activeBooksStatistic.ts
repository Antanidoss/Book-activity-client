import { ActiveBookStatisticByDayType } from "../redux/types/activeBooks/activeBookStatisticByDayType";
import { ActiveBooksStatisticType } from "../redux/types/activeBooks/activeBooksStatisticType";
import instanceAxios, { ResponseType } from "./instanceAxios";

export const activeBooksStatisticApi = {
    getActiveBooksStatistic(userId?: string) {
        return instanceAxios.get<ActiveBooksStatisticType>(`/activeBookStatistic/getActiveBooksStatic?userId=${userId}`);
    },
    getActiveBooksStatisticByDay(day: string, userId?: string) {
        return instanceAxios.get<ResponseType<Array<ActiveBookStatisticByDayType>>>(`/activeBookStatistic/getActiveBooksStatisticByDay?day=${day}&userId=${userId}`);
    }
};
