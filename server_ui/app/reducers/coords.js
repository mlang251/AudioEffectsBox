import {List} from 'immutable';
import {RECEIVE_LEAP_DATA} from '../actions/actionTypes';

/**
 * The Immutable.js List datatype. Lists are ordered indexed dense collections, much like a JavaScript Array.
 * @external List
 * @see {@link https://facebook.github.io/immutable-js/docs/#/List}
 */

/**
 * Updates the state of the coordinates. If the action type is RECEIVE_LEAP_DATA, the reducer updates state.coords with the new
 *     coordinates of the user's hand. 
 * @param {external:List.<Number>} state - The state of the coordinates
 * @param {Object} action - The action that is calling the reducer
 */
const coords = (state = List([0, 0, 0]), action) => {
    switch (action.type) {
        case RECEIVE_LEAP_DATA:
            var {data} = action.payload;
            return List(data)
        default:
            return state;
    }
}

export default coords;