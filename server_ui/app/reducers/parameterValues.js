import {fromJS} from 'immutable';
import {UPDATE_PARAMETER_VALUE, RECEIVE_LEAP_DATA} from '../actions/actionTypes';
import defaults from '../JSON/defaults.json';

const initialState = fromJS(defaults);

const parameterValues = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_LEAP_DATA:
            //TODO: need to get xyzMap data here
            console.log(state);
            return state;
            break;
        case UPDATE_PARAMETER_VALUE:
            var {effectID, paramName, paramValue} = action.payload;
            return state.updateIn([effectID, paramName], value => paramValue);
        default:
            return state;
    }
}

export default parameterValues;