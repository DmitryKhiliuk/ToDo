import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'c5dc8002-de94-41b3-931d-884560e88891'
    }
})

export const todolistAPI = {
    getTodolist (){
        return instance.get('/todo-lists')
    },
    getTasks(todolistId:string){
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    }
}