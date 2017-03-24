import React from 'react';
import Immutable from 'immutable';
import effects from '../JSON/effects.json';
import Sidebar from './Sidebar';

/**
 * The SidebarContainer module. Responsible for creating buttons and styles for it's Sidebar child. Appears
 *     as a child component of App, child component is Sidebar.
 * @module SidebarContainer
 * @see module:App
 * @see module:Sidebar
 */

/** 
 * Class responsible for creating buttons and styles for it's Sidebar child.
 * @extends external:ReactPureComponent 
 */
class SidebarContainer extends React.PureComponent {
    /** Create the SidebarContainer component instance */
    constructor() {
        super();
    }

    /**
     * Create the buttons for adding effects to the signal chain. Retrieves a list of available effects by parsing the list
     *     in effects.json. Creates buttons which add the corresponding effect to the signal chain.
     */
    createEffectsButtons() {
        const effectsList = Immutable.fromJS(effects).get('list');
        let effectsButtons = Immutable.List([]).asMutable();
        effectsList.forEach((effectName, index) => {
            effectsButtons = effectsButtons.push(
                <button
                    type = 'button'
                    key = {effectName}
                    style = {styles.button}
                    onClick = {() => this.props.handleEffectButtonClick(effectName.toLowerCase())}>Add {effectName}</button>
            );
        });
        return effectsButtons.asImmutable();
    }

    /**
     * Creates buttons for mapping coordinate axes to effect parameters.
     */
    createAxisButtons() {
        const axesList = ['x', 'y', 'z'];
        let axisButtons = Immutable.List([]).asMutable();
        axesList.forEach(axisName => {
            axisButtons = axisButtons.push(
                <button
                    type = 'button'
                    key = {axisName}
                    style = {styles.button}
                    onClick = {() => this.props.handleAxisButtonClick(axisName)}>Map {axisName.toUpperCase()}</button>
            );
        });
        return axisButtons.asImmutable();
    }

    /**
     * Renders the Sidebar component
     * @see module:Sidebar
     */
    render() {
        return (
            <Sidebar
                effectsButtons = {this.createEffectsButtons()}
                axisButtons = {this.createAxisButtons()} />
        );
    }
}

/**
 * A style object whose members are passed to elements when rendering.
 * @type {Object}
 */
const styles = {
    button: {
        display: 'block',
        marginBottom: 10
    }
}

/** The SidebarContainer component */
export default SidebarContainer;
