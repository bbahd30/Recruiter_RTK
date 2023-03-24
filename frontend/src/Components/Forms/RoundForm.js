import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { Grid, Paper, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';

import { addRound, editRound, showRounds, deleteRound } from '../../Slices/roundSlice';
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

const RoundForm = () =>
{
    const seasonId = useParams()['id']
    const formState = useSelector((state) => state.form)
    const roundState = useSelector((state) => state.round)

    const type = formState.mode
    const dispatch = useDispatch()

    const [roundName, setRoundName] = useState('')
    const [roundType, setRoundType] = useState('')

    const toBeEditRoundData = findObjectById(roundState['rounds'], formState.formId)

    const deleteRoundHandler = (id) =>
    {
        dispatch(setDeleteMode(id))
        dispatch(deleteRound(id));
        dispatch(setOpen(false));
    }
    useEffect(() =>
    {
        if (type === 'edit')
        {
            setRoundName(toBeEditRoundData['round_name'])
            setRoundType(toBeEditRoundData['round_type'])
        }
    }, [toBeEditRoundData])

    const nameChangeHandler = (e) => setRoundName(e.target.value)
    const roundTypeChangeHandler = (e) => setRoundType(e.target.value)

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        if (type === 'add')
        {
            dispatch(
                addRound({
                    round_name: roundName,
                    round_type: roundType,
                    season_id: seasonId
                })
            )
            dispatch(setOpen(false))
        } else
        {
            dispatch(
                editRound({
                    roundId: formState.formId,
                    round_name: roundName,
                    round_type: roundType
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
                        >Round successfully added</Button>
                    )
                    :
                    <div></div>} */}
                <TextField
                    id="outlined-basic"
                    label="Round Name"
                    placeholder='Enter Round Name'
                    variant="outlined"
                    fullWidth
                    onChange={nameChangeHandler}
                    name="round_name"
                    value={roundName}
                    sx={{ marginBottom: '20px' }}
                // error={Boolean(formErrors.round_name)}
                // helperText={formErrors.round_name}
                />
                <TextField
                    id="outlined-basic"
                    label="Round Type"
                    select
                    variant="outlined"
                    fullWidth
                    onChange={roundTypeChangeHandler}
                    name="round_type"
                    value={roundType || ""}
                    sx={{ marginBottom: '20px' }}
                // error={Boolean(formErrors.round_type)}
                // helperText={formErrors.round_type}
                >
                    <MenuItem value='int'>
                        Interview
                    </MenuItem>
                    <MenuItem value='t'>
                        Test
                    </MenuItem>
                </TextField>
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
                                deleteRoundHandler(formState.formId)
                            }}
                            transition="all .2s"
                        >
                            Delete
                        </Button>
                        : ""
                }
            </Paper>
        </Grid >

    )
};

export default RoundForm;
