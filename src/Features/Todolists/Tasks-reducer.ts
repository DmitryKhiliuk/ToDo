import {Dispatch} from "redux";
import {todolistAPI} from "../../Api/api";
import {TasksStateType, TaskType} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTodoListAC} from "./Todolist-reducer";

const initialState:TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        getTasksAC(state, action: PayloadAction<{tasks:TaskType[], todolistId:string}>){
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: builder => {
        builder.addCase(getTodoListAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
    }
})

export const taskReducer = slice.reducer
export const {getTasksAC} = slice.actions



export const getTasksTC = (todolistId:string) => {
    return (dispatch:Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then( (res) => {
                const tasks = res.data.items
                dispatch(getTasksAC({tasks, todolistId}))
            })
    }
}
