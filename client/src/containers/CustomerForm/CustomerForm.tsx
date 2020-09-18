import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import { addCustomer } from '../../redux/actions/customers/customers';
import { setToast } from '../../redux/actions/toasts/toasts';

import { IStoreState } from '../../redux/reducers';
import { ICustomer } from '../../types/customers';

import classes from './customerForm.module.css';
interface ICustomerFormProps {
    addCustomer: Function;
    setToast: Function;
    isLoading: boolean;
    customers: ICustomer[] | null;
}

interface ICustomerFormState {
    [x: string]: string;
    firstName: string;
    lastName: string;
    dob: string;
}

export function CustomerForm({
    addCustomer,
    setToast,
    isLoading,
    customers,
}: ICustomerFormProps) {
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

        // Simple Data validation
        const { firstName, lastName, dob } = formData;
        console.log(firstName, lastName, dob);
        if (!firstName || !lastName || !dob) {
            setToast('Invalid Data. Please enter data.', 'danger');
            return;
        }

        // Submit data
        const newCustomerId =
            customers && customers.length > 0 ? customers.length + 1 : 0;
        const customer: ICustomer = {
            id: newCustomerId,
            firstName,
            lastName,
            dob,
        };
        addCustomer(customer);
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

const mapStateToProps = (state: IStoreState) => ({
    customers: state.customers.customers,
    isLoading: state.customers.isLoading,
});

export default connect(mapStateToProps, { addCustomer, setToast })(
    CustomerForm
);
