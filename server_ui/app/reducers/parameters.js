import {Map} from 'immutable';
import {UPDATE_PARAMETER_VALUE, RECEIVE_LEAP_DATA, UPDATE_MAPPING, REMOVE_MAPPING} from '../actions/actionTypes';
import defaults from '../JSON/defaults.json';

let defaultMaps = {};
const defaultsKeys = Object.keys(defaults);
for (let i = 0; i < defaultsKeys.length; i++) {
    const thisKey = defaultsKeys[i];
    Object.keys(defaults[thisKey]).forEach(parameter => {
        const paramValue = defaults[thisKey][parameter];
        defaults[thisKey][parameter] = Map({
            paramValue,
            axisName: ''
        });
    });
    defaultMaps[thisKey] = Map(defaults[thisKey]);
};
const initialState = Map(defaultMaps)

const parameters = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_LEAP_DATA:
            return state;
            break;
        case UPDATE_PARAMETER_VALUE:
            var {effectID, paramName, paramValue} = action.payload;
            return state.updateIn([effectID, paramName, 'paramValue'], value => paramValue);
        case UPDATE_MAPPING:
            var {mapToParameter, axis, effectID, paramName} = action.payload;
            return mapToParameter ?
                state.updateIn([effectID, paramName, 'axisName'], value => axis) :
                state;
        case REMOVE_MAPPING:
            var {axis, effectID, paramName} = action.payload;
            return state.updateIn([effectID, paramName, 'axisName'], value => '');
        default:
            return state;
    }
}

export default parameters;