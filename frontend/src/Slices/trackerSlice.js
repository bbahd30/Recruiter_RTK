import { createSlice } from '@reduxjs/toolkit'

const trackerSlice = createSlice({
    name: 'tracker',
    initialState: {
        membersDispatched: false,
        isLoading: false,
    },
    reducers: {
        setMembersDispatched: (state) =>
        {
            state.membersDispatched = true
        },
        setLoading: (state, action) =>
        {
            state.isLoading = action.payload;
        },
    }
})

export default trackerSlice.reducer
export const { setMembersDispatched, setLoading } = trackerSlice.actions