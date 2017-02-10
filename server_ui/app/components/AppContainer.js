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
            parameterValues: presets,
            mapping: {
                isMapping: false,
                axis: ''
            }
        }
        this.handleMessage = this.handleMessage.bind(this);
        this.addEffectToChain = this.addEffectToChain.bind(this);
        this.updateParameterValue = this.updateParameterValue.bind(this);
        this.toggleMapping = this.toggleMapping.bind(this);
        this.mapToParameter = this.mapToParameter.bind(this);
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('message', this.handleMessage);
    }

    handleMessage(message) {
        this.setState({message: message});
    }

    createRoutes(effectsArray) {
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

    toggleMapping(axisName) {
        this.setState({
            mapping: {
                isMapping: true,
                axis: axisName
            }
        });
    }

    updateParameterValue(info) {
        const parameterValues = this.state.parameterValues;
        const {effectID, paramName, paramValue} = info;
        parameterValues[effectID][paramName] = paramValue;
        this.setState({parameterValues: parameterValues});
        this.socket.emit('updateParam', info);
    }

    mapToParameter(paramInfo) {
        const {effectID, paramName} = paramInfo;
        const axisName = this.state.mapping.axis;
        const axesList = ['x', 'y', 'z'];
        let xyzAssignment = '';

        //TODO: This should not iterate through axesList, it should iterate through the parameters of the effectID
        axesList.forEach((curAxis, i) => {
            if (curAxis != axisName) {
                xyzAssignment = xyzAssignment.concat('n');
            } else {
                xyzAssignment = xyzAssignment.concat(`${curAxis}`);
            }
            if (i < axesList.length - 1) {
                xyzAssignment = xyzAssignment.concat(' ');
            }
        });

        const xyzMapping = {};
        xyzMapping[effectID] = xyzAssignment;
        this.socket.emit('xyzMap', xyzMapping);
        this.setState({
            mapping: {
                isMapping: false,
                axis: ''
            }
        });
    }

    render() {
        return (
            <App
                message = {this.state.message}
                addEffectToChain = {this.addEffectToChain}
                parameterValues = {this.state.parameterValues}
                onParameterChange = {this.updateParameterValue}
                isMapping = {this.state.mapping.isMapping}
                toggleMapping = {this.toggleMapping}
                mapToParameter = {this.mapToParameter}>
                {this.state.effects}
            </App>
        );
    }
}

export default AppContainer;
