import { Button, TextField, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { baseLoginActions } from "../Store"
import { useState } from "react";
import axios from "axios";

export default function Login() {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState(false);

    function onChange(e) {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    function hideLoginModal() {
        dispatch(baseLoginActions.setModal({ login: false, register: false }))
    }

    function showRegisterModal() {
        dispatch(baseLoginActions.setModal({ login: false, register: true }))
    }

    async function loginHandler() {
        await axios.post("http://localhost:5000/users/signin", { email: input.email, password: input.password })
            .then(res => {
                let token = res.data.token;
                dispatch(baseLoginActions.setUser(token))
                sessionStorage.setItem('SavedToken', token)

            })
            .catch(error => {
                setError(error.response.data.message)
            })
    }

    return (
        <>
            <div className="backdrop" />
            <div className="modal">
                <Typography variant="h4" children="Login" />
                <TextField variant="standard" type="text" value={input.email} label="Email" name="email" style={style.input} onChange={onChange} />
                <TextField variant="standard" type="password" value={input.password} label="Password" name="password" style={style.input} onChange={onChange} />
                <Typography children={error} style={{ color: "red", marginTop: "10px" }} />
                <Button variant="contained" color="primary" children="Login" style={style.input} onClick={loginHandler} />
                <Button variant="outlined" color="error" children="close" onClick={hideLoginModal} style={style.input} />
                <Typography style={style.account}>Dont have an accout?</Typography>
                <Typography onClick={showRegisterModal} style={style.register}>Register</Typography>
            </div>
        </>
    )
}

const style = {
    input: {
        width: "100%",
        marginTop: "10px"
    },
    register: {
        color: "#182335",
        margin: "15px 0 0 15px",
        cursor: "pointer",
        display: "inline"
    },
    account: {
        color: "grey",
        marginTop: "15px",
        display: "inline"
    }
}