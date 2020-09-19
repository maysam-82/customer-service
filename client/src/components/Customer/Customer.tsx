import React from 'react';

import classes from './customer.module.css';

import { ICustomer } from '../../types/customers';

export interface ICustomerProps extends ICustomer {
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
}

function Customer({
    id,
    firstName,
    lastName,
    dob,
    handleDelete,
    handleEdit,
}: ICustomerProps) {
    return (
        <li className={classes.customerContainer}>
            <ul className={classes.customerDetails}>
                <li>
                    <span>Firstname:</span> {firstName}
                </li>
                <li>
                    <span>Lastname:</span> {lastName}
                </li>
                <li>
                    <span>Date Of Birth:</span> {dob}
                </li>
            </ul>
            <ul className={classes.customerActionContainer}>
                <li
                    className={classes.customerActionDelete}
                    onClick={() => handleDelete(id)}
                >
                    <i className="fas fa-trash-alt"></i>
                </li>
                <li
                    className={classes.customerActionEdit}
                    onClick={() => handleEdit(id)}
                >
                    <i className="fas fa-user-edit"></i>
                </li>
            </ul>
        </li>
    );
}

export default Customer;
