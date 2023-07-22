import { ActiveBooksStatisticType } from "../types/activeBooks/activeBooksStatisticType";
import instanceAxios from "./instanceAxios";

export const activeBooksStatisticApi = {
    getActiveBooksStatistic(userId?: string) {
        return instanceAxios.get<ActiveBooksStatisticType>(`/activeBookStatistic/getActiveBooksStatic?userId=${userId}`);
    }
};
