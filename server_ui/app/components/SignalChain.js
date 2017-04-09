import React from 'react';
import Radium from 'radium';
import {List, Map} from 'immutable';
import EffectContainer from './EffectContainer';
import {effects as effectDescriptions} from '../JSON/effects.json';

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
 * The SignalChain module. Renders a the location where effects modules are rendered. The majority of the signal chain area shows the
 *     effects that have been added by the user. To the right of this area is where the final output gain stage is. Appears as a child 
 *     component of the SignalChainContainer component, child components are Effect components.
 * @param {Object} props - Props passed down by the SignalChainContainer
 * @property {external:List.<Effect>} props.effects - A list of the effects the user has added to the signal chain
 */
const SignalChain = ({effects}) => (
    <div style = {styles.div}>
        <div id = 'signalChain' style = {styles.signalChain}>
            {createEffects(effects)}
        </div>
        <div style = {styles.gainBlock}>
            {createEffects(List([
                Map({
                    effectID: 'gain',
                    effectType: 'gain',
                    isBypassed: false,
                    isSoloing: false
                })
            ]))}
        </div>
    </div>
);

/**
 * Iterates through a list of effects and creates EffectContainer components to render
 * @param {external:List.<Effect>} effectsList - The list of effects
 * @returns {external:List} - A list of EffectContainer components
 */
const createEffects = (effectsList) => {
    return effectsList.map((effect, index) => {
        const effectType = effect.get('effectType');
        const effectID = effect.get('effectID');
        const isBypassed = effect.get('isBypassed');
        const isSoloing = effect.get('isSoloing');
        const {name, parameterList, parameters} = effectDescriptions[effectType];
        return (
            <EffectContainer
                key = {effectID}
                effectID = {effectID}
                effectName = {name}
                parameterList = {List(parameterList)}
                parameters = {Map(parameters)}
                effectType = {effectType}
                isBypassed = {isBypassed}
                isSoloing = {isSoloing}
                reorderButtonLeft = {index != 0}
                reorderButtonRight = {index != effectsList.size - 1} />
        );
    });
};

const styles = {
    div: {
        height: '100%',
        width: '100%',
        marginBottom: 25,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000'
    },
    signalChain: {
        display: 'inline-block',
        float: 'left',
        height: '100%',
        width: '90%',
        overflowX: 'scroll',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000'
    },
    gainBlock: {
        display: 'inline-block',
        float: 'right',
        height: '100%',
        width: '10%'
    }
}

export default Radium(SignalChain);
