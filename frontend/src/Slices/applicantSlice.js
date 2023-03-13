import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { seasons_api, status_section_marks } from "../Links";

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

export const getStatusAndSectionMarks = createAsyncThunk('applicant/getStatusAndSectionMarks', (data, { dispatch }) =>
{
    const applicantsApi = `${status_section_marks}${data['applicant_id']}/${data['season_id']}/`;
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
            console.log(payload)
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
            applicantDetails: {},
            openModal: false,
            roundStatus: {},
            questionList: [],
            statusSectionMarks: {},
            section_id: 0,
            error: '',
            id: 0,

        },
        reducers: {
            setOpenModal: (state, action) =>
            {
                console.log(action.payload)
                state.openModal = action.payload
            },
            setApplicantDetails: (state, action) =>
            {
                state.applicantDetails = action.payload['applicant']
            },
            setApplicantId: (state, action) =>
            {
                state.id = action.payload['id']
            }
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
                    state.loading = false
                    state.error = ''
                    state.applicantList = action.payload['data']
                })
                .addCase(showApplicants.rejected, (state, action) =>
                {
                    state.error = action.payload['error']
                })
                .addCase(getStatusAndSectionMarks.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(getStatusAndSectionMarks.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.error = ''
                    state.statusSectionMarks = action.payload['data']
                })
                .addCase(getStatusAndSectionMarks.rejected, (state, action) =>
                {
                    state.loading = false
                    state.error = action.error.message
                    state.statusSectionMarks = {}
                })
        }
    }
)

export default applicantSlice.reducer
export const { setOpenModal, setApplicantDetails, setApplicantId } = applicantSlice.actions 