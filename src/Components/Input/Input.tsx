import React from 'react';
import s from './Input.module.sass'
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export const Input = () => {
    return (
        <div className={s.input}>
            <TextField
                       label="Outlined"
                       variant="outlined"
                       color="primary"
                       style={{width: '100%'}}
                       size="small"/>
            <IconButton aria-label="delete" size="small" color={'primary'}>
                <AddIcon />
            </IconButton>
        </div>
    );
};

