import {Map, List} from 'immutable';
import {RECEIVE_LEAP_DATA, RECEIVE_LEAP_STATUS} from '../actions/actionTypes';

/**
 * The Immutable.js List datatype. Lists are ordered indexed dense collections, much like a JavaScript Array.
 * @external List
 * @see {@link https://facebook.github.io/immutable-js/docs/#/List}
 */

/**
 * The Immutable.js Map datatype. Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 *     O(log32 N) gets and O(log32 N) persistent sets.
 * @external Map
 * @see {@link https://facebook.github.io/immutable-js/docs/#/Map}
 */

/**
 * The initial state of the interaction box
 * @typedef {external:Map} State
 * @property {external:List.<Number>} State.coords - The current coordinates of the user's hand within the Leap's field of 
 *     vision. This is represented by the pointer in the InteractionBox component.
 * @property {external:Map} State.dimensions - The dimensions of the Leap's field of vision, represented by the dimensions
 *     of the InteractionBox component.
 * @property {Number} State.dimensions.Height - The height of the Leap's field of vision.
 * @property {Number} State.dimensions.Width - The width of the Leap's field of vision.
 * @property {Number} State.dimensions.Depth - The depth of the Leap's field of vision.
 * @property {Boolean} State.isConnected - Represents whether or not the Leap is connected to the computer
 * @property {Boolean} State.isInBounds - Represents whether or not user's hand is within the Leap's field of vision
 * @property {Boolean} State.isTracking - Represents whether or not the user has put the system into hand tracking mode
 */
const initialState = Map({
    coords: List(),
    dimensions: Map({
        Height: undefined,
        Width: undefined,
        Depth: undefined
    }),
    isConnected: false,
    isInBounds: false,
    isTracking: false
});

/**
 * Updates the state of the interaction box. If the action type is RECEIVE_LEAP_DATA, the reducer updates state.coords with the new
 *     coordinates of the user's hand. If the action type is RECEIVE_LEAP_STATUS, the reducer determines which status update is arriving
 *     by observing the address included in the action payload. If the address is /BoxDimensions, the reducer updates the dimensions and
 *     sets the isConnected state to true. If the address is /BoundStatus or /TrackingMode, the reducer updates the isInBounds or
 *     isTracking states accordingly. For these two properties, due to the nature of the OSC messaging protocol, the args field of the 
 *     action payload arrives as an array with either a 0 or a 1, representing whether or not the user's hand is in bounds/being tracked.
 * @param {State} state - The state of the interaction box
 * @param {Object} action - The action that is calling the reducer
 */
const interactionBox = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_LEAP_DATA:
            var {data} = action.payload;
            return state.update('coords', value => List(data))
        case RECEIVE_LEAP_STATUS:
            var {address, args} = action.payload;
            switch (address) {
                case '/BoxDimensions':
                    const dimensions = JSON.parse(args);
                    return state.update('isConnected', value => true)
                            .update('dimensions', value => state.get('dimensions').merge(Map(dimensions)))
                case '/BoundStatus':
                    return state.update('isInBounds', value => args[0] ? true : false)
                case '/TrackingMode':
                    return state.update('isTracking', value => args[0] ? true : false)
                default:
                    return;
            }
        default:
            return state;
    }
}

export default interactionBox;