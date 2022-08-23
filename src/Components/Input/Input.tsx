import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './Input.module.sass'
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export type InputSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void}
type InputType = {
    addItem: (title: string, helper: InputSubmitHelperType) => void
    disabled?: boolean
}

export const Input = React.memo(function ({addItem, disabled = false}: InputType) {

    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = async () => {
        if (title.trim() !== '') {
            addItem(title, {setError, setTitle})
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div className={s.input}>
            <TextField
                       label="Outlined"
                       variant="outlined"
                       color="primary"
                       style={{width: '100%'}}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       value={title}
                       size="small"/>
            <IconButton aria-label="delete" size="small" color={'primary'} onClick={addItemHandler}>
                <AddIcon />
            </IconButton>
        </div>
    );
});

