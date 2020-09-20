import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { CustomerForm } from '../CustomerForm';
import { testCustomers } from '../../../fixtures/testData/testData';
import { ICustomerFormProps } from '../CustomerForm';

const testCutomerFormProps: ICustomerFormProps = {
    addCustomer: jest.fn(),
    setToast: jest.fn(),
    editCustomer: jest.fn(),
    setUpdateCustomer: jest.fn(),
    isLoading: false,
    customers: testCustomers,
    selectedCustomer: null,
    isEditing: false,
};

const inputData = {
    firstName: {
        event: {
            target: { value: testCustomers[2].firstName, name: 'firstName' },
        },
    },
    lastName: {
        event: {
            target: { value: testCustomers[2].lastName, name: 'lastName' },
        },
    },
    dob: { event: { target: { value: testCustomers[2].dob, name: 'dob' } } },
    form: { preventDefault: jest.fn() },
};

describe('CustomerForm Component', () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
        wrapper = mount(<CustomerForm {...testCutomerFormProps} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should render currectly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    describe('When user changes input value', () => {
        beforeEach(() => {
            wrapper
                .find('#firstName')
                .simulate('change', inputData.firstName.event);
            wrapper
                .find('#lastName')
                .simulate('change', inputData.lastName.event);
            wrapper.find('#dob').simulate('change', inputData.dob.event);
        });

        it('should update value of input elements', () => {
            expect(wrapper.find('#firstName').prop('value')).toEqual(
                inputData.firstName.event.target.value
            );
            expect(wrapper.find('#lastName').prop('value')).toEqual(
                inputData.lastName.event.target.value
            );
            expect(wrapper.find('#dob').prop('value')).toEqual(
                inputData.dob.event.target.value
            );
        });
    });

    describe('When user clicks on `Cancel` Button', () => {
        beforeEach(() => {
            wrapper.find('.cancel').simulate('click');
        });
        it('should call `setUpdateCustomer` action', () => {
            expect(testCutomerFormProps.setUpdateCustomer).toHaveBeenCalledWith(
                false,
                {
                    firstName: '',
                    lastName: '',
                    id: -1,
                    dob: '',
                }
            );
        });
    });

    describe('When `isEditing === true` and `selectedCustomer` has customer value ', () => {
        describe('If form is in editing form', () => {
            beforeEach(() => {
                wrapper.setProps({
                    ...testCutomerFormProps,
                    isEditing: true,
                    selectedCustomer: testCustomers[0],
                });
                wrapper.update();
            });
            it(`should update all inputs' value`, () => {
                expect(wrapper.find('#firstName').prop('value')).toEqual(
                    testCustomers[0].firstName
                );
                expect(wrapper.find('#lastName').prop('value')).toEqual(
                    testCustomers[0].lastName
                );
                expect(wrapper.find('#dob').prop('value')).toEqual(
                    testCustomers[0].dob
                );
            });
            it('should have button with class name of `info`', () => {
                expect(
                    wrapper.find('button').at(0).hasClass('info')
                ).toBeTruthy();
            });
        });
    });

    describe('When user submits form', () => {
        describe('If form is in `edit` mode and there is a `selectedCustomer` object', () => {
            beforeEach(() => {
                wrapper.setProps({
                    ...testCutomerFormProps,
                    isEditing: true,
                    selectedCustomer: testCustomers[0],
                });
                wrapper.update();
                wrapper.find('form').simulate('submit', inputData.form);
            });

            it('should invoke `event.preventDefault()`', () => {
                expect(inputData.form.preventDefault).toHaveBeenCalledTimes(1);
            });

            it('should invoke `editCustomer` action', () => {
                expect(testCutomerFormProps.editCustomer).toHaveBeenCalledWith(
                    testCustomers[0]
                );
            });
        });

        describe('If form is in `add` mode', () => {
            beforeEach(() => {
                wrapper
                    .find('#firstName')
                    .simulate('change', inputData.firstName.event);
                wrapper
                    .find('#lastName')
                    .simulate('change', inputData.lastName.event);
                wrapper.find('#dob').simulate('change', inputData.dob.event);
            });

            describe('If `customers` array is not empty', () => {
                beforeEach(() => {
                    wrapper.setProps({
                        ...testCutomerFormProps,
                        customers: testCustomers,
                    });
                    wrapper.update();
                    wrapper.find('form').simulate('submit', inputData.form);
                });

                it('should invoke `addCustomer` action', () => {
                    expect(testCutomerFormProps.addCustomer).toBeCalledWith(
                        expect.objectContaining({
                            firstName: testCustomers[2].firstName,
                            lastName: testCustomers[2].lastName,
                            dob: testCustomers[2].dob,
                        })
                    );
                });
            });

            describe('If one of inputs is empty', () => {
                beforeEach(() => {
                    wrapper.find('#firstName').simulate('change', {
                        target: { value: '', name: 'firstName' },
                    });
                    wrapper.find('form').simulate('submit', inputData.form);
                });
                it('should invoke `setToast` action', () => {
                    expect(testCutomerFormProps.setToast).toHaveBeenCalledWith(
                        'Invalid Data. Please enter data.',
                        'danger'
                    );
                });
            });
        });
    });
});
