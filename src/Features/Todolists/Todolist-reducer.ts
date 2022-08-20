import {Dispatch} from "redux";
import {TodoListsResponseType, TodoListsStateType} from "../../types";
import {todolistAPI} from "../../Api/api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:TodoListsStateType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        getTodoListAC(state, action: PayloadAction<{ todolists: TodoListsResponseType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', /*entityStatus: 'idle'*/}))
        }
    }
})

export const todolistReducer = slice.reducer
export const {getTodoListAC} = slice.actions

export const getTodoListTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolist()
            .then((res) => {
                const todolists = res.data
                dispatch(getTodoListAC({todolists}))
            })
    }
}