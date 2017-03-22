import {fromJS} from 'immutable';
import {UPDATE_PARAMETER_VALUE} from '../actions/actionTypes';
import defaults from '../JSON/defaults.json';

const initialState = fromJS(defaults);

const parameterValues = (state = initialState, action) => {
    const {effectID, paramName, paramValue} = action.payload;
    switch (action.type) {
        case UPDATE_PARAMETER_VALUE:
            return state.updateIn([effectID, paramName], value => paramValue);
        default:
            return state;
    }
}

export default parameterValues;