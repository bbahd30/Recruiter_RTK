import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { interviewPanels_api } from '../Links'

export const getInterviewPanelData = createAsyncThunk('interviewPanel/getInterviewPanelData', (id) =>
{
    return axios
        .get(
            `${interviewPanels_api}${id}`,
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

export const showInterviewPanels = createAsyncThunk('interviewPanel/showInterviewPanels', () =>
{
    return axios
        .get(
            `${interviewPanels_api}`,
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

export const addInterviewPanel = createAsyncThunk('interviewPanel/addInterviewPanel', (interviewPanelData, { dispatch }) =>
{
    return axios.post
        (
            `${interviewPanels_api}`,
            {
                interviewPanel_type: interviewPanelData['interviewPanel_type'],
                interviewPanel_name: interviewPanelData['interviewPanel_name'],
                season_id: interviewPanelData['season_id']
            },
            {
                withCredentials: true
            }
        )
        .then((response) =>
        {
            dispatch(showInterviewPanels(interviewPanelData['season_id']))
            return response.data;
        })
        .catch((error) =>
        {
            console.log(error)
            return alert("Cannot create new interviewPanel! \n" + error.message)
        })
})

export const editInterviewPanel = createAsyncThunk('interviewPanel/editInterviewPanel', (interviewPanelData, { dispatch }) =>
{
    return axios
        .patch(
            `${interviewPanels_api}${interviewPanelData['interviewPanelId']}/`,
            {
                interviewPanel_type: interviewPanelData['interviewPanel_type'],
                interviewPanel_name: interviewPanelData['interviewPanel_name'],
            },
            {
                withCredentials: true
            })
        .then((response) =>
        {
            dispatch(showInterviewPanels(interviewPanelData['season_id']))
            return response.data
        })
        .catch((error) =>
            alert(error))
})

export const deleteInterviewPanel = createAsyncThunk('interviewPanel/deleteInterviewPanel', (id, { dispatch }) =>
{
    const url = `${interviewPanels_api}${id}`
    return axios
        .delete((url),
            {
                withCredentials: true
            })
        .then((response) =>
        {
            dispatch(showInterviewPanels(id))
            if (response.status === 204)
                return response.data
            // alert("Deleted Successfully")
        })
        .catch((error) => 
        {
            console.log(error)
        })
});

const interviewPanelSlice = createSlice
    ({
        name: 'interviewPanel',
        initialState: {
            loading: false,
            interviewPanels: [],
            error: '',
            id: 1,
            interviewPanel_name: "",
            interviewPanel_type: "",
            season_id: 1,
        },
        reducers:
        {
        },
        extraReducers: (builder) =>
        {
            builder
                .addCase(showInterviewPanels.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(showInterviewPanels.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.interviewPanels = action.payload['data']
                    state.error = ''
                })
                .addCase(showInterviewPanels.rejected, (state, action) =>
                {
                    state.loading = false
                    state.interviewPanels = []
                    state.error = action.error.message
                })
                .addCase(addInterviewPanel.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(addInterviewPanel.fulfilled, (state) =>
                {
                    state.loading = false
                    state.error = ''
                    state.year = 0
                    state.type = ''
                    state.interviewPanel_name = ''
                    state.description = ''
                })
                .addCase(addInterviewPanel.rejected, (state, action) =>
                {
                    state.loading = false
                    state.error = action.error.message
                })
                .addCase(editInterviewPanel.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(editInterviewPanel.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.error = ''
                })
                .addCase(editInterviewPanel.rejected, (state, action) =>
                {
                    state.loading = false
                    state.error = action.error.message
                })
                .addCase(getInterviewPanelData.pending, (state) =>
                {
                    state.loading = true;
                })
                .addCase(getInterviewPanelData.fulfilled, (state, action) =>
                {
                    state.loading = false;
                    state.interviewPanel_name = action.payload['data']['interviewPanel_name'];
                    state.interviewPanel_type = action.payload['data']['interviewPanel_type'];
                    state.season_id = action.payload['data']['season_id'];
                })
                .addCase(getInterviewPanelData.rejected, (state, action) =>
                {
                    state.loading = false;
                    state.error = action.error;
                })
        }
    })

export default interviewPanelSlice.reducer
export const { openEditInterviewPanelConfirmationDialog, navigateToInterviewPanel, dummyAddInterviewPanel } = interviewPanelSlice.actions