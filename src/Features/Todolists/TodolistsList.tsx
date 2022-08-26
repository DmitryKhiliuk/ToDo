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
        dispatch(removeTaskTC({taskId, todolistId}))
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC({title, todolistId}))
    }, [])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC({taskId: id, domainModel: {status}, todolistId}))
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTC({taskId: id, domainModel: {title: newTitle}, todolistId}))
    }, [])

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC({id: todolistId, filter: value}))
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistTC(id))
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC({id, title}))
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
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
            <Grid container spacing={3} justifyContent={'center'}>
                {todolists && todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id]
                    return <Grid item sm={8} md={6} xs={12} key={tl.id} >
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

