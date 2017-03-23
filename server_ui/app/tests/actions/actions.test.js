import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/actionCreators';

describe('actions', () => {
    test('should create an action to update the message', () => {
        const message = 'Hello World';
        const expectedAction = {
            type: types.UPDATE_MESSAGE,
            payload: {
                message
            }
        };
        expect(actions.updateMessage(message)).toEqual(expectedAction);
    });
    test('should create an action to add an effect', () => {
        const effectType = 'reverb';
        const effectID = 'reverb1';
        const expectedAction = {
            type: types.ADD_EFFECT,
            payload: {
                effectType,
                effectID
            }
        };
        expect(actions.addEffect(effectType, effectID)).toEqual(expectedAction);
    });
    test('should create an action to remove an effect', () => {
        const effectID = 'reverb1';
        const expectedAction = {
            type: types.REMOVE_EFFECT,
            payload: {
                effectID
            }
        };
        expect(actions.removeEffect(effectID)).toEqual(expectedAction);
    });
    test('should create an action to turn on axis mapping mode', () => {
        const effectID = 'reverb1';
        const direction = 'left';
        const expectedAction = {
            type: types.REORDER_EFFECTS,
            payload: {
                effectID,
                direction
            }
        };
        expect(actions.reorderEffects(effectID, direction)).toEqual(expectedAction);
    });
    test('should create an action to toggle an effect bypass', () => {
        const effectID = 'reverb1';
        const expectedAction = {
            type: types.TOGGLE_BYPASS,
            payload: {
                effectID
            }
        };
        expect(actions.toggleBypass(effectID)).toEqual(expectedAction);
    });
    test('should create an action to toggle an effect solo', () => {
        const effectID = 'reverb1';
        const expectedAction = {
            type: types.TOGGLE_SOLO,
            payload: {
                effectID
            }
        };
        expect(actions.toggleSolo(effectID)).toEqual(expectedAction);
    });
    test('should create an action to receive Leap data', () => {
        const data = [0.281, 0.589, 0.354];
        const expectedAction = {
            type: types.RECEIVE_LEAP_DATA,
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
            payload: {
                axis
            }
        };
        expect(actions.removeMapping(axis)).toEqual(expectedAction);
    });
});