import React from 'react';
import Radium from 'radium';
import Immutable from 'immutable';
import effects from '../JSON/effects.json';

class Sidebar extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        const effectsList = Immutable.fromJS(effects).get('list');
        const axesList = ['x', 'y', 'z'];

        let effectsArray = [];
        let axesArray = [];

        effectsList.forEach((effectName, index) => {
            effectsArray.push(
                <button
                    type = 'button'
                    key = {effectName}
                    style = {styles.button}
                    onClick = {() => this.props.handleEffectButtonClick(effectName.toLowerCase())}>Add {effectName}</button>
            );
        });

        axesList.forEach(axisName => {
            axesArray.push(
                <button
                    type = 'button'
                    key = {axisName}
                    style = {styles.button}
                    onClick = {() => this.props.handleAxisButtonClick(axisName)}>Map {axisName.toUpperCase()}</button>
            );
        });

        return (
            <div>
                <h3>Motion Tracking</h3>
                {axesArray}
                <h3>Effects</h3>
                {effectsArray}
            </div>
        );
    }
}

const styles = {
    button: {
        display: 'block',
        marginBottom: 10
    }
}

export default Radium(Sidebar);
