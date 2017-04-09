import React from 'react';
import Radium from 'radium';
import {list as effectsList} from '../JSON/effects';

/**
 * The Sidebar module. Render buttons for adding effects to the signal chain and for entering axis mapping mode. Appears as a 
 *     child component of the SidebarContainer component. 
 * @param {Object} props - Props passed down from the SidebarContainer component
 * @property {Function} props.addEffect - Adds an effect to the signal chain
 * @property {Function} props.updateMapping - Turns on axis mapping mode
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

const styles = {
    button: {
        display: 'block',
        marginBottom: 10
    }
}

export default Radium(Sidebar);
