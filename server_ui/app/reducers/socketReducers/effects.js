import {List, Map} from 'immutable';
import {ADD_EFFECT, REMOVE_EFFECT, REORDER_EFFECTS, TOGGLE_BYPASS, TOGGLE_SOLO} from '../../actions/actionTypes';

const effects = (state, action) => {
    switch (action.type) {
        case ADD_EFFECT:
            console.log('socket ADD_EFFECT')
            return state;
        case REMOVE_EFFECT:
            console.log('socket REMOVE_EFFECT')
            return state;
        case REORDER_EFFECTS:
            console.log('socket REORDER_EFFECTS')
            return state;
        case TOGGLE_BYPASS:
            console.log('socket TOGGLE_BYPASS')
            return state;
        case TOGGLE_SOLO:
            console.log('socket TOGGLE_SOLO')
            return state;
        default:
            return state;
    }
}

export default effects;