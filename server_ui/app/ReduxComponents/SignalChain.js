import React from 'react';
import Radium from 'radium';
import {List, Map} from 'immutable';
import EffectContainer from './EffectContainer';
import {effects as effectDescriptions} from '../JSON/effects.json';

/**
 * The SignalChain module. Responsible rendering a SignalChain component which is the location where effects modules
 *     are rendered. Appears as a child component of the SignalChainContainer component, child components are Effect components.
 * @module SignalChain
 * @see module:SignalChainContainer
 * @see module:Effect
 */

/** 
 * Class responsible for rendering the SignalChain component.
 * @extends external:ReactPureComponent 
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

const createEffects = (effectsList) => {
    console.log(effectsList)
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

/**
 * A style object whose members are passed to elements when rendering.
 * @type {Object}
 */
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

/** The SignalChain component */
export default Radium(SignalChain);
