import React from 'react';
import s from './Tasks.module.sass'
import {Checkbox} from "@mui/material";
import {TitleUpdate} from "../../../../Components/TitleUpdate/TitleUpdate";

type TasksPropsType = {
    title: string
}

export const Tasks = (props:TasksPropsType) => {
    return (
        <div>
            <Checkbox />
            <TitleUpdate title={props.title}/>
        </div>
    );
};

