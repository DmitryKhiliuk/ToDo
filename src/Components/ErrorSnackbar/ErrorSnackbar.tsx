import React, {SyntheticEvent} from 'react'
import Snackbar from '@mui/material/Snackbar'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../utils/types'
import {useActions} from '../../utils/redux-utils'
import {Alert, AlertProps} from "@mui/material";
import {appActions} from "../../App/AppActions";


function MuiAlert(props: AlertProps) {
    return <Alert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    //const [open, setOpen] = React.useState(true)
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const {setAppError} = useActions(appActions)

    const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setAppError({error: null});
    }


    const isOpen = error !== null;

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity="error">
                {error}
            </MuiAlert>
        </Snackbar>
    )
}
