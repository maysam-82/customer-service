import React from 'react';
import { mount, shallow } from 'enzyme';
import Toast from '../Toast';
import { IToast } from '../../../types/toast';

const toasts: IToast[] = [
    { toastId: '1001', toastMessage: '1001 test message', toastType: 'info' },
    {
        toastId: '1002',
        toastMessage: '1002 test message',
        toastType: 'success',
    },
    { toastId: '1003', toastMessage: '1003 test message', toastType: 'danger' },
];

describe('Toast Component', () => {
    const wrapper = mount(<Toast toasts={toasts} />);
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('div').at(1).hasClass('info')).toBeTruthy();
        expect(wrapper.find('div').at(2).hasClass('success')).toBeTruthy();
        expect(wrapper.find('div').at(3).hasClass('danger')).toBeTruthy();
    });
    describe('When there is no toast data', () => {
        beforeEach(() => {
            wrapper.setProps({ toasts: [] });
        });
        it('should render nothing', () => {
            expect(wrapper.find('div').length).toEqual(1);
        });
    });
    describe('When there is no `toastType` in toast object', () => {
        beforeEach(() => {
            wrapper.setProps({
                toasts: [
                    {
                        toastId: '1001',
                        toastMessage: '1001 test message',
                    },
                ],
            });
        });
        it('should render toast with class of `danger`', () => {
            expect(wrapper.find('div').at(1).hasClass('danger')).toBeTruthy();
        });
    });
});
