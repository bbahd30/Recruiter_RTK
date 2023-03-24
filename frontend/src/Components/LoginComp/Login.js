import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import * as Links from '../../Links'
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () =>
{
    const [member, setStatus] = useState({ "status": "loggedOut" });
    const navigate = useNavigate();
    useEffect(() =>
    {
        let params = new URLSearchParams(window.location.search);
        let auth_code = params.get("code");

        axios
            .get(Links.login_link,
                {
                    params: {
                        code: auth_code, state: "member_allowed_sharing_info",
                        withCredentials: true
                    }
                })
            .then((res) =>
            {
                if (res.status === 201 || res.status === 202)
                {
                    if (res.data.status === "loggedInNow")
                    {
                        setStatus({ "status": "loggedIn" })
                        navigate(`/seasons`);
                    }
                    else
                    {
                        navigate(`/`);
                    }
                }
            })
            // todo:
            .catch((error) =>
            {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div>
                Lost will be thrown again to loggin Button
                {/* <Navigate to="/" /> */}
            </div>

            {/* loggin in screen loading.... */}
        </>
    );
}


export default Login