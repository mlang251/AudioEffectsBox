import {Map, List} from 'immutable';
import {RECEIVE_LEAP_DATA} from '../../actions/actionTypes';
import coordsReducer from '../../reducers/coords';

describe('coords reducer', () => {
    test('should return initial state', () => {
        expect(coordsReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(List([0, 0, 0]));
    });
    test('should handle RECEIVE_LEAP_DATA', () => {
        expect(coordsReducer(List([0.789, 0.456, 0.123]), {
            type: RECEIVE_LEAP_DATA,
            payload: {
                data: List([0.284, 0.321, 0.987])
            }
        })).toEqual(List([0.284, 0.321, 0.987]));
    });
});