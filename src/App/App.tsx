import React from 'react';
import s from './App.module.sass';
import {ToDoMain} from "../Features/Todolists/ToDoMain";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {green, deepPurple} from '@mui/material/colors';
import Header from "../Components/Header/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../Features/Auth/Login";


const customTheme = createTheme({
    palette: {
        primary: {
            main: '#3F248C',
        },
        secondary: {
            main: '#BDACEB',
        },
    },
})

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <div className={s.app}>
                <Header/>
                <div className={s.content}>
                    <Routes>
                        <Route path={'/'} element={<ToDoMain/>}/>
                        <Route path={'/login'} element={<Login/>}/>

                        <Route path={'/404'} element={<h1 style={{color: 'red'}}>404. Page not found</h1>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;
