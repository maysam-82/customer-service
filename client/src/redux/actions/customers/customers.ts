import { Dispatch } from 'redux';
import {
    getData,
    deleteData,
    postData,
    editData,
} from '../../../services/customers/apis';
import { ICustomer } from '../../../types/customers';
import { ActionTypes } from '../actionTypes';
import { setToast } from '../toasts/toasts';
import {
    IAddCustomerFail,
    IAddCustomerStart,
    IAddCustomerSuccess,
    IDeleteCustomerFail,
    IDeleteCustomerStart,
    IDeleteCustomerSuccess,
    IEditCustomerFail,
    IEditCustomerStart,
    IEditCustomerSuccess,
    IGetCustomersFail,
    IGetCustomersStart,
    IGetCustomersSuccess,
    ISetUpdateCustomer,
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
        dispatch<any>(setToast(error.message, 'danger'));
    }
};

// Actions for adding customer
const addCustomerStart = (): IAddCustomerStart => ({
    type: ActionTypes.ADD_CUSTOMER_START,
});

const addCustomerFail = (errorMessage: string): IAddCustomerFail => ({
    type: ActionTypes.ADD_CUSTOMER_FAIL,
    payload: errorMessage,
});

const addCustomerSuccess = (customer: ICustomer): IAddCustomerSuccess => ({
    type: ActionTypes.ADD_CUSTOMER_SUCCESS,
    payload: customer,
});

export const addCustomer = (newCustomer: ICustomer) => async (
    dispatch: Dispatch
) => {
    dispatch(addCustomerStart());
    try {
        const customer = await postData<ICustomer>(`/customers`, newCustomer);
        dispatch(addCustomerSuccess(customer));
        dispatch<any>(setToast('Customer Added.', 'success'));
    } catch (error) {
        dispatch(addCustomerFail(error.message));
        dispatch<any>(setToast(error.message, 'danger'));
    }
};

// Actions for updating customer
const editCustomerStart = (): IEditCustomerStart => ({
    type: ActionTypes.EDIT_CUSTOMER_START,
});

const editCustomerFail = (errorMessage: string): IEditCustomerFail => ({
    type: ActionTypes.EDIT_CUSTOMER_FAIL,
    payload: errorMessage,
});

const editCustomerSuccess = (customer: ICustomer): IEditCustomerSuccess => ({
    type: ActionTypes.EDIT_CUSTOMER_SUCCESS,
    payload: customer,
});

export const editCustomer = (newCustomer: ICustomer) => async (
    dispatch: Dispatch
) => {
    dispatch(editCustomerStart());
    try {
        const customer = await editData<ICustomer>(`/customers`, newCustomer);
        dispatch(editCustomerSuccess(customer));
        dispatch<any>(setToast('Customer edited.', 'success'));
    } catch (error) {
        dispatch(editCustomerFail(error.message));
        dispatch<any>(setToast(error.message, 'danger'));
    }
};

// set a flag to enable/disable editing mode
export const setUpdateCustomer = (isEditing: boolean): ISetUpdateCustomer => ({
    type: ActionTypes.SET_CUSTOMER_UPDATE,
    payload: isEditing,
});
