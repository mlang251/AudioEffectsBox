import React from 'react';
import Radium from 'radium';
import Draggable from 'react-draggable';

/**
 * The Parameter module. Renders a draggable fader that represents the parameter's value. Appears as a child component of the 
 *     ParameterScaffold component. 
 * @param {Object} props - Props passed down from the ParameterScaffold component
 * @property {Number} props.value - The current value of the parameter
 * @property {Boolean} props.isMapping - Represents whether or not the app is in axis mapping mode. If it is, the parameter will render
 *     with a blue outline to notify the user that this parameter can receive an axis mapping
 * @property {String} props.axisToMap - The current axis that is being mapped. If this is an empty string, it means axis mapping mode is
 *     not active. If axis mapping mode is active
 * @property {Function} props.handleDrag - Sets this parameter's value to a new value when the fader is dragged
 * @property {Function} props.handleClick - If the app is in axis mapping mode, clicking the parameter will map the axisToMap to this 
 *     parameter
 */
const Parameter = ({value, isMapping, axisToMap, handleDrag, handleClick}) => {
    const divStyle = isMapping ?
        Object.assign({}, styles.faderContainerDiv, styles.isMapping) :
        Object.assign({}, styles.faderContainerDiv, styles.isNotMapping);
    const slotHeight = styles.slotDiv.height;
    return (
        <div style = {styles.div}>
            <div
                id = 'setParameter'
                style = {divStyle}
                onClick = {() => isMapping ? handleClick(axisToMap) : null}>
                <div style = {styles.slotDiv}></div>
                <Draggable
                    axis = 'y'
                    bounds = 'parent'
                    disabled = {isMapping}
                    position = {{x: 0, y: slotHeight - value * slotHeight}}
                    onDrag = {(e, data) => {handleDrag(slotHeight - data.y, slotHeight)}}>
                    <div style = {styles.faderDiv}></div>
                </Draggable>
            </div>
        </div>
    );
}

const styles = {
    div: {
        height: 100,
        width: 50,
        position: 'relative',
        display: 'inline-block'
    },
    isMapping: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue'
    },
    isNotMapping: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FFF'
    },
    faderContainerDiv: {
        height: 100,
        width: 30,
        float: 'right',
        position: 'relative'
    },
    slotDiv: {
        height: 85,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000',
        position: 'absolute',
        zIndex: 0,
        left: '50%',
        top: '50%',
        transform: 'translate(0, -50%)'
    },
    faderDiv: {
        height: 15,
        width: 30,
        borderStyle: 'solid',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 2,
        backgroundColor: '#999'
    }
}

export default Radium(Parameter);
