import Spinner from '../Spinner';
import React from 'react';
import { shallow } from 'enzyme';

describe('Spinner component', () => {
    const wrapper = shallow(<Spinner />);
    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(
            wrapper.find('div').at(0).hasClass('spinnerContainer')
        ).toBeTruthy();
        expect(wrapper.find('.spinnerLine').length).toEqual(6);
    });
});
