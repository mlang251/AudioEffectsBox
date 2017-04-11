import React from 'react';
import {shallow} from 'enzyme';
import Parameter from '../../components/Parameter';
import Draggable from 'react-draggable';
import {List} from 'immutable';

const setup = (assignProps) => {
    const initialProps = {
        value: 0,
        isMapping: false,
        axisToMap: '',
        handleDrag: jest.fn(), 
        handleClick: jest.fn(), 
    }
    const props = Object.assign({}, initialProps, assignProps);
    const enzymeWrapper = shallow(<Parameter {...props} />);
    return {
        props,
        enzymeWrapper
    };
};

describe('Sidebar', () => {
    test('should render self and children', () => {
        const {props, enzymeWrapper} = setup();
        const clickableDiv = enzymeWrapper.find('div#setParameter');
        expect(clickableDiv.length).toBe(1);
        const fader = enzymeWrapper.find(Draggable);
        expect(fader.length).toBe(1);
        const faderProps = {
            axis: 'y',
            bounds: 'parent',
            disabled: props.isMapping,
            position: {x: 0, y: 85}
        }
        const faderPropsKeys = Object.keys(faderProps);
        for (let i = 0; i < faderPropsKeys.length; i++) {
            const thisKey = faderPropsKeys[i];
            expect(fader.prop(thisKey)).toEqual(faderProps[thisKey]);
        }
        expect(typeof fader.prop('onDrag')).toBe('function');
    });
    test('should not call handleClick when div is clicked', () => {
        const {props, enzymeWrapper} = setup();
        const clickableDiv = enzymeWrapper.find('div#setParameter');
        clickableDiv.simulate('click');
        expect(props.handleClick.mock.calls.length).toBe(0);
    });
    test('should call handleClick when div is clicked', () => {
        const {props, enzymeWrapper} = setup({
            isMapping: true,
            axisToMap: 'x'
        });
        const clickableDiv = enzymeWrapper.find('div#setParameter');
        clickableDiv.simulate('click');
        expect(props.handleClick.mock.calls[0][0]).toBe(props.axisToMap);
    });
    test('should call handleDrag when fader is dragged', () => {
        // const {props, enzymeWrapper} = setup();
        // const fader = enzymeWrapper.find(Draggable);
        // fader.simulate('drag');
        // console.log(props.handleDrag.mock.calls)
        // expect(props.handleDrag.mock.calls[0][0]).toBe();
    });
});