import React from 'react';
import Radium from 'radium';
import Parameter from './Parameter';

/**
 * The Parameter module. Responsible rendering a Parameter component. Appears as a child component of the 
 *     ParameterContainer component. 
 * @module Parameter
 * @see module:ParameterContainer
 * @see {@link https://github.com/mzabriskie/react-draggable#draggable}
 */

/** 
 * Class responsible rendering Parameter components.
 * @extends external:ReactPureComponent 
 */
const ParameterScaffold = ({value, axis, isMapping, axisToMap, handleDrag, handleClick, removeMapping, paramName}) => (
    <div style = {styles.paramDiv}>
        <div style = {styles.xyzMapDiv}>
            <p style = {styles.xyzMap}>{axis}</p>
            <button 
                type = 'button'
                style = {axis != '' ? styles.buttonBase : {display: 'none'}}
                onClick = {() => removeMapping(axis, paramName)}>X</button>
        </div>
        <p style = {styles.paramTitle}>{paramName}</p>
        <Parameter
            handleClick = {handleClick}
            handleDrag = {handleDrag}
            axisToMap = {axisToMap}
            value = {value}
            isMapping = {isMapping} />
    </div>
);

/**
 * A style object whose members are passed to elements when rendering.
 * @type {Object}
 */
const styles = {
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
}

/** The Parameter component */
export default Radium(ParameterScaffold);
