import {Map} from 'immutable';
import {MAP_TO_PARAMETER, REMOVE_MAPPING} from '../actions/actionTypes';

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
    const {effectID, paramName, axis} = action.payload;
    switch (action.type) {
        case MAP_TO_PARAMETER:
            return state.updateIn([axis, 'effectID'], value => effectID).updateIn([axis, 'param'], value => paramName)
            break;
        case REMOVE_MAPPING:
            return state.updateIn([axis, 'effectID'], value => undefined).updateIn([axis, 'param'], value => undefined);
            break;
        default:
            return state;
            break;
    }
}

export default xyzMap;