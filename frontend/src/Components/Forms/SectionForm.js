import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { Grid, Paper, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';

import { addSection, editSection, showSections, deleteSection } from '../../Slices/sectionSlice';
import { setOpen } from '../../Slices/dialogBoxSlice';
import { setDeleteMode } from '../../Slices/formSlice';

const paperStyle =
{
    padding: '10px 20px',
    width: '25vw'
}

const findObjectById = (array, id) =>
{
    for (let i = 0; i < array.length; i++)
    {
        if (array[i].id === id)
        {
            return array[i];
        }
    }
    return null;
}

const SectionForm = () =>
{
    const seasonId = useParams()['id']
    const roundId = useParams()['roundId']
    const formState = useSelector((state) => state.form)
    const sectionState = useSelector((state) => state.section)

    const type = formState.mode
    const dispatch = useDispatch()

    const [sectionName, setSectionName] = useState('')
    const [weightage, setWeightage] = useState('')

    const toBeEditsectionData = findObjectById(sectionState['sections'], formState.formId)

    const deleteSectionHandler = (id) =>
    {
        dispatch(setDeleteMode(id))
        dispatch(deleteSection({ id, roundId }));
        dispatch(setOpen(false));
    }
    useEffect(() =>
    {
        if (type === 'edit')
        {
            setSectionName(toBeEditsectionData['section_name'])
            setWeightage(toBeEditsectionData['weightage'])
        }
    }, [toBeEditsectionData])

    const nameChangeHandler = (e) => setSectionName(e.target.value)
    const sectionTypeChangeHandler = (e) => setWeightage(e.target.value)

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (type === 'add')
        {
            dispatch(
                addSection({
                    section_name: sectionName,
                    weightage: weightage,
                    round_id: roundId
                })
            )
            dispatch(setOpen(false))
        } else
        {
            dispatch(
                editSection({
                    sectionId: formState.formId,
                    section_name: sectionName,
                    weightage: weightage,
                    round_id: roundId
                })
            )
            dispatch(setOpen(false))
        }
    }

    return (
        <Grid textAlign={'center'}>
            <Paper elevation={0} style={paperStyle}>

                {/* {added ?
            (
                <Button variant="text" type='submitClicked' sx={{ marginBottom: "30px" }} transition="all .2s"
                >
                    Section successfully added
                </Button>
            )
            :
            <div></div>} */}

                <Grid>
                    <form onSubmit={handleSubmit} alignitem={'center'}>
                        <TextField
                            id="outlined-basic"
                            label="Section Name"
                            placeholder='Enter Section Name'
                            variant="outlined"
                            fullWidth
                            onChange={nameChangeHandler}
                            name="section_name"
                            value={sectionName}
                            sx={{ marginBottom: '20px' }}
                        // error={Boolean(formErrors.section_name)}
                        // helperText={formErrors.section_name}
                        />
                        <TextField
                            id="outlined-basic"
                            type="number"
                            label="Section Weightage"
                            placeholder='Enter Section Weightage'
                            variant="outlined"
                            fullWidth
                            onChange={(e) => { setWeightage(e.target.value) }}
                            name="weightage"
                            value={weightage}
                            sx={{ marginBottom: '20px' }}
                        // error={Boolean(formErrors.weightage)}
                        // helperText={formErrors.weightage}
                        />
                        <Button
                            onClick={handleSubmit}
                            variant="contained" sx={{ marginRight: '20px' }}>
                            {type === 'edit' ? "Edit" : "Add"}
                        </Button>
                        {
                            type === 'edit' ?
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                    {
                                        deleteSectionHandler(formState.formId)
                                    }}
                                    transition="all .2s"
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
};

export default SectionForm;
