import { createSlice } from '@reduxjs/toolkit';

const dialogBoxSlice = createSlice({
    name: 'dialogBox',
    initialState: {
        open: false,
        title: '',
        dataChild: null,
    },
    reducers: {
        setOpen: (state, action) =>
        {
            state.open = action.payload;
        },
        setTitle: (state, action) =>
        {
            state.title = action.payload;
        },
        setDataChild: (state, action) =>
        {
            state.dataChild = action.payload;
        },
    },
});

export default dialogBoxSlice.reducer;
export const { setOpen, setTitle, setDataChild, } = dialogBoxSlice.actions;