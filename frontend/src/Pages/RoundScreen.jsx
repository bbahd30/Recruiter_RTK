import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

import * as Links from '../Links'
import LoginStatus from '../Components/LoginComp/LoginStatus'
import SideBar from '../Components/DashboardComponents/SideBar'
import CarouselProvider from '../Components/UtilityComponents/CarouselProvider'
import RoundForm from '../Components/Forms/RoundForm'
import MyDialogBox from '../Components/UtilityComponents/MyDialogBox'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import AddIcon from '@mui/icons-material/Add'

import { showRounds } from '../Slices/roundSlice'
import { setOpen, setTitle, setDataChild,  } from '../Slices/dialogBoxSlice'
import { setEditMode, setForm, setAddMode } from '../Slices/formSlice'

const RoundScreen = () =>
{
    const id = useParams()['id']
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const CarouselSlider = CarouselProvider()
    
    const roundState = useSelector((state) => state.round)
    const rounds = roundState.rounds

    useEffect(() =>
    {
        dispatch(showRounds())
        dispatch((<AddIcon />))
    }, [])

    const AddRound = () =>
    {
        dispatch(setOpen(true))
        dispatch(setTitle("Add Round"))
        dispatch(setAddMode())
        dispatch(setDataChild(<RoundForm />))
    }

    const EditRound = (id) =>
    {
        dispatch(setOpen(true))
        dispatch(setTitle("Edit Round"))
        dispatch(setDataChild(<RoundForm/>))
        dispatch(setEditMode(id))
    }

    return (
        <>
            {/* <LoginStatus /> */}
            <SideBar id={id} />
            <div className='carouselCont'>
                <CarouselSlider>
                    {rounds.map(round =>
                        ( //note: imp as not { it is (
                            <div key={round.id}>
                                <MyDialogBox
                                    icon = {<ModeEditIcon />}
                                    onClick = {() => EditRound(round.id)}
                                />
                                <div
                                    className='carouselCard'
                                    id={"round" + round.id}
                                    onClick={() => { navigate('rounds/'+round.id) }}
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
                <MyDialogBox
                    icon = {"Add Round"}
                    onClick = {() => {AddRound()}}
                />
            </div>
        </>
    )
}

export default RoundScreen