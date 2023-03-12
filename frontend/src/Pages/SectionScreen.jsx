import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'

import * as Links from '../Links'
import LoginStatus from '../Components/LoginComp/LoginStatus'
import SideBar from '../Components/DashboardComponents/SideBar'
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import MyDialogBox from '../Components/UtilityComponents/MyDialogBox'
import SectionForm from '../Components/Forms/SectionForm'
import QuestionForm from '../Components/Forms/QuestionForm'

import { setOpen, setTitle, setDataChild, setButtonChild } from '../Slices/dialogBoxSlice'
import { setEditMode, setAddMode } from '../Slices/formSlice'
import { showSections, showSectionsWiseQuestions } from '../Slices/sectionSlice'
import { editQuestion, showQuestions } from '../Slices/questionSlice'

const SectionScreen = () =>
{
    const divStyle =
    {
        padding: '10px 20px',
        width: '50%',
        borderRadius: '8px 2px 2px 8px',
        margin: '20px auto',
    }
    const innerDivStyle =
    {
        borderLeft: '3px solid var(--green)',
        margin: '10px auto',
    }
    const quesData =
    {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    }
    const sectionBox =
    {
        marginTop: '20px',
        color: 'var(--green)'
    }

    const dispatch = useDispatch()
    const seasonId = useParams()['id']
    const roundId = useParams()['roundId']

    const sectionState = useSelector((state) => state.section)
    const sections = sectionState.sections
    const questions = sectionState.questions

    const AddSection = () =>
    {
        dispatch(setOpen(true))
        dispatch(setTitle("Add Section"))
        dispatch(setAddMode())
        dispatch(setDataChild(<SectionForm/>))
    }
    const EditSection = (sectionId) =>
    {
        dispatch(setOpen(true));
        dispatch(setTitle("Edit Section"));
        dispatch(setDataChild(<SectionForm />));
        dispatch(setEditMode(sectionId));
    }

    const AddQuestion = (sectionId) =>
    {
        dispatch(setOpen(true))
        dispatch(setTitle("Add Question"))
        dispatch(setAddMode())
        dispatch(setDataChild(<QuestionForm sectionId={sectionId} />))
    }

    const EditQuestion = (questionId, sectionId) =>
    {
        dispatch(setOpen(true));
        dispatch(setTitle("Edit Question"));
        dispatch(setDataChild(<QuestionForm sectionId={sectionId} questionId={questionId} />));
        dispatch(setEditMode(questionId));
    }

    useEffect(() =>
    {
        dispatch(showSections(roundId))
        dispatch(setButtonChild(<AddIcon />))
    }, [])

    useEffect(() =>
    {
        if (sections.length != 0)
        {
            sections.map((section, key) =>
                dispatch(showSectionsWiseQuestions(section.id)))
        }
    }, [sections])
    
    return (
         <>
            <SideBar id={seasonId} />
            <Box>
                <h1 className='addSection'>Sections</h1>
                <div className='addSection' >
                    <MyDialogBox
                        icon = {<AddIcon/>}
                        onClick = {() => {AddSection()}} 
                    />
                </div>

                <div >
                    {sections.map(section => 
                    (
                        <div key={section.id} style={sectionBox}>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <MyDialogBox
                                        icon={"Edit Section"}
                                        onClick={() => EditSection(section.id)}
                                    />
                                </Box>
                                <div key={section.id} style={divStyle} className='section-boxes'>
                                        <div className='flexClass'>
                                            <h2>
                                                Section: {section.section_name}
                                                {/* todo: add accordion condtion of only one open at once */}
                                            </h2>
                                            <div className='addSign'>
                                                <MyDialogBox
                                                    icon={"Add Question"}
                                                    onClick={() => {AddQuestion(section.id)}}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            {questions.map(question =>
                                                (
                                                    // (question.section_id.indexOf(section.id) != -1) ?
                                                    (question.section_id == section.id) ?
                                                        <div key={question.id}>
                                                        <MyDialogBox icon={"Edit Question"}
                                                            onClick={() => {EditQuestion(question.id, section.id)}}/>
                                                            <Accordion
                                                                style={innerDivStyle}
                                                                className='section-boxes'
                                                            >
                                                                <AccordionSummary>
                                                                    <div className='questionAcc'>
                                                                        <div>
                                                                            {question.question_text}
                                                                        </div>
                                                                        <div id='questionMarks'>
                                                                            <div>
                                                                                {question.total_marks}
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                {
                                                                            question.assignee_id.map
                                                                                ((assignee) =>
                                                                                (
                                                                                    <div
                                                                                        style={quesData}
                                                                                        key={assignee.id}>
                                                                                        <div>
                                                                                            {assignee.name}
                                                                                        </div>

                                                                                    </div>
                                                                                ))
                                                                        }
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        </div> : ("")
                                                ))
                                            }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>


            </Box>
        </ >
    );
};

export default SectionScreen