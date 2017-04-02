import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/actionCreators';
import {List, Map} from 'immutable';
const {ROUTE, UPDATE_PARAMETER, XYZ_MAP} = require('../../actions/actionOptions').ioTypes;
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const createMockStore = configureMockStore([thunk]);

describe('actions', () => {
    test('should create an action to update the message', () => {
        const message = 'Hello World';
        const expectedAction = {
            type: types.UPDATE_MESSAGE,
            options: {},
            payload: {
                message
            }
        };
        expect(actions.updateMessage(message)).toEqual(expectedAction);
    });
    test('should create an action to update effects', () => {
        const effectsList = List([Map({
            effectType: 'reverb',
            effectID: 'reverb1',
            isBypassed: false,
            isSoloing: false
        })]);
        const expectedAction = {
            type: types.UPDATE_EFFECTS,
            options: {},
            payload: {
                effectsList
            }
        };
        expect(actions.updateEffects(effectsList)).toEqual(expectedAction);
    });
    test('should create an action to add an effect and emit routes', () => {
        const dispatch = jest.fn();
        const effectType = 'reverb';
        const effectID = 'reverb1';
        const effectsList = List([Map({
            effectType: effectType,
            effectID: effectID,
            isBypassed: false,
            isSoloing: false
        })]);
        const thunk = actions.addEffectAndEmitRoute(effectType, effectID);
        thunk(dispatch);
        expect(dispatch).toHaveBeenCalledWith(actions.updateEffects(effectsList, {
            io: true,
            ioType: ROUTE
        }));
    });
    // test('should create an action to remove an effect', () => {
    //     const effectID = 'reverb1';
    //     const expectedAction = {
    //         type: types.REMOVE_EFFECT,
    //         options: {},
    //         payload: {
    //             effectID
    //         }
    //     };
    //     expect(actions.removeEffect(effectID)).toEqual(expectedAction);
    // });
    // test('should create an action to reorder effects', () => {
    //     const effectID = 'reverb1';
    //     const direction = 'left';
    //     const expectedAction = {
    //         type: types.REORDER_EFFECTS,
    //         options: {},
    //         payload: {
    //             effectID,
    //             direction
    //         }
    //     };
    //     expect(actions.reorderEffects(effectID, direction)).toEqual(expectedAction);
    // });
    // test('should create an action to toggle an effect bypass', () => {
    //     const effectID = 'reverb1';
    //     const expectedAction = {
    //         type: types.TOGGLE_BYPASS,
    //         options: {},
    //         payload: {
    //             effectID
    //         }
    //     };
    //     expect(actions.toggleBypass(effectID)).toEqual(expectedAction);
    // });
    // test('should create an action to toggle an effect solo', () => {
    //     const effectID = 'reverb1';
    //     const expectedAction = {
    //         type: types.TOGGLE_SOLO,
    //         options: {},
    //         payload: {
    //             effectID
    //         }
    //     };
    //     expect(actions.toggleSolo(effectID)).toEqual(expectedAction);
    // });
    test('should create an action to receive Leap data', () => {
        const data = [0.281, 0.589, 0.354];
        const expectedAction = {
            type: types.RECEIVE_LEAP_DATA,
            options: {},
            payload: {
                data
            }
        };
        expect(actions.receiveLeapData(data)).toEqual(expectedAction);
    });
    test('should create an action to receive Leap status', () => {
        const address = '/BoundStatus';
        const args = [1];
        const expectedAction = {
            type: types.RECEIVE_LEAP_STATUS,
            options: {},
            payload: {
                address,
                args
            }
        };
        expect(actions.receiveLeapStatus(address, args)).toEqual(expectedAction);
    });
    test('should create an action to update a parameter value', () => {
        const effectID = 'reverb1';
        const paramName = 'Liveness';
        const paramValue = 0.874;
        const expectedAction = {
            type: types.UPDATE_PARAMETER_VALUE,
            options: {},
            payload: {
                effectID,
                paramName,
                paramValue
            }
        };
        expect(actions.updateParameterValue(effectID, paramName, paramValue)).toEqual(expectedAction);
    });
    test('should create an action to turn on axis mapping mode', () => {
        const mapToParameter = false;
        const axis = 'x';
        const expectedAction = {
            type: types.UPDATE_MAPPING,
            options: {},
            payload: {
                mapToParameter,
                axis
            }
        };
        expect(actions.updateMapping(mapToParameter, axis)).toEqual(expectedAction);
    });
    test('should create an action to map an axis to a parameter', () => {
        const mapToParameter = true;
        const axis = 'x';
        const effectID = 'reverb1';
        const paramName = 'Liveness';
        const expectedAction = {
            type: types.UPDATE_MAPPING,
            options: {},
            payload: {
                mapToParameter,
                axis,
                effectID,
                paramName
            }
        };
        expect(actions.updateMapping(mapToParameter, axis, effectID, paramName)).toEqual(expectedAction);
    });
    test('should create an action to remove an axis mapping', () => {
        const axis = 'x';
        const expectedAction = {
            type: types.REMOVE_MAPPING,
            options: {},
            payload: {
                axis
            }
        };
        expect(actions.removeMapping(axis)).toEqual(expectedAction);
    });
});