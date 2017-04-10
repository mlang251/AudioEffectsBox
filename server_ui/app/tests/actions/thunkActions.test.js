import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/actionCreators';
import {List, Map} from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {createInitialState as parameterInitialState} from '../../reducers/parameters';
const createMockStore = configureMockStore([thunk]);

describe('thunk actions', () => {
    test('should create an action to check used IDs and add the first ID in usableIDs', () => {
        const store = createMockStore(Map({
            effects: List()
        }));
        const effectType = 'reverb';
        const usableIDs = ['reverb1', 'reverb2'];
        const effectsList = List([Map({
            effectType: effectType,
            effectID: usableIDs[0],
            isBypassed: false,
            isSoloing: false
        })]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.checkUsedIDs(effectType, usableIDs));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to check used IDs and add the second ID in usableIDs', () => {
        const store = createMockStore(Map({
            effects: List([
                Map({
                    effectType: 'reverb',
                    effectID: 'reverb1',
                    isBypassed: false,
                    isSoloing: false
                })
            ])
        }));
        const effectType = 'reverb';
        const usableIDs = ['reverb1', 'reverb2'];
        const effectsList = List([
            Map({
                effectType: effectType,
                effectID: usableIDs[0],
                isBypassed: false,
                isSoloing: false
            }),
            Map({
                effectType: effectType,
                effectID: usableIDs[1],
                isBypassed: false,
                isSoloing: false
            }),
        ]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.checkUsedIDs(effectType, usableIDs));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to check used IDs and not add any IDs', () => {
        const store = createMockStore(Map({
            effects: List([
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
            ])
        }));
        const effectType = 'reverb';
        const usableIDs = ['reverb1', 'reverb2'];
        const expectedActions = []
        store.dispatch(actions.checkUsedIDs(effectType, usableIDs));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to add an effect and emit routes', () => {
        const store = createMockStore(Map({
            effects: List()
        }));
        const effectType = 'reverb';
        const effectID = 'reverb1';
        const effectsList = List([Map({
            effectType: effectType,
            effectID: effectID,
            isBypassed: false,
            isSoloing: false
        })]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.addEffectAndEmit(effectType, effectID));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to remove an effect and emit routes', () => {
        const store = createMockStore(Map({
            effects: List([
                Map({
                    effectType: 'reverb',
                    effectID: 'reverb1',
                    isBypassed: false,
                    isSoloing: false
                })
            ])
        }));
        const effectID = 'reverb1';
        const expectedActions = [
            actions.updateEffects(List(), {
                io: true
            })
        ]
        store.dispatch(actions.removeEffectAndEmit(effectID));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to reorder effects - move effect to the left', () => {
        const store = createMockStore(Map({
            effects: List([
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
            ])
        }));
        const effectID = 'reverb2';
        const direction = 'left';
        const effectsList = List([
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
        ]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.reorderEffectsAndEmit(effectID, direction));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to reorder effects - move effect to the right', () => {
        const store = createMockStore(Map({
            effects: List([
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
            ])
        }));
        const effectID = 'reverb1';
        const direction = 'right';
        const effectsList = List([
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
        ]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.reorderEffectsAndEmit(effectID, direction));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to toggle an effect bypass - turn on bypass', () => {
        const store = createMockStore(Map({
            effects: List([
                Map({
                    effectType: 'reverb',
                    effectID: 'reverb1',
                    isBypassed: false,
                    isSoloing: false
                })
            ])
        }));
        const effectID = 'reverb1';
        const effectsList = List([
            Map({
                effectType: 'reverb',
                effectID,
                isBypassed: true,
                isSoloing: false
            })
        ]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.toggleBypassAndEmit(effectID));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to toggle an effect bypass - turn off bypass', () => {
        const store = createMockStore(Map({
            effects: List([
                Map({
                    effectType: 'reverb',
                    effectID: 'reverb1',
                    isBypassed: true,
                    isSoloing: false
                })
            ])
        }));
        const effectID = 'reverb1';
        const effectsList = List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: false
            })
        ]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.toggleBypassAndEmit(effectID));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to toggle an effect solo - turn on solo', () => {
        const store = createMockStore(Map({
            effects: List([
                Map({
                    effectType: 'reverb',
                    effectID: 'reverb1',
                    isBypassed: false,
                    isSoloing: false
                })
            ])
        }));
        const effectID = 'reverb1';
        const effectsList = List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: true
            })
        ]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.toggleSoloAndEmit(effectID));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to toggle an effect solo - turn on solo and turn off bypass', () => {
        const store = createMockStore(Map({
            effects: List([
                Map({
                    effectType: 'reverb',
                    effectID: 'reverb1',
                    isBypassed: true,
                    isSoloing: false
                })
            ])
        }));
        const effectID = 'reverb1';
        const effectsList = List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: true
            })
        ]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.toggleSoloAndEmit(effectID));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to toggle an effect solo - turn on solo and turn off other effect solo', () => {
        const store = createMockStore(Map({
            effects: List([
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
                    isSoloing: true
                })
            ])
        }));
        const effectID = 'reverb1';
        const effectsList = List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: true
            }),
            Map({
                effectType: 'reverb',
                effectID: 'reverb2',
                isBypassed: false,
                isSoloing: false
            })
        ]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.toggleSoloAndEmit(effectID));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to toggle an effect solo - turn off solo', () => {
        const store = createMockStore(Map({
            effects: List([
                Map({
                    effectType: 'reverb',
                    effectID: 'reverb1',
                    isBypassed: false,
                    isSoloing: true
                })
            ])
        }));
        const effectID = 'reverb1';
        const effectsList = List([
            Map({
                effectType: 'reverb',
                effectID: 'reverb1',
                isBypassed: false,
                isSoloing: false
            })
        ]);
        const expectedActions = [
            actions.updateEffects(effectsList, {
                io: true
            })
        ]
        store.dispatch(actions.toggleSoloAndEmit(effectID));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to set an axis mapping', () => {
        const store = createMockStore(Map({
            parameters: parameterInitialState()
        }));
        const axis = 'x';
        const effectID = 'reverb1';
        const paramName = 'Liveness';
        const expectedActions = [
            actions.updateMapping(true, axis, effectID, paramName, {
                io: true
            })
        ];
        store.dispatch(actions.setMappingAndEmit(axis, effectID, paramName));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to set an axis mapping - nullify the current axis mapping', () => {
        const axis = 'x';
        const effectID = 'reverb1';
        const paramName1 = 'Liveness';
        const paramName2 = 'Wetness';
        const tempState = parameterInitialState();
        const initialState = tempState.updateIn(['effects', effectID, paramName1, 'axisName'], value => axis)
            .updateIn(['mappings', axis, 'effectID'], value => effectID)
            .updateIn(['mappings', axis, 'paramName'], value => paramName1)
        const store = createMockStore(Map({
            parameters: initialState
        }));
        const expectedActions = [
            actions.removeMapping(effectID, paramName1, axis, {
                io: true
            }),
            actions.updateMapping(true, axis, effectID, paramName2, {
                io: true
            })
        ];
        store.dispatch(actions.setMappingAndEmit(axis, effectID, paramName2));
        expect(store.getActions()).toEqual(expectedActions);
    });
    test('should create an action to set an axis mapping - nullify another axis mapping', () => {
        const axis1 = 'x';
        const axis2 = 'y';
        const effectID = 'reverb1';
        const paramName = 'Liveness';
        const tempState = parameterInitialState();
        const initialState = tempState.updateIn(['effects', effectID, paramName, 'axisName'], value => axis1)
            .updateIn(['mappings', axis1, 'effectID'], value => effectID)
            .updateIn(['mappings', axis1, 'paramName'], value => paramName)
        const store = createMockStore(Map({
            parameters: initialState
        }));
        const expectedActions = [
            actions.removeMapping(effectID, paramName, axis1, {
                io: true
            }),
            actions.updateMapping(true, axis2, effectID, paramName, {
                io: true
            })
        ];
        store.dispatch(actions.setMappingAndEmit(axis2, effectID, paramName));
        expect(store.getActions()).toEqual(expectedActions);
    });
});