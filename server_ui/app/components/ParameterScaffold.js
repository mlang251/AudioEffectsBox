import React from 'react';
import Radium from 'radium';
import Parameter from './Parameter';

/**
 * The ParameterScaffold module. Renders meta information for each parameter, including the name and the axis mapping. Appears as a 
 *     child component of the ParameterContainer component. Child component is the Parameter component.
 * @param {Object} props - Props passed down from the ParameterContainer component
 * @property {Number} props.value - The current value of the parameter
 * @property {String} props.axis - The axis that is mapped to this parameter. This is an empty string if the parameter is not mapped
 * @property {Boolean} props.isMapping - Represents whether or not the app is in axis mapping mode. If it is, the parameter will render
 *     with a blue outline to notify the user that this parameter can receive an axis mapping
 * @property {String} props.axisToMap - The current axis that is being mapped. If this is an empty string, it means axis mapping mode is
 *     not active. If axis mapping mode is active
 * @property {Function} props.handleDrag - Sets this parameter's value to a new value when the fader is dragged
 * @property {Function} props.handleClick - If the app is in axis mapping mode, clicking the parameter will map the axisToMap to this 
 *     parameter
 * @property {Function} props.removeMapping - Removes the axis mapping from this parameter if the remove mapping button is clicked. If the
 *     parameter is not mapped, this button will not appear
 * @property {String} props.paramName - The name of this parameter
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

export default Radium(ParameterScaffold);
