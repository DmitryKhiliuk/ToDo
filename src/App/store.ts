import {combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {tasksReducer} from "../Features/Todolists/Tasks-reducer";
import {appReducer} from "./app-reducer";
import {todolistsReducer} from "../Features/Todolists/Todolists-reducer";
import {authReducer} from "../Features/Login/auth-reducer";




export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store;