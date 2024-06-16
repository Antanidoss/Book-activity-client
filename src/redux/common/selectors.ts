import { RootState } from '../redux-store';

export const commonSelectors = {
  initialized: (state: RootState) => {
    return state.common.appInitialized;
  },
};
