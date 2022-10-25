import React from 'react';
import { useEffect, useState } from 'react';
import LoginStatus from '../LoginComp/LoginStatus';
import SideBar from './SideBar';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import ApplicantData from '../Stages/ApplicantData';
import * as Links from '../../Links';
import axios from 'axios';
import { useParams, useLocation, useNavigate, Route, Routes } from 'react-router-dom';

// custom withRouter as it is not present in router 6
function withRouter(Component)
{
    function ComponentWithRouterProp(props)
    {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

function Dashboard(props)
{
    const [season, setSeason] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const { id } = useParams();

    const getSeasonData = () =>
    {
        axios
            .get(Links.seasons_api + `${id}/`)
            .then((response) =>
            {
                setSeason(response.data);
            });
    }

    const getApplicantsData = () =>
    {
        axios
            .get(Links.seasons_api + `${id}/applicants/`)
            .then((response) =>
            {
                console.log(response.data)
                setApplicants(response.data);
            });
    }

    useEffect(() =>
    {
        // defining the season_id for backend data
        getSeasonData();
        getApplicantsData();
    }, []);



    return (
        <div>
            <LoginStatus />
            <SideBar id={id} />
            <Box sx={{ backgroundColor: '#5b004c', padding: '50px 0 50px 20%', display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <Typography variant='h5' color='white'>{season.year}</Typography>
                    <Typography variant='h3' color='white'>{season.season_name}</Typography>
                    <Typography variant='h6' color='white'>{season.description}</Typography>
                    <Button variant='contained' sx={{ marginTop: '30px' }}>Import CSV</Button>
                </div>
                <div>
                    <img src={require('../../Images/welcome.svg').default} width="800px"></img>
                </div>
            </Box>
            <Box sx={{ backgroudColor: 'aqua' }} height='30px'>
                {
                    <ApplicantData data={applicants} />
                }
            </Box>


        </div>
    );
};

export default withRouter(Dashboard);