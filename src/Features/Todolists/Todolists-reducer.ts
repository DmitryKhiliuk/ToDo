import {todolistsAPI} from "../../Api/api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {RequestStatusType, TodolistType} from "../../Api/types";
import {setAppStatusAC} from "../../App/app-reducer";
import {AxiosError} from "axios";
import {ThunkError} from "../../App/store";


export const fetchTodolistsTC = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>('todolists/fetchTodolists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI)
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {id: todolistId}
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI)
    }
})

export const addTodolistTC = createAsyncThunk<{ todolist: TodolistType }, string, ThunkError>
('todolists/addTodolist', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI, false)
    }
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string, title: string }, thunkAPI) => {
    try {
        const res = await todolistsAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {id: param.id, title: param.title}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI, false)
    }
})

export const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status
        },

    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map((tl) => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].title = action.payload.title
            })

    }
})
export const todolistsReducer = slice.reducer
export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC
} = slice.actions

// types


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}




