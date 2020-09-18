import {
    IGetCustomersFail,
    IGetCustomersStart,
    IGetCustomersSuccess,
} from './customers/customers.types';

export enum ActionTypes {
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_START,
    GET_CUSTOMERS_FAIL,
}

export type CustomersActions =
    | IGetCustomersSuccess
    | IGetCustomersStart
    | IGetCustomersFail;
