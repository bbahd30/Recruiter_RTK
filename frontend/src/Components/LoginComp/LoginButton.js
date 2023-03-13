import React, { useEffect } from 'react';
import { Grid, Paper, Button } from '@mui/material';
import * as Links from "../../Links";
import LoginStatus from './LoginStatus';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginButton = () =>
{

    const navigate = useNavigate();

    const BoxStyle = {
        height: '45vh',
        width: '40vw',
        padding: 20,
        margin: '20vh auto',
    }

    useEffect(() =>
    {
        axios
            .create({
                withCredentials: true,
            })
            .get(Links.loginUser)
            .then(res =>
            {
                if (res.data.status === 'alreadyLoggedIn')
                {
                    navigate("/seasons/");

                }
            })
            .catch((error) =>
            {
                console.log(error)
            })

    }, []);


    return (

        <div>
            <LoginStatus />
            <Grid className='loginButton'>
                <Paper elevation={3} style={BoxStyle}>
                    <Grid style={{ position: 'relative', top: '110px' }}>

                        <Grid item>
                            <h2>Welcome to Recruiter</h2>
                        </Grid>
                        <Grid item>
                            <form >
                                <a href={Links.authorize} style={{ textDecoration: "none" }}>
                                    <Button style={{
                                        borderRadius: 35,
                                        backgroundColor: "rgb(33 182 174)",
                                        padding: "18px 36px",
                                        fontSize: "18px"
                                    }} variant="contained">
                                        Sign in using Omniport
                                    </Button>
                                </a>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
};

export default LoginButton;