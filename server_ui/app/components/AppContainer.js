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
    }

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('message', this.handleMessage);
        this.socket.on('leapData', this.receiveLeapData);
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
        let routeObj = {};
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

        xyzMap[axisName].effectID = effectID;
        xyzMap[axisName].param = paramName;

        const mappingData = {
            effectID: effectID,
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
                xyzMap = {this.state.xyzMap}>
                {this.state.effects}
            </App>
        );
    }
}

export default AppContainer;
