import {connect} from 'react-redux';
import {removeEffectAndEmit, reorderEffectsAndEmit, toggleBypassAndEmit, toggleSoloAndEmit} from '../actions/actionCreators';
import Effect from './Effect';

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
 * Determines if any of the effects in the signal chain are currently in solo mode.
 * @param {external:List.<Effect>} effectsList - The list of effects to search through
 */
const determineSoloing = (effectsList) => {
    let allowBypass = true;
    effectsList.forEach(effect => {
        if (effect.get('isSoloing')) {
            allowBypass = false;
            return false;
        }
    });
    return allowBypass;
}

/**
 * Maps the state contained in the store to props to pass down to the Effect component
 * @param {external:Map} state - The state contained in the store
 * @returns {Object} props - Props to pass down to the Effect component
 * @property {Boolean} props.allowBypass - Calls determineSoloing to determine whether or not this effect should be able to dispatch
 *     the toggleBypass action. If any effects are soloing, we don't want to call toggleBypass and accidentally change the effects route
 */
const mapStateToProps = (state) => {
    return {
        allowBypass: determineSoloing(state.get('effects'))
    };
};

/**
 * Maps store dispatch methods to props to pass down to the Effect component
 * @param {Function} dispatch - The store.dispatch method for dispatching actions
 * @param {Object} ownProps - Props passed down from the SignalChain component
 * @returns {Object} props - Props to pass down to the Effect component
 * @property {Function} props.removeEffect - A function that dispatches removeEffectAndEmit with this effect's ID
 * @property {Function} props.reorderEffects - A function that dispatches reorderEffectsAndEmit with this effect's ID and a direction
 *     in which to push the effect. Direction is passed by the Effect component when this function is called
 * @property {Function} props.toggleBypass - A function that dispatches toggleBypassAndEmit with this effect's ID
 * @property {Function} props.toggleSolo - A function that dispatches toggleSoloAndEmit with this effect's ID
 */
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeEffect: () => {
            dispatch(removeEffectAndEmit(ownProps.effectID));
        },
        reorderEffects: (direction) => {
            dispatch(reorderEffectsAndEmit(ownProps.effectID, direction));
        }, 
        toggleBypass: () => {
            dispatch(toggleBypassAndEmit(ownProps.effectID));
        },
        toggleSolo: () => {
            dispatch(toggleSoloAndEmit(ownProps.effectID));
        }        
    };
};

const EffectContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Effect);

export default EffectContainer;