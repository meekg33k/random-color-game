import React from 'react';
import { mount } from 'enzyme';
import ColorMarker from '../ColorMarker';

describe('renders the ColorMarker component', () => {
	const mockHandleMarkerClick = jest.fn();
	const wrapper = mount(
		<ColorMarker
			color='red'
			handleMarkerClick={mockHandleMarkerClick}
			gameMode={true} />
	);

	it('reads the background color from `color` props', () => {
		expect(wrapper.props().color).toBe('red');
	});

	it('triggers the onClick handler when clicked only if `gameMode` is true', () => {
		wrapper.simulate('click');
		expect(mockHandleMarkerClick).toHaveBeenCalledWith('red');
	});

	it('sets the animate state to true if clicked when `gameMode` is true', () => {
		wrapper.simulate('click');
		expect(wrapper.state().animate).toBe(true);
	});

	it('sets the animate state to false when the `handleAnimationEnd` function fires', () => {
		wrapper.simulate('click');
		const instance = wrapper.instance();
		instance.handleAnimationEnd();
		expect(wrapper.state().animate).toBe(false);
	});

	it('does not trigger the onClick handler when clicked if `gameMode` is false', () => {
		const nonGameModeWrapper = mount(
			<ColorMarker
				color='red'
				handleMarkerClick={mockHandleMarkerClick}
				gameMode={false} />
		);
		nonGameModeWrapper.simulate('click');
		expect(nonGameModeWrapper.state().animate).toBe(false);
	});
});
