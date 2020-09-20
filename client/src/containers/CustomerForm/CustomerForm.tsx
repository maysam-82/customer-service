import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import {
    addCustomer,
    editCustomer,
    setUpdateCustomer,
} from '../../redux/actions/customers/customers';
import { setToast } from '../../redux/actions/toasts/toasts';

import { IStoreState } from '../../redux/reducers';
import { ICustomer } from '../../types/customers';

import classes from './customerForm.module.css';
export interface ICustomerFormProps {
    addCustomer: Function;
    setToast: Function;
    editCustomer: Function;
    setUpdateCustomer: Function;
    isLoading: boolean;
    customers: ICustomer[] | null;
    selectedCustomer: ICustomer | null;
    isEditing: boolean;
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
    selectedCustomer,
    isEditing,
    setUpdateCustomer,
    editCustomer,
}: ICustomerFormProps) {
    const initialState: ICustomerFormState = {
        firstName: '',
        lastName: '',
        dob: '',
    };

    const [formData, setFormData] = useState<ICustomerFormState>(initialState);

    useEffect(() => {
        if (isEditing && selectedCustomer) {
            const selectedCustomerData: ICustomerFormState = {
                firstName: selectedCustomer.firstName,
                lastName: selectedCustomer.lastName,
                dob: selectedCustomer.dob,
            };
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...selectedCustomerData,
            }));
        }
    }, [isEditing, selectedCustomer]);

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
        setUpdateCustomer(false, {
            firstName: '',
            lastName: '',
            id: -1,
            dob: '',
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Simple Data validation
        const { firstName, lastName, dob } = formData;
        if (!firstName || !lastName || !dob) {
            setToast('Invalid Data. Please enter data.', 'danger');
            return;
        }

        // If we are not in editing mode
        let newCustomer: ICustomer;
        if (!isEditing) {
            // Submit data
            const newCustomerId =
                customers && customers.length > 0 ? customers.length + 1 : 0;
            newCustomer = {
                id: newCustomerId,
                firstName,
                lastName,
                dob,
            };
            addCustomer(newCustomer);
        } else {
            // Edit data
            const selectedCustomerId = selectedCustomer && selectedCustomer.id;
            if (!selectedCustomerId) return;
            newCustomer = {
                id: selectedCustomerId,
                firstName,
                lastName,
                dob,
            };
            editCustomer(newCustomer);
        }
        setFormData({ ...formData, ...initialState });
    };

    const { firstName, lastName, dob } = formData;

    // TODO: Add spinner in loading mode
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
                <Button type={isEditing ? 'info' : 'success'}>
                    {!isEditing ? 'Add' : 'Edit'}
                </Button>
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
    selectedCustomer: state.customers.selectedCustomer,
    isEditing: state.customers.isEditing,
});

export default connect(mapStateToProps, {
    addCustomer,
    setToast,
    setUpdateCustomer,
    editCustomer,
})(CustomerForm);
