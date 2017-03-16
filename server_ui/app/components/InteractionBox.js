import React from 'react';
import Radium from 'radium';

/**
 * The InteractionBox module. Responsible rendering the InteractionBox. This includes the 3D representation of the Leap field of vision,
 *     as well as the position of the user's hand and the state of the InteractionBox. Appears as a child component of the 
 *     InteractionBoxContainer component.
 * @module InteractionBox
 * @see module:InteractionBoxContainer
 */

/** 
 * Class responsible rendering the InteractionBox. This includes the 3D representation of the Leap field of vision,
 *     as well as the position of the user's hand and the state of the InteractionBox
 * @extends external:PureComponent 
 */
class InteractionBox extends React.PureComponent {
    /** Create the InteractionBox component */
    constructor() {
        super();
    }
    
    /**
     * Renders the 3D representation of the Leap field of vision as well as pointer representing the location of the user's hand.
     *     The color of the pointer depends on the current state of the InteractionBox.
     */
    render() {
        const propStyles = this.props.style.toJS();
        return (
            <section style = {Object.assign({}, styles.container, propStyles.container)}>
                <div style = {Object.assign({}, styles.cube, propStyles.cube)}>
                    <div style = {Object.assign({}, styles.pointer, propStyles.pointer)}>
                        <span style = {Object.assign({}, styles.shadow, propStyles.shadow)}></span>
                    </div>
                    <figure 
                        id = 'front'
                        style = {Object.assign({}, styles.figure, styles.front, propStyles.front)}></figure>
                    <figure 
                        id = 'back'
                        style = {Object.assign({}, styles.figure, styles.back, propStyles.back)}></figure>
                    <figure 
                        id = 'right'
                        style = {Object.assign({}, styles.figure, styles.right, propStyles.right)}></figure>
                    <figure 
                        id = 'left'
                        style = {Object.assign({}, styles.figure, styles.left, propStyles.left)}></figure>
                    <figure 
                        id = 'top'
                        style = {Object.assign({}, styles.figure, styles.top, propStyles.top)}></figure>
                    <figure 
                        id = 'bottom'
                        style = {Object.assign({}, styles.figure, styles.bottom, propStyles.bottom)}></figure>
                </div>
            </section>
        );
    }
}

/**
 * A style object whose members are passed to components when rendering.
 * @type {Object}
 */
const styles = {
    container: {
        position: 'relative',
        perspective: 1000,
        transformStyle: 'preserve-3d',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    cube: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformStyle: 'preserve-3d',
    },
    pointer: {
        display: 'block',
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: 'black',
        bottom: 0,
        left: 0,
        margin: 0,
        transformStyle: 'preserve-3d'
    },
    shadow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0) 50%)',
        zIndex: -1
    },
    figure: {
        margin: 0,
        display: 'block',
        position: 'absolute',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
        backgroundImage: `linear-gradient(0deg, transparent 45%, #009 50%, transparent 55%, transparent 100%), 
            linear-gradient(90deg, transparent 45%, #009 50%, transparent 55%, transparent 100%)`,
        opacity: 0.5
    },
    front: {
        backgroundColor: '#FFF',
        backgroundImage: '',
        opacity: 0.2
    },
    back: {
        backgroundColor: '#AAA'
    },
    right: {
        backgroundColor: '#AAA'
    },
    left: {
        backgroundColor: '#AAA'
    },
    top: {
        backgroundColor: '#EEE',
        backgroundImage: '',
        opacity: 0.2
    },
    bottom: {
        backgroundColor: '#EEE'
    },
}

/** The InteractionBox component */
export default Radium(InteractionBox);