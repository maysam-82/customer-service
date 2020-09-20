import React from 'react';
import { connect } from 'react-redux';

import Toast from '../../components/Toast';
import Customers from '../Customers';
import CustomerForm from '../CustomerForm';

import { IStoreState } from '../../redux/reducers';
import { IToast } from '../../types/toast';

import classes from './app.module.css';

interface IAppProps {
    toasts: IToast[];
}

export function App({ toasts }: IAppProps) {
    return (
        <div className={classes.appContainer}>
            <Toast toasts={toasts} />
            <CustomerForm />
            <Customers />
        </div>
    );
}

const mapStateToProps = (state: IStoreState) => ({
    toasts: state.toasts,
});

export default connect(mapStateToProps)(App);
