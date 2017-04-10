import {Map} from 'immutable';
import {UPDATE_PARAMETER_VALUE} from '../../actions/actionTypes';
import parametersReducer, {createInitialState} from '../../reducers/parameters';

describe('parameters reducer', () => {
    // test('should return initial state', () => {
    //     expect(parametersReducer(undefined, {
    //         type: undefined,
    //         payload: {}
    //     })).toEqual(createInitialState());
    // });
    test('should handle UPDATE_PARAMETER_VALUE', () => {
        expect(parametersReducer(Map({
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        }), {
            type: UPDATE_PARAMETER_VALUE,
            payload: {
                effectID: 'reverb1',
                paramName: 'Liveness',
                paramValue: 0.321
            }
        })).toEqual(Map({
            effects: Map({
                reverb1: Map({
                    Wetness: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Liveness: Map({
                        paramValue: 0.321,
                        axisName: ''
                    }),
                    Crossover: Map({
                        paramValue: 0,
                        axisName: ''
                    }),
                    Damping: Map({
                        paramValue: 0,
                        axisName: ''
                    })
                })
            })
        }));
    });
});