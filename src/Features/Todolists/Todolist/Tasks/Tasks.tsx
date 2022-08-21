import React from 'react';
import {Checkbox, IconButton, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import {TitleUpdate} from "../../../../Components/TitleUpdate/TitleUpdate";
import s from './Tasks.module.sass'

type TasksPropsType = {
    title: string
}

export const Tasks = (props:TasksPropsType) => {
    return (
        <div>
            <Paper elevation={2} className={s.task} style={{background: '#FFF3B2'}}>
                <div>
                    <Checkbox />
                    <TitleUpdate title={props.title}/>
                </div>
                <div>
                    <IconButton aria-label="delete" size="small" color={'primary'}>
                        <CreateIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" color={'primary'}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Paper>
        </div>
    );
};

