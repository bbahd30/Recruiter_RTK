import React, { useEffect, useState } from 'react';
import * as Links from '../../Links';
import axios from 'axios';
import FormProvider from '../UtilityComponents/FormProvider';

const AddSectionForm = (props) =>
{
    const initial =
    {
        section_name: "",
        weightage: "",
        round_id: props.round_id.id
    };

    const section_id = props.section_id || "";
    const model = 'sections';

    const { MyForm, MyTextField, MySelectField, MyTextFieldNumber, MySelectFieldUsingTextField } = FormProvider(initial, model, section_id, props.type);

    const [rounds, setRounds] = useState([]);
    useEffect(() =>
    {
        const url = Links.rounds_api;
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
                    setRounds(response.data)
                }
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }, []);

    return (
        <MyForm>
            <MyTextField field="section_name" />
            <MyTextField field="weightage" />
        </MyForm>
    );
};

export default AddSectionForm;
// import React, { useEffect, useState } from 'react';
// import * as Links from '../../Links';
// import axios from 'axios';
// import { Grid, Paper, Button, MenuItem, Select, OutlinedInput, InputLabel, FormControl } from '@mui/material';
// import TextField from '@mui/material/TextField';

// const AddSectionForm = (props) =>
// {
//     const paperStyle =
//     {
//         padding: '10px 20px',
//         width: '30vw'
//     }
//     const initial = {
//         section_name: "",
//         weightage: "",
//         round_id: []
//     };

//     const [formValues, setFormValues] = useState(initial);
//     const [formErrors, setFormErrors] = useState([]);
//     const [added, setAdded] = useState(false);
//     const [isSubmitClicked, setIsSubmitClicked] = useState(false);

//     const handleChange = (e) =>
//     {
//         const { name, value } = e.target;
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

//         if (!values.section_name)
//         {
//             errors.section_name = "Section name is required.";
//         }
//         if (!values.round_id)
//         {
//             errors.round_id = "Round is required";
//         }
//         return errors;
//     }

//     const saveToData = (formValues) =>
//     {
//         const url = Links.sections_api;
//         axios
//             .post
//             (
//                 url,
//                 {
//                     section_name: formValues.section_name,
//                     weightage: formValues.weightage,
//                     round_id: formValues.round_id
//                 })
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

//     useEffect(() =>
//     {
//         const url = Links.rounds_api;
//         axios
//             .get
//             (
//                 url
//             )
//             .then
//             ((response) =>
//             {
//                 if (response.status == 200 || response.status == 201)
//                 {
//                     setMembers(response.data)
//                 }
//             })
//             .catch((error) =>
//             {
//                 console.log(error);
//             });
//     }, []);

//     return (
//         <Grid textAlign={'center'}>
//             <Paper elevation={0} style={paperStyle}>

//                 {added ?
//                     (
//                         <Button variant="text" type='submitClicked' sx={{ marginBottom: "30px" }} transition="all .2s"
//                         >
//                             Section successfully added
//                         </Button>
//                     )
//                     :
//                     <div></div>}

//                 <Grid>
//                     <form onSubmit={handleSubmit} alignitem={'center'}>
//                         <TextField
//                             id="outlined-basic"
//                             label="Section Name"
//                             placeholder='Enter Section Name'
//                             variant="outlined"
//                             fullWidth
//                             onChange={handleChange}
//                             name="section_name"
//                             value={formValues.section_name}
//                             error={Boolean(formErrors.section_name)}
//                             sx={{ marginBottom: '20px' }}
//                             helperText={formErrors.section_name}
//                         />
//                         <TextField
//                             id="outlined-basic"
//                             type="number"
//                             label="Section Weightage"
//                             placeholder='Enter Section Weightage'
//                             variant="outlined"
//                             fullWidth
//                             onChange={handleChange}
//                             name="weightage"
//                             value={formValues.weightage}
//                             error={Boolean(formErrors.weightage)}
//                             sx={{ marginBottom: '20px' }}
//                             helperText={formErrors.weightage}
//                         />

//                         {/* <TextField
//                             id="outlined-basic"
//                             label="Assign to"
//                             select
//                             placeholder='Choose Member'
//                             variant="outlined"
//                             fullWidth
//                             multiline
//                             onChange={handleChange}
//                             name="assignee_id"
//                             value={formValues.assignee_id}
//                             rows={4}
//                             error={Boolean(formErrors.assignee_id)}
//                             sx={{ marginBottom: '20px' }}
//                             helperText={formErrors.assignee_id}
//                         > */}
//                         <FormControl
//                             fullWidth>
//                             <InputLabel id="assign_to">Round</InputLabel>
//                             <Select
//                                 id="outlined-basic"
//                                 labelId="assign_to"
//                                 // variant="outlined"
//                                 label="Assign to"
//                                 fullWidth
//                                 multiple
//                                 onChange={handleChange}
//                                 name="assignee_id"
//                                 value={formValues.assignee_id}
//                                 error={Boolean(formErrors.assignee_id)}
//                                 sx={{ marginBottom: '20px' }}
//                                 helpertext={formErrors.assignee_id}
//                             >
//                                 {
//                                     members.map(member =>
//                                     (
//                                         <MenuItem value={member.name} key={member.id}
//                                             name={member.id}>
//                                             {member.name}
//                                         </MenuItem>
//                                     ))
//                                 }
//                             </Select>
//                         </FormControl>
//                         <TextField
//                             id="outlined-basic"
//                             label="Solution"
//                             placeholder='Enter Solution'
//                             variant="outlined"
//                             fullWidth
//                             onChange={handleChange}
//                             name="ans"
//                             value={formValues.ans}
//                             error={Boolean(formErrors.ans)}
//                             sx={{ marginBottom: '20px' }}
//                             helperText={formErrors.ans}
//                         />
//                         <Button variant="contained" type='submitClicked' onClick={handleSubmit} sx={{ marginTop: '30px' }}>Add</Button>

//                     </form>
//                 </Grid>
//             </Paper>
//         </Grid >
//     );
// };

// export default AddSectionForm;