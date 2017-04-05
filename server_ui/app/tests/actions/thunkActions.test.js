import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/actionCreators';
import {List, Map} from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const createMockStore = configureMockStore([thunk]);

describe('thunk actions', () => {
    test('should create an action to add an effect and emit routes', () => {
        const store = createMockStore();
        spyOn(store, 'dispatch');
        const effectType = 'reverb';
        const effectID = 'reverb1';
        const effectsList = List([Map({
            effectType: effectType,
            effectID: effectID,
            isBypassed: false,
            isSoloing: false
        })]);
        store.dispatch(actions.addEffectAndEmit(effectType, effectID));
        // expect(store.dispatch).toHaveBeenCalledWith(actions.updateEffects(effectsList, {
        //     io: true,
        //     newEffect: effectID
        // }));
    });
    // test('should create an action to remove an effect', () => {
    //     const effectID = 'reverb1';
    //     const expectedAction = {
    //         type: types.REMOVE_EFFECT,
    //         options: {},
    //         payload: {
    //             effectID
    //         }
    //     };
    //     expect(actions.removeEffect(effectID)).toEqual(expectedAction);
    // });
    // test('should create an action to reorder effects', () => {
    //     const effectID = 'reverb1';
    //     const direction = 'left';
    //     const expectedAction = {
    //         type: types.REORDER_EFFECTS,
    //         options: {},
    //         payload: {
    //             effectID,
    //             direction
    //         }
    //     };
    //     expect(actions.reorderEffects(effectID, direction)).toEqual(expectedAction);
    // });
    // test('should create an action to toggle an effect bypass', () => {
    //     const effectID = 'reverb1';
    //     const expectedAction = {
    //         type: types.TOGGLE_BYPASS,
    //         options: {},
    //         payload: {
    //             effectID
    //         }
    //     };
    //     expect(actions.toggleBypass(effectID)).toEqual(expectedAction);
    // });
    // test('should create an action to toggle an effect solo', () => {
    //     const effectID = 'reverb1';
    //     const expectedAction = {
    //         type: types.TOGGLE_SOLO,
    //         options: {},
    //         payload: {
    //             effectID
    //         }
    //     };
    //     expect(actions.toggleSolo(effectID)).toEqual(expectedAction);
    // });
    // test('should create an action to map an axis to a parameter', () => {
    //     const mapToParameter = true;
    //     const axis = 'x';
    //     const effectID = 'reverb1';
    //     const paramName = 'Liveness';
    //     const expectedAction = {
    //         type: types.UPDATE_MAPPING,
    //         options: {},
    //         payload: {
    //             mapToParameter,
    //             axis,
    //             effectID,
    //             paramName
    //         }
    //     };
    //     expect(actions.updateMapping(mapToParameter, axis, effectID, paramName)).toEqual(expectedAction);
    // });
    // test('should create an action to remove an axis mapping', () => {
    //     const axis = 'x';
    //     const expectedAction = {
    //         type: types.REMOVE_MAPPING,
    //         options: {},
    //         payload: {
    //             axis
    //         }
    //     };
    //     expect(actions.removeMapping(axis)).toEqual(expectedAction);
    // });
});