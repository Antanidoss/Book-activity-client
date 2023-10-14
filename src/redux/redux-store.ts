import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk"
import activeBookReducer from "./reducers/activeBook-reducer";
import appReducer from "./reducers/app-reducer";
import bookReducer from './reducers/book-reducer'
import userReducer from "./reducers/user-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import authorReducer from "./reducers/author-reducer";
import activeBooksStatisticReducer from "./reducers/activeBooksStatistic-reducer";
import userNotificationReducer from "./reducers/userNotification-reducer";
import { InferableComponentEnhancerWithProps } from "react-redux";

const rootReducer = combineReducers({
    bookStore: bookReducer,
    userStore: userReducer,
    appStore: appReducer,
    activeBookStore: activeBookReducer,
    authorStore: authorReducer,
    activeBooksStatisticStore: activeBooksStatisticReducer,
    userNotificationStore: userNotificationReducer
});

type RootReducer = typeof rootReducer

export type AppStoreType = ReturnType<RootReducer>;

const store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
))

export type ExtractConnectType<T> = T extends InferableComponentEnhancerWithProps<infer K, any> ? K : T;

export default store;