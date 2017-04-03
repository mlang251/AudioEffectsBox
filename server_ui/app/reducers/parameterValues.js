import {fromJS} from 'immutable';
const {UPDATE_PARAMETER_VALUE} = require('../actions/actionTypes');
import defaults from '../JSON/defaults.json';

const initialState = fromJS(defaults);

const parameterValues = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PARAMETER_VALUE:
            var {effectID, paramName, paramValue} = action.payload;
            return state.updateIn([effectID, paramName], value => paramValue);
        default:
            return state;
    }
}

export default parameterValues;