import {todolistAPI} from "../../Api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTodoListTC} from "./Todolist-reducer";
import {TasksStateType} from "../../types";


const initialState:TasksStateType = {}

export const getTasksTC = createAsyncThunk('tasks/getTasks', async(todolistId:string, thunkAPI) => {
    const res = await todolistAPI.getTasks(todolistId)
    return {tasks: res.data.items, todolistId}
})

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getTodoListTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
    }
})

export const taskReducer = slice.reducer




