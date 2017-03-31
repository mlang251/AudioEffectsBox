import {fromJS} from 'immutable';
import {UPDATE_PARAMETER_VALUE} from '../../actions/actionTypes';

const parameterValues = (state, action) => {
    switch (action.type) {
        case UPDATE_PARAMETER_VALUE:
            console.log('socket UPDATE_PARAMETER_VALUE')
            return state;
        default:
            return state;
    }
}

export default parameterValues;