import React from 'react';
import Immutable from 'immutable';
import effects from '../JSON/effects.json';
import Sidebar from './Sidebar';

class SidebarContainer extends React.PureComponent {
    constructor() {
        super();
    }

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

    render() {
        const axisButtons = this.createAxisButtons();
        const effectsButtons = this.createEffectsButtons();
        return (
            <Sidebar
                effectsButtons = {effectsButtons}
                axisButtons = {axisButtons} />
        );
    }
}

const styles = {
    button: {
        display: 'block',
        marginBottom: 10
    }
}

export default SidebarContainer;
