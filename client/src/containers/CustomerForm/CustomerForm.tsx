import React, { useState } from 'react';
import Button from '../../components/Button/Button';

import classes from './customerForm.module.css';

interface ICustomerFormState {
    [x: string]: string;
    firstName: string;
    lastName: string;
    dob: string;
}

function CustomerForm() {
    const initialState: ICustomerFormState = {
        firstName: '',
        lastName: '',
        dob: '',
    };
    const [formData, setFormData] = useState<ICustomerFormState>(initialState);

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleCancel = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        setFormData({ ...formData, ...initialState });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Data validation

        // Submit data
        console.log('submit');
    };

    const { firstName, lastName, dob } = formData;
    return (
        <form
            className={classes.customerFormContainer}
            onSubmit={(event) => handleSubmit(event)}
        >
            <div className={classes.inputContainer}>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    className={classes.inputText}
                    value={firstName}
                    name="firstName"
                    id="firstName"
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <div className={classes.inputContainer}>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    className={classes.inputText}
                    value={lastName}
                    name="lastName"
                    id="lastName"
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <div className={classes.inputContainer}>
                <label htmlFor="dob">Date Of Birth</label>
                <input
                    type="date"
                    className={classes.inputText}
                    value={dob}
                    name="dob"
                    id="dob"
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <div className={classes.buttonContainer}>
                <Button type="success">Add</Button>
                <Button handleClick={handleCancel} type="cancel">
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default CustomerForm;
