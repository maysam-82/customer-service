import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Customer from '../../components/Customer';
import {
    deleteCustomer,
    getCustomers,
} from '../../redux/actions/customers/customers';

import { IStoreState } from '../../redux/reducers';
import { ICustomer } from '../../types/customers';

import classes from './customers.module.css';

interface ICustomersListProps {
    customers: ICustomer[] | null;
    isLoading: boolean;
    getCustomers: Function;
    deleteCustomer: Function;
}

export function CustomersList({
    customers,
    isLoading,
    getCustomers,
    deleteCustomer,
}: ICustomersListProps) {
    useEffect(() => {
        getCustomers();
    }, [getCustomers]);

    const handleDelete = (customerId: number) => {
        deleteCustomer(customerId);
    };

    // TODO: implement Edit logic
    const handleEdit = (id: number) => {
        console.log(id);
    };

    const renderCustomers =
        customers &&
        customers.length > 0 &&
        customers.map((customer) => (
            <Customer
                key={customer.id}
                {...customer}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        ));
    // TODO: Add loading spinner.
    return <div className={classes.customersContainer}>{renderCustomers}</div>;
}

const mapStateToProps = (state: IStoreState) => ({
    customers: state.customers.customers,
    isLoading: state.customers.isLoading,
});

export default connect(mapStateToProps, { getCustomers, deleteCustomer })(
    CustomersList
);
