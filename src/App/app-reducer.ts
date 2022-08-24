import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from "../Api/api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../Features/Login/auth-reducer";
import {FieldErrorType, LoginParamsType} from "../Api/types";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";


export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}));
    } else {}

})


const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
            // {...state, status: action.status}
        },

    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled,  (state,  action) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC} = slice.actions


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}





