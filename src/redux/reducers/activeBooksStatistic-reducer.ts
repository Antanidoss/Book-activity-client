import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { activeBooksStatisticApi } from "../../api/activeBooksStatisticApi";
import { isBadStatusCode } from "../../api/instanceAxios";
import { AppStoreType } from "../redux-store";
import { ActiveBooksStatisticType } from "../types/activeBooks/activeBooksStatisticType";
import { ActiveBookStatisticByDayType } from "../types/activeBooks/activeBookStatisticByDayType";

export type InitialStateType = {
    curUserStatistic?: ActiveBooksStatisticType,
    activeBookStatisticsByDay?: Array<ActiveBookStatisticByDayType>
}

const initialState: InitialStateType = {
}

const ADD_ACTIVE_BOOKS_STATISTIC = "ADD_ACTIVE_BOOKS_STATISTIC";
const SET_ACTIVE_BOOK_STATISTIC_BY_DAY = "SET_ACTIVE_BOOK_STATISTIC_BY_DAY";

const activeBooksStatisticReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type) {
        case ADD_ACTIVE_BOOKS_STATISTIC:
            return {
                ...state,
                curUserStatistic: actions.statistic
            }
        case SET_ACTIVE_BOOK_STATISTIC_BY_DAY:
            return {
                ...state,
                activeBookStatisticsByDay: actions.activeBookStatisticsByDayType
            }
        default:
            return state;
    }
}

type AddActiveBookStatisticsType = {
    type: typeof ADD_ACTIVE_BOOKS_STATISTIC, statistic: ActiveBooksStatisticType
}
const addActiveBooksStatistic = (statistic: ActiveBooksStatisticType): AddActiveBookStatisticsType => ({
    type: ADD_ACTIVE_BOOKS_STATISTIC, statistic
})

type SetActiveBookStatisticByDayType = {
    type: typeof SET_ACTIVE_BOOK_STATISTIC_BY_DAY, activeBookStatisticsByDayType: Array<ActiveBookStatisticByDayType>
}
const setActiveBookStatisticByDay = (activeBookStatisticsByDayType: Array<ActiveBookStatisticByDayType>): SetActiveBookStatisticByDayType => ({
    type: SET_ACTIVE_BOOK_STATISTIC_BY_DAY, activeBookStatisticsByDayType
})

type ActionsTypes = AddActiveBookStatisticsType | SetActiveBookStatisticByDayType;
type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>

export const getActiveBooksStatisticThunkCreator = (userId?: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        var response = await activeBooksStatisticApi.getActiveBooksStatistic(userId);
        const success = !isBadStatusCode(response.status);

        if (success) {
            dispatch(addActiveBooksStatistic(response.data))
        }
    }
}

export const getActiveBookStatisticByDayThunkCreator = (day: string, userId?: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        var response = await activeBooksStatisticApi.getActiveBooksStatisticByDay(day, userId);
        const success = !isBadStatusCode(response.status);

        if (success) {
            dispatch(setActiveBookStatisticByDay(response.data.result))
        }
    }
}

export default activeBooksStatisticReducer;