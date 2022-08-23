import {Dispatch} from 'redux'

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoginParamsType} from "../../Api/types";
import {setAppStatusAC} from "../../App/app-reducer";
import {authAPI} from "../../Api/api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {  // типизация через payload
            state.isLoggedIn = action.payload.value                        // payload
        }
    }
})
export const authReducer = slice.reducer
// const setIsLoggedInAC = slice.actions.setIsLoggedInAC
export const {setIsLoggedInAC} = slice.actions // деструктуризация

/*(state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}*/

// actions

/*export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)*/


// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))  // обязательная деструкт. аргумента в AC
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types

/*export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>*/
/*
type InitialStateType = {
    isLoggedIn: boolean
}

type ThunkDispatch = Dispatch<AuthActionsType | SetAppStatusActionType | SetAppErrorActionType>
*/
