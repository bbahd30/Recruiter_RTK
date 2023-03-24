import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { members_api } from '../Links'

export const getMemberData = createAsyncThunk('member/getMemberData', (id) =>
{
    return axios
        .get(
            `${members_api}${id}`,
            {
                withCredentials: true,
            }
        )
        .then((response) =>
        {
            const payload = {
                data: response.data,
            }
            return response;
        })
});

export const showMembers = createAsyncThunk('member/showMembers', () =>
{
    return axios
        .get(
            `${members_api}`,
            {
                withCredentials: true
            }
        )
        .then((response) =>
        {
            const payload = {
                data: response.data
            }
            return payload
        })
})

const memberSlice = createSlice
    ({
        name: 'member',
        initialState: {
            loading: false,
            members: [],
            error: '',
            id: 1,
            name: "",
            username: "",
            academic_year: 1,
        },
        reducers:
        {
        },
        extraReducers: (builder) =>
        {
            builder
                .addCase(showMembers.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(showMembers.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.members = action.payload['data']
                    state.error = ''
                })
                .addCase(showMembers.rejected, (state, action) =>
                {
                    state.loading = false
                    state.members = []
                    state.error = action.error.message
                })
                .addCase(getMemberData.pending, (state) =>
                {
                    state.loading = true;
                })
                .addCase(getMemberData.fulfilled, (state, action) =>
                {
                    state.loading = false;
                    state.member_name = action.payload['data']['member_name'];
                    state.username = action.payload['data']['username'];
                    state.academic_year = action.payload['data']['academic_year'];
                })
                .addCase(getMemberData.rejected, (state, action) =>
                {
                    state.loading = false;
                    state.error = action.error;
                })
        }
    })

export default memberSlice.reducer
export const { } = memberSlice.actions