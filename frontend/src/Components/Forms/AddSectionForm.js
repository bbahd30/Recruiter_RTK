import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import { Grid, Paper, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

const AddSectionForm = () =>
{
    const paperStyle =
    {
        padding: '10px 20px',
        width: '20vw'
    }
    const initial = { year: "", seasonName: "", description: "" };
    const [formValues, setFormValues] = useState(initial);
    const [formErrors, setFormErrors] = useState([]);
    const [added, setAdded] = useState(false);
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

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
        const yearRegex = /^[0-9]{4}$/;

        if (!values.year)
        {
            errors.year = "Season Year is required";
        }
        else if (!yearRegex.test(values.year))
        {
            errors.year = "Enter a valid year.";
        }
        if (!values.seasonName)
        {
            errors.seasonName = "Season name is required";
        }
        return errors;
    }

    const saveToData = (formValues) =>
    {
        const url = Links.seasons_api;
        axios
            .post
            (
                url,
                {
                    year: formValues.year,
                    season_name: formValues.seasonName,
                    description: formValues.description
                })
            .then
            ((response) =>
            {
                if (response.data['msg'] === "Season Added")
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
            setFormValues({ year: "", seasonName: "", description: "" });
            setTimeout(() =>
            {
                setAdded(false);
            }, (4000));
        }
    }, [formErrors])

    return (
        <Grid textAlign={'center'}>
            <Paper elevation={0} style={paperStyle}>

                {added ?
                    (
                        <Button variant="text" type='submitClicked' sx={{ marginBottom: "30px" }} transition="all .2s"
                        >Season successfully added</Button>
                    )
                    :
                    <div></div>}

                <Grid>
                    <form onSubmit={handleSubmit} alignitem={'center'}>
                        <TextField
                            id="outlined-basic"
                            label="Season Year"
                            placeholder='Enter Season Year'
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            name="year"
                            value={formValues.year}
                            error={Boolean(formErrors.year)}
                            sx={{ marginBottom: '20px' }}
                            helperText={formErrors.year}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Season Name"
                            placeholder='Enter Season Name'
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            name="seasonName"
                            value={formValues.seasonName}
                            error={Boolean(formErrors.seasonName)}
                            sx={{ marginBottom: '20px' }}
                            helperText={formErrors.seasonName}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Season Description"
                            placeholder='Enter Season Description'
                            variant="outlined"
                            fullWidth
                            onChange={handleChange}
                            name="description"
                            value={formValues.description}
                            error={Boolean(formErrors.description)}
                            sx={{ marginBottom: '20px' }}
                            helperText={formErrors.description}
                        />
                        <Button variant="contained" type='submitClicked' onClick={handleSubmit} sx={{ marginTop: '30px' }}>Add</Button>

                    </form>
                </Grid>
            </Paper>
        </Grid >
    );
};

export default AddSectionForm;