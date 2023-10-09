import { AppStoreType } from "../redux-store";

export const getCurUserStatistics = (state: AppStoreType) => {
    return state.activeBooksStatisticStore.curUserStatistic;
}

export const getActiveBookStatisticsByDay = (state: AppStoreType) => {
    return state.activeBooksStatisticStore.activeBookStatisticsByDay
}