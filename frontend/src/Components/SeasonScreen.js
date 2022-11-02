import React from 'react';
import LoginStatus from './LoginComp/LoginStatus';
import Navbar from './DashboardComponents/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Links from '../Links';
import AddSeasonForm from './Forms/AddSeasonForm';
import CarouselProvider from './UtilityComponents/CarouselProvider';
import MyDialogBox from './UtilityComponents/MyDialogBox';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const SeasonScreen = () =>
{
    const [seasons, setSeason] = useState([]);
    const navigate = useNavigate();

    const fetchSeasonData = () =>
    {
        axios
            .get(Links.seasons_api,
                {
                    params:
                    {
                        withCredentials: true
                    }
                })
            .then((response) =>
            {
                setSeason(response.data)
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }

    const navigateToSeason = (id) =>
    {
        navigate(`/seasons/${id}`);
    }

    useEffect(() =>
    {
        fetchSeasonData();
    }, []);

    const CarouselSlider = CarouselProvider();

    // todo: TO ADD THE PERMISSION CLASS ON CLICKING THE CARD OF THE SEASON

    return (
        <div>
            <LoginStatus />
            <Navbar />
            <div className='carouselCont'>
                <CarouselSlider formComponent={<AddSeasonForm type='add' season_id="" />} title="Add Season">
                    {
                        seasons.map(season =>
                        (
                            <div key={season.id}>
                                <MyDialogBox

                                    buttonChild=
                                    {
                                        <ModeEditIcon />
                                    }
                                    dataChild=
                                    {
                                        <AddSeasonForm type='edit' season_id={season.id}
                                        />
                                    }
                                    title="Add Questions"
                                />
                                <div className='carouselCard' id={"season" + season.id} onClick={() => { navigateToSeason(season.id) }}>
                                    <div className='season-year'>{season.year}</div>
                                    <div className='season-name'>
                                        {season.season_name}
                                    </div>
                                    <div className='carouselIndividualImg'>
                                        <img
                                            src={require('../Images/2019.png')}
                                            width={"80px"} height={"70px"} />
                                    </div>
                                    <div className='carouselData'>
                                        {season.description}
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </CarouselSlider>
            </div>

        </div>
    );
};

export default SeasonScreen;