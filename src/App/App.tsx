import React, {useCallback, useEffect} from 'react';
import s from './App.module.sass';
import {TodolistsList} from "../Features/Todolists/TodolistsList";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Navigate, Route, Routes} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "./store";
import {CircularProgress, LinearProgress} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import {logoutTC} from "../Features/Login/auth-reducer";

import {Login} from "../Features/Login/Login";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {initializeAppTC} from "./app-reducer";



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

    const status = useAppSelector((state) => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <ThemeProvider theme={customTheme}>
            <div className={s.app}>
                <Box sx={{ flexGrow: 1 }}>
                    <ErrorSnackbar/>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                TodoList
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                    {status === 'loading' && <LinearProgress/>}
                </Box>
                <div className={s.content}>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList/>}/>
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
