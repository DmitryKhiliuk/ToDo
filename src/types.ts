



export type TodoListsResponseType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type FilterType = 'all' | 'active' | 'completed'

export type TodoListsStateType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter: FilterType
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TaskResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

export type TasksStateType = {
    [key:string]: TaskType[]
}