import React, { useEffect, useState, useCallback } from 'react';
import { Grid, Paper, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useSelector, useDispatch } from 'react-redux'
import { addSeason, closeaddSeasonDialog, getSeasonData, editSeason, showSeasons, deleteSeason } from '../../Slices/seasonSlice';
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

const SeasonForm = () =>
{
    const formState = useSelector((state) => state.form)
    const seasonState = useSelector((state) => state.season)

    const type = formState.mode
    const dispatch = useDispatch()
    const [seasonYear, setSeasonYear] = useState()
    const [seasonName, setSeasonName] = useState('')
    const [seasonDesc, setSeasonDesc] = useState('')

    const toBeEditSeasonData = findObjectById(seasonState['seasons'], formState.formId)

    const deleteSeasonHandler = (id) =>
    {
        dispatch(setDeleteMode(id))
        dispatch(deleteSeason(id));
        dispatch(setOpen(false));
    }
    useEffect(() =>
    {
        if (type === 'edit')
        {
            setSeasonDesc(toBeEditSeasonData['description'])
            setSeasonName(toBeEditSeasonData['season_name'])
            setSeasonYear(toBeEditSeasonData['year'])
        }
    }, [toBeEditSeasonData])

    const yearChangeHandler = (e) =>
    {
        setSeasonYear(e.target.value)
    }

    const nameChangeHandler = (e) =>
    {
        setSeasonName(e.target.value)
    }

    const descChangeHandler = (e) =>
    {
        setSeasonDesc(e.target.value)
    }

    const handleSubmit = useCallback((e) =>
    {
        e.preventDefault();
        if (type === 'add')
        {
            dispatch(
                addSeason({
                    year: seasonYear,
                    season_name: seasonName,
                    description: seasonDesc
                })
            )
            dispatch(setOpen(false))
        } else
        {
            dispatch(
                editSeason({
                    seasonId: formState.formId,
                    year: seasonYear,
                    season_name: seasonName,
                    description: seasonDesc
                })
            )
            dispatch(setOpen(false))
        }
    }, [dispatch, seasonYear, seasonName, seasonDesc, type])

    return (
        <Grid textAlign={'center'}>
            <Paper elevation={0} style={paperStyle}>
                {
                    // added ?
                    // (
                    //     <Button variant="text" sx={{ marginBottom: "30px" }} transition="all .2s"
                    //     >
                    //         {keyword[model]} successfully {deleteData ? "deleted" : type === 'edit' ? "edited" : "added"}
                    //     </Button>
                    // )
                    //     :
                    <div>
                        <TextField
                            id="outlined-basic"
                            label="Season Name"
                            placeholder='Enter Season Name'
                            // label={fields[props.field]}
                            // placeholder={placeholderStr}
                            variant="outlined"
                            fullWidth
                            required
                            onChange={nameChangeHandler}
                            value={seasonName}
                            // error={Boolean(formErrors[props.field])}
                            sx={{ marginBottom: '20px' }}
                        // helperText={formErrors[props.field]}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Season Year"
                            placeholder='Enter Season Year'
                            // label={fields[props.field]}
                            // placeholder={placeholderStr}
                            variant="outlined"
                            fullWidth
                            required
                            onChange={yearChangeHandler}
                            value={seasonYear || ''}
                            // error={Boolean(formErrors[props.field])}
                            sx={{ marginBottom: '20px' }}
                        // helperText={formErrors[props.field]}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Season Description"
                            placeholder='Enter Season Description'
                            // label={fields[props.field]}
                            // placeholder={placeholderStr}
                            variant="outlined"
                            fullWidth
                            required
                            onChange={descChangeHandler}
                            value={seasonDesc}
                            // error={Boolean(formErrors[props.field])}
                            sx={{ marginBottom: '20px' }}
                        // helperText={formErrors[props.field]}
                        />
                    </div>
                }
                <Grid>
                    <form alignitem={'center'}>

                        {/* {props.children} */}
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
                                        deleteSeasonHandler(formState.formId)
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

export default SeasonForm;
