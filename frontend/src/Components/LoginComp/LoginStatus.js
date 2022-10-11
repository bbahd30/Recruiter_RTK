import axios from 'axios';
import * as Links from '../../Links'
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoginStatus = () =>
{
    const [member, setStatus] = useState({ 'status': 'loggedOut' })
    
    useEffect(() => {
        // console.log("called status checking")

        axios.defaults.withCredentials = true;
        axios
            (
                Links.check_status,
                {
                  method: 'GET',
                  withCredentials: true
                })
            .then((response) =>
                {
                    console.log(response);
                    if (response.data.status === "loggedIn")
                    {
                        console.log(response.data)
                        setStatus
                        ({
                            status: 'loggedIn',
                            // can be used to get further data from the members api from responsedata
                        })
                        console.log(response.data)
                    }
                })
                .catch((err) => 
                {
                    console.log(err.response);
                })
        axios
            .get(Links.check_status,
                {
                    params: {
                        withCredentials: true,
                        format: "json",
                    }
                })
            .then((response) => {
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