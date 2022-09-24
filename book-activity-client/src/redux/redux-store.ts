import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk"
import activeBookReducer from "./activeBook-reducer";
import appReducer from "./app-reducer";
import bookReducer from './book-reducer'
import userReducer from "./user-reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import authorReducer from "./author-reducer";

let rootReducer = combineReducers({
    bookStore: bookReducer,
    userStore: userReducer,
    appStore: appReducer,
    activeBookStore: activeBookReducer,
    authorStore: authorReducer
});

type RootReducer = typeof rootReducer

export type AppStoreType = ReturnType<RootReducer>;

let store = createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
))

export default store;