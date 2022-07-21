import React, {useEffect} from 'react';
import s from './TDList.module.sass'
import {getTodoListTC} from "../../../Redux/Todolist-reducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../../Redux/Store";
import {ActionType} from "../../../types";
import {getTasksTC} from "../../../Redux/Tasks-reducer";

type TDListType = {
    todoListId: string
}

export const TDList = (props:TDListType) => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>()


    useEffect(()=> {
        dispatch(getTasksTC(props.todoListId))
    },[])


    return (
        <div>

        </div>
    );
};

