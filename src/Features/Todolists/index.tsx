import {asyncActions as todolistsAsyncActions, slice as todolistsSlice} from './Todolist-reducer'
import {asyncActions as tasksAsyncActions, slice as tasksSlice} from './Tasks-reducer'
import {ToDoMain} from './ToDoMain'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistsSlice.actions
}
const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}

const todolistsReducer  = todolistsSlice.reducer
const tasksReducer  = tasksSlice.reducer

export {
    tasksActions,
    todolistsActions,
    ToDoMain,
    todolistsReducer,
    tasksReducer
}
