import {Map} from 'immutable';
import {UPDATE_MAPPING, REMOVE_MAPPING} from '../actions/actionTypes';

const initialState = Map({
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
});

const xyzMap = (state = initialState, action) => {
    const {mapToParameter, axis, effectID, paramName} = action.payload;
    switch (action.type) {
        case UPDATE_MAPPING:
            return mapToParameter ?
                state.updateIn([axis, 'effectID'], value => effectID).updateIn([axis, 'param'], value => paramName) :
                state;
        case REMOVE_MAPPING:
            return state.updateIn([axis, 'effectID'], value => undefined).updateIn([axis, 'param'], value => undefined);
        default:
            return state;
    }
}

export default xyzMap;