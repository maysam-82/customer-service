import { Dispatch } from 'redux';
import { IToast } from '../../../types/toast';
import { ActionTypes } from './../actionTypes';
import { IAddToast, IRemoveToast } from './toasts.types';
import { getUniqueId } from './utils';

const addToast = (toast: IToast): IAddToast => ({
    type: ActionTypes.ADD_TOAST,
    payload: toast,
});

const removeToast = (toastId: string): IRemoveToast => ({
    type: ActionTypes.REMOVE_TOAST,
    payload: toastId,
});

export const setToast = (
    toastMessage: string,
    toastType: string,
    fadeoutTime = 3000
) => (dispatch: Dispatch) => {
    // Get unique id
    const toastId = getUniqueId();
    const toast: IToast = { toastMessage, toastType, toastId };

    dispatch(addToast(toast));

    // Removes relevant toast message after `fadeoutTime`
    setTimeout(() => {
        dispatch(removeToast(toastId));
    }, fadeoutTime);
};
