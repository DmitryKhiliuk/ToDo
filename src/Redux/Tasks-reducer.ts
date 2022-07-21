import {Dispatch} from "redux";
import {todolistAPI} from "../Api/api";
import {ActionType, TasksStateType, TaskType} from "../types";

const initialState:TasksStateType = {}

export const taskReducer = (state = initialState, action: ActionType):TasksStateType => {
    switch(action.type) {
        case "TODOLIST/GET-TODOLIST": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "TASKS/GET-TASKS":
            return {...state, [action.todolistId]: action.tasks.map((t) => t)}
        default:
    }       return state
}
export type getTasksACType = ReturnType<typeof getTasksAC>
export const getTasksAC = (tasks:TaskType[], todolistId:string) => {
    return {
        type: 'TASKS/GET-TASKS',
        tasks,
        todolistId
    } as const
}

export const getTasksTC = (todolistId:string) => {
    return (dispatch:Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then( (res) => {
                dispatch(getTasksAC(res.data.items, todolistId))
            })
    }
}
