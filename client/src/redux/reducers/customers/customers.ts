import { ICustomer } from './../../../types/customers.d';
import { ActionTypes } from './../../actions/actionTypes';
import { CustomersActions } from '../../actions/actionTypes';
import { removeCustomer, replaceCustomer, setSearchResult } from './utils';

export interface ICustomersState {
    customers: ICustomer[] | null;
    error: string;
    isLoading: boolean;
    isEditing: boolean;
    selectedCustomer: ICustomer | null;
}

const customersInitialState: ICustomersState = {
    customers: null,
    error: '',
    isLoading: false,
    isEditing: false,
    selectedCustomer: null,
};

const customersReducer = (
    state = customersInitialState,
    action: CustomersActions
) => {
    switch (action.type) {
        case ActionTypes.GET_CUSTOMERS_START:
        case ActionTypes.DELETE_CUSTOMERS_START:
        case ActionTypes.ADD_CUSTOMER_START:
        case ActionTypes.EDIT_CUSTOMER_START:
        case ActionTypes.SEARCH_CUSTOMER_START:
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
        case ActionTypes.EDIT_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                customers: replaceCustomer(
                    state.customers as ICustomer[],
                    action.payload
                ),
                isEditing: false,
            };
        case ActionTypes.SET_CUSTOMER_UPDATE:
            const { isEditing, selectedCustomer } = action.payload;
            return {
                ...state,
                isEditing: isEditing,
                selectedCustomer: {
                    ...state.selectedCustomer,
                    ...selectedCustomer,
                },
            };
        case ActionTypes.SEARCH_CUSTOMER_SUCCESS:
            const { customers, searchTerm } = action.payload;
            return {
                ...state,
                customers: setSearchResult(customers, searchTerm),
                isLoading: false,
            };
        case ActionTypes.GET_CUSTOMERS_FAIL:
        case ActionTypes.DELETE_CUSTOMERS_FAIL:
        case ActionTypes.ADD_CUSTOMER_FAIL:
        case ActionTypes.EDIT_CUSTOMER_FAIL:
        case ActionTypes.SEARCH_CUSTOMER_FAIL:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default customersReducer;
