import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const FormProvider = () =>
{
    const [question, setQuestion] = useState([]);
    const [section, setSection] = useState([]);

    const addSection = () =>
    {

    }

    // useEffect(() =>
    // {
    //     axios.get()
    // }, []);
    return (
        <div className='testScreen'>
            <Box>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Title"
                        fullWidth
                        placeholder="Title for Test"
                    />
                </div>
                <div className='prevSavedData'>
                    {/* todo: Bring the prev saved data of the test from the backend depending on the form number of the year */}

                </div>
                <div className='parentBtn'>
                    <Button
                        variant='contained'
                        className='btn'
                        sx={{ marginTop: '20px' }}
                        onClick={addSection}
                    >
                        Add a Section
                    </Button>
                </div>
            </Box >
        </div >
    );
};

export default FormProvider;