import React from 'react';
import Radium from 'radium';

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
const Effect = ({removeEffect, reorderEffects, toggleBypass, toggleSolo, effectID, effectType, isBypassed,
                 isSoloing, reorderButtonLeft, reorderButtonRight}) => {
    const bypassStyle = isBypassed ? 'isActive' : 'isNotActive'
    const soloStyle = isSoloing ? 'isActive' : 'isNotActive'
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
            {reorderButtonLeft}
            {params}
            {reorderButtonRight}
        </div>
    );
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
