import {connect} from 'react-redux';
import {List, Map} from 'immutable';
import SignalChain from './SignalChain';

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
 * An Immutable Map which represents an effect in the signal chain
 * @typedef {external:Map} Effect
 * @property {String} effectType - The type of effect
 * @property {String} effectID - The unique ID of the effect
 * @property {Boolean} isBypassed - Represents whether or not the effect is currently bypassed
 * @property {Boolean} isSoloing - Represents whether or not the effect is currently soloing
 */

/**
 * Maps the state contained in the store to props to pass down to the SignalChain component
 * @param {external:Map} state - The state contained in the store
 * @returns {Object} props - The props to pass down to the SignalChain component
 * @property {external:List.<Effect>} props.effects - A list of the effects the user has added to the signal chain
 */
const mapStateToProps = state => {
    return {
        effects: state.get('effects'),
    };
};

const SignalChainContainer = connect(
    mapStateToProps
)(SignalChain);

export default SignalChainContainer;