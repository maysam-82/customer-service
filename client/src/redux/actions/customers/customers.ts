import { Dispatch } from 'redux';
import { getData, deleteData } from '../../../services/customers/apis';
import { ICustomer } from '../../../types/customers';
import { ActionTypes } from '../actionTypes';
import { setToast } from '../toasts/toasts';
import {
    IDeleteCustomerFail,
    IDeleteCustomerStart,
    IDeleteCustomerSuccess,
    IGetCustomersFail,
    IGetCustomersStart,
    IGetCustomersSuccess,
} from './customers.types';

// Actions for fetching customers
const getCustomersStart = (): IGetCustomersStart => ({
    type: ActionTypes.GET_CUSTOMERS_START,
});

const getCustomersFail = (errorMessage: string): IGetCustomersFail => ({
    type: ActionTypes.GET_CUSTOMERS_FAIL,
    payload: errorMessage,
});

const getCustomersSuccess = (customers: ICustomer[]): IGetCustomersSuccess => ({
    type: ActionTypes.GET_CUSTOMERS_SUCCESS,
    payload: customers,
});

export const getCustomers = () => async (dispatch: Dispatch) => {
    dispatch(getCustomersStart());
    try {
        const customers = await getData<ICustomer[]>(`/customers`);
        dispatch(getCustomersSuccess(customers));
    } catch (error) {
        dispatch(getCustomersFail(error.message));
        dispatch<any>(setToast(error.message, 'danger'));
    }
};

// Actions for deleting customer
const deleteCustomerStart = (): IDeleteCustomerStart => ({
    type: ActionTypes.DELETE_CUSTOMERS_START,
});

const deleteCustomerFail = (errorMessage: string): IDeleteCustomerFail => ({
    type: ActionTypes.DELETE_CUSTOMERS_FAIL,
    payload: errorMessage,
});

const deleteCustomerSuccess = (customerId: number): IDeleteCustomerSuccess => ({
    type: ActionTypes.DELETE_CUSTOMERS_SUCCESS,
    payload: customerId,
});

export const deleteCustomer = (customerId: number) => async (
    dispatch: Dispatch
) => {
    dispatch(deleteCustomerStart());
    try {
        await deleteData(`/customers/${customerId}`);
        dispatch(deleteCustomerSuccess(customerId));
    } catch (error) {
        dispatch(deleteCustomerFail(error.message));
    }
};
