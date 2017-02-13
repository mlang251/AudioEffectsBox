import React from 'react';
import io from 'socket.io-client';
import Immutable from 'immutable';
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
                currentAxis: ''
            },
            xyzMap: {
                x: {
                    effectID: undefined,
                    param: undefined
                },
                y: {
                    effectID: undefined,
                    param: undefined
                },
                z: {
                    effectID: undefined,
                    param: undefined
                }
            }
        }
        this.handleMessage = this.handleMessage.bind(this);
        this.addEffectToChain = this.addEffectToChain.bind(this);
        this.updateParameterValue = this.updateParameterValue.bind(this);
        this.toggleMapping = this.toggleMapping.bind(this);
        this.mapToParameter = this.mapToParameter.bind(this);
        this.receiveLeapData = this.receiveLeapData.bind(this);
        this.removeEffect = this.removeEffect.bind(this);
    }

    componentDidMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('message', this.handleMessage);
        this.socket.on('leapData', this.receiveLeapData);
        this.socket.emit('route', {input: 'output'});
    }

    handleMessage(message) {
        this.setState({message: message});
    }

    receiveLeapData(data) {
        console.log(data);
        const coords = ['x', 'y', 'z'];
        const xyzMap = this.state.xyzMap;
        data.forEach((coord, i) => {
            const curAxisMap = xyzMap[coords[i]];
            if (curAxisMap.effectID) {
                this.updateParameterValue({
                    effectID: curAxisMap.effectID,
                    paramName: curAxisMap.param,
                    paramValue: coord
                });
            }
        });
    }

    createRoutes(effectsArray) {
        let routeObj = {input: 'output'};
        for (let i = 0; i < effectsArray.length; i++) {
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

    removeEffect(effectID) {
        let effects = this.state.effects;
        let usedIDs = this.state.usedIDs;
        for (let i = 0; i < effects.length; i++) {
            if (effects[i].ID == effectID) {
                effects.splice(i, 1);
                usedIDs.splice(usedIDs.indexOf(effectID), 1);
                this.socket.emit('route', this.createRoutes(effects));
            }
        }
        this.setState({
            effects: effects,
            usedIDs: usedIDs
        });
    }

    toggleMapping(axisName) {
        this.setState({
            mapping: {
                isMapping: true,
                currentAxis: axisName
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
        const axisName = this.state.mapping.currentAxis;
        let xyzMap = this.state.xyzMap;

        if (xyzMap[axisName].effectID) {
            const clearMapping = {};
            clearMapping[effectID]= {
                param: xyzMap[axisName].param,
                axis: 'n'
            }
            this.socket.emit('xyzMap', clearMapping);
        }

        for (let axis in xyzMap) {
            if (xyzMap[axis].effectID == effectID && xyzMap[axis].param == paramName) {
                xyzMap[axis].effectID = undefined;
                xyzMap[axis].param = undefined;
            }
        }

        xyzMap[axisName].effectID = effectID;
        xyzMap[axisName].param = paramName;

        const mappingData = {};
        mappingData[effectID] = {
            param: paramName,
            axis: axisName
        };

        this.socket.emit('xyzMap', mappingData);
        this.setState({
            mapping: {
                isMapping: false,
                axis: ''
            },
            xyzMap: xyzMap
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
                mapToParameter = {this.mapToParameter}
                xyzMap = {this.state.xyzMap}
                removeEffect = {this.removeEffect}>
                {this.state.effects}
            </App>
        );
    }
}

export default AppContainer;
