import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { rounds_api, seasons_api } from '../Links'

export const getRoundData = createAsyncThunk('round/getRoundData', (id) =>
{
    return axios
        .get(
            `${rounds_api}${id}`,
            {
                withCredentials: true,
            }
        )
        .then((response) =>
        {
            const payload = {
                data: response.data,
            }
            return payload;
        })
});

export const showRounds = createAsyncThunk('round/showRounds', (season_id) =>
{
    return axios
        .get(
            `${seasons_api}${season_id}/rounds`,
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

export const addRound = createAsyncThunk('round/addRound', (roundData, { dispatch }) =>
{
    return axios.post
        (
            `${rounds_api}`,
            {
                round_type: roundData['round_type'],
                round_name: roundData['round_name'],
                season_id: roundData['season_id']
            },
            {
                withCredentials: true
            }
        )
        .then((response) =>
        {
            dispatch(showRounds(roundData['season_id']))
            return response.data;
        })
        .catch((error) =>
        {
            console.log(error)
            return alert("Cannot create new round! \n" + error.message)
        })
})

export const editRound = createAsyncThunk('round/editRound', (roundData, { dispatch }) =>
{
    return axios
        .patch(
            `${rounds_api}${roundData['roundId']}/`,
            {
                round_type: roundData['round_type'],
                round_name: roundData['round_name'],
            },
            {
                withCredentials: true
            })
        .then((response) =>
        {
            dispatch(showRounds(roundData['season_id']))
            return response.data
        })
        .catch((error) =>
            alert(error))
})

export const deleteRound = createAsyncThunk('round/deleteRound', (id, { dispatch }) =>
{
    const url = `${rounds_api}${id}`
    return axios
        .delete((url),
            {
                withCredentials: true
            })
        .then((response) =>
        {
            dispatch(showRounds(id))
            if (response.status === 204)
                return response.data
            // alert("Deleted Successfully")
        })
        .catch((error) => 
        {
            console.log(error)
        })
});

//TODO:
const roundSlice = createSlice
    ({
        name: 'round',
        initialState: {
            loading: false,
            rounds: [],
            error: '',
            id: 1,
            round_name: "",
            round_type: "",
            season_id: 1,
        },
        reducers:
        {
        },
        extraReducers: (builder) =>
        {
            builder
                .addCase(showRounds.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(showRounds.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.rounds = action.payload['data']
                    state.error = ''
                })
                .addCase(showRounds.rejected, (state, action) =>
                {
                    state.loading = false
                    state.rounds = []
                    state.error = action.error.message
                })
                .addCase(addRound.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(addRound.fulfilled, (state) =>
                {
                    state.loading = false
                    state.error = ''
                    state.year = 0
                    state.type = ''
                    state.round_name = ''
                    state.description = ''
                })
                .addCase(addRound.rejected, (state, action) =>
                {
                    state.loading = false
                    state.error = action.error.message
                })
                .addCase(editRound.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(editRound.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.error = ''
                })
                .addCase(editRound.rejected, (state, action) =>
                {
                    state.loading = false
                    state.error = action.error.message
                })
                .addCase(getRoundData.pending, (state) =>
                {
                    state.loading = true;
                })
                .addCase(getRoundData.fulfilled, (state, action) =>
                {
                    state.loading = false;
                    state.round_name = action.payload['data']['round_name'];
                    state.round_type = action.payload['data']['round_type'];
                    state.season_id = action.payload['data']['season_id'];
                })
                .addCase(getRoundData.rejected, (state, action) =>
                {
                    state.loading = false;
                    state.error = action.error;
                })
        }
    })

export default roundSlice.reducer
export const { openEditRoundConfirmationDialog, navigateToRound, dummyAddRound } = roundSlice.actions