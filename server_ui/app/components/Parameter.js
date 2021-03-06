import React from 'react';
import Radium from 'radium';
import Draggable from 'react-draggable';

class Parameter extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        const divStyle =
            this.props.isMapping ?
            Object.assign(styles.faderContainerDiv, styles.isMapping) :
            Object.assign(styles.faderContainerDiv, styles.isNotMapping);
        return (
            <div style = {styles.div}>
                <div
                    style = {divStyle}
                    onClick = {() => this.props.handleMappingClick(this.props.isMapping, this.props.info)}>
                    <div style = {styles.slotDiv}></div>
                    <Draggable
                        axis = 'y'
                        bounds = 'parent'
                        disabled = {this.props.isMapping}
                        position = {{x: 0, y: this.props.value * styles.slotDiv.height}}
                        onDrag = {(e, data) => {this.props.handleDrag(data, this.props.info, styles.slotDiv.height)}}>
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
