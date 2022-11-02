import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import { Grid, Paper, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { convertLength } from '@mui/material/styles/cssUtils';

const FormProvider = (initial_data, model, edit_id, type) =>
{
    const [formErrors, setFormErrors] = useState([]);
    const [added, setAdded] = useState(false);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [dataToEdit, setDataToEdit] = useState(initial_data);
    const [deleteData, setDeleteData] = useState(false);

    const links_matcher =
    {
        'questions': Links.questions_api,
        'seasons': Links.seasons_api,
        'sections': Links.sections_api,
        'rounds': Links.rounds_api,
    }
    const keyword =
    {
        'questions': 'Question',
        'seasons': 'Season',
        'sections': 'Sections',
        'rounds': 'Rounds'
    }
    const fields =
    {
        'question_text': 'Question Text',
        'ans': 'Solution',
        'total_marks': 'Total Marks',
        'year': 'Season Year',
        'description': 'Season Description',
        'season_name': 'Season Name',
        'section_name': 'Section Name',
        'weightage': 'Section Weightage',
        'round_id': 'Round',
        'round_name': 'Round Name',
        'round_type': 'Round Type'
    }
    const url = links_matcher[model]
    const paperStyle =
    {
        padding: '10px 20px',
        width: '25vw'
    }

    let initial = [];
    // if (type === 'add')
    // {
    //     initial = initial_data;
    // }
    initial = initial_data;

    useEffect(() =>
    {
        if (type != 'add')
        {
            // initial = dataToEdit;
            setFormValues(initial);
        }
    }, [dataToEdit]);

    useEffect(() =>
    {
        if (type === 'edit')
        {
            getEditData(edit_id);
        }
    }, []);

    const [formValues, setFormValues] = useState(initial_data);

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
            const markRegex = /^[0-9]+$/;

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
        else if (model === 'sections')
        {
            if (!values.section_name)
            {
                errors.section_name = "Section name is required.";
            }
            if (!values.round_id)
            {
                errors.round_id = "Round is required";
            }
        }
        else if (model === 'rounds')
        {
            if (!values.round_name)
            {
                errors.round_name = "Round name is required";
            }
            if (!values.round_type)
            {
                errors.round_type = "Round type is required";
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

    const deleteFunction = () =>
    {
        const url = `${links_matcher[model]}${edit_id}/`;
        console.log(edit_id)
        axios
            .delete
            (
                url,
                // { headers: { 'X-CSRFToken': csrftoken } }
            )
            .then
            ((response) =>
            {
                if (response.data === "Not found.")
                {
                    setAdded(true);
                    setDeleteData(true)
                }
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }
    const getEditData = (edit_id) =>
    {
        const url = `${links_matcher[model]}${edit_id}/`;
        axios
            .get
            (
                url
            )
            .then
            ((response) =>
            {
                if (response.status === 200 || response.status === 201)
                {
                    setDataToEdit(...dataToEdit, response.data)
                }
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }

    const editFunction = (edit_id) =>
    {
        const data = formValues;
        const url = `${links_matcher[model]}${edit_id}/`;
        axios
            .put
            (
                url, data
            )
            .then
            ((response) =>
            {
                if (response.status === 200 || response.status === 201)
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
            if (type === 'add')
            {
                saveToData(formValues);
            }
            else if (type === 'edit')
            {
                editFunction(edit_id);
            }
            setFormValues(initial_data);
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

    const MyTextFieldNumber = (props) =>
    {
        // give field name in backend
        return (
            <TextField
                id="outlined-basic"
                // label="Question Text"
                // placeholder='Enter Question Text'
                label={fields[props.field]}
                variant="outlined"
                fullWidth
                type='number'
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
                        props.data.map(member =>
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

    const MySelectFieldUsingTextField = (props) =>
    {
        return (
            <TextField
                id="outlined-basic"
                label={fields[props.field]}
                select
                variant="outlined"
                fullWidth
                onChange={handleChange}
                name="round_type"
                value={formValues[props.field] || ""}
                error={Boolean(formErrors.round_type)}
                sx={{ marginBottom: '20px' }}
                helperText={formErrors[props.field]}
            >
                <MenuItem value='int'>
                    Interview
                </MenuItem>
                <MenuItem value='t'>
                    Test
                </MenuItem>
            </TextField>
        )
    }

    const MyForm = (props) =>
    (
        <Grid textAlign={'center'}>
            <Paper elevation={0} style={paperStyle}>
                {
                    added ?
                        (
                            <Button variant="text" sx={{ marginBottom: "30px" }} transition="all .2s"
                            >
                                {keyword[model]} successfully {deleteData ? "deleted" : type === 'edit' ? "edited" : "added"}
                                {console.log(deleteData)}
                            </Button>
                        )
                        :
                        <div></div>
                }
                <Grid>
                    <form onSubmit={handleSubmit} alignitem={'center'}>

                        {props.children}
                        <Button variant="contained" type='submitClick' onClick={handleSubmit} sx={{ marginRight: '20px' }}>
                            {type === 'edit' ? "Edit" : "Add"}
                        </Button>
                        {
                            type === 'edit' ?
                                <Button variant="contained" type='submitClick' onClick={deleteFunction} transition="all .2s"
                                >
                                    Delete
                                </Button>
                                : ""
                        }

                    </form>
                </Grid>
            </Paper>
        </Grid >
    )

    return {
        MyForm, MyTextField, MySelectField, MyTextFieldNumber, MySelectFieldUsingTextField
        // MyForm, MyTextField, MyTextFieldNumber, MySelectFieldUsingTextField

    }
};

export default FormProvider;