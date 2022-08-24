import React from 'react'
import {FormikHelpers, useFormik} from 'formik'
import {loginTC} from './auth-reducer'
import {Navigate} from "react-router-dom";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../App/store";

type FormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }

        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const resultAction = await dispatch(loginTC(values));

            if (loginTC.rejected.match(resultAction)) {
                if (resultAction.payload?.fieldsError?.length) {
                    const error = resultAction.payload?.fieldsError[0];
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    })

    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }


    return <Grid container>
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                        target={'_blank'}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p> Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
