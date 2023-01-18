import {combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk'
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {tasksReducer} from "../Features/Todolists/Tasks-reducer";
import {appReducer, initializeAppWorkerSaga} from "./app-reducer";
import {todolistsReducer} from "../Features/Todolists/Todolists-reducer";
import {authReducer} from "../Features/Login/auth-reducer";
import {FieldErrorType} from "../Api/types";
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware, sagaMiddleware)

})

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    yield takeEvery('app/initializedAppAC', initializeAppWorkerSaga)
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }


// @ts-ignore
window.store = store;