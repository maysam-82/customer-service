import {
    IAddToast,
    IRemoveToast,
} from './../../../actions/toasts/toasts.types';
import toastsReducer from '../toasts';
import { ActionTypes } from './../../../actions/actionTypes';
import { IToast } from '../../../../types/toast';

let toastsTestInitialState: IToast[] = [];

const testToast: IToast = {
    toastId: 'sample id',
    toastMessage: 'sample message',
    toastType: 'info',
};

const testToasts: IToast[] = [testToast];

describe('toasts reducer', () => {
    describe('default action', () => {
        it('should return initial state', () => {
            const newState = toastsReducer(undefined, {} as any);
            expect(newState).toEqual(toastsTestInitialState);
        });
        it('should handle ', () => {
            const newState = toastsReducer(toastsTestInitialState, '' as any);
            expect(newState).toEqual(toastsTestInitialState);
        });
    });

    describe('toasts actions', () => {
        it('should handle action of `addToast`', () => {
            const fakeAction: IAddToast = {
                type: ActionTypes.ADD_TOAST,
                payload: testToast,
            };
            const newState = toastsReducer(toastsTestInitialState, fakeAction);
            expect(newState).toEqual([testToast]);
        });

        it('should handle action of `removeToast`', () => {
            toastsTestInitialState = [...toastsTestInitialState, ...testToasts];
            const fakeAction: IRemoveToast = {
                type: ActionTypes.REMOVE_TOAST,
                payload: testToast.toastId,
            };
            const newState = toastsReducer(toastsTestInitialState, fakeAction);
            expect(newState).toEqual([]);
        });
    });
});
