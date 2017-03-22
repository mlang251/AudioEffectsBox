import {Map} from 'immutable';
import {MAP_TO_PARAMETER, REMOVE_MAPPING} from '../../actions/actionTypes';
import xyzMapReducer from '../../reducers/xyzMap';

describe('xyzMap reducer', () => {
    test('should return initial state', () => {
        expect(xyzMapReducer(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(Map({
            x: Map({
                effectID: undefined,
                param: undefined
            }),
            y: Map({
                effectID: undefined,
                param: undefined
            }),
            z: Map({
                effectID: undefined,
                param: undefined
            })
        }));
    });
    test('should handle MAP_TO_PARAMETER', () => {
        expect(xyzMapReducer(Map({
            x: Map({
                effectID: undefined,
                param: undefined
            }),
            y: Map({
                effectID: undefined,
                param: undefined
            }),
            z: Map({
                effectID: undefined,
                param: undefined
            })
        }), {
            type: MAP_TO_PARAMETER,
            payload: {
                effectID: 'reverb1',
                paramName: 'Liveness',
                axis: 'x'
            }
        })).toEqual(Map({
            x: Map({
                effectID: 'reverb1',
                param: 'Liveness'
            }),
            y: Map({
                effectID: undefined,
                param: undefined
            }),
            z: Map({
                effectID: undefined,
                param: undefined
            })
        }))
    });
    test('should handle MAP_TO_PARAMETER', () => {
        expect(xyzMapReducer(Map({
            x: Map({
                effectID: 'reverb1',
                param: 'Liveness'
            }),
            y: Map({
                effectID: undefined,
                param: undefined
            }),
            z: Map({
                effectID: undefined,
                param: undefined
            })
        }), {
            type: REMOVE_MAPPING,
            payload: {
                axis: 'x'
            }
        })).toEqual(Map({
            x: Map({
                effectID: undefined,
                param: undefined
            }),
            y: Map({
                effectID: undefined,
                param: undefined
            }),
            z: Map({
                effectID: undefined,
                param: undefined
            })
        }))
    });
});