import {TodoListsResponseType, TodoListsStateType} from "../../types";
import {todolistAPI} from "../../Api/api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:TodoListsStateType[] = []

export const getTodoListTC = createAsyncThunk('todolist/getTodoList', async( param,thunkAPI) => {
    const res = await todolistAPI.getTodolist()
    const todolists = res.data
    return {todolists}
})

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        getTodoListAC(state, action: PayloadAction<{ todolists: TodoListsResponseType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', /*entityStatus: 'idle'*/}))
        }
    },
    extraReducers: builder => {
        builder.addCase(getTodoListTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', /*entityStatus: 'idle'*/}))
        })
    }
})

export const todolistReducer = slice.reducer


