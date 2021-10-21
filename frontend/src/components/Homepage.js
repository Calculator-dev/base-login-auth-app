import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { baseLoginActions } from '../Store';
import { styled } from '@mui/system';
import { CssBaseline, Typography } from '@mui/material';

const Root = styled("div")({
})

const Header = styled(Typography)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "60px",
    color: "#182335"
})

const InfoDiv = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
})

const Info = styled(Typography)({
    fontSize: "40px",
    color: "#182335"
})

export default function Homepage() {
    const dispatch = useDispatch();
    const user = useSelector((s) => s.baseLogin.user)
    const [error, setError] = useState(false);
    const [info, setInfo] = useState(false);

    async function getInfo() {
        await axios.get("http://localhost:5000/users/getProfileInformation", {
            headers: {
                Authorization: `Bearer ${user}`
            }
        })
            .then((res) => setInfo(res.data))
            .catch((err) => setError(err.response.data.message))
    }

    useEffect(() => {
        dispatch(baseLoginActions.setUser(sessionStorage.getItem("SavedToken")))

        if (dispatch(baseLoginActions.setUser(sessionStorage.getItem("SavedToken"))) > new Date()) {
            dispatch(baseLoginActions.setUser(false))
            sessionStorage.clear()
        }
    }, [dispatch])

    useEffect(() => {
        if (user) getInfo();
        // eslint-disable-next-line 
    }, [user])

    useEffect(() => {
        if (error)
            setTimeout(() => {
                dispatch(baseLoginActions.setUser(false))
            }, 2000);
    }, [error, dispatch])

    return (
        <Root>
            {!user ?
                (<Header>Welcome to <span>{<br />}</span> Base LogIn <span>{<br />}</span> Click LOGIN button to Begin</Header>)
                : info ?
                    <InfoDiv>
                        <Info>Welcome to Login Page!   </Info>
                        <Info>
                            Your name is: {info.name}.
                        </Info>
                        <Info>
                            Your email is: {info.email}
                        </Info>
                    </InfoDiv>
                    : (<h1>{error}</h1>)}
            <CssBaseline />
        </Root>
    )

}