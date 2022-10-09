import axios from "axios";
import React, { useRef, useState, useEffect } from "react";   
import * as Links from '../../Links'        
import { useHistory } from 'react-router-dom';

const Login = () => 
{
    const [status, setStatus] = useState({ "status": "loggedOut"});
    
    useEffect(() =>
    {
        let params = new URLSearchParams(window.location.search);
        let auth_code = params.get("code");
        // let str_match = params.get("state")

        axios
            // .get(Links.login_link,
                .get(Links.login_link,
                {
                    params: {
                        code: auth_code, state: "member_allowed_sharing_info",
                        withCredentials: true
                    }
                })
            .then((res) => {
                console.log(res);
                if (res.status === 201 || res.status === 202)
                {
                    console.log(res.data)
                    setStatus({ "status": "loggedIn" })
                }
            })
            // todo:
            .catch((error) => {
                console.log(error);

            }, []);
    })

    return (
        <>
            {
                status.status === "loggedIn" ? 
                    (
                        <div>
                            Logged IN dashboard
                        </div>
                    )
                    :
                    (
                        <div>
                            Lost
                        </div>
                    )
            }
        </>
    )
}


export default Login