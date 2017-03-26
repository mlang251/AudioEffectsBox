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
const Effect = ({xyzMapArray, removeEffect, reorderEffects, toggleBypass, toggleSolo, removeMapping, effectName, parameterList,
                 parameters, effectType, isBypassed, isSoloing, reorderButtonLeft, reorderButtonRight}) => {
    const bypassStyle = isBypassed ? 'isActive' : 'isNotActive';
    const soloStyle = isSoloing ? 'isActive' : 'isNotActive';
    return (
        <div style = {styles.effectDiv}>
            <div style = {styles.headerDiv}>
                <p style = {styles.effectTitle}>{effectName}</p>
                <div style = {styles.buttonDiv}>
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
                        onClick = {toggleBypass}>B</button>
                    <button
                        key = {`${effectID}Close`}
                        type = 'button'
                        style = {Object.assign({}, styles.buttonBase, styles.closeButton)}
                        onClick = {removeEffect}>X</button>
                </div>
            </div>
            {reorderButtonLeft ? createReorderButtons('left', effectID) : null}
            {createParameters(parameterList, parameters, xyzMapArray, effectID, removeMapping)}
            {reorderButtonRight ? createReorderButtons('right', effectID) : null}
        </div>
    );
};

const createParameters = (parameterList, parameters, xyzMapArray, effectID, removeMapping) => {
    let params = List().asMutable();

    parameterList.forEach((paramName, index) => {
        const paramType = parameters.get(paramName);
        const axes = ['x', 'y', 'z'];
        let xyzMap = undefined;
        for (let i = 0; i < xyzMapArray.size; i++) {
            if (xyzMapArray.get(i).get('paramName') == paramName) {
                const axisName = xyzMapArray.get(i).get('axisName');
                xyzMap = [
                    <p 
                        key = {`${effectID}${axisName}`}
                        style = {styles.xyzMap}>{axisName}</p>,
                    <button 
                        key = {`${effectID}Remove${axisName}`}
                        type = 'button'
                        style = {Object.assign({}, styles.buttonBase, styles.removeMappingButton)}
                        onClick = {() => removeMapping(axisName)}>X</button>
                ];
            }
        }
        params = params.push(
            <div
                key = {index}
                style = {styles.paramDiv}>
                <div style = {styles.xyzMapDiv}>
                    {xyzMap}
                </div>
                <p style = {styles.paramTitle}>{paramName}</p>
                <ParameterContainer
                    type = {paramType}
                    info = {Map({effectID: effectID, paramName: paramName})} />
            </div>
        );
    });
    return params.asImmutable();
};

/**
 * Creates an Immutable Map containing the effect reordering buttons. If there are multiple effects in the signal chain,
 *     the props.reorderButtonLeft and props.reorderButtonRight values will be true or false, depending on whether or not
 *     an effect can be moved in the corresponding direction (e.g. the first effect in the chain cannot be moved to the left
 *     but it can be moved to the right. An effect in the middle of two other effects can be moved in both directions). 
 * @param {string} direction - Indicates the direction of the reordering button to create
 * @returns {external:List} An Immutable List containing html for the reordering button with the specified direction
 */
const createReorderButtons = (direction, effectID) => {
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
        borderRadius: 5,
        paddingLeft: 40,
        paddingRight: 40,
    },
    headerDiv: {
        paddingLeft: 15,
        paddingRight: 15
    },
    buttonDiv: {
        display: 'inline-block'
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
    }
}

/** The Effect component */
export default Radium(Effect);
