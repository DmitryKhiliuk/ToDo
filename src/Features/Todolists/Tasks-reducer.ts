import {todolistAPI} from "../../Api/api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTodoListTC} from "./Todolist-reducer";
import {TasksStateType, TaskType} from "../../Api/types";
import {ThunkError} from "../../utils/types";
import {appActions} from "../../App/AppActions";
import {handleAsyncServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";


const initialState: TasksStateType = {}

export const getTasksTC = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>('tasks/fetchTasks', async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI)
    }
})


export const asyncActions = {
    getTasksTC,
    //removeTask,
    //addTask,
    //updateTask
}

export const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTodoListTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
            .addCase(getTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
    }
})






