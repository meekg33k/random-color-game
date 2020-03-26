import React from 'react';
import { shallow, mount } from 'enzyme';
import Game from '../Game';
import ColorMarker from '../ColorMarker';
import { ColorDisplayBox } from '../ColorDisplayBox';
import { DEFAULT_BACKGROUND_COLOR, WIN_STATUS_MESSAGE, FAIL_STATUS_MESSAGE } from '../../Utils';

describe('renders the Game component', () => {
	const wrapper = shallow(<Game />);
	it('renders the ColorDisplayBox component', () => {
		expect(wrapper.find(ColorDisplayBox)).toHaveLength(1);
	});

	it('renders the default number of ColorMarkers component', () => {
		expect(wrapper.find(ColorMarker)).toHaveLength(4);
	});

	it('renders the default background color as white', () => {
		expect(wrapper.state().selectedColor).toBe(DEFAULT_BACKGROUND_COLOR);
	});

	it('initializes `colors` to array of size 4', () => {
		expect(wrapper.state().colors).toHaveLength(4);
	});

	it('sets `isGameRunning` state attribute to `true` when the Start Game button is clicked', () => {
		wrapper.find('button').simulate('click');
		expect(wrapper.state().isGameRunning).toBe(true);
	});

	it('calls `randomizeColorSequence` when the game is started', () => {
		const instance = wrapper.instance();
		const mockRandomizeColorSequenceFn = jest.fn();
		instance.randomizeColorSequence = mockRandomizeColorSequenceFn;
		wrapper.find('button').simulate('click');
		expect(mockRandomizeColorSequenceFn).toHaveBeenCalled();
	});

	it('updates `awaitingUserInput` state to true when `readyForUserInput` is triggered', () => {
		const instance = wrapper.instance();
		instance.readyForUserInput();
		expect(wrapper.state().awaitingUserInput).toBe(true);
	});

	it('sets button state to disabled when `isGameRunning` is `true`', () => {
		wrapper.find('button').simulate('click');
		expect(wrapper.find('button').prop('disabled')).toBe(true);
	});

	it('increments `numberOfGames` by 1 when game ends', () => {
		const instance = wrapper.instance();
		instance.endGame(false);
		expect(wrapper.state().numberOfGames).toBe(1);
	});

	it('increments `numberOfWins` by 1 when game ends and user wins', () => {
		const instance = wrapper.instance();
		instance.endGame(true);
		expect(wrapper.state().numberOfWins).toBe(1);
	});

	it('displays a win status message when the game ends and the user wins', () => {
		const instance = wrapper.instance();
		instance.endGame(true);
		expect(wrapper.state().statusMessage).toBe(WIN_STATUS_MESSAGE);
	});

	it('displays a fail status message when the game ends and the user fails', () => {
		const instance = wrapper.instance();
		instance.endGame(false);
		expect(wrapper.state().statusMessage).toBe(FAIL_STATUS_MESSAGE);
	});
});
