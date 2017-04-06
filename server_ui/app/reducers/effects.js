import {List, Map} from 'immutable';
import {UPDATE_EFFECTS} from '../actions/actionTypes';

/**
 * The Immutable.js List datatype. Lists are ordered indexed dense collections, much like a JavaScript Array.
 * @external List
 * @see {@link https://facebook.github.io/immutable-js/docs/#/List}
 */

/**
 * An Immutable Map which represents an effect in the signal chain
 * @typedef {external:Map} Effect
 * @property {String} effectType - The type of effect
 * @property {String} effectID - The unique ID of the effect
 * @property {Boolean} isBypassed - Represents whether or not the effect is currently bypassed
 * @property {Boolean} isSoloing - Represents whether or not the effect is currently soloing
 */

/**
 * Updates the list of effects in the signal chain. 
 * @param {external:List.<Effect>} state = external:List - The list of effects in the signal chain 
 * @param {Object} action - The action that is calling the reducer
 */
const effects = (state = List(), action) => {
    switch (action.type) {
        case UPDATE_EFFECTS:
            return action.payload.effectsList;
        default:
            return state;
    }
}

export default effects;