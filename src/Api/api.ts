import axios from "axios";
import {GetTasksResponse, TodolistType, ResponseType} from "../types";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c5dc8002-de94-41b3-931d-884560e88891'
    }
})

export const todolistAPI = {
    getTodolist (){
        return instance.get<TodolistType[]>('/todo-lists')
    },
    addTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title})
    },
    getTasks(todolistId:string){
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    }
}