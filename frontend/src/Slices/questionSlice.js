import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { questions_api, rounds_api, sections_api } from "../Links";
import { showSections, showSectionsWiseQuestions } from "./sectionSlice";

export const getQuestionsData = createAsyncThunk('question/getQuestionsData', (id) =>
{
    return axios
        .get(
            `${questions_api}${id}`,
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

export const addQuestion = createAsyncThunk('question/addQuestion', (questionData, { dispatch }) =>
{
    return axios.post
        (
            `${questions_api}`,
            {
                question_text: questionData['question_text'],
                ans: questionData['ans'],
                total_marks: questionData['total_marks'],
                section_id: questionData['section_id'],
                assignee_id: questionData['assigneeId'],
            },
            {
                withCredentials: true
            }
        )
        .then((response) =>
        {
            dispatch(showSectionsWiseQuestions(questionData['section_id']))
            // dispatch(showSections(questionData['round_id']))
            return response.data;
        })
        .catch((error) =>
        {
            console.log(error)
            return alert("Cannot create new question! \n" + error.message)
        })
})

export const editQuestion = createAsyncThunk('question/editQuestion', (questionData, { dispatch }) =>
{
    return axios
        .patch(
            `${questions_api}${questionData['questionId']}/`,
            {
                question_text: questionData['question_text'],
                ans: questionData['ans'],
                total_marks: questionData['total_marks'],
                section_id: questionData['section_id'],
                assigneeId: questionData['assigneeId'],
            },
            {
                withCredentials: true
            })
        .then((response) =>
        {
            dispatch(showQuestions(questionData['question_id']))
            return response.data
        })
        .catch((error) =>
            alert(error))
})

export const deleteQuestion = createAsyncThunk('question/deleteQuestion', (data, { dispatch }) =>
{
    const { id, sectionId } = data
    const url = `${questions_api}${id}`
    return axios
        .delete((url),
            {
                withCredentials: true
            })
        .then((response) =>
        {
            dispatch(showQuestions(sectionId))
            if (response.status === 204)
                return response.data
            alert("Deleted Successfully")
        })
        .catch((error) => 
        {
            console.log(error)
        })
});

export const showQuestions = createAsyncThunk('question/showQuestions', () =>
{
    return axios
        .get(
            `${questions_api}`,
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

const questionSlice = createSlice({
    name: 'questionSlice',
    initialState: {
        loading: false,
        question_id: 0,
        total_marks: 0,
        question_text: '',
        ans: '',
        assigneeId: [],
        questions: [],
        error: '',
    },
    reducers: {

    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(showQuestions.pending, (state) =>
            {
                state.loading = true;
            })
            .addCase(showQuestions.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.questions = action.payload.data
            })
            .addCase(showQuestions.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getQuestionsData.pending, (state) =>
            {
                state.loading = true;
            })
            .addCase(getQuestionsData.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.question_text = action.payload['data']['question_text'];
                state.question_id = action.payload['data']['id']
                state.weightage = action.payload['data']['weightage']
                state.ans = action.payload['data']['ans']
                state.assigneeId = action.payload['data']['assignee_id']
                state.total_marks = action.payload['data']['total_marks']

            })
            .addCase(getQuestionsData.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(addQuestion.pending, (state) =>
            {
                state.loading = true
            })
            .addCase(addQuestion.fulfilled, (state) =>
            {
                state.loading = false
                state.error = ''
                state.question_text = '';
                state.question_id = 0
                state.weightage = ''
            })
            .addCase(addQuestion.rejected, (state, action) =>
            {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(editQuestion.pending, (state) =>
            {
                state.loading = true
            })
            .addCase(editQuestion.fulfilled, (state, action) =>
            {
                state.loading = false
                state.error = ''
            })
            .addCase(editQuestion.rejected, (state, action) =>
            {
                state.loading = false
                state.error = action.error.message
            })
    }

})

export default questionSlice.reducer
export const { } = questionSlice.actions
