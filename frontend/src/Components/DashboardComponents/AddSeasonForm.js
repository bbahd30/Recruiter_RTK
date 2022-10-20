import React, { useEffect, useState } from 'react';

const AddSeason = () =>
{
    const initial = { year: "", name: "", description: "" };
    const [formValues, setFormValues] = useState(initial);
    const [formErrors, setFormErrors] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);

    const validate = (values) =>
    {
        const errors = {};
        const yearRegex = /^[0-9]{4}$/;

        if (!values.year)
        {
            errors.year = "Season Year is required";
        }
        else if (!yearRegex.test(values.year))
        {
            errors.year = "Enter a valid year.";
        }
        if (!values.name)
        {
            errors.name = "Season name is required";
        }
        return errors;
    }

    // for getting input from the user
    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    }

    const handleSubmit = (e) =>
    {
        console.log(formValues)
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(() =>
    {
        if (Object.keys(formErrors).length === 0 && isSubmit)
        {
            // redirect 
        }
    }, [formErrors])
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className='field'>
                    <label>Season year</label>
                    <input
                        type="year"
                        name="year"
                        placeholder='Year'
                        value={formValues.year}
                        onChange={handleChange}
                    />
                    <p>{formErrors.year}</p>
                </div>
                <div className='field'>
                    <label>Season Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder='Season Name'
                        value={formValues.name}
                        onChange={handleChange}
                    />
                    <p>{formErrors.name}</p>
                </div>
                <div className='field'>
                    <label>Season Description</label>
                    <input
                        type="text"
                        name="description"
                        placeholder='Season Description'
                        value={formValues.description}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button type='submit' onClick={handleSubmit}>Add</button>
        </form>
    );
};

export default AddSeason;