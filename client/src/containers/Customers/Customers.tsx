import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Customer from '../../components/Customer';
import { getCustomers } from '../../redux/actions/customers/customers';

import { IStoreState } from '../../redux/reducers';
import { ICustomer } from '../../types/customers';

import classes from './customers.module.css';

interface ICustomersListProps {
    customers: ICustomer[] | null;
    isLoading: boolean;
    getCustomers: Function;
}

export function CustomersList({
    customers,
    isLoading,
    getCustomers,
}: ICustomersListProps) {
    useEffect(() => {
        getCustomers();
    }, [getCustomers]);

    // TODO: implement Delete and Edit logic
    const handleDelete = (id: number) => {
        console.log(id);
    };
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
    return <div className={classes.customersContainer}>{renderCustomers}</div>;
}

const mapStateToProps = (state: IStoreState) => ({
    customers: state.customers.customers,
    isLoading: state.customers.isLoading,
});

export default connect(mapStateToProps, { getCustomers })(CustomersList);
