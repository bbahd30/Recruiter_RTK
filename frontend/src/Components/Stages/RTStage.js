import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../DashboardComponents/SideBar';
import FormProvider from '../UtilityComponents/FormProvider';
import * as Links from '../../Links';

const RTStage = () =>
{
    const fields = [];
    const { id } = useParams();
    const [forms, setForms] = useState([]);
    const [rounds, setRounds] = useState([]);

    const fetchRoundsData = () =>
    {
        axios
            .get(Links.rounds_api)
            .then((response) =>
            {
                console.log(response.data);
                setRounds(response.data)
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }
    useEffect(() =>
    {
        fetchRoundsData();
    }, []);

    return (
        <div>
            <SideBar id={id} />
            <Box sx={{ backgroudColor: "blue" }}>
                {
                    rounds.map(round =>
                    (
                        <div key={round.id}>
                            {round.round_name}
                        </div>
                    ))
                }
            </Box>
        </div>
    );
};

export default RTStage;