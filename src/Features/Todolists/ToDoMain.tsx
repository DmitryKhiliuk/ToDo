import React, {useEffect} from 'react';
import {addTodoListTC, getTodoListTC} from "./Todolist-reducer";
import {useAppDispatch, useAppSelector} from "../../App/store";
import {ToDoList} from "./Todolist/ToDoList";
import {Input} from "../../Components/Input/Input";
import {Grid, Paper} from "@mui/material";
import s from './ToDoMain.module.sass'

export const ToDoMain = () => {
    const todolists = useAppSelector((state) => state.todolists)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodoListTC())
    }, [])

    const addTodoList = (value: string) => {
        dispatch(addTodoListTC(value))
    }

    return (
        <div>
            <Grid container>
                <Paper elevation={3} className={s.input}>
                    <Input getValue={addTodoList}/>
                </Paper>
            </Grid>
            <Grid container spacing={3} >
                {todolists.map((tl) => {
                    return <Grid item xs={6} key={tl.id}>
                        <Paper elevation={3} className={s.todolist}> <ToDoList key={tl.id}
                                                                         todoListId={tl.id}
                                                                         title={tl.title}
                        />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </div>
    );
};

