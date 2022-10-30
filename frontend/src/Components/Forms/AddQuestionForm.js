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
            <MySelectField field='assignee_id' members_data={members} />
            <MyTextField field="ans" />

        </MyForm>
    )
};

export default AddQuestionForm;





// import React, { useEffect, useState } from 'react';
// import * as Links from '../../Links';
// import axios from 'axios';
// import { Grid, Paper, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import TextField from '@mui/material/TextField';

// const AddQuestionForm = (props) =>
// {
//     const paperStyle =
//     {
//         padding: '10px 20px',
//         width: '25vw'
//     }
//     const initial =
//     {
//         question_text: "",
//         ans: "",
//         totalMarks: "",
//         section_id: props.sectionID,
//         assignee_id: [] // multiple
//     };

//     const [formValues, setFormValues] = useState(initial);
//     const [formErrors, setFormErrors] = useState([]);
//     const [added, setAdded] = useState(false);
//     const [isSubmitClicked, setIsSubmitClicked] = useState(false);
//     const [members, setMembers] = useState([]);

//     const handleChange = (e) =>
//     {
//         const { name, value } = e.target;
//         console.log(value)
//         setFormValues({ ...formValues, [name]: value });
//     }

//     const handleSubmit = (e) =>
//     {
//         setIsSubmitClicked(true);
//         e.preventDefault();
//         setFormErrors(validate(formValues));
//     }

//     const validate = (values) =>
//     {
//         const errors = {};

//         if (!values.totalMarks)
//         {
//             errors.totalMarks = "Marks is a required field";
//         }
//         if (!values.question_text)
//         {
//             errors.question_text = "Question Text is required";
//         }

//         console.log(errors)
//         return errors;
//     }

//     const saveToData = (formValues) =>
//     {
//         const data =
//         {
//             assignee_id: formValues.assignee_id,
//             question_text: formValues.question_text,
//             total_marks: formValues.totalMarks,
//             section_id: formValues.section_id,
//             ans: formValues.ans,
//             assignee_id: formValues.assignee_id,

//         }
//         const url = Links.questions_api;
//         axios
//             .post
//             (
//                 url, data,
//                 // { headers: { 'Content-Type': 'application/json' } }
//             )
//             .then
//             ((response) =>
//             {
//                 if (response.status == 200 || response.status == 201)
//                 {
//                     setAdded(true);
//                 }
//             })
//             .catch((error) =>
//             {
//                 console.log(error);
//             });
//     }

//     useEffect(() =>
//     {
//         if (Object.keys(formErrors).length === 0 && isSubmitClicked)
//         {
//             saveToData(formValues);
//             setFormValues(initial);
//             setTimeout(() =>
//             {
//                 setAdded(false);
//             }, (4000));
//         }
//     }, [formErrors])

//     const membersApiFunc = () =>
//     {
//         const url = Links.members_api;
//         axios
//             .get
//             (
//                 url
//             )
//             .then
//             ((response) =>
//             {
//                 if (response.status === 200 || response.status === 201)
//                 {
//                     setMembers(response.data)
//                 }
//             })
//             .catch((error) =>
//             {
//                 console.log(error);
//             });
//     }
//     useEffect(() =>
//     {
//         console.log(props.model)

//         if (props.model === 'questions')
//         {
//             membersApiFunc();
//         }
//     }, []);

//     const form = () =>
//     {
//         return (
//             <Grid textAlign={'center'}>
//                 <Paper elevation={0} style={paperStyle}>

//                     {added ?
//                         (
//                             <Button variant="text" type='submitClicked' sx={{ marginBottom: "30px" }} transition="all .2s"
//                             >
//                                 Question successfully added
//                             </Button>
//                         )
//                         :
//                         <div></div>}

//                     <Grid>
//                         <form onSubmit={handleSubmit} alignitem={'center'}>
//                             <TextField
//                                 id="outlined-basic"
//                                 label="Question Text"
//                                 placeholder='Enter Question Text'
//                                 variant="outlined"
//                                 fullWidth
//                                 onChange={handleChange}
//                                 name="question_text"
//                                 value={formValues.question_text}
//                                 error={Boolean(formErrors.question_text)}
//                                 sx={{ marginBottom: '20px' }}
//                                 helperText={formErrors.question_text}
//                             />
//                             <TextField
//                                 id="outlined-basic"
//                                 type="number"
//                                 label="Total Marks"
//                                 placeholder='Enter Total Marks'
//                                 variant="outlined"
//                                 fullWidth
//                                 onChange={handleChange}
//                                 name="totalMarks"
//                                 value={formValues.totalMarks}
//                                 error={Boolean(formErrors.totalMarks)}
//                                 sx={{ marginBottom: '20px' }}
//                                 helperText={formErrors.totalMarks}
//                             />
//                             <FormControl
//                                 fullWidth>
//                                 <InputLabel id="assign_to">Assign to</InputLabel>
//                                 <Select
//                                     id="outlined-basic"
//                                     labelId="assign_to"
//                                     // variant="outlined"
//                                     label="Assign to"
//                                     fullWidth
//                                     multiple
//                                     onChange={handleChange}
//                                     name="assignee_id"
//                                     value={formValues.assignee_id}
//                                     error={Boolean(formErrors.assignee_id)}
//                                     sx={{ marginBottom: '20px' }}
//                                     helpertext={formErrors.assignee_id}
//                                 >
//                                     {
//                                         members.map(member =>
//                                         (
//                                             <MenuItem value={member.id} key={member.id}
//                                                 name={member.id}>
//                                                 {member.name}
//                                             </MenuItem>
//                                         ))
//                                     }
//                                 </Select>
//                             </FormControl>
//                             <TextField
//                                 id="outlined-basic"
//                                 label="Solution"
//                                 placeholder='Enter Solution'
//                                 variant="outlined"
//                                 fullWidth
//                                 onChange={handleChange}
//                                 name="ans"
//                                 value={formValues.ans}
//                                 error={Boolean(formErrors.ans)}
//                                 sx={{ marginBottom: '20px' }}
//                                 helperText={formErrors.ans}
//                             />
//                             <Button variant="contained" type='submitClicked' onClick={handleSubmit} sx={{ marginTop: '30px' }}>Add</Button>

//                         </form>
//                     </Grid>
//                 </Paper>
//             </Grid >
//         )
//     }
//     // working
//     // return (
//     //     form()
//     // );
//     return (
//         form()
//     )
// };

// export default AddQuestionForm;