import {Action, Dispatch} from "redux";
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
        default:
    }       return state
}

const getTasksAC = (tasks:TaskType[], todolistId:string) => {
    return {
        type: 'TASKS/GET-TASKS',
        tasks,
        todolistId
    } as const
}

/*const getTasksTC = () => {
    return (dispatch:Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then( (res) => {
                dispatch(getTasksAC(res.data.items, todolistId))
            })
    }
}*/
