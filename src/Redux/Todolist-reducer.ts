import {Dispatch} from "redux";
import {ActionType, TodoListsResponseType, TodoListsStateType} from "../types";
import {todolistAPI} from "../Api/api";

const initialState:TodoListsStateType[] = []

export const todolistReducer = (state = initialState, action: ActionType):TodoListsStateType[] => {
    switch (action.type){
        case "TODOLIST/GET-TODOLIST":
            return action.todolists.map((tl) => ({...tl, filter: 'all'}))
        default:
            return state
    }
}
export type getTodoListACType = ReturnType<typeof getTodoListAC>
export const getTodoListAC = (todolists: TodoListsResponseType[]) => {
    return {
        type: 'TODOLIST/GET-TODOLIST',
        todolists
    } as const
}

export const getTodoListTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodolist()
            .then((res) => {
                dispatch(getTodoListAC(res.data))
            })

    }
}