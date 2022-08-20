import {combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk'
import {todolistReducer} from "../Features/Todolists/Todolist-reducer";
import {taskReducer} from "../Features/Todolists/Tasks-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer,
})
export type RootReducerType = typeof rootReducer
//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store;