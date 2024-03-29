import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { rounds_api, sections_api } from '../Links'

export const getSectionData = createAsyncThunk('section/getSectionData', (id) =>
{
    return axios
        .get(
            `${sections_api}${id}`,
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

export const showSections = createAsyncThunk('section/showSections', (roundId) =>
{
    return axios
        .get(
            `${rounds_api}${roundId}/sections`,
            {
                withCredentials: true
            }
        )
        .then((response) =>
        {
            const payload = {
                data: response.data,
                round_id: roundId
            }
            console.log(payload)
            return payload
        })
})

export const showSectionsWiseQuestions = createAsyncThunk('section/showSectionsWiseQuestions', (sectionId) =>
{
    return axios
        .get(
            `${sections_api}${sectionId}/questions`,
            {
                withCredentials: true
            }
        )
        .then((response) =>
        {
            const payload = {
                data: response.data
            }
            console.log(payload['data'])
            return payload
        })
})

export const getSectionMarks = createAsyncThunk('section/getSectionMarks', () =>
{
    return axios
        .get(
            `${sections_api}`,
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

export const addSection = createAsyncThunk('section/addSection', (sectionData, { dispatch }) =>
{
    return axios.post
        (
            `${sections_api}`,
            {
                weightage: sectionData['weightage'],
                section_name: sectionData['section_name'],
                round_id: sectionData['round_id']
            },
            {
                withCredentials: true
            }
        )
        .then((response) =>
        {
            dispatch(showSections(sectionData['round_id']))
            return response.data;
        })
        .catch((error) =>
        {
            console.log(error)
            return alert("Cannot create new section! \n" + error.message)
        })
})

export const editSection = createAsyncThunk('section/editSection', (sectionData, { dispatch }) =>
{
    return axios
        .patch(
            `${sections_api}${sectionData['sectionId']}/`,
            {
                weightage: sectionData['weightage'],
                section_name: sectionData['section_name'],
            },
            {
                withCredentials: true
            })
        .then((response) =>
        {
            dispatch(showSections(sectionData['round_id']))
            return response.data
        })
        .catch((error) =>
            alert(error))
})

export const deleteSection = createAsyncThunk('section/deleteSection', (data, { dispatch }) =>
{
    const url = `${sections_api}${data.id}`
    return axios
        .delete((url),
            {
                withCredentials: true
            })
        .then((response) =>
        {
            dispatch(showSections(data.roundId))
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
const sectionSlice = createSlice
    ({
        name: 'section',
        initialState: {
            loading: false,
            sections: [],
            error: '',
            id: 1,
            section_name: "",
            weightage: "",
            round_id: 1,
            questions: {},
            section_marks: {},
            section_list: {},
        },
        reducers:
        {
        },
        extraReducers: (builder) =>
        {
            builder
                .addCase(showSections.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(showSections.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.sections = action.payload['data']
                    state.error = ''
                })
                .addCase(showSections.rejected, (state, action) =>
                {
                    state.loading = false
                    state.sections = []
                    state.error = action.error.message
                })
                .addCase(addSection.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(addSection.fulfilled, (state) =>
                {
                    state.loading = false
                    state.error = ''
                    state.year = 0
                    state.type = ''
                    state.section_name = ''
                    state.description = ''
                })
                .addCase(addSection.rejected, (state, action) =>
                {
                    state.loading = false
                    state.error = action.error.message
                })
                .addCase(editSection.pending, (state) =>
                {
                    state.loading = true
                })
                .addCase(editSection.fulfilled, (state, action) =>
                {
                    state.loading = false
                    state.error = ''
                })
                .addCase(editSection.rejected, (state, action) =>
                {
                    state.loading = false
                    state.error = action.error.message
                })
                .addCase(getSectionData.pending, (state) =>
                {
                    state.loading = true;
                })
                .addCase(getSectionData.fulfilled, (state, action) =>
                {
                    state.loading = false;
                    state.section_name = action.payload['data']['section_name'];
                    state.weightage = action.payload['data']['weightage'];
                    state.round_id = action.payload['data']['round_id'];
                })
                .addCase(getSectionData.rejected, (state, action) =>
                {
                    state.loading = false;
                    state.error = action.error;
                })
                .addCase(showSectionsWiseQuestions.pending, (state) =>
                {
                    state.loading = true;
                })
                .addCase(showSectionsWiseQuestions.fulfilled, (state, action) =>
                {
                    state.loading = false;
                    const data = action.payload['data']

                    let questionOfSection = []
                    let sectionId = 0
                    data.forEach((question) =>
                    {
                        sectionId = question['section_id']
                        let questionData = {}
                        questionData['id'] = question['id']
                        questionData['question_text'] = question['question_text']
                        questionData['total_marks'] = question['total_marks']
                        questionData['assignee_id'] = question['assignee_id']
                        questionData['ans'] = question['ans']

                        questionOfSection.push(questionData)
                    })
                    state.questions[sectionId] = questionOfSection
                })
                .addCase(showSectionsWiseQuestions.rejected, (state, action) =>
                {
                    state.loading = false;
                    state.error = action.error;
                })
                .addCase(getSectionMarks.pending, (state) =>
                {
                    state.loading = true;
                })
                .addCase(getSectionMarks.fulfilled, (state, action) =>
                {
                    state.loading = false;
                    state.section_marks = action.payload['data']['section_total_scores_list']
                    state.section_list = action.payload['data']['section_list']
                    // state.sections = action.payload['data']//todo:
                })
                .addCase(getSectionMarks.rejected, (state, action) =>
                {
                    state.loading = false;
                    state.error = action.error;
                })
        }
    })

export default sectionSlice.reducer
export const { openEditSectionConfirmationDialog, navigateToSection, dummyAddSection } = sectionSlice.actions