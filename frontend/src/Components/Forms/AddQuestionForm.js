import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import FormProvider from '../UtilityComponents/FormProvider';

const AddQuestionForm = (props) =>
{

    const [questions, setQuestions] = useState([]);
    let initial = {};
    const question_id = props.question_id || "";
    initial =
    {
        question_text: "",
        ans: "",
        total_marks: "",
        section_id: props.sectionID,
        assignee_id: [] // multiple
    };
    useEffect(() =>
    {
        getMembers();
    }, []);

    useEffect(() =>
    {
        initial = questions;
    }, [questions]);

    const model = 'questions';

    const { MyForm, MyTextField, MySelectField, MyTextFieldNumber, MySelectFieldUsingTextField } = FormProvider(initial, model, question_id, props.type);

    // const { MyForm, MyTextField, MyTextFieldNumber, MySelectFieldUsingTextField } = FormProvider(initial, model, question_id, props.type);


    const [members, setMembers] = useState([]);

    const getMembers = () =>
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
    }

    return (
        <MyForm>
            <MyTextField field="question_text" />
            <MyTextFieldNumber field="total_marks" />
            <MySelectField field='assignee_id' data={members} status='closed' />
            <MyTextField field="ans" />

        </MyForm>
    )
};

export default AddQuestionForm;