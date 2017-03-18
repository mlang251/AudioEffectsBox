import React from 'react';
import Radium from 'radium';

/**
 * The SignalChain module. Responsible rendering a SignalChain component which is the location where effects modules
 *     are rendered. Appears as a child component of the SignalChainContainer component, child components are Effect components.
 * @module SignalChain
 * @see module:SignalChainContainer
 * @see module:Effect
 */

/** 
 * Class responsible for rendering the SignalChain component.
 * @extends external:ReactPureComponent 
 */
class SignalChain extends React.PureComponent {
    /** Create the SignalChain component instance */
    constructor() {
        super();
    }

    /**
     * Render the SignalChain, including the child Effect components
     * @see module:Effect
     */
    render() {
        return (
            <div style = {styles.div}>
                <div 
                    id = 'signalChain' 
                    style = {styles.signalChain}>
                    {this.props.effects}
                </div>
                <div style = {styles.gainBlock}>
                    {this.props.gain}
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
        height: '100%',
        width: '100%',
        marginBottom: 25,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000'
    },
    signalChain: {
        display: 'inline-block',
        float: 'left',
        height: '100%',
        width: '90%',
        overflowX: 'scroll',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000'
    },
    gainBlock: {
        display: 'inline-block',
        float: 'right',
        height: '100%',
        width: '10%'
    }
}

/** The SignalChain component */
export default Radium(SignalChain);
