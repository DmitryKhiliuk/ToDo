import React, {useEffect} from 'react';
import s from './TDMain.module.sass'
import {useDispatch, useSelector} from "react-redux";
import {getTodoListTC} from "../../Redux/Todolist-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../Redux/Store";
import {ActionType, TodoListsStateType} from "../../types";
import {TDList} from "./Todolist/TDList";
import {Input} from "../../Components/Input/Input";

export const TDMain = () => {
    const todolists =  useSelector<AppRootStateType, TodoListsStateType[]>(state => state.todolist)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>()

    useEffect(()=> {
        dispatch(getTodoListTC())
    },[])

    return (
        <div>
            <Input/>
            {todolists.map((tl) => {
                return <TDList key={tl.id}
                               todoListId={tl.id}
                               title={tl.title}
                               />
            })}
        </div>
    );
};

