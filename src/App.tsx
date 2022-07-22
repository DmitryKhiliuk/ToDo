import React from 'react';
import './App.css';
import {TDMain} from "./Features/Todolists/TDMain";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { green, deepPurple } from '@mui/material/colors';


const customTheme = createTheme({
    palette: {
        primary: {
            main: deepPurple[900],
        },
        secondary: {
            main: green[900],
        },
    },
})

function App() {
  return (
      <ThemeProvider theme={customTheme}>
            <div className="App">
                <TDMain/>
            </div>
      </ThemeProvider>
  );
}

export default App;
