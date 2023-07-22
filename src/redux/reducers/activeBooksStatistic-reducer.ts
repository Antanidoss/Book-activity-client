import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { activeBooksStatisticApi } from "../../api/activeBooksStatistic";
import { isBadStatusCode } from "../../api/instanceAxios";
import { ActiveBooksStatisticType } from "../../types/activeBooksStatisticType"
import { AppStoreType } from "../redux-store";

export type InitialStateType = {
    curUserStatistic: ActiveBooksStatisticType | null
}

const initialState: InitialStateType = {
    curUserStatistic: null
}

const ADD_ACTIVE_BOOKS_STATISTIC = "ADD_ACTIVE_BOOKS_STATISTIC";

const activeBooksStatisticReducer = (state = initialState, actions: ActionsTypes): InitialStateType => {
    switch (actions.type) {
        case ADD_ACTIVE_BOOKS_STATISTIC:
            return {
                ...state,
                curUserStatistic: actions.statistic
            }
        default:
            return state;
    }
}

type AddActiveBookStatisticsType = {
    type: typeof ADD_ACTIVE_BOOKS_STATISTIC, statistic: ActiveBooksStatisticType
}
const addActiveBooksStatistic = (statistic: ActiveBooksStatisticType): AddActiveBookStatisticsType => ({
    type: ADD_ACTIVE_BOOKS_STATISTIC, statistic: statistic
})

type ActionsTypes = AddActiveBookStatisticsType;
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

export default activeBooksStatisticReducer;