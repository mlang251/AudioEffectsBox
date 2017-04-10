import {Map} from 'immutable';
import {UPDATE_MAPPING} from '../../actions/actionTypes';
import mappingReducer from '../../reducers/mapping';

describe('mapping reducer', () => {
    test('should return initial state', () => {
        expect(mappingReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(Map({
            isMapping: false,
            currentAxis: ''
        }));
    });
    test('should handle UPDATE_MAPPING - turn on mapping mode', () => {
        expect(mappingReducer(Map({
            isMapping: false,
            currentAxis: ''
        }), {
            type: UPDATE_MAPPING,
            payload: {
                mapToParameter: false,
                axis: 'x'
            }
        })).toEqual(Map({
            isMapping: true,
            currentAxis: 'x'
        }));
    });
    test('should handle UPDATE_MAPPING - turn off mapping mode', () => {
        expect(mappingReducer(Map({
            isMapping: true,
            currentAxis: 'x'
        }), {
            type: UPDATE_MAPPING,
            payload: {
                mapToParameter: true,
                axis: 'x',
                effectID: 'reverb1',
                paramName: 'Liveness'
            }
        })).toEqual(Map({
            isMapping: false,
            currentAxis: ''
        }));
    });
});