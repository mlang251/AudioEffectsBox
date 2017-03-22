import {Map, fromJS} from 'immutable';
import {UPDATE_PARAMETER_VALUE} from '../../actions/actionTypes';
import parameterValuesReducer from '../../reducers/parameterValues';
import defaults from '../../JSON/defaults.json';
const initialState = fromJS(defaults);

describe('parameter values reducer', () => {
    test('should return initial state', () => {
        expect(parameterValuesReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(initialState);
    });
    test('should handle UPDATE_PARAMETER_VALUE', () => {
        expect(parameterValuesReducer(Map({
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