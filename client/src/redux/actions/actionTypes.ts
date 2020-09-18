import {
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
}

export type CustomersActions =
    | IGetCustomersSuccess
    | IGetCustomersStart
    | IGetCustomersFail;

export type ToastActions = IAddToast | IRemoveToast;
