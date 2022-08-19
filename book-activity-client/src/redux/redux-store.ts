import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk"
import appReducer from "./app-reducer";
import bookReducer from './book-reducer'
import userReducer from "./user-reducer";

let rootReducer = combineReducers({
    bookStore: bookReducer,
    userStore: userReducer,
    appStore: appReducer
});

type RootReducer = typeof rootReducer

export type AppStoreType = ReturnType<RootReducer>;

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store;