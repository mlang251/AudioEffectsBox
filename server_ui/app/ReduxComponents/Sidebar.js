import React from 'react';
import Radium from 'radium';

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
const Sidebar = ({addEffect, updateMapping, effectsList}) => (
    <div>
        <h3>Motion Tracking</h3>
        {['x', 'y', 'z'].map(axisName => {
            return (
                <button
                    type = 'button'
                    key = {axisName}
                    style = {styles.button}
                    onClick = {() => updateMapping(false, axisName)}>Map {axisName.toUpperCase()}</button>
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

/** The Sidebar component */
export default Radium(Sidebar);
