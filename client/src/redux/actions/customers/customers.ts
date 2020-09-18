import { Dispatch } from 'redux';
import { getData } from '../../../services/customers/apis';
import { ICustomer } from '../../../types/customers';
import { ActionTypes } from '../actionTypes';
import { setToast } from '../toasts/toasts';
import {
    IGetCustomersFail,
    IGetCustomersStart,
    IGetCustomersSuccess,
} from './customers.types';

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
