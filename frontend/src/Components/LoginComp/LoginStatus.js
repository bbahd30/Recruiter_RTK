import axios from 'axios';
import * as Links from '../../Links'
import React, { useEffect, useState } from 'react';
import Cookies from "universal-cookie";

const cookies = new Cookies();


const LoginStatus = () =>
{
    const [member, setStatus] = useState({ 'status': 'loggedOut' })

    useEffect(() =>
    {
        console.log("called status checking");
        axios
            .get(Links.check_status,
                {
                    headers:
                    {
                        'Authorization': localStorage.getItem('auth_token'),
                    }

                })
            .then((response) =>
            {
                if (response.data.status === "loggedIn")
                {
                    console.log(response.data)
                    setStatus
                        ({
                            status: 'loggedIn',
                            // can be used to get further data from the members api from response.data
                        })
                    console.log(response.data)
                }
            })
            .catch((error) =>
            {
                console.log(error)
            })
    }, []);

    return (
        <div>
            {member.status}
        </div>
    );
};

export default LoginStatus;