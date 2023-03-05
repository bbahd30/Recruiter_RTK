import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { csv_upload_api } from '../Links'

export const uploadCSV = createAsyncThunk('csv/uploadCSV', (csvFile) =>
{
    let formdata = new FormData();
    formdata.append('csv_file', csvFile['file']);
    formdata.append('season_id', csvFile['season_id'])

    return axios
        .post(csv_upload_api,
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
})

const csvSlice = createSlice
    ({
        name: 'csvSlice',
        initialState: {
            loading: false,
            error: '',
            csvUploaded: false,
            csvFetched: false,
        },
        reducers: {
            fetchCSV: (state) =>
            {
                state.csvFetched = true
            },
        },
        extraReducers: (builder) =>
        {
            builder
                .addCase(uploadCSV.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(uploadCSV.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.error = ''
                    state.csvUploaded = true
                })
                .addCase(uploadCSV.rejected, (state, action) =>
                {
                    state.loading = false
                    state.error = action.error.message
                    state.csvUploaded = false
                    alert("CSV upload unsuccessful!")
                })

        }
    });

export default csvSlice.reducer
export const { } = csvSlice.actions