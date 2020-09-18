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
