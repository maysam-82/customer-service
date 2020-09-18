import { IToast } from '../../../types/toast';
import { ActionTypes, ToastActions } from './../../actions/actionTypes';

const toastsInitialState: IToast[] = [];

const toastsReducer = (state = toastsInitialState, action: ToastActions) => {
    switch (action.type) {
        case ActionTypes.ADD_TOAST:
            return [...state, action.payload];
        case ActionTypes.REMOVE_TOAST:
            return state.filter((toast) => toast.toastId !== action.payload);
        default:
            return state;
    }
};

export default toastsReducer;
