import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { testCustomers } from '../../../fixtures/testData/testData';
import Root from '../../../Root';
import { Search } from '../../Search/Search';
import Spinner from '../../../components/Spinner/Spinner';
import { Customers, ICustomersProps } from '../Customers';

const testCustomersProps: ICustomersProps = {
    customers: testCustomers,
    isLoading: false,
    getCustomers: jest.fn(),
    deleteCustomer: jest.fn(),
    setUpdateCustomer: jest.fn(),
};

describe('Customers component', () => {
    let wrapper: ReactWrapper;
    beforeEach(() => {
        wrapper = mount(<Customers {...testCustomersProps} />, {
            wrappingComponent: Root,
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render Search component', () => {
        expect(wrapper.find(Search).length).toEqual(1);
    });

    describe('When user clicks on delete icon', () => {
        beforeEach(() => {
            wrapper.find('.customerActionDelete').at(0).simulate('click');
        });

        it('should invoke `deleteCustomer` action ', () => {
            expect(testCustomersProps.deleteCustomer).toHaveBeenCalledWith(
                testCustomers[0].id
            );
        });
    });

    describe('When user clicks on edit icon', () => {
        beforeEach(() => {
            wrapper.find('.customerActionEdit').at(0).simulate('click');
        });

        it('should invoke `setUpdateCustomer` action ', () => {
            expect(testCustomersProps.setUpdateCustomer).toHaveBeenCalledWith(
                true,
                testCustomers[0]
            );
        });
    });

    describe('When `isLoading` is equal to true', () => {
        beforeEach(() => {
            wrapper.setProps({ isLoading: true });
            wrapper.update();
        });

        it('should render `Spinner` component', () => {
            expect(wrapper.find(Spinner).length).toEqual(1);
        });
    });
});
