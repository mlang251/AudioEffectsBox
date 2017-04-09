import React from 'react';
import Radium from 'radium';
import {List, Map} from 'immutable';
import ParameterContainer from './ParameterContainer';

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
 * The Effect module. Represents an effect in the signal chain. Appears as a child component of EffectContainer, child
 *     component is ParameterContainer.
 * @param {Object} props - The props passed down from the EffectContainer component
 * @property {Boolean} props.allowBypass - If this is false, clicking on the bypass button will not call toggleBypass
 * @property {Function} props.removeEffect - Removes this effect from the signal chain
 * @property {Function} props.reorderEffects - Reorders this effect in the signal chain
 * @property {Function} props.toggleBypass - Toggles the bypass state of this effect
 * @property {Function} props.toggleSolo - Toggles the solo state of this effect
 * @property {String} props.effectID - The unique ID of this effect
 * @property {String} props.effectName - The name of this effect
 * @property {String} props.effectType - The type of this effect
 * @property {external:List} props.parameterList - A list of the parameters this effect has
 * @property {Boolean} props.isBypassed - Represents whether or not the effect is bypassed, for styling the bypass button
 * @property {Boolean} props.isSoloing - Represents whether or not the effect is soloing, for styling the solo button
 * @property {Boolean} props.reorderButtonLeft - Represents whether or not the effect should render a reorder button to the left
 * @property {Boolean} props.reorderButtonRight - Represents whether or not the effect should render a reorder button to the right
 */
const Effect = ({allowBypass, removeEffect, reorderEffects, toggleBypass, toggleSolo, effectID, effectName, effectType,
    parameterList, isBypassed, isSoloing, reorderButtonLeft, reorderButtonRight}) => {
    const isGainBlock = effectType == 'gain';
    const effectStyle = isGainBlock ?
        Object.assign({}, styles.effectDiv, styles.floatRight) :
        Object.assign({}, styles.effectDiv, styles.effectPadding);
    return (
        <div style = {effectStyle}>
            <div style = {styles.headerDiv}>
                <p style = {styles.effectTitle}>{effectName}</p>
                <div style = {!isGainBlock ? styles.buttonDiv : {display: 'none'}}>
                    <button
                        key = {`${effectID}Solo`}
                        type = 'button'
                        style = {Object.assign({}, styles.buttonBase, styles.soloButton,
                            styles[isSoloing ? 'isActive' : 'isNotActive'])}
                        onClick = {toggleSolo}>S</button>
                    <button
                        key = {`${effectID}Bypass`}
                        type = 'button'
                        style = {Object.assign({}, styles.buttonBase, styles.bypassButton,
                            styles[isBypassed ? 'isActive' : 'isNotActive'])}
                        onClick = {() => allowBypass ? toggleBypass() : null}>B</button>
                    <button
                        key = {`${effectID}Close`}
                        type = 'button'
                        style = {Object.assign({}, styles.buttonBase, styles.closeButton)}
                        onClick = {removeEffect}>X</button>
                </div>
            </div>
            {reorderButtonLeft ? 
                <button
                    type = 'button'
                    key = {`${effectID}Left`}
                    style = {Object.assign({}, styles.buttonBase, styles.reorderButton, styles.reorderButtonLeft)}
                    onClick = {() => reorderEffects('left')}>&lt;</button> 
                : null}
            {parameterList.map((paramName, index) => {
                return <ParameterContainer
                    key = {`${effectID}${paramName}`}
                    effectID = {effectID}
                    paramName = {paramName} />
            })}
            {reorderButtonRight ? 
                <button
                    type = 'button'
                    key = {`${effectID}Right`}
                    style = {Object.assign({}, styles.buttonBase, styles.reorderButton, styles.reorderButtonRight)}
                    onClick = {() => reorderEffects('right')}>&gt;</button> 
                : null}
        </div>
    );
}

const styles = {
    effectDiv: {
        display: 'inline-block',
        position: 'relative',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#333',
        boxShadow: 'inset 0 0 5px #AAA',
        borderRadius: 5
    },
    effectPadding: {
        paddingLeft: 40,
        paddingRight: 40
    },
    floatRight: {
        float: 'right'
    },
    headerDiv: {
        paddingLeft: 15,
        paddingRight: 15
    },
    buttonDiv: {
        display: 'inline-block',
        float: 'right'
    },
    effectTitle: {
        display: 'inline-block'
    },
    buttonBase: {
        display: 'inline-block',
        borderRadius: '50%',
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 1.5,
        borderColor: '#333',
        borderStyle: 'solid',
        ':focus': {
            outline: 'none'
        }
    },
    soloButton: {

    },
    bypassButton: {

    },
    closeButton: {
        backgroundColor: '#999'
    },
    isActive: {
        backgroundColor: 'yellow'
    },
    isNotActive: {
        backgroundColor: '#999'
    },
    reorderButton: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)'
    },
    reorderButtonLeft: {
        left: 3
    },
    reorderButtonRight: {
        right: 3
    }
}

export default Radium(Effect);
