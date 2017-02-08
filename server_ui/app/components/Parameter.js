import React from 'react';
import Radium from 'radium';
import Draggable from 'react-draggable';

class Parameter extends React.Component {
    constructor() {
        super();
    }

    handleDrag(data, info) {
        const value =                               //Make sure the value is within the bounds of the draggable area
            data.y < 0 ? 0                          //Normalize it on a scale of 0-1
            : data.y > styles.slotDiv.height ? 1
            : data.y/styles.slotDiv.height
        info.paramValue = value;
        this.props.onParameterChange(info);
    }

    render() {
        return (
            <div style = {styles.div}>
                <div style = {styles.faderContainerDiv}>
                    <div style = {styles.slotDiv}></div>
                    <Draggable
                        axis = 'y'
                        bounds = 'parent'
                        position = {{x: 0, y: this.props.value*styles.slotDiv.height}}
                        onDrag = {(e, data) => {this.handleDrag(data, this.props.info)}}>
                        <div style = {styles.faderDiv}></div>
                    </Draggable>
                </div>
            </div>
        );
    }
}

const styles = {
    div: {
        height: 100,
        width: 50,
        position: 'relative',
        display: 'inline-block'
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
