import axios from 'axios';
import * as Links from '../../Links'
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";



const LoginStatus = () =>
{
    const [member, setStatus] = useState({ 'status': 'loggedOut' })
    const navigate = useNavigate();

    useEffect(() =>
    {
        axios
            .create({
                withCredentials: true
            })
            .get(Links.check_status)
            // {
            //     params: {
            //         withCredentials: true,
            //     },
            // headers:
            // {
            //     "Content-Type": "application/json",
            //     "X-CSRFToken": cookies.get("csrftoken"),
            // }

            // })
            .then((response) =>
            {
                if (response.data.status === "loggedIn")
                {
                    setStatus
                        ({
                            status: 'loggedIn',
                            // can be used to get further data from the members api from response.data
                        })
                }
                else
                {
                    navigate("/")
                }
            })
            .catch((error) =>
            {
                console.log(error)
            })
    }, []);

    return (
        <>
        </>
    );
};

export default LoginStatus;