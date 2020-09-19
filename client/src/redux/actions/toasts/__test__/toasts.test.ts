import { ActionTypes } from './../../actionTypes';
import * as toasts from '../toasts';

import { IToast } from '../../../../types/toast';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
    toasts: {} as IToast[],
});

const testToast = {
    toastMessage: 'sample test',
    toastType: 'danger',
    toastId: 'sample id',
};

describe('toasts action creators', () => {
    it('should set an `action creator` to set add toast', () => {
        const expectedAction = {
            type: ActionTypes.ADD_TOAST,
            payload: testToast,
        };
        expect(toasts.addToast(testToast)).toEqual(expectedAction);
    });
    it('should set an `action creator` to remove add toast', () => {
        const expectedAction = {
            type: ActionTypes.REMOVE_TOAST,
            payload: testToast.toastId,
        };
        expect(toasts.removeToast(testToast.toastId)).toEqual(expectedAction);
    });
});

describe('setToast', () => {
    it('should dispatch `addToast` and `removeToast`', (done) => {
        const time = 5;
        const expectedActions = [
            {
                type: ActionTypes.ADD_TOAST,
                payload: testToast,
            },
            {
                type: ActionTypes.REMOVE_TOAST,
                payload: testToast.toastId,
            },
        ];
        store.dispatch<any>(
            toasts.setToast(testToast.toastMessage, testToast.toastType, time)
        );
        setTimeout(() => {
            expect(store.getActions().length).toEqual(expectedActions.length);
            expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
            expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
            done();
        }, time);
    });
});
