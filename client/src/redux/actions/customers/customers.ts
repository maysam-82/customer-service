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
    ISearchCustomersFail,
    ISearchCustomersStart,
    ISearchCustomersSuccess,
    ISetUpdateCustomer,
} from './customers.types';

const baseUrl = 'http://localhost:5001/customers';

// Actions for fetching customers
export const getCustomersStart = (): IGetCustomersStart => ({
    type: ActionTypes.GET_CUSTOMERS_START,
});

export const getCustomersFail = (errorMessage: string): IGetCustomersFail => ({
    type: ActionTypes.GET_CUSTOMERS_FAIL,
    payload: errorMessage,
});

export const getCustomersSuccess = (
    customers: ICustomer[]
): IGetCustomersSuccess => ({
    type: ActionTypes.GET_CUSTOMERS_SUCCESS,
    payload: customers,
});

export const getCustomers = () => async (dispatch: Dispatch) => {
    dispatch(getCustomersStart());
    try {
        const customers = await getData<ICustomer[]>(`${baseUrl}`);
        dispatch(getCustomersSuccess(customers));
    } catch (error) {
        dispatch(getCustomersFail(error.message));
        dispatch<any>(setToast(error.message, 'danger'));
    }
};

// Actions for deleting customer
export const deleteCustomerStart = (): IDeleteCustomerStart => ({
    type: ActionTypes.DELETE_CUSTOMERS_START,
});

export const deleteCustomerFail = (
    errorMessage: string
): IDeleteCustomerFail => ({
    type: ActionTypes.DELETE_CUSTOMERS_FAIL,
    payload: errorMessage,
});

export const deleteCustomerSuccess = (
    customerId: number
): IDeleteCustomerSuccess => ({
    type: ActionTypes.DELETE_CUSTOMERS_SUCCESS,
    payload: customerId,
});

export const deleteCustomer = (customerId: number) => async (
    dispatch: Dispatch
) => {
    dispatch(deleteCustomerStart());
    try {
        await deleteData(`${baseUrl}/${customerId}`);
        dispatch(deleteCustomerSuccess(customerId));
    } catch (error) {
        dispatch(deleteCustomerFail(error.message));
        dispatch<any>(setToast(error.message, 'danger'));
    }
};

// Actions for adding customer
export const addCustomerStart = (): IAddCustomerStart => ({
    type: ActionTypes.ADD_CUSTOMER_START,
});

export const addCustomerFail = (errorMessage: string): IAddCustomerFail => ({
    type: ActionTypes.ADD_CUSTOMER_FAIL,
    payload: errorMessage,
});

export const addCustomerSuccess = (
    customer: ICustomer
): IAddCustomerSuccess => ({
    type: ActionTypes.ADD_CUSTOMER_SUCCESS,
    payload: customer,
});

export const addCustomer = (newCustomer: ICustomer) => async (
    dispatch: Dispatch
) => {
    dispatch(addCustomerStart());
    try {
        const customer = await postData<ICustomer>(`${baseUrl}`, newCustomer);
        dispatch(addCustomerSuccess(customer));
        dispatch<any>(setToast('Customer Added.', 'success'));
    } catch (error) {
        dispatch(addCustomerFail(error.message));
        dispatch<any>(setToast(error.message, 'danger'));
    }
};

// Actions for updating customer
export const editCustomerStart = (): IEditCustomerStart => ({
    type: ActionTypes.EDIT_CUSTOMER_START,
});

export const editCustomerFail = (errorMessage: string): IEditCustomerFail => ({
    type: ActionTypes.EDIT_CUSTOMER_FAIL,
    payload: errorMessage,
});

export const editCustomerSuccess = (
    customer: ICustomer
): IEditCustomerSuccess => ({
    type: ActionTypes.EDIT_CUSTOMER_SUCCESS,
    payload: customer,
});

export const editCustomer = (newCustomer: ICustomer) => async (
    dispatch: Dispatch
) => {
    dispatch(editCustomerStart());
    try {
        const customer = await editData<ICustomer>(
            `${baseUrl}/${newCustomer.id}`,
            newCustomer
        );
        dispatch(editCustomerSuccess(customer));
        dispatch<any>(setToast('Customer edited.', 'info'));
    } catch (error) {
        dispatch(editCustomerFail(error.message));
        dispatch<any>(setToast(error.message, 'danger'));
    }
};

// set a flag to enable/disable editing mode
export const setUpdateCustomer = (
    isEditing: boolean,
    selectedCustomer: ICustomer
): ISetUpdateCustomer => ({
    type: ActionTypes.SET_CUSTOMER_UPDATE,
    payload: { isEditing, selectedCustomer },
});

// Actions for searching customers
export const searchCustomersStart = (): ISearchCustomersStart => ({
    type: ActionTypes.SEARCH_CUSTOMER_START,
});

export const searchCustomersFail = (
    errorMessage: string
): ISearchCustomersFail => ({
    type: ActionTypes.SEARCH_CUSTOMER_FAIL,
    payload: errorMessage,
});

export const searchCustomersSuccess = (
    customers: ICustomer[],
    searchTerm: string
): ISearchCustomersSuccess => ({
    type: ActionTypes.SEARCH_CUSTOMER_SUCCESS,
    payload: { customers, searchTerm },
});

export const searchCustomers = (searchTerm: string) => async (
    dispatch: Dispatch
) => {
    dispatch(searchCustomersStart());
    try {
        const customers = await getData<ICustomer[]>(`${baseUrl}`);
        dispatch(searchCustomersSuccess(customers, searchTerm));
    } catch (error) {
        dispatch(searchCustomersFail(error.message));
        dispatch<any>(setToast(error.message, 'danger'));
    }
};
