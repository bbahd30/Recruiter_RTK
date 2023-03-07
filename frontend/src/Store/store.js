import { configureStore } from '@reduxjs/toolkit'

import seasonReducer from "../Slices/seasonSlice";
import dialogBoxReducer from '../Slices/dialogBoxSlice';
import csvReducer from '../Slices/csvSlice';

const store = configureStore({
    reducer: {
        season: seasonReducer,
        dialogBox: dialogBoxReducer,
        csv: csvReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store