import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import { Grid, Paper, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';

const FormProvider = (initial_data, model) =>
{
    const links_matcher =
    {
        'questions': Links.questions_api,
        'seasons': Links.seasons_api,
        // 'rounds'
    }
    const keyword =
    {
        'questions': 'Question',
        'seasons': 'Season'
        // 'rounds'
    }
    const fields =
    {
        'question_text': 'Question Text',
        'ans': 'Solution',
        'total_marks': 'Total Marks',
        'year': 'Season Year',
        'description': 'Season Description',
        'season_name': 'Season Name'
    }
    const url = links_matcher[model]
    const paperStyle =
    {
        padding: '10px 20px',
        width: '25vw'
    }
    // const initial =
    // {
    //     question_text: "",
    //     ans: "",
    //     total_marks: "",
    //     section_id: props.sectionID,
    //     props.field: [] // multiple
    // };
    const initial = initial_data;
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
        if (model === 'questions')
        {

            if (!values.total_marks)
            {
                errors.total_marks = "Marks is a required field";
            }
            if (!values.question_text)
            {
                errors.question_text = "Question Text is required";
            }
        }
        else if (model === 'seasons')
        {
            const yearRegex = /^[0-9]{4}$/;
            if (!values.year)
            {
                errors.year = "Season Year is required";
            }
            else if (!yearRegex.test(values.year))
            {
                errors.year = "Enter a valid year.";
            }
            if (!values.season_name)
            {
                errors.season_name = "Season name is required";
            }
        }
        return errors;
    }

    const saveToData = (formValues) =>
    {
        // set using the ...initial and formvalues
        const data = formValues
        axios
            .post
            (
                url, data,
            )
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


    const MyTextField = (props) =>
    {
        const placeholderStr = "Enter " + fields[props.field];
        // give field name in backend
        return (
            <TextField
                id="outlined-basic"
                // label="Question Text"
                // placeholder='Enter Question Text'
                label={fields[props.field]}
                placeholder={placeholderStr}
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name={props.field}
                value={formValues[props.field]}
                error={Boolean(formErrors[props.field])}
                sx={{ marginBottom: '20px' }}
                helperText={formErrors[props.field]}
            />
        );
    }

    const MySelectField = (props) =>
    {
        return (
            <FormControl
                fullWidth>
                <InputLabel id="assign_to">Assign to</InputLabel>
                <Select
                    id="outlined-basic"
                    labelId="assign_to"
                    // variant="outlined"
                    label="Assign to"
                    fullWidth
                    multiple
                    onChange={handleChange}
                    name={props.field}
                    value={formValues[props.field]}
                    error={Boolean(formErrors[props.field])}
                    sx={{ marginBottom: '20px' }}
                    helpertext={formErrors[props.field]}
                >
                    {
                        props.members_data.map(member =>
                        (
                            <MenuItem value={member.id} key={member.id}
                                name={member.id}>
                                {member.name}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        );
    }

    const MyForm = (props) =>
    (
        <Grid textAlign={'center'}>
            <Paper elevation={0} style={paperStyle}>
                {
                    added ?
                        (
                            <Button variant="text" type='submitClicked' sx={{ marginBottom: "30px" }} transition="all .2s"
                            >
                                {keyword[model]} successfully added
                            </Button>
                        )
                        :
                        <div></div>
                }
                <Grid>
                    <form onSubmit={handleSubmit} alignitem={'center'}>

                        {props.children}
                        <Button variant="contained" type='submitClicked' onClick={handleSubmit} sx={{ marginTop: '30px' }}>
                            Add
                        </Button>

                    </form>
                </Grid>
            </Paper>
        </Grid >
    )
    return {
        MyForm, MyTextField, MySelectField
    }
};

export default FormProvider;