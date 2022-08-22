import React, {ChangeEvent, useState} from 'react';
import s from './Input.module.sass'
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';


type InputType = {
    getValue: (value: string) => void
}

export const Input = (props: InputType) => {

    const [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickHandler = () => {
        props.getValue(title)
        setTitle('')
    }

    return (
        <div className={s.input}>
            <TextField
                       label="Outlined"
                       variant="outlined"
                       color="primary"
                       style={{width: '100%'}}
                       onChange={onChangeHandler}
                       value={title}
                       size="small"/>
            <IconButton aria-label="delete" size="small" color={'primary'} onClick={onClickHandler}>
                <AddIcon />
            </IconButton>
        </div>
    );
};

