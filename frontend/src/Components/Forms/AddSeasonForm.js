import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import FormProvider from '../UtilityComponents/FormProvider';

const AddSeason = () =>
{
    const initial =
    {
        year: "",
        season_name: "",
        description: ""
    };

    const model = 'seasons';

    const { MyForm, MyTextField, MySelectField, MyTextFieldNumber, MySelectFieldUsingTextField } = FormProvider(initial, model);

    return (
        <MyForm>
            <MyTextField field="year" />
            <MyTextField field="season_name" />
            <MyTextField field="description" />
        </MyForm>
    );
};

export default AddSeason;
