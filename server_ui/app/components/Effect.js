import React from 'react';
import Radium from 'radium';

class Effect extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <div style = {styles.effectDiv}>
                <div style = {styles.headerDiv}>
                    <p style = {styles.effectTitle}>{this.props.effectName}</p>
                    <div style = {styles.buttonDiv}>
                        <button
                            key = {`${this.props.ID}Solo`}
                            type = 'button'
                            style = {Object.assign({}, styles.buttonBase, styles.soloButton, styles[this.props.soloStyle])}
                            onClick = {() => this.props.handleSoloButtonClick(this.props.ID)}>S</button>
                        <button
                            key = {`${this.props.ID}Bypass`}
                            type = 'button'
                            style = {Object.assign({}, styles.buttonBase, styles.bypassButton, styles[this.props.bypassStyle])}
                            onClick = {() => this.props.handleBypassButtonClick(this.props.ID)}>B</button>
                        <button
                            key = {`${this.props.ID}Close`}
                            type = 'button'
                            style = {Object.assign({}, styles.buttonBase, styles.closeButton)}
                            onClick = {() => this.props.handleCloseButtonClick(this.props.ID)}>X</button>
                    </div>
                </div>
                {this.props.reorderButtonLeft}
                {this.props.params}
                {this.props.reorderButtonRight}
            </div>
        );
    }
}

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

export default Radium(Effect);
