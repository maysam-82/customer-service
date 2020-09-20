import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Root from '../../../Root';
import { App } from '../App';
import { CustomerForm } from '../../CustomerForm';
import Customers from '../../Customers/Customers';
import { IToast } from '../../../types/toast';

const toasts: IToast[] = [
    {
        toastId: '1001',
        toastMessage: '1001 test message',
        toastType: 'info',
    },
    {
        toastId: '1002',
        toastMessage: '1002 test message',
        toastType: 'success',
    },
    {
        toastId: '1003',
        toastMessage: '1003 test message',
        toastType: 'danger',
    },
];

describe('App Component', () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
        wrapper = mount(<App toasts={toasts} />, {
            wrappingComponent: Root,
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should  render `<CustomerForm /> component`', () => {
        expect(wrapper.find(CustomerForm)).toHaveLength(1);
    });

    it('should  render `<Customers /> component`', () => {
        expect(wrapper.find(Customers)).toHaveLength(1);
    });

    it('should pass `toasts` prop to Toast Component', () => {
        expect(wrapper.find('.info').text()).toEqual(toasts[0].toastMessage);
        expect(wrapper.find('.success').at(0).text()).toEqual(
            toasts[1].toastMessage
        );
        expect(wrapper.find('.danger').text()).toEqual(toasts[2].toastMessage);
    });
});
