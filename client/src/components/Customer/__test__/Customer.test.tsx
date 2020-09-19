import { shallow } from 'enzyme';
import React from 'react';
import Customer, { ICustomerProps } from '../Customer';

const testCustomerProps: ICustomerProps = {
    id: 1000,
    firstName: 'sample first name',
    lastName: 'sample last name',
    dob: '1200-00-00',
    handleDelete: jest.fn(),
    handleEdit: jest.fn(),
};

describe('Customer Componenr', () => {
    const wrapper = shallow(<Customer {...testCustomerProps} />);
    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('li').at(0).hasClass('customerContainer'))
            .toBeTruthy;
        expect(
            wrapper.find('li').at(1).contains(testCustomerProps.firstName)
        ).toBeTruthy();
        expect(
            wrapper.find('li').at(2).contains(testCustomerProps.lastName)
        ).toBeTruthy();
        expect(
            wrapper.find('li').at(3).contains(testCustomerProps.dob)
        ).toBeTruthy();
    });
    describe('When user clicks on delete icon', () => {
        beforeEach(() => {
            wrapper.find('.customerActionDelete').simulate('click');
        });
        it('should invoke `handleDelete` function prop', () => {
            expect(testCustomerProps.handleDelete).toHaveBeenCalledTimes(1);
        });
    });
    describe('When user clicks on edit icon', () => {
        beforeEach(() => {
            wrapper.find('.customerActionEdit').simulate('click');
        });
        it('should invoke `handleEdit` function prop', () => {
            expect(testCustomerProps.handleEdit).toHaveBeenCalledTimes(1);
        });
    });
});
