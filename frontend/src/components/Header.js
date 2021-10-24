import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { baseLoginActions } from '../Store';

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector((s) => s.baseLogin.user)

    function showLoginModal() {
        dispatch(baseLoginActions.setModal({ login: true, register: false }))
    }

    function logOut() {
        dispatch(baseLoginActions.setUser(false))
        sessionStorage.removeItem("SavedToken")
    }

    setTimeout(() => {
        logOut();
    }, 1200000);

    function register() {
        dispatch(baseLoginActions.setModal({ login: false, register: true }))
    }

    return (
        <AppBar position="static" color="inherit">
            <Toolbar>
                <Typography variant="h6" component="div" >
                    Base Login
                </Typography>
                <Grid item sm></Grid>
                {!user ? <Button color="primary" variant="contained" onClick={showLoginModal}>Login</Button> :
                    <Button color="error" variant="contained" onClick={logOut}>Logout</Button>}
                <Button color="primary" variant="outlined" onClick={register} style={{ marginLeft: "10px" }}>Register</Button>
            </Toolbar>
        </AppBar>
    );
}
