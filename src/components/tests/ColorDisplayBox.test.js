import React from 'react';
import { shallow } from 'enzyme';
import { ColorDisplayBox } from '../ColorDisplayBox';

describe('renders the ColorDisplayBox component', () => {
	test('sets the background color from `selectedColor` props', () => {
		const wrapper = shallow(<ColorDisplayBox selectedColor='red' />);
		expect(wrapper.props().style.backgroundColor).toBe('red');
	});
});
