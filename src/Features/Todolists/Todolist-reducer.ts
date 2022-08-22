import {todolistAPI} from "../../Api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TodolistDomainType} from "../../Api/types";

export const getTodoListTC = createAsyncThunk('todolist/getTodoList', async( param,thunkAPI) => {
    const res = await todolistAPI.getTodolist()
    const todolists = res.data
    return {todolists}
})

export const addTodoListTC = createAsyncThunk('todolist/addTodoList', async(title:string, thunkAPI) => {

        const res = await todolistAPI.createTodolist(title)
        const todolist = res.data.data.item

            return {todolist}




})

const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTodoListTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
        })
    }
})

export const todolistReducer = slice.reducer


