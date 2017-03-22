import {List, Map} from 'immutable';
import {ADD_EFFECT, REMOVE_EFFECT, REORDER_EFFECTS, TOGGLE_BYPASS, TOGGLE_SOLO} from '../actions/actionTypes';
import effects from '../reducers/effects';

describe('effects reducer', () => {
    test('should return initial state', () => {
        expect(effects(undefined, {
            type: undefined,
            payload: {}
        })).toEqual(List());
    });
    test('should handle ADD_EFFECT', () => {
        const effectType = 'reverb'
        const effectID = 'reverb1'
        expect(effects(List(), {
            type: ADD_EFFECT,
            payload: {
                effectType,
                effectID
            }
        })).toEqual(List([
            Map({
                effectType,
                effectID,
                isBypassed: false,
                isSoloing: false
            })
        ]));
    });
    test('should handle REMOVE_EFFECT', () => {
        const initialState = List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: false
            })
        ]);
        const effectID = 'reverb1';
        expect(effects(initialState, {
            type: REMOVE_EFFECT,
            payload: {
                effectID
            }
        })).toEqual(List());
    });
    test('should handle REORDER_EFFECTS to the left', () => {
        const initialState = List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: false
            }),
            Map({
                effectType: 'reverb',
                effectID: 'reverb2',
                isBypassed: false,
                isSoloing: false
            }),
            Map({
                effectType: 'reverb',
                effectID: 'reverb3',
                isBypassed: false,
                isSoloing: false
            })
        ]);
        const effectID = 'reverb3';
        const direction = 'left';
        expect(effects(initialState, {
            type: REORDER_EFFECTS,
            payload: {
                effectID,
                direction
            }
        })).toEqual(List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: false
            }),
            Map({
                effectType: 'reverb',
                effectID: 'reverb3',
                isBypassed: false,
                isSoloing: false
            }),
            Map({
                effectType: 'reverb',
                effectID: 'reverb2',
                isBypassed: false,
                isSoloing: false
            })
        ]));
    });
    test('should handle REORDER_EFFECTS to the right', () => {
        const initialState = List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: false
            }),
            Map({
                effectType: 'reverb',
                effectID: 'reverb2',
                isBypassed: false,
                isSoloing: false
            }),
            Map({
                effectType: 'reverb',
                effectID: 'reverb3',
                isBypassed: false,
                isSoloing: false
            })
        ]);
        const effectID = 'reverb1';
        const direction = 'right';
        expect(effects(initialState, {
            type: REORDER_EFFECTS,
            payload: {
                effectID,
                direction
            }
        })).toEqual(List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb2',
                isBypassed: false,
                isSoloing: false
            }),
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: false
            }),
            Map({
                effectType: 'reverb',
                effectID: 'reverb3',
                isBypassed: false,
                isSoloing: false
            })
        ]));
    });
    test('should handle TOGGLE_BYPASS', () => {
        const initialState = List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: false
            })
        ]);
        const effectID = 'reverb1';
        expect(effects(initialState, {
            type: TOGGLE_BYPASS,
            payload: {
                effectID
            }
        })).toEqual(List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: true,
                isSoloing: false
            })
        ]));
    });
        test('should handle TOGGLE_SOLO', () => {
        const initialState = List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: false
            })
        ]);
        const effectID = 'reverb1';
        expect(effects(initialState, {
            type: TOGGLE_SOLO,
            payload: {
                effectID
            }
        })).toEqual(List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: true
            })
        ]));
    });
});