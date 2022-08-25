import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, Paper} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import s from './Task.module.sass'
import {TaskStatuses, TaskType} from "../../../../Api/types";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);
    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''} >
            <Paper elevation={2} className={s.task}  style={props.task.status === 2 ? {background: '#FFF3B2'}  : {background: '#FFFFFF'}} >
                <div>
                    <Checkbox checked={props.task.status === TaskStatuses.Completed}
                              color="primary"
                              onChange={onChangeHandler}
                    />
                    <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
                </div>
                <div>
                    <IconButton aria-label="delete" size="small" color={'primary'} onClick={onClickHandler}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Paper>
        </div>
    );
});

