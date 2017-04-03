import {List, Map} from 'immutable';
const {UPDATE_EFFECTS} = require('../actions/actionTypes');

const effects = (state = List(), action) => {
    switch (action.type) {
        case UPDATE_EFFECTS:
            return action.payload.effectsList;
        default:
            return state;
    }
}

export default effects;