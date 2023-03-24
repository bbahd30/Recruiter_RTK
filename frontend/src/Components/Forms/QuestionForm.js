import React, { useEffect, useRef, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import { Grid, Paper, Button, MenuItem, Select, OutlinedInput, InputLabel, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';

import { useSelector, useDispatch, } from 'react-redux'
import { addQuestion, editQuestion, showQuestions, deleteQuestion, handleQuestionType, getQuestionsData } from '../../Slices/questionSlice';
import { setOpen } from '../../Slices/dialogBoxSlice';
import { setDeleteMode } from '../../Slices/formSlice';
import { showMembers } from '../../Slices/memberSlice';
import { setMembersDispatched, setLoading } from '../../Slices/trackerSlice'

import { useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const QuestionForm = (props) =>
{
    const paperStyle =
    {
        padding: '10px 20px',
        width: '30vw'
    }
    const formState = useSelector((state) => state.form)
    const questionState = useSelector((state) => state.question)
    const memberState = useSelector((state) => state.member)
    const trackerState = useSelector((state) => state.tracker)

    const members = memberState.members

    const type = formState.mode
    const dispatch = useDispatch()
    const roundId = useParams()['roundId']

    const toBeEditQuestionData = questionState

    useEffect(() =>
    {
        if (type === 'edit')
        {
            setQuestionText(toBeEditQuestionData['question_text'])
            setTotalMarks(toBeEditQuestionData['total_marks'])
            setAns(toBeEditQuestionData['ans'])
            let assigneeIds = []
            toBeEditQuestionData['assigneeId'].map((assignee) => (
                assigneeIds.push(assignee.id)
            ))
            setAssigneeId(assigneeIds)
        }
    }, [toBeEditQuestionData])

    const [questionText, setQuestionText] = useState('');
    const [totalMarks, setTotalMarks] = useState(0);
    const [ans, setAns] = useState('')

    const [assigneeId, setAssigneeId] = useState([]);

    const quesTextChangeHandler = (e) => setQuestionText(e.target.value)
    const handleMarksChange = (e) => setTotalMarks(e.target.value)
    const handleAnsChange = (e) => setAns(e.target.value)


    const handleAssigneeId = (event) =>
    {
        console.log(event.target.value)
        setAssigneeId(event.target.value);
    };

    const handleSubmit = (e) =>
    {
        if (type === 'add')
        {
            console.log(assigneeId)
            dispatch(
                addQuestion({
                    section_id: props.sectionId,
                    question_text: questionText,
                    total_marks: totalMarks,
                    ans: ans,
                    assigneeId: assigneeId,
                    round_id: roundId
                })
            )
            dispatch(setOpen(false))
        } else
        {
            console.log("edit")
            dispatch(
                editQuestion({
                    section_id: props.sectionId,
                    questionId: formState.formId,
                    question_text: questionText,
                    total_marks: totalMarks,
                    assigneeId: assigneeId,
                    ans: ans
                })
            )
            dispatch(setOpen(false))
        }
    }
    const deleteQuestionHandler = (roundId, questionId) =>
    {
        dispatch(setDeleteMode(roundId))
        dispatch(deleteQuestion({ questionId, roundId }));
        dispatch(setOpen(false));
    }

    useEffect(() =>
    {
        if (type === 'edit')
        {
            dispatch(getQuestionsData(props.questionId))
        }
        if (!trackerState.membersDispatched && !trackerState.isLoading)
        {
            dispatch(setLoading(true));
            dispatch(setMembersDispatched())
            dispatch(showMembers())
                .then(() => dispatch(setLoading(false)))
        }
    }, [trackerState.membersDispatched])

    return (
        <Grid textAlign={'center'}>
            <Paper elevation={0} style={paperStyle}>
                {/* {added ?
                    (
                        <Button variant="text" type='submitClicked' sx={{ marginBottom: "30px" }} transition="all .2s"
                        >
                            Question successfully added
                        </Button>
                    )
                    :
                    <div></div>} */}
                <TextField
                    id="outlined-basic"
                    label="Question Name"
                    placeholder='Enter Question Name'
                    variant="outlined"
                    fullWidth
                    onChange={quesTextChangeHandler}
                    name="question_name"
                    value={questionText}
                    sx={{ marginBottom: '20px' }}
                // error={Boolean(formErrors.question_name)}
                // helperText={formErrors.question_name}
                />
                <TextField
                    id="outlined-basic"
                    type="number"
                    label="Question Weightage"
                    placeholder='Enter Question Weightage'
                    variant="outlined"
                    fullWidth
                    onChange={handleMarksChange}
                    name="totalMarks"
                    value={totalMarks}
                    sx={{ marginBottom: '20px' }}
                // error={Boolean(formErrors.totalMarks)}
                // helperText={formErrors.totalMarks}
                />
                <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                    <InputLabel
                        id="assign_to">Assignees</InputLabel>
                    <Select
                        labelId="assign_to"
                        variant='outlined'
                        name='assignee_id'
                        input={<OutlinedInput label="Assignees" />}
                        id="outlined-basic"
                        multiple
                        value={assigneeId}
                        onChange={handleAssigneeId}
                    // inputProps={{
                    //     id: 'select-multiple-chip',
                    // }}
                    >
                        {members.map((member) => (
                            <MenuItem key={member.id} value={member.id}>
                                {member.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextareaAutosize
                    style={{ width: '100%' }}
                    minRows={8}
                    id="outlined-basic"
                    label="Solution"
                    placeholder='Enter Solution'
                    variant="outlined"
                    onChange={handleAnsChange}
                    name="ans"
                    value={ans}
                    sx={{ marginBottom: '20px' }}
                // error={Boolean(formErrors.ans)}
                // helperText={formErrors.ans}
                />
                <form alignitem={'center'}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained" sx={{ marginRight: '20px' }}>
                        {type === 'edit' ? "Edit" : "Add"}
                    </Button>
                    {
                        type === 'edit' ?
                            <Button
                                variant="contained"
                                // type='submitClick'
                                onClick={() =>
                                {
                                    // so that the seasonId can be known and so rendered again
                                    deleteQuestionHandler(formState.formId, roundId)
                                }}
                                transition="all .2s"
                            >
                                Delete
                            </Button>
                            : ""
                    }
                </form>

            </Paper>
        </Grid >
    );
};

export default QuestionForm;