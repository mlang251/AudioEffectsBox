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
        const {props, enzymeWrapper} = setup();
        const axes = ['X', 'Y', 'Z'];

        const h3Elements = enzymeWrapper.find('h3');
        expect(h3Elements.at(0).text()).toBe('Motion Tracking');
        expect(h3Elements.at(1).text()).toBe('Effects');

        const buttonElements = enzymeWrapper.find('button');
        const axisButtons = buttonElements.slice(0, 3);
        const effectButtons = buttonElements.slice(3);
        expect(buttonElements.length).toBe(props.effectsList.size + 3);
        axisButtons.forEach((button, index) => {
            expect(button.text()).toBe(`Map ${axes[index]}`);
        });
        effectButtons.forEach((button, index) => {
            expect(button.text()).toBe(`Add ${props.effectsList.get(index)}`);
        });
    });

    test('should call updateMapping when an axis button is clicked', () => {
        const {props, enzymeWrapper} = setup();
        const axes = ['x', 'y', 'z'];

        const axisButtons = enzymeWrapper.find('button').slice(0, 3);
        axisButtons.forEach((button, index) => {
            button.simulate('click');
            expect(props.updateMapping.mock.calls[index][0]).toBe(axes[index]);
        });
    });
    
    test('should call addEffect when an effect button is clicked', () => {
        const {props, enzymeWrapper} = setup();

        const effectButtons = enzymeWrapper.find('button').slice(3);
        effectButtons.forEach((button, index) => {
            button.simulate('click');
            expect(props.addEffect.mock.calls[index][0]).toBe(props.effectsList.get(index).toLowerCase());
            expect(props.addEffect.mock.calls.length).toBe(index + 1);
        });
    });
});