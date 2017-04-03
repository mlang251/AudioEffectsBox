import React from 'react';
import Radium from 'radium';
import {list as effectsList} from '../JSON/effects';

/**
 * The Sidebar module. Responsible rendering a Sidebar component which is used for adding effects to the signal
 *     chain and for entering mapping mode. Appears as a child component of the SidebarContainer component. 
 * @module Sidebar
 * @see module:SidebarContainer
 */

/** 
 * Class responsible for rendering the Sidebar component.
 * @extends external:ReactPureComponent 
 */
const Sidebar = ({addEffect, updateMapping}) => (
    <div>
        <h3>Motion Tracking</h3>
        {['x', 'y', 'z'].map(axisName => {
            return (
                <button
                    type = 'button'
                    key = {axisName}
                    style = {styles.button}
                    onClick = {() => updateMapping(axisName)}>Map {axisName.toUpperCase()}</button>
            );
        })}
        <h3>Effects</h3>
        {effectsList.map(effectName => {
            return (
                <button
                    type = 'button'
                    key = {effectName}
                    style = {styles.button}
                    onClick = {() => addEffect(effectName.toLowerCase())}>Add {effectName}</button>
            );
        })}
    </div>
);

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

/** The Sidebar component */
export default Radium(Sidebar);
