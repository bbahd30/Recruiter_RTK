import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice(
    {
        name: 'formSlice',
        initialState: {
            open: false,
            mode: 'Add',
            form: '',
            formId: 0,
        },
        reducers: {
            setAddMode: (state) =>
            {
                state.open = true;
                state.mode = 'add';
                state.formId = '';
            },
            setEditMode: (state, action) =>
            {
                state.open = true;
                state.mode = 'edit';
                state.formId = action.payload;
            },
            setForm: (state, action) =>
            {
                state.open = true;
                state.form = action.payload;
            },
            setDeleteMode: (state, action) =>
            {
                state.open = true;
                state.mode = 'delete';
                state.formId = action.payload;
            }
        }
    }
)

export default formSlice.reducer
export const { setEditMode, setForm, setAddMode, setDeleteMode } = formSlice.actions