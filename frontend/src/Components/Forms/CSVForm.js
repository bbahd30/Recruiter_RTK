import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

const CSVForm = (props) =>
{
    const uploadBtn =
    {
        position: 'absolute',
        top: '80px',
        left: '100px',
        cursor: 'pointer',
        // zIndex: '1'
    }

    const [file, setFile] = useState([]);
    const handleChange = (e) =>
    {
        setFile(e.target.files[0]);
        console.log(file)
    };

    const handleSubmit = (e) =>
    {
        const url = `${Links.localhost}upload/`
        e.preventDefault();
        if (file)
        {
            let formdata = new FormData();
            formdata.append('csv_file', file);
            formdata.append('season_id', props.season_id)

            return axios
                .post(url,
                    formdata,
                    {
                        headers:
                        {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                .then((response) =>
                {
                    return response.data
                })
        }
    };

    return (
        <Box>
            <div>
                <input
                    style={{ opacity: '0', margin: '20px', cursor: 'pointer' }}
                    type="file"
                    onChange={handleChange}
                />
                <span style={uploadBtn}>
                    Choose Image
                </span>
            </div>
            <Button
                onClick={handleSubmit}
                variant="contained"
            >
                Upload
            </Button>
        </Box>

    );
};

export default CSVForm;