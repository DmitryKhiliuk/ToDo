import React, {useCallback, useEffect} from 'react';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC
} from "./Todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../App/store";
import {Grid, Paper} from "@mui/material";
import s from './TodolistsList.module.sass'
import {addTaskTC, removeTaskTC, updateTaskTC} from "./Tasks-reducer";
import {Navigate} from "react-router-dom";
import {FilterValuesType, TaskStatuses} from "../../Api/types";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

type PropsType = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}) => {
    const todolists = useAppSelector((state) => state.todolists)
    const tasks = useAppSelector((state) => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        const thunk = fetchTodolistsTC()
        dispatch(thunk)
    }, [])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        const thunk = removeTaskTC({taskId, todolistId})
        dispatch(thunk)
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        const thunk = addTaskTC({title, todolistId})
        dispatch(thunk)
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC({taskId: id, domainModel: {status}, todolistId})
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC({taskId: id, domainModel: {title: newTitle}, todolistId})
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC({id: todolistId, filter: value})
        dispatch(action)
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        const thunk = removeTodolistTC(id)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC({id, title})
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }


    return (
        <div>
            <Grid container>
                <Paper elevation={3} className={s.input}>
                    <AddItemForm addItem={addTodolist}/>
                </Paper>
            </Grid>
            <Grid container spacing={3} >
                {todolists && todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id]
                    return <Grid item xs={6} key={tl.id}>
                        <Paper elevation={3} className={s.todolist}> <Todolist todolist={tl}
                                                                               tasks={allTodolistTasks}
                                                                               removeTask={removeTask}
                                                                               changeFilter={changeFilter}
                                                                               addTask={addTask}
                                                                               changeTaskStatus={changeStatus}
                                                                               removeTodolist={removeTodolist}
                                                                               changeTaskTitle={changeTaskTitle}
                                                                               changeTodolistTitle={changeTodolistTitle}
                                                                               demo={demo}
                        />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </div>
    );
};

