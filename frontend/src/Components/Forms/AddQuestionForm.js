import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import FormProvider from '../UtilityComponents/FormProvider';

const AddQuestionForm = (props) =>
{
    const initial =
    {
        question_text: "",
        ans: "",
        total_marks: "",
        section_id: props.sectionID,
        assignee_id: [] // multiple
    };

    const model = 'questions';

    const { MyForm, MyTextField, MySelectField } = FormProvider(initial, model);

    const [members, setMembers] = useState([]);
    useEffect(() =>
    {
        const url = Links.members_api;
        axios
            .get
            (
                url
            )
            .then
            ((response) =>
            {
                if (response.status === 200 || response.status === 201)
                {
                    setMembers(response.data)
                }
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }, []);

    return (
        <MyForm>
            <MyTextField field="question_text" />
            <MyTextField field="total_marks" />
            <MySelectField field='assignee_id' data={members} />
            <MyTextField field="ans" />

        </MyForm>
    )
};

export default AddQuestionForm;