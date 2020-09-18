import { combineReducers } from 'redux';
import { IToast } from '../../types/toast';
import customersReducer, { ICustomersState } from './customers/customers';
import toastsReducer from './toasts/toasts';

export interface IStoreState {
    customers: ICustomersState;
    toasts: IToast[];
}

const reducers = combineReducers<IStoreState>({
    customers: customersReducer,
    toasts: toastsReducer,
});

export default reducers;
