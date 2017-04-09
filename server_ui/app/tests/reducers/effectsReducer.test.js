import {List, Map} from 'immutable';
import {UPDATE_EFFECTS} from '../../actions/actionTypes';
import effectsReducer from '../../reducers/effects';

describe('effects reducer', () => {
    test('should return initial state', () => {
        expect(effectsReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(List());
    });
    test('should handle UPDATE_EFFECTS', () => {
        const effectsList = List([Map({
            effectType: 'reverb',
            effectID: 'reverb1',
            isBypassed: false,
            isSoloing: false
        })]);
        expect(effectsReducer(List(), {
            type: UPDATE_EFFECTS,
            options: {},
            payload: {
                effectsList
            }
        })).toEqual(effectsList);
    });
});