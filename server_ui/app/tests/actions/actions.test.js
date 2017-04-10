import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/actionCreators';
import {List, Map} from 'immutable';

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
    test('should create an action to update effects', () => {
        const effectsList = List([Map({
            effectType: 'reverb',
            effectID: 'reverb1',
            isBypassed: false,
            isSoloing: false
        })]);
        const expectedAction = {
            type: types.UPDATE_EFFECTS,
            options: {io: true},
            payload: {
                effectsList
            }
        };
        expect(actions.updateEffects(effectsList, {io: true})).toEqual(expectedAction);
    });
    test('should create an action to update a parameter value', () => {
        const effectID = 'reverb1';
        const paramName = 'Liveness';
        const paramValue = 0.874;
        const expectedAction = {
            type: types.UPDATE_PARAMETER_VALUE,
            options: {io: true},
            payload: {
                effectID,
                paramName,
                paramValue
            }
        };
        expect(actions.updateParameterValue(effectID, paramName, paramValue, {io: true})).toEqual(expectedAction);
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
    test('should create an action to remove an axis mapping', () => {
        const effectID = 'reverb1';
        const paramName = 'Liveness';
        const axis = 'x';
        const expectedAction = {
            type: types.REMOVE_MAPPING,
            options: {io: true},
            payload: {
                effectID,
                paramName,
                axis
            }
        };
        expect(actions.removeMapping(effectID, paramName, axis, {io: true})).toEqual(expectedAction);
    });
});