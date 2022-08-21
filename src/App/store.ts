import {combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk'
import {todolistReducer} from "../Features/Todolists/Todolist-reducer";
import {taskReducer} from "../Features/Todolists/Tasks-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer,
})

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

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