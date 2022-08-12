import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk"
import bookReducer from './book-reducer'

let rootReducer = combineReducers({
    bookStore: bookReducer
});

type RootReducer = typeof rootReducer

export type AppStoreType = ReturnType<RootReducer>;

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store;