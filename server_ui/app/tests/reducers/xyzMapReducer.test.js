import {Map} from 'immutable';
import {UPDATE_MAPPING, REMOVE_MAPPING} from '../../actions/actionTypes';
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
    test('should handle UPDATE_MAPPING - map axis to parameter', () => {
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
            type: UPDATE_MAPPING,
            payload: {
                mapToParameter: true,
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
    test('should handle UPDATE_MAPPING - do not map axis to parameter', () => {
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
            type: UPDATE_MAPPING,
            payload: {
                mapToParameter: false,
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
    test('should handle REMOVE_MAPPING', () => {
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