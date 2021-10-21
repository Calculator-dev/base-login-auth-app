import { Button, TextField, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { baseLoginActions } from "../Store"
import { useState } from "react";
import axios from "axios";

export default function Register() {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })
    const [error, setError] = useState(false);

    function onChange(e) {

        setInput({ ...input, [e.target.name]: e.target.value })

    }

    function hideLoginModal() {
        dispatch(baseLoginActions.setModal({ login: false, register: false }))
    }

    function showLoginModal() {
        dispatch(baseLoginActions.setModal({ login: true, register: false }))
    }



    async function registerHandler() {
        await axios.post("http://localhost:5000/users/signup", { name: input.name, email: input.email, password: input.password, passwordConfirm: input.passwordConfirm })

            .then(res => dispatch(baseLoginActions.setUser(res.data.token)))
            .catch(err => setError(err.response.data.message));



    }

    return (
        <>
            <div className="backdrop" />
            <div className="modal">
                <Typography variant="h4" children="Register" />
                <TextField
                    variant="standard"
                    type="text"
                    value={input.name}
                    label="Name"
                    name="name"
                    style={style.input}
                    onChange={onChange}
                />
                <TextField
                    variant="standard"
                    type="text"
                    value={input.email}
                    label="Email"
                    name="email"
                    style={style.input}
                    onChange={onChange}
                />
                <TextField
                    variant="standard"
                    type="password"
                    value={input.password}
                    label="Password"
                    name="password"
                    style={style.input}
                    onChange={onChange} />

                <TextField
                    variant="standard"
                    type="password"
                    value={input.passwordConfirm}
                    label="Confirm password"
                    name="passwordConfirm"
                    style={style.input}
                    onChange={onChange} />
                <Typography children={error} style={{ color: "red", marginTop: "10px" }} />
                <Button variant="contained" color="primary" children="Register" style={style.input} onClick={registerHandler} />
                <Button variant="outlined" color="error" children="close" onClick={hideLoginModal} style={style.input} />
                <Typography style={style.account} >Have an account?</Typography>
                <Typography onClick={showLoginModal} style={style.register} >Login</Typography>
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