import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../DashboardComponents/SideBar';
import { useLocation } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import CarouselProvider from '../UtilityComponents/CarouselProvider';
import AddTestForm from '../Forms/AddTestForm';
import axios from 'axios';
import * as Links from '../../Links';
import { borderLeft } from '@mui/system';

const TestOfRound = () =>
{
    const location = useLocation();
    // todo: on using history if just typed then will not get the seasonID as no history and direct landed
    const seasonID = location.state.sId;

    const [sections, setSections] = useState([]);
    const roundId = useParams();
    const [questions, setQuestions] = useState([]);
    const fetchTest = () =>
    {
        axios
            .get(Links.rounds_api + `${roundId.id}/sections/`)
            .then((response) =>
            {
                setSections(response.data);
                console.log(response.data);
                console.log(sections)
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }

    const fetchQuestions = () =>
    {
        axios
            .get(Links.rounds_api + `${roundId.id}/sections/`)
            .then((response) =>
            {
                setSections(response.data);
                console.log(response.data);
                console.log(sections)
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }
    console.log(sections)

    useEffect(() =>
    {
        fetchTest();
    }, [])

    const divStyle =
    {
        padding: '10px 20px',
        width: '75%',
        borderRadius: '8px 2px 2px 8px',
        margin: '20px auto',
    }
    return (
        <>
            <SideBar id={seasonID} />
            <Box>
                {
                    sections.map(section =>
                    (
                        <Accordion
                            key={section.id}
                            style={divStyle}
                            className='section-boxes'
                        >
                            <AccordionSummary>
                                <h2>
                                    Section: {section.section_name}
                                </h2>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>

                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }

            </Box>
        </ >
    );
};

export default TestOfRound;