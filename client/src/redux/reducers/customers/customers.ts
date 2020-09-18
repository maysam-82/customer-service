import { ActionTypes } from './../../actions/actionTypes';
import { CustomersActions } from '../../actions/actionTypes';
import { ICustomer } from '../../../types/customers';
import { removeCustomer } from './utils';

export interface ICustomersState {
    customers: ICustomer[] | null;
    error: string;
    isLoading: boolean;
}

const customersInitialState: ICustomersState = {
    customers: null,
    error: '',
    isLoading: false,
};

const customersReducer = (
    state = customersInitialState,
    action: CustomersActions
) => {
    switch (action.type) {
        case ActionTypes.GET_CUSTOMERS_START:
        case ActionTypes.DELETE_CUSTOMERS_START:
        case ActionTypes.ADD_CUSTOMER_START:
            return { ...state, isLoading: true };
        case ActionTypes.GET_CUSTOMERS_SUCCESS:
            return { ...state, customers: action.payload };
        case ActionTypes.ADD_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: [...state.customers, action.payload],
            };
        case ActionTypes.DELETE_CUSTOMERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                customers: removeCustomer(
                    state.customers as ICustomer[],
                    action.payload
                ),
            };
        case ActionTypes.GET_CUSTOMERS_FAIL:
        case ActionTypes.DELETE_CUSTOMERS_FAIL:
        case ActionTypes.ADD_CUSTOMER_FAIL:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default customersReducer;
