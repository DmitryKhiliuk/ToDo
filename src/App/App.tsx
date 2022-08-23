import React, {useCallback, useEffect} from 'react';
import s from './App.module.sass';
import {ToDoMain} from "../Features/Todolists/ToDoMain";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Header from "../Components/Header/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../Features/Auth/Login";
import {useAppSelector} from "./store";
import {useActions} from "../utils/redux-utils";
import {authActions, authSelectors} from "../Features/Auth";
import {selectIsInitialized, selectStatus} from "./selectors";
import {appActions} from "./index";
import {CircularProgress} from "@mui/material";


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

    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {

            initializeApp()

    }, [])

    const logoutHandler = useCallback(() => {
        logout()
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
