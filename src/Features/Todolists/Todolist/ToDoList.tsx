import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../App/store";
import {getTasksTC} from "../Tasks-reducer";
import {TitleUpdate} from "../../../Components/TitleUpdate/TitleUpdate";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {Input} from "../../../Components/Input/Input";
import ButtonGroup from "@mui/material/ButtonGroup";
import {Tasks} from "./Tasks/Tasks";
import {Divider, IconButton} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import s from './ToDoList.module.sass'

type TDListType = {
    todoListId: string
    title: string

}

export const ToDoList = (props: TDListType) => {

    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks)

    useEffect(() => {
        dispatch(getTasksTC(props.todoListId))
    }, [])

    const addTask = () => {

    }

    return (
        <div>
            <div className={s.titleBlock}>
                <div className={s.title}>
                    <TitleUpdate title={props.title}/>
                </div>
                <div>
                    <IconButton aria-label="delete" size="small" color={'primary'}>
                        <CreateIcon/>
                    </IconButton>
                    <IconButton aria-label="delete" size="small" color={'primary'}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
            <Divider style={{margin: 10}}/>
            <Input addItem={addTask}/>
            {tasks[props.todoListId] && tasks[props.todoListId].map((task) => {
                return <Tasks key={task.id}
                              title={task.title}/>
            })}

            <ButtonGroup size="small" variant="contained" fullWidth={true}>
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
            </ButtonGroup>

        </div>
    );
};

