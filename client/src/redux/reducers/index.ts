import { combineReducers } from 'redux';
import customersReducer, { ICustomersState } from './customers/customers';

export interface IStoreState {
    customers: ICustomersState;
}

const reducers = combineReducers<IStoreState>({
    customers: customersReducer,
});

export default reducers;
