import React from 'react';
import io from 'socket.io-client';
import App from './App';

class AppContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            effects: []
        }
        this.handleMessage = this.handleMessage.bind(this);
        this.addEffectToChain = this.addEffectToChain.bind(this);
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

    render() {
        return (
            <App message = {this.state.message}
                 handleClick = {this.addEffectToChain}>
                {this.state.effects}
            </App>
        );
    }
}

export default AppContainer;
