import {
    IDeleteCustomerFail,
    IDeleteCustomerStart,
    IDeleteCustomerSuccess,
    IGetCustomersFail,
    IGetCustomersStart,
    IGetCustomersSuccess,
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
}

export type CustomersActions =
    | IGetCustomersSuccess
    | IGetCustomersStart
    | IGetCustomersFail
    | IDeleteCustomerSuccess
    | IDeleteCustomerFail
    | IDeleteCustomerStart;

export type ToastActions = IAddToast | IRemoveToast;
