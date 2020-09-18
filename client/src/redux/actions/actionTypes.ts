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
} from './customers/customers.types';
import { IAddToast, IRemoveToast } from './toasts/toasts.types';

export enum ActionTypes {
    GET_CUSTOMERS_SUCCESS,
    GET_CUSTOMERS_START,
    GET_CUSTOMERS_FAIL,
    ADD_TOAST,
    REMOVE_TOAST,
    DELETE_CUSTOMERS_SUCCESS,
    DELETE_CUSTOMERS_START,
    DELETE_CUSTOMERS_FAIL,
    ADD_CUSTOMER_SUCCESS,
    ADD_CUSTOMER_START,
    ADD_CUSTOMER_FAIL,
    EDIT_CUSTOMER_SUCCESS,
    EDIT_CUSTOMER_START,
    EDIT_CUSTOMER_FAIL,
    SET_CUSTOMER_UPDATE,
    SEARCH_CUSTOMER_SUCCESS,
    SEARCH_CUSTOMER_START,
    SEARCH_CUSTOMER_FAIL,
}

export type CustomersActions =
    | IGetCustomersSuccess
    | IGetCustomersStart
    | IGetCustomersFail
    | IDeleteCustomerSuccess
    | IDeleteCustomerFail
    | IDeleteCustomerStart
    | IAddCustomerFail
    | IAddCustomerSuccess
    | IAddCustomerStart
    | IEditCustomerSuccess
    | IEditCustomerFail
    | IEditCustomerStart
    | ISetUpdateCustomer
    | ISearchCustomersSuccess
    | ISearchCustomersFail
    | ISearchCustomersStart;

export type ToastActions = IAddToast | IRemoveToast;
