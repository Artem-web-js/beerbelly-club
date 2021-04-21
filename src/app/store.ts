import { applyMiddleware, combineReducers } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import {beerReducer} from "../beer-reducer";

const rootReducer = combineReducers({
    beer: beerReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;