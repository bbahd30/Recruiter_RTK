import { configureStore } from '@reduxjs/toolkit'

import seasonReducer from "../Slices/seasonSlice";
import dialogBoxReducer from '../Slices/dialogBoxSlice';
import csvReducer from '../Slices/csvSlice';
import applicantReducer from '../Slices/applicantSlice';
import formReducer from '../Slices/formSlice';
import roundReducer from '../Slices/roundSlice';
import sectionReducer from '../Slices/sectionSlice';
import memberReducer from '../Slices/memberSlice';
import trackerReducer from '../Slices/trackerSlice';

const store = configureStore({
    reducer: {
        season: seasonReducer,
        dialogBox: dialogBoxReducer,
        csv: csvReducer,
        applicant: applicantReducer,
        form: formReducer,
        round: roundReducer,
        section: sectionReducer,
        member: memberReducer,
        tracker: trackerReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default store