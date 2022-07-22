import React from 'react';
import s from './Input.module.sass'
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

export const Input = () => {
    return (
        <div>
            <TextField
                       label="Outlined"
                       variant="outlined"
                       color="primary"
                       size="small"/>
            <Button variant="outlined" size="small"  startIcon={<AddIcon />}>
                Add
            </Button>
        </div>
    );
};

