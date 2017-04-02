import {Map} from 'immutable';
import {UPDATE_MAPPING, REMOVE_MAPPING} from '../../actions/actionTypes';

const initialState = Map({
    x: Map({
        effectID: undefined,
        paramName: undefined,
        axisName: 'x'
    }),
    y: Map({
        effectID: undefined,
        paramName: undefined,
        axisName: 'y'
    }),
    z: Map({
        effectID: undefined,
        paramName: undefined,
        axisName: 'z'
    })
});

const xyzMap = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MAPPING:
            var {mapToParameter, axis, effectID, paramName} = action.payload;
            return mapToParameter ?
                state.updateIn([axis, 'effectID'], value => effectID).updateIn([axis, 'paramName'], value => paramName) :
                state;
        case REMOVE_MAPPING:
            var {axis} = action.payload;
            return state.updateIn([axis, 'effectID'], value => undefined).updateIn([axis, 'paramName'], value => undefined);
        default:
            return state;
    }
}

export default xyzMap;