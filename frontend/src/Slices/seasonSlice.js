import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { seasons_api } from '../Links'

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
            return payload
        })
})

export const addSeason = createAsyncThunk('season/addSeason', (seasonData) =>
{
    return axios.post
        (
            `${seasons_api}`,
            {
                // name: seasonData['year'],
                // end: null,
                // description: seasonData['desc'],
                // type: seasonData['type'],
                // image: null
                year: seasonData['year'],
                season_name: seasonData['season_name'],
                description: seasonData['description']
            },
            {
                // headers: {
                //     "X-CSRFToken": Cookies.get('ferret_csrftoken'),
                // },
                withCredentials: true
            }
        )
        .then((response) =>
        {
            return response.data;
        })
        .catch((isError) =>
        {
            console.log(isError)
            return alert("Cannot create new season! \n" + isError.message)
        })
})

export const editSeason = createAsyncThunk('season/edotSeason', async (seasonData) =>
{
    const response = await axios
        .patch(
            `${seasons_api}${seasonData['seasonId']}/`,
            {
                name: seasonData['year'],
                season_name: seasonData['season_name'],
                description: seasonData['description']
            },
            {
                withCredentials: true
            })
    return response.data
})

//TODO:
const seasonSlice = createSlice
    ({
        name: 'season',
        initialState: {
            loading: false,
            // season_type : '',
            // open : false,
            // openConfirmationDialog: false,
            // endSeasonId: 0
            seasons: [],
            isError: '',
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
            navigateToSeason: (state, action) =>
            {
                state.id = action.payload;
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
                    state.isError = ''
                })
                .addCase(showSeasons.rejected, (state, action) =>
                {
                    state.loading = false
                    state.seasons = []
                    state.isError = action.isError.message
                })
                .addCase(addSeason.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(addSeason.fulfilled, (state) =>
                {
                    state.loading = false
                    state.isError = ''
                    state.year = 0
                    state.type = ''
                    state.season_name = ''
                    state.description = ''
                })
                .addCase(addSeason.rejected, (state, action) =>
                {
                    state.loading = false
                    state.isError = action.isError.message
                })
                .addCase(editSeason.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(editSeason.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.isError = ''
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
                    state.isError = action.isError.message
                    state.openConfirmationDialog = false
                    console.log("End season patch unsuccessful!")
                })
        }
    })

export default seasonSlice.reducer
export const { openEditSeasonConfirmationDialog, navigateToSeason } = seasonSlice.actions