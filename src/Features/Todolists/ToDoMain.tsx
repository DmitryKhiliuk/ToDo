import React, {useCallback, useEffect} from 'react';
import {addTodoListTC, getTodoListTC} from "./Todolist-reducer";
import {useAppDispatch, useAppSelector} from "../../App/store";
import {ToDoList} from "./Todolist/ToDoList";
import {Input, InputSubmitHelperType} from "../../Components/Input/Input";
import {Grid, Paper} from "@mui/material";
import s from './ToDoMain.module.sass'
import {selectIsLoggedIn} from "../Auth/selectors";
import {useActions} from "../../utils/redux-utils";
import {todolistsActions} from "./index";

export const ToDoMain = () => {
    const todolists = useAppSelector((state) => state.todolists)
    const tasks = useAppSelector((state) => state.tasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch();

    const {getTodoListTC, addTodoListTC} = useActions(todolistsActions)

    const addTodoList = useCallback(async (title: string, helper: InputSubmitHelperType) => {
        const resultAction = await dispatch(addTodoListTC(title))

        if (addTodoListTC.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occured')
            }
        } else {
            helper.setTitle('')
        }
    }, [])

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        getTodoListTC()
    }, [])


    return (
        <div>
            <Grid container>
                <Paper elevation={3} className={s.input}>
                    <Input addItem={addTodoList}/>
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

