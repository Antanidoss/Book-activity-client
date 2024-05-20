import { RootState } from "../redux-store";

export const getInitialized = (state: RootState) => {
    return state.common.appInitialized;
}