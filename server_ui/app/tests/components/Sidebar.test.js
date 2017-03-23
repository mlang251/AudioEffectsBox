import React from 'react';
import {shallow} from 'enzyme';
import Sidebar from '../../ReduxComponents/Sidebar';
import {list as effectsList} from '../../JSON/effects.json';
import {List} from 'immutable';

const setup = () => {
    const props = {
        addEffect: jest.fn(), 
        updateMapping: jest.fn(), 
        effectsList: List(effectsList)
    };
    const enzymeWrapper = shallow(<Sidebar {...props} />);
    return {
        props,
        enzymeWrapper
    };
};

describe('Sidebar', () => {
    test('should render self', () => {
        const {enzymeWrapper} = setup();

        const h3Elements = enzymeWrapper.find('h3')
        console.log('h3 elements')
        console.log(h3Elements)
        console.log('h1')
        console.log(enzymeWrapper.find('h1'));
        expect(h3Elements[0].text()).toBe('Motion Tracking');
        expect(h3Elements[1].text()).toBe('Effect');
    });
});