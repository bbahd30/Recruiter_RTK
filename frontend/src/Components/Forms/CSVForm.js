import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { uploadCSV } from '../../Slices/csvSlice.js';

const CSVForm = (props) =>
{
    const dispatch = useDispatch();
    const seasonState = useSelector((state) => state.season);

    const uploadBtn =
    {
        position: 'absolute',
        top: '80px',
        left: '100px',
        cursor: 'pointer',
        // zIndex: '1'
    }

    const handleSubmit = (e) =>
    {
        console.log(e.target.files)
        dispatch(uploadCSV(
            {
                'file': e.target.files[0],
                'season_id': seasonState.id
            }
        ))
    }
    return (
        <Box>
            <div>
                <input
                    // style={{ opacity: '0', margin: '20px', cursor: 'pointer' }}
                    type="file"
                    onChange={handleSubmit}
                />
                {/* <span style={uploadBtn}>
                    Choose Image
                </span> */}
            </div>
            {/* <Button
                // onClick={handleSubmit}
                variant="contained"
            >
                Upload
            </Button> */}
        </Box>

    );
};

export default CSVForm;