import {
    IDeleteCustomerSuccess,
    IAddCustomerSuccess,
    IEditCustomerSuccess,
    ISearchCustomersSuccess,
    ISetUpdateCustomer,
    IGetCustomersFail,
    IDeleteCustomerFail,
    IEditCustomerFail,
    IAddCustomerFail,
    ISearchCustomersFail,
    IGetCustomersStart,
    IDeleteCustomerStart,
    ISearchCustomersStart,
    IEditCustomerStart,
    IAddCustomerStart,
} from './../../../actions/customers/customers.types';
import customersReducer from '../customers';
import { ActionTypes } from './../../../actions/actionTypes';
import { testCustomers } from '../../../../fixtures/testData/testData';
import { ICustomersState } from './../customers';
import { IGetCustomersSuccess } from '../../../actions/customers/customers.types';
import { removeCustomer, replaceCustomer, setSearchResult } from '../utils';
import { ICustomer } from '../../../../types/customers';

const customersTestInitialState: ICustomersState = {
    customers: null,
    error: '',
    isLoading: false,
    isEditing: false,
    selectedCustomer: null,
};

const testErrorMessage = 'test error';

describe('customers reducer', () => {
    describe('default action', () => {
        it('should return initial state', () => {
            const newState = customersReducer(undefined, {} as any);
            expect(newState).toEqual(customersTestInitialState);
        });
    });
    describe('start actions', () => {
        it('should handle action of `getCustomersStart`', () => {
            const fakeAction: IGetCustomersStart = {
                type: ActionTypes.GET_CUSTOMERS_START,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.isLoading).toEqual(true);
        });

        it('should handle action of `deleteCustomerStart`', () => {
            const fakeAction: IDeleteCustomerStart = {
                type: ActionTypes.DELETE_CUSTOMERS_START,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.isLoading).toEqual(true);
        });

        it('should handle action of `editCustomerStart`', () => {
            const fakeAction: IEditCustomerStart = {
                type: ActionTypes.EDIT_CUSTOMER_START,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.isLoading).toEqual(true);
        });

        it('should handle action of `addCustomerStart`', () => {
            const fakeAction: IAddCustomerStart = {
                type: ActionTypes.ADD_CUSTOMER_START,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.isLoading).toEqual(true);
        });

        it('should handle action of `searchCustomerStart`', () => {
            const fakeAction: ISearchCustomersStart = {
                type: ActionTypes.SEARCH_CUSTOMER_START,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.isLoading).toEqual(true);
        });
    });

    describe('fail actions', () => {
        it('should handle action of `getCustomersFail`', () => {
            const fakeAction: IGetCustomersFail = {
                type: ActionTypes.GET_CUSTOMERS_FAIL,
                payload: testErrorMessage,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.error).toEqual(testErrorMessage);
            expect(newState.isLoading).toEqual(false);
        });

        it('should handle action of `editCustomersFail`', () => {
            const fakeAction: IEditCustomerFail = {
                type: ActionTypes.EDIT_CUSTOMER_FAIL,
                payload: testErrorMessage,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.error).toEqual(testErrorMessage);
            expect(newState.isLoading).toEqual(false);
        });

        it('should handle action of `addCustomerFail`', () => {
            const fakeAction: IAddCustomerFail = {
                type: ActionTypes.ADD_CUSTOMER_FAIL,
                payload: testErrorMessage,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.error).toEqual(testErrorMessage);
            expect(newState.isLoading).toEqual(false);
        });

        it('should handle action of `searchCustomerFail`', () => {
            const fakeAction: ISearchCustomersFail = {
                type: ActionTypes.SEARCH_CUSTOMER_FAIL,
                payload: testErrorMessage,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.error).toEqual(testErrorMessage);
            expect(newState.isLoading).toEqual(false);
        });

        it('should handle action of `deleteCustomerFail`', () => {
            const fakeAction: IDeleteCustomerFail = {
                type: ActionTypes.DELETE_CUSTOMERS_FAIL,
                payload: testErrorMessage,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.error).toEqual(testErrorMessage);
            expect(newState.isLoading).toEqual(false);
        });
    });

    describe('success actions', () => {
        it('should handle action of `getCustomersSuccess`', () => {
            const fakeAction: IGetCustomersSuccess = {
                type: ActionTypes.GET_CUSTOMERS_SUCCESS,
                payload: testCustomers,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.customers).toEqual(testCustomers);
            expect(newState.isLoading).toEqual(false);
        });

        it('should handle action of `editCustomerSuccess`', () => {
            customersTestInitialState.customers = testCustomers;
            const updatedCustomer: ICustomer = {
                id: 2,
                firstName: 'edited sample',
                lastName: 'edited test',
                dob: '1980-01-01',
            };
            const fakeAction: IEditCustomerSuccess = {
                type: ActionTypes.EDIT_CUSTOMER_SUCCESS,
                payload: updatedCustomer,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.customers).toEqual(
                replaceCustomer(testCustomers, updatedCustomer)
            );
            expect(newState.isLoading).toEqual(false);
        });

        it('should handle action of `searchCustomersSuccess`', () => {
            customersTestInitialState.customers = testCustomers;
            const updatedCustomer: ICustomer = {
                id: 2,
                firstName: 'edited sample',
                lastName: 'edited test',
                dob: '1980-01-01',
            };
            const fakeAction: ISearchCustomersSuccess = {
                type: ActionTypes.SEARCH_CUSTOMER_SUCCESS,
                payload: { customers: testCustomers, searchTerm: 'earth' },
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.customers).toEqual(
                setSearchResult(testCustomers, 'earth')
            );
            expect(newState.isLoading).toEqual(false);
        });

        it('should handle action of `deleteCustomersSuccess`', () => {
            customersTestInitialState.customers = testCustomers;
            const fakeAction: IDeleteCustomerSuccess = {
                type: ActionTypes.DELETE_CUSTOMERS_SUCCESS,
                payload: 2,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.customers).toEqual(
                removeCustomer(testCustomers, 2)
            );
            expect(newState.isLoading).toEqual(false);
        });

        it('should handle action of `addCustomerSuccess`', () => {
            const newCustomer: ICustomer = {
                id: 100,
                firstName: 'new name',
                lastName: 'new last',
                dob: '0000-00-00',
            };
            const fakeAction: IAddCustomerSuccess = {
                type: ActionTypes.ADD_CUSTOMER_SUCCESS,
                payload: newCustomer,
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.customers).toEqual([
                ...customersTestInitialState.customers,
                fakeAction.payload,
            ]);
        });
    });

    describe('update action', () => {
        it('should handle action of `setUpdateCustomer`', () => {
            const fakeAction: ISetUpdateCustomer = {
                type: ActionTypes.SET_CUSTOMER_UPDATE,
                payload: {
                    isEditing: true,
                    selectedCustomer: testCustomers[2],
                },
            };
            const newState = customersReducer(
                customersTestInitialState,
                fakeAction
            );
            expect(newState.selectedCustomer).toEqual(testCustomers[2]);
            expect(newState.isEditing).toEqual(true);
        });
    });
});
