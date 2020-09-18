import { ICustomer } from './../../../types/customers.d';
import { ActionTypes } from '../actionTypes';

// GET interfaces
export interface IGetCustomersSuccess {
    type: ActionTypes.GET_CUSTOMERS_SUCCESS;
    payload: ICustomer[];
}

export interface IGetCustomersStart {
    type: ActionTypes.GET_CUSTOMERS_START;
}

export interface IGetCustomersFail {
    type: ActionTypes.GET_CUSTOMERS_FAIL;
    payload: string;
}

// Delete interfaces
export interface IDeleteCustomerSuccess {
    type: ActionTypes.DELETE_CUSTOMERS_SUCCESS;
    payload: number;
}

export interface IDeleteCustomerStart {
    type: ActionTypes.DELETE_CUSTOMERS_START;
}

export interface IDeleteCustomerFail {
    type: ActionTypes.DELETE_CUSTOMERS_FAIL;
    payload: string;
}

// Add customer interfaces
export interface IAddCustomerSuccess {
    type: ActionTypes.ADD_CUSTOMER_SUCCESS;
    payload: ICustomer;
}

export interface IAddCustomerStart {
    type: ActionTypes.ADD_CUSTOMER_START;
}

export interface IAddCustomerFail {
    type: ActionTypes.ADD_CUSTOMER_FAIL;
    payload: string;
}

// Edit customer interfaces
export interface IEditCustomerSuccess {
    type: ActionTypes.EDIT_CUSTOMER_SUCCESS;
    payload: ICustomer;
}

export interface IEditCustomerStart {
    type: ActionTypes.EDIT_CUSTOMER_START;
}

export interface IEditCustomerFail {
    type: ActionTypes.EDIT_CUSTOMER_FAIL;
    payload: string;
}

// Update customer interfaces
interface IUpdateCustomerPayload {
    isEditing: boolean;
    selectedCustomer: ICustomer;
}
export interface ISetUpdateCustomer {
    type: ActionTypes.SET_CUSTOMER_UPDATE;
    payload: IUpdateCustomerPayload;
}

interface ISearchPayload {
    customers: ICustomer[];
    searchTerm: string;
}
// Search interfaces
export interface ISearchCustomersSuccess {
    type: ActionTypes.SEARCH_CUSTOMER_SUCCESS;
    payload: ISearchPayload;
}

export interface ISearchCustomersStart {
    type: ActionTypes.SEARCH_CUSTOMER_START;
}

export interface ISearchCustomersFail {
    type: ActionTypes.SEARCH_CUSTOMER_FAIL;
    payload: string;
}
