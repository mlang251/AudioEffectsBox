import React from 'react';
import io from 'socket.io-client';
import App from './App';
import effects from '../JSON/effects.json';
import presets from '../JSON/defaults.json';

class AppContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            effects: [],
            usedIDs: [],
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

    createRoutes(effectsArray) {
        //TODO: go over data structure for effects routing messages sent to Max
        let routeObj = {};
        for (let i = 0; i < effectsArray.length; i++) {
            console.log(`before loop i = ${i}`);
            if (i == 0) {
                routeObj.input = effectsArray[i].ID;
            }
            if (effectsArray[i+1]) {
                routeObj[effectsArray[i].ID] = effectsArray[i+1].ID
            } else {
                routeObj[effectsArray[i].ID] = "output"
            }
        }
        return routeObj;
    }

    addEffectToChain(effectType) {
        const usableIDs = effects.effects[effectType].IDs;
        for (let i = 0; i < usableIDs.length; i++) {
            if (this.state.usedIDs.indexOf(usableIDs[i]) != -1) {
                if (i == usableIDs.length - 1) {
                    alert(`Maximum number of ${effectType} effects reached.`);
                }
            } else {
                const usedIDs = this.state.usedIDs;
                const thisID = usableIDs[i];
                usedIDs.push(thisID);
                usedIDs.sort((a,b) => {
                    return a - b;
                });
                this.setState({usedIDs: usedIDs});

                const newEffect = {
                    type: effectType,
                    ID: thisID
                };
                const effectsArray = this.state.effects;
                effectsArray.push(newEffect);
                this.setState({effects: effectsArray});
                this.socket.emit('route', this.createRoutes(effectsArray));
                break;
            }
        }
    }

    updateParameter(info) {
        const parameterValues = this.state.parameterValues;
        const {effectID, paramName, paramValue} = info;
        parameterValues[effectID][paramName] = paramValue;
        this.setState({parameterValues: parameterValues});
        this.socket.emit('updateParam', info);
    }

    render() {
        return (
            <App
                message = {this.state.message}
                addEffectToChain = {this.addEffectToChain}
                parameterValues = {this.state.parameterValues}
                onParameterChange = {this.updateParameter}>
                {this.state.effects}
            </App>
        );
    }
}

export default AppContainer;
