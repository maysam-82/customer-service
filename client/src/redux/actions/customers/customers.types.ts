import { ICustomer } from '../../../types/customers';
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
}

export interface IDeleteCustomerStart {
    type: ActionTypes.DELETE_CUSTOMERS_START;
}

export interface IDeleteCustomerFail {
    type: ActionTypes.DELETE_CUSTOMERS_FAIL;
    payload: string;
}
