import * as customers from '../customers';
import { ICustomer } from './../../../../types/customers.d';
import { ICustomersState } from '../../../reducers/customers/customers';
import { ActionTypes } from './../../actionTypes';
import { testCustomers } from '../../../../fixtures/testData/testData';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('customers action creators', () => {
    const baseUrl = `http://localhost:5001/customers`;

    describe('action creators success', () => {
        it('should create an `action creator` to set customers', () => {
            const expectedAction = {
                type: ActionTypes.GET_CUSTOMERS_SUCCESS,
                payload: testCustomers,
            };
            expect(customers.getCustomersSuccess(testCustomers)).toEqual(
                expectedAction
            );
        });
        it('should create an `action creator` to delete a customer with id of 1', () => {
            const expectedAction = {
                type: ActionTypes.DELETE_CUSTOMERS_SUCCESS,
                payload: 1,
            };
            expect(customers.deleteCustomerSuccess(1)).toEqual(expectedAction);
        });
        it('should create an `action creator` to edit a customer', () => {
            const expectedAction = {
                type: ActionTypes.EDIT_CUSTOMER_SUCCESS,
                payload: testCustomers[1],
            };
            expect(customers.editCustomerSuccess(testCustomers[1])).toEqual(
                expectedAction
            );
        });
        it('should create an `action creator` to add new customer', () => {
            const newCustomer: ICustomer = {
                id: 100,
                firstName: 'test',
                lastName: 'test lastname',
                dob: '2010-02-02',
            };

            const expectedAction = {
                type: ActionTypes.ADD_CUSTOMER_SUCCESS,
                payload: newCustomer,
            };
            expect(customers.addCustomerSuccess(newCustomer)).toEqual(
                expectedAction
            );
        });
        it('should create an `action creator` to search a customer with search term `earth`', () => {
            const expectedAction = {
                type: ActionTypes.SEARCH_CUSTOMER_SUCCESS,
                payload: { customers: testCustomers, searchTerm: 'earth' },
            };
            expect(
                customers.searchCustomersSuccess(testCustomers, 'earth')
            ).toEqual(expectedAction);
        });
    });

    describe('action creators fail', () => {
        const errorTestMessage = 'error test';
        it('should create an `action creator` to fail get customers', () => {
            const expectedAction = {
                type: ActionTypes.GET_CUSTOMERS_FAIL,
                payload: errorTestMessage,
            };
            expect(customers.getCustomersFail(errorTestMessage)).toEqual(
                expectedAction
            );
        });
        it('should create an `action creator` to fail delete customer', () => {
            const expectedAction = {
                type: ActionTypes.DELETE_CUSTOMERS_FAIL,
                payload: errorTestMessage,
            };
            expect(customers.deleteCustomerFail(errorTestMessage)).toEqual(
                expectedAction
            );
        });
        it('should create an `action creator` to fail edit customer', () => {
            const expectedAction = {
                type: ActionTypes.EDIT_CUSTOMER_FAIL,
                payload: errorTestMessage,
            };
            expect(customers.editCustomerFail(errorTestMessage)).toEqual(
                expectedAction
            );
        });
        it('should create an `action creator` to fail add customer', () => {
            const expectedAction = {
                type: ActionTypes.ADD_CUSTOMER_FAIL,
                payload: errorTestMessage,
            };
            expect(customers.addCustomerFail(errorTestMessage)).toEqual(
                expectedAction
            );
        });
        it('should create an `action creator` to fail search customer', () => {
            const expectedAction = {
                type: ActionTypes.SEARCH_CUSTOMER_FAIL,
                payload: errorTestMessage,
            };
            expect(customers.searchCustomersFail(errorTestMessage)).toEqual(
                expectedAction
            );
        });
    });

    describe('action creators start', () => {
        it('should create an `action creator` to start getting customers', () => {
            const expectedAction = { type: ActionTypes.GET_CUSTOMERS_START };
            expect(customers.getCustomersStart()).toEqual(expectedAction);
        });
        it('should create an `action creator` to start deleting customers', () => {
            const expectedAction = { type: ActionTypes.DELETE_CUSTOMERS_START };
            expect(customers.deleteCustomerStart()).toEqual(expectedAction);
        });
        it('should create an `action creator` to start editing customers', () => {
            const expectedAction = { type: ActionTypes.EDIT_CUSTOMER_START };
            expect(customers.editCustomerStart()).toEqual(expectedAction);
        });
        it('should create an `action creator` to start adding customers', () => {
            const expectedAction = { type: ActionTypes.ADD_CUSTOMER_START };
            expect(customers.addCustomerStart()).toEqual(expectedAction);
        });
        it('should create an `action creator` to start searching customers', () => {
            const expectedAction = { type: ActionTypes.SEARCH_CUSTOMER_START };
            expect(customers.searchCustomersStart()).toEqual(expectedAction);
        });
    });
    describe('action creators for update mode', () => {
        const expectedAction = {
            type: ActionTypes.SET_CUSTOMER_UPDATE,
            payload: { isEditing: true, selectedCustomer: testCustomers[0] },
        };
        expect(customers.setUpdateCustomer(true, testCustomers[0])).toEqual(
            expectedAction
        );
    });
    describe('async actions', () => {
        describe('getCustomers', () => {
            describe('get customers action creator succeed', () => {
                beforeEach(() => {
                    moxios.install();
                    moxios.stubRequest(`http://localhost:5001/customers`, {
                        status: 200,
                        response: testCustomers,
                    });
                });

                afterEach(() => {
                    moxios.uninstall();
                });

                it('should dispatch `getCustomersStart` and `getCustomersSuccess` ', (done) => {
                    const store = mockStore({
                        customers: {} as ICustomersState,
                    });
                    moxios.wait(() => {
                        const expectedActions = [
                            { type: ActionTypes.GET_CUSTOMERS_START },
                            {
                                type: ActionTypes.GET_CUSTOMERS_SUCCESS,
                                payload: testCustomers,
                            },
                        ];

                        return store
                            .dispatch<any>(customers.getCustomers())
                            .then(() => {
                                expect(store.getActions()).toEqual(
                                    expectedActions
                                );
                                done();
                            });
                    });
                });
            });
            describe('get customers action creator failed', () => {
                beforeEach(() => {
                    moxios.install();
                    moxios.stubRequest(`http://localhost:5001/customers`, {
                        status: 404,
                        response: '',
                    });
                });

                afterEach(() => {
                    moxios.uninstall();
                });

                it('should dispatch `getCustomersStart` and `getCustomersFail` and `setToast`', (done) => {
                    const store = mockStore({
                        customers: {} as ICustomersState,
                    });
                    moxios.wait(() => {
                        const expectedActions = [
                            { type: ActionTypes.GET_CUSTOMERS_START },
                            {
                                type: ActionTypes.GET_CUSTOMERS_FAIL,
                                payload: 'Request failed with status code 404',
                            },
                            {
                                type: ActionTypes.ADD_TOAST,
                                payload: {
                                    toastMessage:
                                        'Request failed with status code 404',
                                    toastType: 'danger',
                                },
                            },
                        ];

                        return store
                            .dispatch<any>(customers.getCustomers())
                            .then(() => {
                                expect(store.getActions().length).toEqual(
                                    expectedActions.length
                                );
                                expect(store.getActions()[0].type).toEqual(
                                    expectedActions[0].type
                                );
                                expect(store.getActions()[1].type).toEqual(
                                    expectedActions[1].type
                                );
                                expect(store.getActions()[2].type).toEqual(
                                    expectedActions[2].type
                                );
                                done();
                            });
                    });
                });
            });
        });

        describe('deleteCustomer', () => {
            describe('delete succeed', () => {
                beforeEach(() => {
                    moxios.install();
                    moxios.stubRequest(`${baseUrl}/1`, {
                        status: 200,
                        response: {},
                    });
                });

                afterEach(() => {
                    moxios.uninstall();
                });

                it('should dispatch `deleteCustomerStart` and `deleteCustomerSuccess` ', (done) => {
                    const store = mockStore({
                        customers: {} as ICustomersState,
                    });
                    moxios.wait(() => {
                        const expectedActions = [
                            { type: ActionTypes.DELETE_CUSTOMERS_START },
                            {
                                type: ActionTypes.DELETE_CUSTOMERS_SUCCESS,
                                payload: 1,
                            },
                        ];

                        return store
                            .dispatch<any>(customers.deleteCustomer(1))
                            .then(() => {
                                expect(store.getActions()).toEqual(
                                    expectedActions
                                );
                                done();
                            });
                    });
                });
            });
            describe('delete customer action creator failed', () => {
                beforeEach(() => {
                    moxios.install();
                    moxios.stubRequest(`${baseUrl}/1`, {
                        status: 404,
                        response: '',
                    });
                });

                afterEach(() => {
                    moxios.uninstall();
                });

                it('should dispatch `deleteCustomerStart` and `deleteCustomerFail` and `setToast`', (done) => {
                    const store = mockStore({
                        customers: {} as ICustomersState,
                    });
                    moxios.wait(() => {
                        const expectedActions = [
                            { type: ActionTypes.DELETE_CUSTOMERS_START },
                            {
                                type: ActionTypes.DELETE_CUSTOMERS_FAIL,
                                payload: 'Request failed with status code 404',
                            },
                            {
                                type: ActionTypes.ADD_TOAST,
                                payload: {
                                    toastMessage:
                                        'Request failed with status code 404',
                                    toastType: 'danger',
                                },
                            },
                        ];

                        return store
                            .dispatch<any>(customers.deleteCustomer(1))
                            .then(() => {
                                expect(store.getActions().length).toEqual(
                                    expectedActions.length
                                );
                                expect(store.getActions()[0].type).toEqual(
                                    expectedActions[0].type
                                );
                                expect(store.getActions()[1].type).toEqual(
                                    expectedActions[1].type
                                );
                                expect(store.getActions()[2].type).toEqual(
                                    expectedActions[2].type
                                );
                                done();
                            });
                    });
                });
            });
        });

        describe('addCustomer', () => {
            const addCustomer: ICustomer = {
                id: 200,
                firstName: 'test',
                lastName: 'test lastname',
                dob: '2010-02-02',
            };

            describe('add customer succeed', () => {
                beforeEach(() => {
                    moxios.install();
                    moxios.stubRequest(baseUrl, {
                        status: 200,
                        response: addCustomer,
                    });
                });

                afterEach(() => {
                    moxios.uninstall();
                });

                it('should dispatch `addCustomerStart` and `addCustomerSuccess` and `setToast`', (done) => {
                    const store = mockStore({
                        customers: {} as ICustomersState,
                    });
                    moxios.wait(() => {
                        const expectedActions = [
                            { type: ActionTypes.ADD_CUSTOMER_START },
                            {
                                type: ActionTypes.ADD_CUSTOMER_SUCCESS,
                                payload: addCustomer,
                            },
                            {
                                type: ActionTypes.ADD_TOAST,
                                payload: {
                                    toastMessage: 'Customer Added.',
                                    toastType: 'success',
                                },
                            },
                        ];

                        return store
                            .dispatch<any>(customers.addCustomer(addCustomer))
                            .then(() => {
                                expect(store.getActions().length).toEqual(
                                    expectedActions.length
                                );
                                done();
                            });
                    });
                });
            });
            describe('add customer action creator failed', () => {
                beforeEach(() => {
                    moxios.install();
                    moxios.stubRequest(baseUrl, {
                        status: 404,
                        response: '',
                    });
                });

                afterEach(() => {
                    moxios.uninstall();
                });

                it('should dispatch `addCustomerStart` and `addCustomerFail` and `setToast`', (done) => {
                    const store = mockStore({
                        customers: {} as ICustomersState,
                    });
                    moxios.wait(() => {
                        const expectedActions = [
                            { type: ActionTypes.ADD_CUSTOMER_START },
                            {
                                type: ActionTypes.ADD_CUSTOMER_FAIL,
                                payload: 'Request failed with status code 404',
                            },
                            {
                                type: ActionTypes.ADD_TOAST,
                                payload: {
                                    toastMessage:
                                        'Request failed with status code 404',
                                    toastType: 'danger',
                                },
                            },
                        ];

                        return store
                            .dispatch<any>(customers.addCustomer(addCustomer))
                            .then(() => {
                                expect(store.getActions().length).toEqual(
                                    expectedActions.length
                                );
                                expect(store.getActions()[0].type).toEqual(
                                    expectedActions[0].type
                                );
                                expect(store.getActions()[1].type).toEqual(
                                    expectedActions[1].type
                                );
                                expect(store.getActions()[2].type).toEqual(
                                    expectedActions[2].type
                                );
                                done();
                            });
                    });
                });
            });
        });

        describe('editCustomer', () => {
            const editCustomer: ICustomer = {
                id: 2,
                firstName: 'edited test',
                lastName: 'test edited',
                dob: '1990-01-01',
            };

            describe('edit customer succeed', () => {
                beforeEach(() => {
                    moxios.install();
                    moxios.stubRequest(`${baseUrl}/${editCustomer.id}`, {
                        status: 200,
                        response: editCustomer,
                    });
                });

                afterEach(() => {
                    moxios.uninstall();
                });

                it('should dispatch `editCustomerStart` and `editCustomerSuccess` and `setToast`', (done) => {
                    const store = mockStore({
                        customers: {} as ICustomersState,
                    });
                    moxios.wait(() => {
                        const expectedActions = [
                            { type: ActionTypes.EDIT_CUSTOMER_START },
                            {
                                type: ActionTypes.EDIT_CUSTOMER_SUCCESS,
                                payload: editCustomer,
                            },
                            {
                                type: ActionTypes.ADD_TOAST,
                                payload: {
                                    toastMessage: 'Customer Edited.',
                                    toastType: 'info',
                                },
                            },
                        ];

                        return store
                            .dispatch<any>(customers.editCustomer(editCustomer))
                            .then(() => {
                                expect(store.getActions().length).toEqual(
                                    expectedActions.length
                                );
                                done();
                            });
                    });
                });
            });
            describe('edit customer action creator failed', () => {
                beforeEach(() => {
                    moxios.install();
                    moxios.stubRequest(`${baseUrl}/${editCustomer.id}`, {
                        status: 404,
                        response: '',
                    });
                });

                afterEach(() => {
                    moxios.uninstall();
                });

                it('should dispatch `editCustomerStart` and `editCustomerFail` and `setToast`', (done) => {
                    const store = mockStore({
                        customers: {} as ICustomersState,
                    });
                    moxios.wait(() => {
                        const expectedActions = [
                            { type: ActionTypes.EDIT_CUSTOMER_START },
                            {
                                type: ActionTypes.EDIT_CUSTOMER_FAIL,
                                payload: 'Request failed with status code 404',
                            },
                            {
                                type: ActionTypes.ADD_TOAST,
                                payload: {
                                    toastMessage:
                                        'Request failed with status code 404',
                                    toastType: 'danger',
                                },
                            },
                        ];

                        return store
                            .dispatch<any>(customers.editCustomer(editCustomer))
                            .then(() => {
                                expect(store.getActions().length).toEqual(
                                    expectedActions.length
                                );
                                expect(store.getActions()[0].type).toEqual(
                                    expectedActions[0].type
                                );
                                expect(store.getActions()[1].type).toEqual(
                                    expectedActions[1].type
                                );
                                expect(store.getActions()[2].type).toEqual(
                                    expectedActions[2].type
                                );
                                done();
                            });
                    });
                });
            });
        });

        describe('searchCustomer', () => {
            const searchTermTest = 'earth';
            describe('search customer succeed', () => {
                beforeEach(() => {
                    moxios.install();
                    moxios.stubRequest(`${baseUrl}`, {
                        status: 200,
                        response: testCustomers,
                    });
                });

                afterEach(() => {
                    moxios.uninstall();
                });

                it('should dispatch `searchCustomersStart` and `searchCustomersSuccess`', (done) => {
                    const store = mockStore({
                        customers: {} as ICustomersState,
                    });
                    moxios.wait(() => {
                        const expectedActions = [
                            { type: ActionTypes.SEARCH_CUSTOMER_START },
                            {
                                type: ActionTypes.SEARCH_CUSTOMER_SUCCESS,
                                payload: {
                                    customers: testCustomers,
                                    searchTerm: searchTermTest,
                                },
                            },
                        ];

                        return store
                            .dispatch<any>(
                                customers.searchCustomers(searchTermTest)
                            )
                            .then(() => {
                                expect(store.getActions()).toEqual(
                                    expectedActions
                                );
                                done();
                            });
                    });
                });
            });
            describe('edit customer action creator failed', () => {
                beforeEach(() => {
                    moxios.install();
                    moxios.stubRequest(`${baseUrl}`, {
                        status: 404,
                        response: '',
                    });
                });

                afterEach(() => {
                    moxios.uninstall();
                });

                it('should dispatch `editCustomerSuccess` and `editCustomerFail` and `setToast`', (done) => {
                    const store = mockStore({
                        customers: {} as ICustomersState,
                    });
                    moxios.wait(() => {
                        const expectedActions = [
                            { type: ActionTypes.SEARCH_CUSTOMER_START },
                            {
                                type: ActionTypes.SEARCH_CUSTOMER_FAIL,
                                payload: 'Request failed with status code 404',
                            },
                            {
                                type: ActionTypes.ADD_TOAST,
                                payload: {
                                    toastMessage:
                                        'Request failed with status code 404',
                                    toastType: 'danger',
                                },
                            },
                        ];

                        return store
                            .dispatch<any>(
                                customers.searchCustomers(searchTermTest)
                            )
                            .then(() => {
                                expect(store.getActions().length).toEqual(
                                    expectedActions.length
                                );
                                expect(store.getActions()[0].type).toEqual(
                                    expectedActions[0].type
                                );
                                expect(store.getActions()[1].type).toEqual(
                                    expectedActions[1].type
                                );
                                expect(store.getActions()[2].type).toEqual(
                                    expectedActions[2].type
                                );
                                done();
                            });
                    });
                });
            });
        });
    });
});
