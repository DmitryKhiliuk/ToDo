import React, {useCallback, useEffect} from 'react';
import {useAppDispatch} from "../../../App/store";
import {fetchTasksTC} from "../Tasks-reducer";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {Task} from "./Tasks/Task";
import {Divider, IconButton} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import s from './Todolist.module.sass'
import {FilterValuesType, TaskStatuses, TaskType, TodolistDomainType} from "../../../Api/types";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    console.log('Todolist called')

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (demo) {
            return
        }
        const thunk = fetchTasksTC(props.todolist.id)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.todolist.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.todolist.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.todolist.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <div className={s.titleBlock}>
                <div className={s.title}>
                    <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
                </div>
                <div>
                    <IconButton aria-label="delete" size="small" color={'primary'}>
                        <CreateIcon/>
                    </IconButton>
                    <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
            <Divider style={{margin: 10}}/>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            {
                tasksForTodolist && tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                                    removeTask={props.removeTask}
                                                                    changeTaskTitle={props.changeTaskTitle}
                                                                    changeTaskStatus={props.changeTaskStatus}
                />)
            }

            <ButtonGroup size="small" variant="contained" fullWidth={true}>
                <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onAllClickHandler}

                >All
                </Button>
                <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onActiveClickHandler}
                        color={'primary'}>Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onCompletedClickHandler}
                        color={'secondary'}>Completed
                </Button>
            </ButtonGroup>

        </div>
    )

})


