import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import SidebarContainer from '../../ReduxComponents/SidebarContainer';
import Sidebar from '../../ReduxComponents/Sidebar';
import {list as effectsList, effects} from '../../JSON/effects';
import configureMockStore from 'redux-mock-store';
import {List} from 'immutable';
import {UPDATE_MAPPING, ADD_EFFECT} from '../../actions/actionTypes';
const {ROUTE} = require('../../actions/actionOptions').ioTypes;
const {ADD} = require('../../actions/actionOptions').ioFlags;

const store = configureMockStore()({});

const setup = () => {
    const props = {
        effectsList: List(effectsList),
        usedIDs: List()
    };
    
    spyOn(store, 'dispatch');
    const enzymeWrapper = mount(
        <Provider store = {store}>
            <SidebarContainer {...props} />
        </Provider>
    );
    return {
        props,
        enzymeWrapper
    };
};

describe('SidebarContainer', () => {
    test('should render self and children', () => {
        const {props, enzymeWrapper} = setup();
        const sidebarContainerWrapper = enzymeWrapper.find(SidebarContainer)
        const sidebarWrapper = sidebarContainerWrapper.find(Sidebar);
        expect(sidebarContainerWrapper.length).toBe(1);
        expect(sidebarWrapper.length).toBe(1);
        expect(sidebarWrapper.props().effectsList).toBe(props.effectsList);
    });
    test('should dispatch updateMapping for each axis button clicked', () => {
        const {props, enzymeWrapper} = setup();
        const axes = ['x', 'y', 'z'];

        const sidebarContainerWrapper = enzymeWrapper.find(SidebarContainer)
        const sidebarWrapper = sidebarContainerWrapper.find(Sidebar);
        const axisButtons = sidebarWrapper.find('button').slice(0, 3);
        axisButtons.forEach((button, index) => {
            button.simulate('click');
            expect(store.dispatch).toHaveBeenCalledWith(
                {
                    type: UPDATE_MAPPING,
                    options: {},
                    payload: {
                        mapToParameter: false,
                        axis: axes[index],
                        effectID: undefined,
                        paramName: undefined
                    }
                }
            );
        });
    });
    test('should dispatch addEffect for each effect button clicked', () => {
        const {props, enzymeWrapper} = setup();
        const axes = ['x', 'y', 'z'];

        const sidebarContainerWrapper = enzymeWrapper.find(SidebarContainer)
        const sidebarWrapper = sidebarContainerWrapper.find(Sidebar);
        const effectButtons = sidebarWrapper.find('button').slice(3);
        effectButtons.forEach((button, index) => {
            button.simulate('click');
            const effectType = props.effectsList.get(index).toLowerCase();
            const effectID = effects[effectType].IDs[0];
            expect(store.dispatch).toHaveBeenCalledWith(
                {
                    type: ADD_EFFECT,
                    options: {
                        io: true,
                        ioType: ROUTE,
                        ioFlag: ADD
                    },
                    payload: {
                        effectType: effectType,
                        effectID: effectID
                    }
                }
            );
        });
    });
});