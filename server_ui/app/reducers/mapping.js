import {Map} from 'immutable';
import {UPDATE_MAPPING} from '../actions/actionTypes';

/**
 * The Immutable.js Map datatype. Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 *     O(log32 N) gets and O(log32 N) persistent sets.
 * @external Map
 * @see {@link https://facebook.github.io/immutable-js/docs/#/Map}
 */

/**
 * The initial state of the app's axis mapping functionality
 * @typedef {external:Map} State
 * @property {Boolean} State.isMapping - Represents whether or not the app's axis mapping mode is active
 * @property {String} State.currentAxis - Keeps track of which axis is currently being mapped to a parameter
 */
const initialState = Map({
    isMapping: false,
    currentAxis: ''
});

/**
 * Updates the state of the app's axis mapping functionality. If the action type is UPDATE_MAPPING, the reducer reads the mapToParameter
 *     and axis fields of the action payload. If mapToParameter is true, it means an axis is being mapped to a parameter. The reducer
 *     turns off mapping mode at this point, and resets the axis to an empty string. If mapToParameter is false, it means mapping mode is 
 *     being turned on. The reducer updates the isMapping state accordingly, and keeps track of which axis is being mapped.
 * @param {State} state - The state of the app's axis mapping functionality
 * @param {Object} action - The action that is calling the reducer
 */
const mapping = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MAPPING:
            var {mapToParameter, axis} = action.payload;
            return state.update('isMapping', value => mapToParameter ? false : true)
                .update('currentAxis', value => mapToParameter ? '' : axis);
        default:
            return state;
    }
}

export default mapping;