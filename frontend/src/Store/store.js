import { configureStore } from '@reduxjs/toolkit'

import seasonReducer from "../Slices/seasonSlice";
import dialogBoxReducer from '../Slices/dialogBoxSlice';
import csvReducer from '../Slices/csvSlice';
import applicantReducer from '../Slices/applicantSlice';
import formReducer from '../Slices/formSlice';
import roundReducer from '../Slices/roundSlice';
import sectionReducer from '../Slices/sectionSlice';

const store = configureStore({
    reducer: {
        season: seasonReducer,
        dialogBox: dialogBoxReducer,
        csv: csvReducer,
        applicant: applicantReducer,
        form: formReducer,
        round: roundReducer,
        section: seasonReducer,

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store