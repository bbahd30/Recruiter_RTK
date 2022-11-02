import { Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../DashboardComponents/SideBar';
import * as Links from '../../Links';
import CarouselProvider from '../UtilityComponents/CarouselProvider';
import AddRoundForm from '../Forms/AddRoundForm';
import { useNavigate } from 'react-router-dom';
import MyDialogBox from '../UtilityComponents/MyDialogBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const RTStage = () =>
{
    const { id } = useParams();
    const [rounds, setRounds] = useState([]);
    const navigate = useNavigate();
    console.log(id)
    const fetchRoundsData = () =>
    {
        axios
            .get(Links.seasons_api + `${id}/rounds/`)
            .then((response) =>
            {
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

    const navigateToRound = (id, sId) =>
    {
        navigate(`../rounds/${id}`, { state: { sId: sId } });
    }

    const CarouselSlider = CarouselProvider();

    return (
        <>
            <SideBar id={id} />
            <div className='carouselCont'>
                {/* todo: section id for edit icon */}
                <CarouselSlider formComponent={<AddRoundForm type='add' section_id="" />} title="Add Round">
                    {
                        rounds.map(round =>
                        ( //note: imp as not { it is (
                            <div key={round.id}>
                                <MyDialogBox

                                    buttonChild=
                                    {
                                        <ModeEditIcon />
                                    }
                                    dataChild=
                                    {
                                        <AddRoundForm type='edit' round_id={round.id}
                                        />
                                    }
                                    title="Add Questions"
                                />
                                <div
                                    className='carouselCard'
                                    id={"round" + round.id}
                                    onClick={() => { navigateToRound(round.id, id) }}
                                >
                                    {/* todo: add the round type */}
                                    <div className='season-name'>
                                        {round.round_name}
                                    </div>
                                    <div className='carouselIndividualImg'>
                                        {/* <img
                                        src={require('')}
                                        width={"80px"} height={"70px"} /> */}
                                    </div>
                                    <div className='carouselData'>
                                        {(round.round_type === 'int' ? "Interview" : "Test")}
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </CarouselSlider>
            </div>
        </>
    );
};

export default RTStage;