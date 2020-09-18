import { IToast } from '../../../types/toast';
import { ActionTypes } from './../actionTypes';

export interface IAddToast {
    type: ActionTypes.ADD_TOAST;
    payload: IToast;
}

export interface IRemoveToast {
    type: ActionTypes.REMOVE_TOAST;
    payload: string;
}
