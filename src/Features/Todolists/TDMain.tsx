import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTodoListTC} from "./Todolist-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppDispatch, AppRootStateType} from "../../App/store";
import {TodoListsStateType} from "../../types";
import {TDList} from "./Todolist/TDList";
import {Input} from "../../Components/Input/Input";
import {Action} from "redux";

export const TDMain = () => {
    const todolists =  useSelector<AppRootStateType, TodoListsStateType[]>(state => state.todolist)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType,unknown,Action> & AppDispatch>()

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

