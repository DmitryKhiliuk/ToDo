import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from "../Api/api";
import {setIsLoggedInAC} from "../Features/Login/auth-reducer";
import {call, put} from "redux-saga/effects";
import {AxiosResponse} from "axios";


export function* initializeAppWorkerSaga() {
    const res:AxiosResponse = yield call(authAPI.me)
    if (res.data.resultCode === 0) {
        yield put(setIsLoggedInAC({value: true}));
        yield put(initializedAppSuccessAC());
    } else {
        yield put(setAppErrorAC({error: res.data.messages ? res.data.messages[0] : 'Some error occurred'}))
        yield put(setAppStatusAC({status: 'failed'}))
    }
}
/*export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}));
    }
})*/
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
        },
        initializedAppAC(){},
        initializedAppSuccessAC(state) {
            state.isInitialized = true
        }

    },
    /*extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled,  (state,  action) => {
            state.isInitialized = true
        })
    }*/
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC, initializedAppAC, initializedAppSuccessAC} = slice.actions


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}





