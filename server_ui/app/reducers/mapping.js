import {Map} from 'immutable';
import {TOGGLE_MAPPING} from '../actions/actionTypes';

const mapping = (state = Map(), action) => {
    const {axisName} = action.payload;
    switch (action.type) {
        case TOGGLE_MAPPING:
            return state.update('isMapping', value => !state.get('isMapping')).update('currentAxis', value => axisName ? axisName : '');
            break;
        default:
            return state;
            break;
    }
}

export default mapping;