import {Map, fromJS} from 'immutable';
import {UPDATE_PARAMETER_VALUE} from '../../actions/actionTypes';
import parametersReducer, {initialState} from '../../reducers/parameters';
import defaults from '../../JSON/defaults.json';

describe('parameters reducer', () => {
    test('should return initial state', () => {
        expect(parametersReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(initialState);
    });
    test('should handle UPDATE_PARAMETER_VALUE', () => {
        expect(parametersReducer(Map({
            reverb1: Map({
                Wetness: 0,
                Liveness: 0,
                Crossover: 0,
                Damping: 0
            })
        }) , {
            type: UPDATE_PARAMETER_VALUE,
            payload: {
                effectID: 'reverb1',
                paramName: 'Liveness',
                paramValue: 0.321
            }
        })).toEqual(Map({
            reverb1: Map({
                Wetness: 0,
                Liveness: 0.321,
                Crossover: 0,
                Damping: 0
            })
        }));
    });
});