import React from 'react';
import Radium from 'radium';
import {List, Map} from 'immutable';
import ParameterContainer from './ParameterContainer';

/**
 * The Effect module. Represents an effect in the signal chain. Appears as a child component of EffectContainer, child
 *     component is ParameterContainer.
 * @module Effect
 * @see module:EffectContainer
 * @see module:ParameterContainer
 */

/** 
 * Class representing an effect in the signal chain.
 * @extends external:ReactPureComponent 
 */
const Effect = ({xyzMapList, axisToMap, allowBypass, removeEffect, reorderEffects, toggleBypass, toggleSolo, removeMapping,
    effectID, effectName, parameterList, parameters, effectType, isBypassed, isSoloing, reorderButtonLeft, reorderButtonRight}) => {
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
            {reorderButtonLeft ? createReorderButtons('left', effectID, reorderEffects) : null}
            {createParameters(parameterList, parameters, xyzMapList, axisToMap, effectID, removeMapping)}
            {reorderButtonRight ? createReorderButtons('right', effectID, reorderEffects) : null}
        </div>
    );
}

const createParameters = (parameterList, parameters, xyzMapList, axisToMap, effectID, removeMapping) => {
    return parameterList.map((paramName, index) => {
        const paramType = parameters.get(paramName);
        const axes = ['x', 'y', 'z'];
        let xyzMap = undefined;
        xyzMapList.forEach((axis, index) => {
            if (axis.get('paramName') == paramName) {
                const axisName = axis.get('axisName');
                xyzMap = [
                    <p 
                        key = {`${effectID}${axisName}`}
                        style = {styles.xyzMap}>{axisName}</p>,
                    <button 
                        key = {`${effectID}Remove${axisName}`}
                        type = 'button'
                        style = {Object.assign({}, styles.buttonBase, styles.removeMappingButton)}
                        onClick = {() => removeMapping(axisName, paramName)}>X</button>
                ];
            }
        });
        return (
            <div
                key = {index}
                style = {styles.paramDiv}>
                <div style = {styles.xyzMapDiv}>
                    {xyzMap}
                </div>
                <p style = {styles.paramTitle}>{paramName}</p>
                <ParameterContainer
                    type = {paramType}
                    effectID = {effectID}
                    paramName = {paramName}
                    axisToMap = {axisToMap} />
            </div>
        );
    });
};

/**
 * Creates an Immutable Map containing the effect reordering buttons. If there are multiple effects in the signal chain,
 *     the props.reorderButtonLeft and props.reorderButtonRight values will be true or false, depending on whether or not
 *     an effect can be moved in the corresponding direction (e.g. the first effect in the chain cannot be moved to the left
 *     but it can be moved to the right. An effect in the middle of two other effects can be moved in both directions). 
 * @param {string} direction - Indicates the direction of the reordering button to create
 * @returns {external:List} An Immutable List containing html for the reordering button with the specified direction
 */
const createReorderButtons = (direction, effectID, reorderEffects) => {
    if (direction == 'left') {
        return List([(
            <button
                type = 'button'
                key = {`${effectID}Left`}
                style = {Object.assign({}, styles.buttonBase, styles.reorderButton, styles.reorderButtonLeft)}
                onClick = {() => reorderEffects('left')}>&lt;</button>
        )]);
    } else if (direction == 'right') {
        return List([(
            <button
                type = 'button'
                key = {`${effectID}Right`}
                style = {Object.assign({}, styles.buttonBase, styles.reorderButton, styles.reorderButtonRight)}
                onClick = {() => reorderEffects('right')}>&gt;</button>
        )]);
    } else {
        return null;
    }
};

/**
 * A style object whose members are passed to components when rendering.
 * @type {Object}
 */
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
    paramDiv: {
        display: 'inline-block',
        paddingRight: 5,
        paddingLeft: 5
    },
    xyzMapDiv: {
        height: 30,
        width: '100%'
    },
    paramTitle: {
        textAlign: 'center',
        fontSize: '0.8em'
    },
    xyzMap: {
        display: 'inline-block',
        padding: 0,
        margin: 0
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

/** The Effect component */
export default Radium(Effect);
