import {Map} from 'immutable';
import {UPDATE_MAPPING, REMOVE_MAPPING} from '../../actions/actionTypes';

const xyzMap = (state, action) => {
    switch (action.type) {
        case UPDATE_MAPPING:
            console.log('socket UPDATE_MAPPING')
            return state;
        case REMOVE_MAPPING:
            console.log('socket REMOVE_MAPPING')
            return state;
        default:
            return state;
    }
}

export default xyzMap;