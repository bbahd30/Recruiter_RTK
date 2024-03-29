import React from 'react'
import { useEffect, useState} from 'react'

import { Card, CardContent, Dialog, Button, DialogContent, DialogTitle, Divider, AppBar, FormControl, MenuItem, IconButton, Toolbar, Select, Typography, TextField, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system'
import Slide from '@mui/material/Slide';

import { useDispatch, useSelector } from 'react-redux'
import applicantSlice, { getStatusAndSectionMarks, setOpenModal } from '../../Slices/applicantSlice'
import Navbar from '../DashboardComponents/Navbar';
import { useParams } from 'react-router-dom';
import { showSections } from '../../Slices/sectionSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
return <Slide direction="up" ref={ref} {...props} />;
});

const ApplicantCard = () =>
{
    const dispatch = useDispatch();
    const applicantState = useSelector((state) => state.applicant)
    const roundState = useSelector((state) => state.round)
    const sectionState = useSelector((state) => state.section)
    const question_info_section_wise = applicantState.question_info_section_wise

    const [filteredSectionWiseData, setFilteredSectionWiseData] = useState({}) 
    const season_id = useParams()['id']
    const applicant = applicantState.applicantDetails

    const [selectedRound, setSelectedRound] = useState(null);
    const handleClose = () => {
        dispatch(setOpenModal(false))
        console.log(roundState)
    };

    const showSectionMarksFor = (roundId) =>
    {
        if (selectedRound === roundId)
            setSelectedRound(null);
        else
            setSelectedRound(roundId);
        setFilteredSectionWiseData(question_info_section_wise.filter(obj => Object.keys(obj)[0] == roundId)[0][roundId])
    }

    // useEffect(() =>
    // {
    //     if (sectionState.sections.len === 0)
    //     {
    //     }
    // }, [])

    return (
        <Dialog
        fullScreen
        open={applicantState.openModal}
        onClose={() => { dispatch(setOpenModal(false)) }}
        TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' , background: 'rgb(35 181 173)'}}>
                <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {applicant.name} - {applicant.enroll_no}
                </Typography>
                </Toolbar>
            </AppBar>
            <DialogContent>
                    <Box sx={{ display: 'flex', height: '100vh' }}>
                        <Box sx={{ flexBasis: '30%', bgcolor: 'grey.200', padding: '2rem' }}>
                            <Stack direction="column" spacing={2} >
                            {roundState.rounds.map((round, key) => (
                                <Box
                                key={key}
                                sx={{
                                      border: '1px solid #ccc',
                                      padding: '12px',
                                      borderRadius: '4px',
                                      backgroundColor:
                                        selectedRound === round.id ? '#e0e0e0' : '#f9f9f9',
                                      cursor: 'pointer',
                                    }}
                                     onClick={() => {
                                       showSectionMarksFor(round.id)
                                    }}
                                >
                                <Typography variant="subtitle1">{round.round_name}</Typography>
                                <Typography variant="body2">
                                    {round.round_type === 't' ? 'Test' : 'Interview'}
                                </Typography>
                                </Box>
                            ))}
                            </Stack>
                        </Box>
                        <Box sx={{ flexGrow: 1, padding: '2rem' }}>
                          {
                            <Stack spacing={3}>
                                <Box sx={{ flexGrow: 1 }}>
                                    {selectedRound !== null && (
                                    <Box
                                        sx={{
                                        border: '1px solid #ccc',
                                        padding: '12px',
                                        borderRadius: '4px',
                                        backgroundColor: '#f9f9f9',
                                        height: '100%',
                                        }}
                                        >
                                            {Object.entries(filteredSectionWiseData).map(([key, value]) => 
                                            {
                                                return value.map((questionData, key) =>
                                                { 
                                                    return(
                                                    <>
                                                        <h4>{questionData.status}</h4> 
                                                        <Typography variant="h5">
                                                            Question:
                                                            {questionData.question.question_text}
                                                            {questionData.question.total_marks}
                                                            {questionData.question.assignee_id.map((assignee) => (
                                                                <Typography variant="h6">
                                                                   { assignee.name}
                                                                </Typography>
                                                            ))}
                                                        </Typography>
                                                        <Typography variant="subtitle1" sx={{ marginTop: '8px' }}>
                                                        Details:
                                                        </Typography>
                                                            <Typography variant="body1">
                                                                    <>
                                                                        <h3>{questionData.score}</h3>
                                                                <h4>{questionData.remarks}</h4>                                                                 
                                                                    </>
                                                        </Typography>
                                                        <hr/>
                                                        </>
                                                )})
                                            })}
                                    </Box>
                                    )}
                                </Box>
                            
                          </Stack>
                          }
                    </Box>
        </Box>
            </DialogContent>
        </Dialog>
  );
}

export default ApplicantCard