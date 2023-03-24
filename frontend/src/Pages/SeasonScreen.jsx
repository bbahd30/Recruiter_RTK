import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import * as Links from '../Links'
import LoginStatus from '../Components/LoginComp/LoginStatus'
import Navbar from '../Components/DashboardComponents/Navbar'
import SeasonForm from '../Components/Forms/SeasonForm'
import CarouselProvider from '../Components/UtilityComponents/CarouselProvider'
import MyDialogBox from '../Components/UtilityComponents/MyDialogBox'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import AddIcon from '@mui/icons-material/Add'

import { showSeasons, navigateToSeason} from '../Slices/seasonSlice'
import { setOpen, setTitle, setDataChild } from '../Slices/dialogBoxSlice'
import { setEditMode, setForm, setAddMode } from '../Slices/formSlice'

const SeasonScreen = () =>
{
    const seasonId = useParams()['id']
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const CarouselSlider = CarouselProvider()

    const seasonState = useSelector((state) => state.season)
    const seasons = seasonState.seasons


    useEffect(() =>
    {
        dispatch(showSeasons())
    }, [])

    const navigateTo = (id) =>
    {
        const url = `/seasons/${id}`
        navigate(url)
    }
    const AddForm = () =>
    {
        dispatch(setOpen(true))
        dispatch(setTitle("Add Season"))
        dispatch(setAddMode())
        dispatch(setDataChild(<SeasonForm />))
    }

    const EditSeason = (id) =>
    {
        dispatch(setOpen(true))
        dispatch(setTitle("Edit Season"))
        dispatch(setDataChild(<SeasonForm/>))
        dispatch(setEditMode(id))
    }
    // todo: TO ADD THE PERMISSION CLASS ON CLICKING THE CARD OF THE SEASON

    return (
        <div>
            {/* <LoginStatus /> */}
            <Navbar />
            <div className='carouselCont'>
                <CarouselSlider>
                    {seasons.map(season =>
                        (
                            <div key={season.id}>
                                <MyDialogBox
                                    icon={<ModeEditIcon />}
                                    onClick = {() => EditSeason(season.id)}
                                />
                                <div
                                    className='carouselCard' id={"season" + season.id}
                                    onClick={() => navigateTo(season.id)}
                                >
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
                <MyDialogBox
                    icon={"Add Season"}
                    onClick = {AddForm}
                />
            </div>

        </div>
    )
}

export default SeasonScreen