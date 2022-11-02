import React, { useEffect, useState } from 'react';
import FormProvider from '../UtilityComponents/FormProvider';

const AddRoundForm = (props) =>
{
    const initial =
    {
        round_name: "",
        round_type: ""
    };
    const round_id = props.round_id;

    const model = 'rounds';

    const { MyForm, MyTextField, MySelectField, MyTextFieldNumber, MySelectFieldUsingTextField } = FormProvider(initial, model, round_id, props.type);

    return (
        <MyForm>
            <MyTextField field="round_name" />
            <MySelectFieldUsingTextField field="round_type" />
        </MyForm>
    );
};

export default AddRoundForm;


// import React, { useEffect, useState } from 'react';
// import * as Links from '../../Links';
// import axios from 'axios';
// import { Grid, Paper, Button, MenuItem } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import { useParams } from 'react-router-dom';

// const AddRoundForm = () =>
// {
//     const paperStyle =
//     {
//         padding: '10px 20px',
//         width: '20vw'
//     }

    // const params = useParams();
    // const initial = { round_name: "", round_type: "" };
    // const [formValues, setFormValues] = useState(initial);
    // const [formErrors, setFormErrors] = useState([]);
    // const [added, setAdded] = useState(false);
    // const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    // const handleChange = (e) =>
    // {
    //     const { name, value } = e.target;
    //     setFormValues({ ...formValues, [name]: value });
    // }

    // const handleSubmit = (e) =>
    // {
    //     setIsSubmitClicked(true);
    //     e.preventDefault();
    //     setFormErrors(validate(formValues));
    // }

    // const validate = (values) =>
    // {
    //     const errors = {};

    //     if (!values.round_name)
    //     {
    //         errors.round_name = "Round name is required";
    //     }
    //     if (!values.round_type)
    //     {
    //         errors.round_type = "Round type is required";
    //     }

    //     return errors;
    // }

    // const saveToData = (formValues) =>
    // {
    //     const url = Links.rounds_api;
    //     axios
    //         .post
    //         (
    //             url,
    //             {
    //                 round_name: formValues.round_name,
    //                 round_type: formValues.round_type,
    //                 season_id: params.id
    //             })
    //         .then
    //         ((response) =>
    //         {
    //             // todo:
    //             if (response.data['msg'] === "Round Added")
    //             {
    //                 setAdded(true);
    //             }
    //         })
    //         .catch((error) =>
    //         {
    //             console.log(error);
    //         });
    // }

    // useEffect(() =>
    // {
    //     if (Object.keys(formErrors).length === 0 && isSubmitClicked)
    //     {
    //         saveToData(formValues);
    //         setFormValues({ round_name: "", round_type: "" });
    //         setTimeout(() =>
    //         {
    //             setAdded(false);
    //         }, (4000));
    //     }
    // }, [formErrors])

//     return (
//         <Grid textAlign={'center'}>
//             <Paper elevation={0} style={paperStyle}>

//                 {added ?
//                     (
//                         <Button variant="text" type='submitClicked' sx={{ marginBottom: "30px" }} transition="all .2s"
//                         >Season successfully added</Button>
//                     )
//                     :
//                     <div></div>}

//                 <Grid>
//                     <form onSubmit={handleSubmit} alignitem={'center'}>
//                         <TextField
//                             id="outlined-basic"
//                             label="Round Name"
//                             placeholder='Enter Round Name'
//                             variant="outlined"
//                             fullWidth
//                             onChange={handleChange}
//                             name="round_name"
//                             value={formValues.round_name}
//                             error={Boolean(formErrors.round_name)}
//                             sx={{ marginBottom: '20px' }}
//                             helperText={formErrors.round_name}
//                         />
//                         <TextField
//                             id="outlined-basic"
//                             label="Round Type"
//                             select
//                             variant="outlined"
//                             fullWidth
//                             onChange={handleChange}
//                             name="round_type"
//                             value={formValues.round_type || ""}
//                             error={Boolean(formErrors.round_type)}
//                             sx={{ marginBottom: '20px' }}
//                             helperText={formErrors.round_type}
//                         >
//                             <MenuItem value='int'>
//                                 Interview
//                             </MenuItem>
//                             <MenuItem value='t'>
//                                 Test
//                             </MenuItem>
//                         </TextField>
//                         <Button variant="contained" type='submitClicked' onClick={handleSubmit} sx={{ marginTop: '30px' }}>Add</Button>

//                     </form>
//                 </Grid>
//             </Paper>
//         </Grid >

//     );
// };

// export default AddRoundForm;