import {Map} from 'immutable';
const {UPDATE_MAPPING} = require('../actions/actionTypes');

const mapping = (state = Map(), action) => {
    switch (action.type) {
        case UPDATE_MAPPING:
            var {mapToParameter, axis} = action.payload;
            return state.update('isMapping', value => mapToParameter ? false : true).update('currentAxis', value => mapToParameter ? '' : axis);
        default:
            return state;
    }
}

export default mapping;