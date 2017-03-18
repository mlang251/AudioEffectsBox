import React from 'react';
import Radium from 'radium';
import Draggable from 'react-draggable';

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
class Parameter extends React.PureComponent {
    /** Create the Parameter instance */
    constructor() {
        super();
    }

    /**
     * Renders the Parameter.
     */
    render() {
        const divStyle =
            this.props.isMapping ?
            Object.assign(styles.faderContainerDiv, styles.isMapping) :
            Object.assign(styles.faderContainerDiv, styles.isNotMapping);
        return (
            <div style = {styles.div}>
                <div
                    style = {divStyle}
                    onClick = {this.props.handleMappingClick}>
                    <div style = {styles.slotDiv}></div>
                    <Draggable
                        axis = 'y'
                        bounds = 'parent'
                        disabled = {this.props.isMapping}
                        position = {{x: 0, y: (1 - this.props.value) * styles.slotDiv.height}}
                        onDrag = {(e, data) => {this.props.handleDrag(styles.slotDiv.height - data.y, styles.slotDiv.height)}}>
                        <div style = {styles.faderDiv}></div>
                    </Draggable>
                </div>
            </div>
        );
    }
}

/**
 * A style object whose members are passed to elements when rendering.
 * @type {Object}
 */
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

/** The Parameter component */
export default Radium(Parameter);
