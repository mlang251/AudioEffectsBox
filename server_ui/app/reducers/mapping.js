import {Map} from 'immutable';
import {UPDATE_MAPPING} from '../actions/actionTypes';

const mapping = (state = Map(), action) => {
    const {mapToParameter, axis} = action.payload;
    switch (action.type) {
        case UPDATE_MAPPING:
            return state.update('isMapping', value => mapToParameter ? false : true).update('currentAxis', value => mapToParameter ? '' : axis);
        default:
            return state;
    }
}

export default mapping;