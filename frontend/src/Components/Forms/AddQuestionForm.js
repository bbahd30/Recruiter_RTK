import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import { Grid, Paper, Button, MenuItem, Select, OutlinedInput, InputLabel, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';

const AddQuestionForm = (props) =>
{
    const paperStyle =
    {
        padding: '10px 20px',
        width: '30vw'
    }
    const initial =
    {
        question_text: "",
        ans: "",
        totalMarks: "",
        section_id: props.sectionID,
        assignee_id: [] // multiple
    };
    console.log(props.sectionID)
    const [formValues, setFormValues] = useState(initial);
    const [formErrors, setFormErrors] = useState([]);
    const [added, setAdded] = useState(false);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [members, setMembers] = useState([]);

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (e) =>
    {
        setIsSubmitClicked(true);
        e.preventDefault();
        setFormErrors(validate(formValues));

    }

    const validate = (values) =>
    {
        const errors = {};

        if (!values.totalMarks)
        {
            errors.totalMarks = "Marks is a required field";
        }
        if (!values.question_text)
        {
            errors.question_text = "Question Text is required";
        }
        // if (!values.assignee_id)
        // {
        //     errors.assignee_id = "Assignees can't  is required";
        // }
        console.log(errors)
        return errors;
    }

    const saveToData = (formValues) =>
    {
        console.log("save")
        const url = Links.questions_api;
        axios
            .post
            (
                url,
                {
                    question_text: formValues.question_text,
                    total_marks: formValues.totalMarks,
                    section_id: formValues.section_id,
                    ans: formValues.ans,
                    assignee_id: formValues.assignee_id

                })
            .then
            ((response) =>
            {
                if (response.status == 200 || response.status == 201)
                {
                    setAdded(true);
                }
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }

    useEffect(() =>
    {
        if (Object.keys(formErrors).length === 0 && isSubmitClicked)
        {
            saveToData(formValues);
            setFormValues(initial);
            setTimeout(() =>
            {
                setAdded(false);
            }, (4000));
        }
    }, [formErrors])

    useEffect(() =>
    {
        const url = Links.members_api;
        axios
            .get
            (
                url
            )
            .then
            ((response) =>
            {
                if (response.status == 200 || response.status == 201)
                {
                    setMembers(response.data)
                }
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }, []);

    return (
        <Grid textAlign={'center'}>
            <Paper elevation={0} style={paperStyle}>

                {added ?
                    (
                        <Button variant="text" type='submitClicked' sx={{ marginBottom: "30px" }} transition="all .2s"
                        >
                            Question successfully added
                        </Button>
                    )
                    :
                    <div></div>}

                <Grid>
                    <form onSubmit={handleSubmit} alignitem={'center'}>
                        <TextField
                            id="outlined-basic"
                            label="Question Text"
                            placeholder='Enter Question Text'
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            name="question_text"
                            value={formValues.question_text}
                            error={Boolean(formErrors.question_text)}
                            sx={{ marginBottom: '20px' }}
                            helperText={formErrors.question_text}
                        />
                        <TextField
                            id="outlined-basic"
                            type="number"
                            label="Total Marks"
                            placeholder='Enter Total Marks'
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            name="totalMarks"
                            value={formValues.totalMarks}
                            error={Boolean(formErrors.totalMarks)}
                            sx={{ marginBottom: '20px' }}
                            helperText={formErrors.totalMarks}
                        />

                        {/* <TextField
                            id="outlined-basic"
                            label="Assign to"
                            select
                            placeholder='Choose Member'
                            variant="outlined"
                            fullWidth
                            multiline
                            onChange={handleChange}
                            name="assignee_id"
                            value={formValues.assignee_id}
                            rows={4}
                            error={Boolean(formErrors.assignee_id)}
                            sx={{ marginBottom: '20px' }}
                            helperText={formErrors.assignee_id}
                        > */}
                        <FormControl
                            fullWidth>
                            <InputLabel id="assign_to">Name</InputLabel>
                            <Select
                                id="outlined-basic"
                                labelId="assign_to"
                                // variant="outlined"
                                label="Assign to"
                                fullWidth
                                multiple
                                onChange={handleChange}
                                name="assignee_id"
                                value={formValues.assignee_id}
                                error={Boolean(formErrors.assignee_id)}
                                sx={{ marginBottom: '20px' }}
                                helpertext={formErrors.assignee_id}
                            >
                                {
                                    members.map(member =>
                                    (
                                        <MenuItem value={member.name} key={member.id}
                                            name={member.id}>
                                            {member.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <TextField
                            id="outlined-basic"
                            label="Solution"
                            placeholder='Enter Solution'
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            name="ans"
                            value={formValues.ans}
                            error={Boolean(formErrors.ans)}
                            sx={{ marginBottom: '20px' }}
                            helperText={formErrors.ans}
                        />
                        <Button variant="contained" type='submitClicked' onClick={handleSubmit} sx={{ marginTop: '30px' }}>Add</Button>

                    </form>
                </Grid>
            </Paper>
        </Grid >
    );
};

export default AddQuestionForm;