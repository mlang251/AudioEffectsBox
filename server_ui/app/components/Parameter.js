import React from 'react';
import Radium from 'radium';
import Draggable from 'react-draggable';

const handleDrag = (data, info, callback) => {
    const info = ...info;
    info.paramValue = data.y;
    callback(info);
}

const Parameter = props => {
    return (
        <div style = {styles.div}>
            <div style = {styles.faderContainerDiv}>
                <div style = {styles.slotDiv}></div>
                <Draggable
                    axis = 'y'
                    bounds = {{left: 0, top: 0, right: 0, bottom: 85}}
                    position = {{x: 0, y: props.value}}
                    onDrag = {(e, data) => {handleDrag(data, props.info, props.onParameterChange)}}>
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
