import React, {useEffect} from 'react';
import s from './TDMain.module.sass'
import {useDispatch} from "react-redux";
import {getTodoListTC} from "../../Redux/Todolist-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../Redux/Store";
import {ActionType} from "../../types";

export const TDMain = () => {

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,ActionType> & AppDispatch>()

    useEffect(()=> {
        dispatch(getTodoListTC())
    },[])

    return (
        <div>
            {}
        </div>
    );
};

