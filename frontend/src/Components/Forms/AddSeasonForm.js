import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import FormProvider from '../UtilityComponents/FormProvider';

const AddSeason = (props) =>
{
    const initial =
    {
        year: "",
        season_name: "",
        description: ""
    };
    const season_id = props.season_id;
    const model = 'seasons';

    const { MyForm, MyTextField, MySelectField, MyTextFieldNumber, MySelectFieldUsingTextField } = FormProvider(initial, model, season_id, props.type);
    return (

        <>
            {console.log(MyForm, 'hii', initial)}
            <MyForm>
                <MyTextField field="year" />
                <MyTextField field="season_name" />
                <MyTextField field="description" />
            </MyForm>
        </>
    );
};

export default AddSeason;
