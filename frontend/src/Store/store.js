import { configureStore } from '@reduxjs/toolkit'

import seasonReducer from "../Slices/seasonSlice";
import dialogBoxReducer from '../Slices/dialogBoxSlice';
import csvReducer from '../Slices/csvSlice';
import applicantReducer from '../Slices/applicantSlice';
import formReducer from '../Slices/formSlice';
import roundReducer from '../Slices/roundSlice';

const store = configureStore({
    reducer: {
        season: seasonReducer,
        dialogBox: dialogBoxReducer,
        csv: csvReducer,
        applicant: applicantReducer,
        form: formReducer,
        round: roundReducer,

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store