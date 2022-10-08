import axios from "axios";
import React, { useRef, useState, useEffect } from "react";   
import * as Links from '../../Links'        
import { useHistory } from 'react-router-dom';

function loginMember(props)
{
    const [status, setStatus] = useState({ "loggedIn": "false" });
    
    useEffect(() =>
    {
        let params = new URLSearchParams(location.search);
        let auth_code = params.get("code");

        axios
            .get(Links.localhost + "authorize/")
    })
}