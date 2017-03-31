import {combineReducers} from 'redux-immutable';
import effects from './effects';
import parameterValues from './parameterValues';
import xyzMap from './xyzMap';
import {ADD_EFFECT, REMOVE_EFFECT, REORDER_EFFECTS, TOGGLE_BYPASS, TOGGLE_SOLO,
     UPDATE_MAPPING, UPDATE_PARAMETER_VALUE} from '../../actions/actionTypes';

const socketRoot = (state, action) => {
    switch (action.type) {
        case ADD_EFFECT:
        case REMOVE_EFFECT:
        case REORDER_EFFECTS:
        case TOGGLE_BYPASS:
        case TOGGLE_SOLO:
            return {
                effects: effects(state.get('effects'), action)
            };
        case UPDATE_MAPPING:
            return {
                xyzMap: xyzMap(state.get('xyzMap'), action)
            };
        case UPDATE_PARAMETER_VALUE:
            return {
                parameterValues: parameterValues(state.get('parameterValues'), action)
            };
        default:
            return state;
    }
};

export default socketRoot;