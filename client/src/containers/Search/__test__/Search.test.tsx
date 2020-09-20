import React from 'react';
import Root from '../../../Root';
import { Search } from '../Search';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';

describe('Search Component', () => {
    let wrapper: ReactWrapper;
    const searchCustomers = jest.fn();

    beforeEach(() => {
        wrapper = mount(<Search searchCustomers={searchCustomers} />);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    describe('When user change input value', () => {
        jest.useFakeTimers();
        beforeEach(() => {
            wrapper
                .find('.searchInput')
                .simulate('change', { target: { value: 'test search' } });
        });

        it('should update value of search input and call `searchCustomers` after `500ms`', () => {
            expect(wrapper.find('.searchInput').prop('value')).toEqual(
                'test search'
            );
            // invoke `searchCustomers` after `500ms`
            act(() => {
                jest.advanceTimersByTime(500);
            });
            expect(searchCustomers).toHaveBeenCalledWith('test search');
        });
    });

    describe('When user submit form', () => {
        const formEventMocked = { preventDefault: jest.fn() };
        beforeEach(() => {
            wrapper.find('form').simulate('submit', formEventMocked);
        });
        it('should call `event.preventDefault()`', () => {
            expect(formEventMocked.preventDefault).toHaveBeenCalledTimes(1);
        });
    });
});
