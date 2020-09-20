import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Customer from '../../components/Customer';
import Spinner from '../../components/Spinner';
import {
    deleteCustomer,
    getCustomers,
    setUpdateCustomer,
} from '../../redux/actions/customers/customers';

import { IStoreState } from '../../redux/reducers';
import { ICustomer } from '../../types/customers';
import Search from '../Search';

import classes from './customers.module.css';

export interface ICustomersProps {
    customers: ICustomer[] | null;
    isLoading: boolean;
    getCustomers: Function;
    deleteCustomer: Function;
    setUpdateCustomer: Function;
}

export function Customers({
    customers,
    isLoading,
    getCustomers,
    deleteCustomer,
    setUpdateCustomer,
}: ICustomersProps) {
    useEffect(() => {
        getCustomers();
    }, [getCustomers]);

    const handleDelete = (customerId: number) => {
        deleteCustomer(customerId);
    };

    const handleEdit = (selectedCustomerid: number) => {
        if (customers && customers.length > 0) {
            const selectedCustomer = customers.find(
                (customer) => customer.id === selectedCustomerid
            );
            if (selectedCustomer) {
                setUpdateCustomer(true, selectedCustomer as ICustomer);
            }
        }
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

    return (
        <Fragment>
            <Search />
            {isLoading ? (
                <Spinner />
            ) : (
                <div className={classes.customersContainer}>
                    {isLoading ? <Spinner /> : renderCustomers}
                </div>
            )}
        </Fragment>
    );
}

const mapStateToProps = (state: IStoreState) => ({
    customers: state.customers.customers,
    isLoading: state.customers.isLoading,
});

export default connect(mapStateToProps, {
    getCustomers,
    deleteCustomer,
    setUpdateCustomer,
})(Customers);
