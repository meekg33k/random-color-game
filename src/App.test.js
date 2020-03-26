import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import Game from './components/Game';

describe('renders the App', () => {
  test('renders the header text', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.text()).toContain('Random Color Game');
  });

  test('renders the Game component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Game)).toHaveLength(1);
  });
});


