import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../App/store";
import {TasksStateType} from "../../../types";
import {getTasksTC} from "../Tasks-reducer";
import {TitleUpdate} from "../../../Components/TitleUpdate/TitleUpdate";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import {Input} from "../../../Components/Input/Input";
import ButtonGroup from "@mui/material/ButtonGroup";
import {Tasks} from "./Tasks/Tasks";
import {Action} from "redux";

type TDListType = {
    todoListId: string
    title: string

}

export const TDList = (props:TDListType) => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,Action> & AppDispatch>()
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    useEffect(()=> {
        dispatch(getTasksTC(props.todoListId))
    },[])


    return (
        <div>
            <TitleUpdate title={props.title}/>
            <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Input/>
            {tasks[props.todoListId].map((task) => {
                return <Tasks key={task.id}
                              title={task.title}/>
            })}
            <ButtonGroup size="small"  variant="outlined">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
            </ButtonGroup>
        </div>
    );
};

