import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { seasons_api } from '../Links'

export const getSeasonData = createAsyncThunk('season/getSeasonData', (id) =>
{
    return axios
        .get(
            `${seasons_api}${id}`,
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

export const showSeasons = createAsyncThunk('season/showSeasons', () =>
{
    return axios
        .get(
            `${seasons_api}`,
            {
                withCredentials: true
            }
        )
        .then((response) =>
        {
            const payload = {
                // type: season_type,
                // type: season_name,
                data: response.data
            }
            console.log(payload)
            return payload
        })
})

export const addSeason = createAsyncThunk('season/addSeason', (seasonData, { dispatch }) =>
{
    return axios.post
        (
            `${seasons_api}`,
            {
                // todo:image
                year: seasonData['year'],
                season_name: seasonData['season_name'],
                description: seasonData['description']
            },
            {
                withCredentials: true
            }
        )
        .then((response) =>
        {
            dispatch(showSeasons())
            return response.data;
        })
        .catch((error) =>
        {
            console.log(error)
            return alert("Cannot create new season! \n" + error.message)
        })
})

export const editSeason = createAsyncThunk('season/editSeason', (seasonData, { dispatch }) =>
{
    return axios
        .patch(
            `${seasons_api}${seasonData['seasonId']}/`,
            {
                year: seasonData['year'],
                season_name: seasonData['season_name'],
                description: seasonData['description']
            },
            {
                withCredentials: true
            })
        .then((response) =>
        {
            dispatch(showSeasons())
            return response.data
        })
        .catch((error) =>
            alert(error))
})

export const deleteSeason = createAsyncThunk('season/deleteSeason', (id, { dispatch }) =>
{
    const url = `${seasons_api}${id}`
    return axios
        .delete((url),
            {
                withCredentials: true
            })
        .then((response) =>
        {
            dispatch(showSeasons())
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
const seasonSlice = createSlice
    ({
        name: 'season',
        initialState: {
            loading: false,
            seasons: [],
            error: '',
            id: 1,
            year: "",
            season_name: "",
            description: ""
        },
        reducers:
        {
            openEditSeasonConfirmationDialog: (state, action) =>
            {
                state.openConfirmationDialog = action.payload['open']
                state.endSeasonId = action.payload['seasonId']
            },
            dummyAddSeason: (state, action) =>
            {
                state.seasons.push(action.payload)
            }
        },
        extraReducers: (builder) =>
        {
            builder
                .addCase(showSeasons.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(showSeasons.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.season_type = action.payload['type']
                    state.seasons = action.payload['data']
                    state.error = ''
                })
                .addCase(showSeasons.rejected, (state, action) =>
                {
                    state.loading = false
                    state.seasons = []
                    state.error = action.error.message
                })
                .addCase(addSeason.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(addSeason.fulfilled, (state) =>
                {
                    state.loading = false
                    state.error = ''
                    state.year = 0
                    state.type = ''
                    state.season_name = ''
                    state.description = ''
                })
                .addCase(addSeason.rejected, (state, action) =>
                {
                    state.loading = false
                    state.error = action.error.message
                })
                .addCase(editSeason.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(editSeason.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.error = ''
                    for (let i = 0; i < state.seasons.length; i++)
                    {
                        if (state.seasons[i]['id'] === action.payload['id'])
                        {
                            state.seasons[i]['year'] = action.payload['year']
                            state.seasons[i]['season_name'] = action.payload['season_name']
                            state.seasons[i]['description'] = action.payload['description']

                            i = state.seasons.length
                        }
                    }
                    state.openConfirmationDialog = false
                })
                .addCase(editSeason.rejected, (state, action) =>
                {
                    state.loading = false
                    state.error = action.error.message
                    state.openConfirmationDialog = false
                    console.log("End season patch unsuccessful!")
                })
                .addCase(getSeasonData.pending, (state) =>
                {
                    state.loading = true;
                })
                .addCase(getSeasonData.fulfilled, (state, action) =>
                {
                    state.loading = false;
                    state.season_name = action.payload['data']['season_name'];
                    state.description = action.payload['data']['description'];
                    state.year = action.payload['year']
                })
                .addCase(getSeasonData.rejected, (state, action) =>
                {
                    state.loading = false;
                    state.error = action.error;
                })
        }
    })

export default seasonSlice.reducer
export const { openEditSeasonConfirmationDialog, navigateToSeason, dummyAddSeason } = seasonSlice.actions