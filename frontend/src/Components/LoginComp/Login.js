import axios from "axios";
import React, { useRef, useState, useEffect } from "react";   
import * as Links from '../../Links'        
import { useHistory } from 'react-router-dom';

const Login = (props) => 
{
    const [status, setStatus] = useState({ "loggedIn": "false" });
    
    useEffect(() =>
    {
        let params = new URLSearchParams(window.location.search);
        let auth_code = params.get("code");

        axios
            .get(Links.localhost + "authorize/",
                {
                    params: { code: auth_code, withCredentials: true }
                })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            }, []);
    })
}


export default Login