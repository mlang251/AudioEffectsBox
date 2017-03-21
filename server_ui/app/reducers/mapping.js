import {Map} from 'immutable';
import {TOGGLE_MAPPING} from '../actions/actions';

const mapping = (state = Map(), action) => {
    const {axisName} = action.payload;
    switch (action.type) {
        case TOGGLE_MAPPING:
            return state.update('isMapping', value => !state.get('isMapping')).update('currentAxis', value => axisName ? axisName : '');
        default:
            return state;
    }
}

export default mapping;