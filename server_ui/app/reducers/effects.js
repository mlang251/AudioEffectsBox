import {List, Map} from 'immutable';
import {UPDATE_EFFECTS} from '../actions/actionTypes';

const effects = (state = List(), action) => {
    switch (action.type) {
        case UPDATE_EFFECTS:
            return action.payload.effectsList;
        default:
            return state;
    }
}

export default effects;