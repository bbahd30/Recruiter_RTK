import React, { useEffect, useState } from 'react';
import { Grid, Paper, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useSelector, useDispatch } from 'react-redux'
import { addSeason, closeaddSeasonDialog } from '../../Slices/seasonSlice';

const paperStyle =
{
    padding: '10px 20px',
    width: '25vw'
}

const AddSeason = () =>
{
    const dispatch = useDispatch()

    const [seasonYear, setSeasonYear] = useState()
    const [seasonName, setSeasonName] = useState('')
    const [seasonDesc, setSeasonDesc] = useState('')

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

    const addNewSeason = (e) =>
    {
        e.preventDefault();
        dispatch(
            addSeason
                ({
                    year: seasonYear,
                    season_name: seasonName,
                    description: seasonDesc
                })
        )
    }
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
                    <form onSubmit={addNewSeason} alignitem={'center'}>

                        {/* {props.children} */}
                        <Button variant="contained" onClick={addNewSeason} sx={{ marginRight: '20px' }}>
                            {/* {type === 'edit' ? "Edit" : "Add"} */}
                            Add
                        </Button>
                        {
                            // type === 'edit' ?
                            // <Button variant="contained" type='submitClick' onClick={editSeason} transition="all .2s"
                            // >
                            //     Delete
                            // </Button>
                            // : ""
                        }

                    </form>
                </Grid>
            </Paper>
        </Grid >

    )
};

export default AddSeason;
