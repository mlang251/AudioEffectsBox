import {Map} from 'immutable';
import {TOGGLE_MAPPING} from '../../actions/actionTypes';
import mappingReducer from '../../reducers/mapping';

describe('mapping reducer', () => {
    test('should return initial state', () => {
        expect(mappingReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(Map());
    });
    test('should handle TOGGLE_MAPPING - turn on mapping mode', () => {
        expect(mappingReducer(Map({
            isMapping: false,
            currentAxis: ''
        }), {
            type: TOGGLE_MAPPING,
            payload: {
                axis: 'x'
            }
        })).toEqual(Map({
            isMapping: true,
            currentAxis: 'x'
        }));
    });
    test('should handle TOGGLE_MAPPING - turn off mapping mode', () => {
        expect(mappingReducer(Map({
            isMapping: true,
            currentAxis: 'x'
        }), {
            type: TOGGLE_MAPPING,
            payload: {}
        })).toEqual(Map({
            isMapping: false,
            currentAxis: ''
        }));
    });
});