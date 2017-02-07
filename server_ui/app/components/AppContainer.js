import React from 'react';
import io from 'socket.io-client';
import App from './App';
import presets from '../JSON/defaults.json';

class AppContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            effects: [],
            parameterValues: presets
        }
        this.handleMessage = this.handleMessage.bind(this);
        this.addEffectToChain = this.addEffectToChain.bind(this);
        this.updateParameter = this.updateParameter.bind(this);
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('message', this.handleMessage);
    }

    handleMessage(message) {
        this.setState({message: message});
    }

    enumerateEffects(effectsArray) {
        let effectNumbers = [];
        this.state.effects.forEach(effect => {
            effectNumbers.push(effect.number);
        });
        return effectNumbers;
    }

    addEffectToChain(effectType) {
        const number = effectType == 'distortion' ? 1 : effectType == 'bandpass' ? 2 : 3
        const newEffect = {
            type: effectType,
            number: number
        };
        const effectsArray = this.state.effects;
        effectsArray.push(newEffect);
        this.setState({effects: effectsArray});
        this.socket.emit('route', this.enumerateEffects(effectsArray));
    }

    //TODO: This communication between AppContainer and Parameter is untested
    updateParameter(info) {
        const parameterValues = this.state.parameterValues;
        const {effectName, paramName, paramValue} = info;
        parameterValues[effectName][paramName] = paramValue;
        this.setState({parameterValues: parameterValues});
    }

    render() {
        return (
            <App
                message = {this.state.message}
                handleClick = {this.addEffectToChain}
                parameterValues = {this.state.parameterValues}
                onParameterChange = {this.updateParameter}>
                {this.state.effects}
            </App>
        );
    }
}

export default AppContainer;
