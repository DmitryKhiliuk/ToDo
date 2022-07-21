import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {todolistReducer} from "./Todolist-reducer";
import {taskReducer} from "./Tasks-reducer";

const rootReducer = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;