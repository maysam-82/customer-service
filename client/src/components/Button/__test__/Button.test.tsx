import React from 'react';
import { shallow } from 'enzyme';
import Button, { IButtonProps } from '../Button';

const buttonProps: IButtonProps = {
    type: 'cancel',
    handleClick: jest.fn(),
    children: 'test',
};

describe('Button Component', () => {
    const wrapper = shallow<IButtonProps>(
        <Button {...buttonProps}>test</Button>
    );

    it('should render button correctly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('button').hasClass('cancel')).toBeTruthy();
        expect(wrapper.find('button').hasClass('buttonContainer')).toBeTruthy();
    });

    it('should have title with value of `test` ', () => {
        expect(wrapper.find('button').text()).toEqual('test');
    });

    it('should have class of `danger`', () => {
        wrapper.setProps({ type: 'danger' });
        expect(wrapper.find('button').hasClass('danger')).toBeTruthy();
    });

    it('should have class of `success`', () => {
        wrapper.setProps({ type: 'success' });
        expect(wrapper.find('button').hasClass('success')).toBeTruthy();
    });

    it('should have class of `info`', () => {
        wrapper.setProps({ type: 'info' });
        expect(wrapper.find('button').hasClass('info')).toBeTruthy();
    });

    describe('When user click on Button', () => {
        beforeEach(() => {
            wrapper.find('button').simulate('click');
        });
        it('should invoke `handleClick` function prop', () => {
            expect(buttonProps.handleClick).toHaveBeenCalledTimes(1);
        });
    });
});
