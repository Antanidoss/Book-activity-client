import { ActiveBooksStatisticType } from "../types/activeBooksStatisticType";
import instanceAxios from "./instanceAxios";

export const activeBooksStatisticApi = {
    getActiveBooksStatistic() {
        return instanceAxios.get<ActiveBooksStatisticType>("/activeBookStatistic/getActiveBooksStatic");
    }
};
