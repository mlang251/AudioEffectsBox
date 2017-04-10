import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import thunk from 'redux-thunk';
import SidebarContainer from '../../components/SidebarContainer';
import Sidebar from '../../components/Sidebar';
import {list as effectsList, effects} from '../../JSON/effects';
import configureMockStore from 'redux-mock-store';
import {List, Map} from 'immutable';
import {UPDATE_MAPPING, UPDATE_EFFECTS} from '../../actions/actionTypes';
import {updateEffects, updateMapping} from '../../actions/actionCreators';


const setup = () => {
    const props = {
        effectsList: List(effectsList),
        usedIDs: List()
    };
    
    const store = configureMockStore([thunk])(Map({
        effects: List()
    }));

    const enzymeWrapper = mount(
        <Provider store = {store}>
            <SidebarContainer {...props} />
        </Provider>
    );
    return {
        props,
        enzymeWrapper,
        store
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
        const {props, enzymeWrapper, store} = setup();
        const axes = ['x', 'y', 'z'];

        const sidebarContainerWrapper = enzymeWrapper.find(SidebarContainer)
        const sidebarWrapper = sidebarContainerWrapper.find(Sidebar);
        const axisButtons = sidebarWrapper.find('button').slice(0, 3);
        axisButtons.forEach((button, index) => {
            button.simulate('click');
            const expectedActions = [updateMapping(false, axes[index])];
            expect(store.getActions()).toEqual(expectedActions);
            store.clearActions();
        });
    });
    test('should dispatch addEffect for each effect button clicked', () => {
        const {props, enzymeWrapper, store} = setup();
        const axes = ['x', 'y', 'z'];

        const sidebarContainerWrapper = enzymeWrapper.find(SidebarContainer)
        const sidebarWrapper = sidebarContainerWrapper.find(Sidebar);
        const effectButtons = sidebarWrapper.find('button').slice(3);
        effectButtons.forEach((button, index) => {
            button.simulate('click');
            const effectType = props.effectsList.get(index).toLowerCase();
            const effectID = effects[effectType].IDs[0];
            const signalChain = List([Map({
                effectType,
                effectID,
                isBypassed: false,
                isSoloing: false
            })]);
            const expectedActions = [updateEffects(signalChain, {io: true})];
            expect(store.getActions()).toEqual(expectedActions);
            store.clearActions();
        });
    });
});