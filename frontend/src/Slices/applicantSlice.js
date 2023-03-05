import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { seasons_api } from "../Links";

export const showApplicants = createAsyncThunk('applicant/showApplicants', (id) =>
{
    const applicantsApi = `${seasons_api}${id}/applicants/`;
    return axios
        .get
        (
            applicantsApi,
            {
                withCredentials: true,
            }
        )
        .then((response) =>
        {
            const payload = {
                data: response.data,
            };
            return payload;
        })
        .catch((error) =>
        {
            alert(error.message);
        })

})

const applicantSlice = createSlice(
    {
        name: 'applicantSlice',
        initialState: {
            loading: true,
            applicantList: [],
            error: ''
        },
        reducers: {

        },
        extraReducers: (builder) =>
        {
            builder
                .addCase(showApplicants.pending, (state) =>
                {
                    state.loading = true;
                })
                .addCase(showApplicants.fulfilled, (state, action) =>
                {
                    state.loading = false;
                    state.applicantList = action.payload['data'];
                })
            // .addCase(showApplicants.rejected, (state, action) =>
            // {
            //     state.error = action.payload['error']
            // })
        }
    }
)

export default applicantSlice.reducer
export const { } = applicantSlice.actions 