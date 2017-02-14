import React from 'react';
import io from 'socket.io-client';
import Immutable from 'immutable';
import App from './App';
import effects from '../JSON/effects.json';
import defaults from '../JSON/defaults.json';

class AppContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            effects: Immutable.List(),
            usedIDs: Immutable.List(),
            parameterValues: Immutable.Map(defaults),   //TODO: Turn this entire set into a nested Immutable use fromJS()
            mapping: Immutable.Map({
                isMapping: false,
                currentAxis: ''
            }),
            xyzMap: Immutable.Map({
                x: Immutable.Map({
                    effectID: undefined,
                    param: undefined
                }),
                y: Immutable.Map({
                    effectID: undefined,
                    param: undefined
                }),
                z: Immutable.Map({
                    effectID: undefined,
                    param: undefined
                })
            })
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
        const coords = ['x', 'y', 'z'];
        data.forEach((coord, i) => {
            const {effectID, param} = this.state.xyzMap.get(coords[i]).toJS();
            if (effectID) {
                this.updateParameterValue({
                    effectID: effectID,
                    paramName: param,
                    paramValue: coord
                });
            }
        });
    }

    createRoutes(effectsArray) {
        let routeObj = {input: 'output'};
        effectsArray.forEach((effect, index) => {
            if (index == 0) {
                routeObj.input = effect.get('ID');
            }
            routeObj[effect.get('ID')] = effectsArray.get(index + 1) ? effectsArray.get(index + 1).get('ID') : 'output';
        });
        this.socket.emit('route', routeObj);
    }

    addEffectToChain(effectType) {
        const usableIDs = effects.effects[effectType].IDs;
        for (let i = 0; i < usableIDs.length; i++) {
            if (this.state.usedIDs.includes(usableIDs[i])) {
                if (i == usableIDs.length - 1) {
                    alert(`Maximum number of ${effectType} effects reached.`);
                }
            } else {
                const thisID = usableIDs[i];
                const newEffectsArray = this.state.effects.push(Immutable.Map({
                    type: effectType,
                    ID: thisID
                }));
                this.setState(({usedIDs, effects}) => ({
                    usedIDs: usedIDs.push(thisID).sort(),
                    effects: newEffectsArray
                }));
                this.createRoutes(newEffectsArray);   //TODO: perform this with Immutables
                break;
            }
        }
    }

    removeEffect(effectID) {
        const effectsFiltered = this.state.effects.filter((effect, index) => {
            return effect.get('ID') != effectID;
        });
        this.setState(({usedIDs}) => ({
            effects: effectsFiltered,
            usedIDs: usedIDs.delete(usedIDs.indexOf(effectID))
        }));
        this.createRoutes(effectsFiltered);
    }

    toggleMapping(axisName) {
        this.setState(({mapping}) => ({
            mapping: mapping.update('isMapping', value => true).update('currentAxis', value => axisName)
        }));
    }

    updateParameterValue(info) {
        const {effectID, paramName, paramValue} = info;
        this.setState(({parameterValues}) => ({
            parameterValues: parameterValues.update(effectID, map => {
                return Object.assign({}, map, {[paramName]: paramValue})
            })
        }));
        this.socket.emit('updateParam', info);
    }

    mapToParameter(paramInfo) {
        const {effectID, paramName} = paramInfo;
        const axisName = this.state.mapping.get('currentAxis');
        let xyzMapMutable = this.state.xyzMap.asMutable();

        if (xyzMapMutable.getIn([axisName, 'effectID'])) {
            const {effectID, param} = xyzMapMutable.get(axisName).toJS();
            this.socket.emit('xyzMap', {
                [effectID]: {
                    param: param,
                    axis: 'n'
                }
            });
        }

        xyzMapMutable.map((axisInfo, axis) => {
            if (axisInfo.get('effectID') == effectID && axisInfo.get('param') == paramName) {
                xyzMapMutable.updateIn([axis, 'effectID'], value => undefined);
                xyzMapMutable.updateIn([axis, 'param'], value => undefined);
            }
        });

        xyzMapMutable.updateIn([axisName, 'effectID'], value => effectID);
        xyzMapMutable.updateIn([axisName, 'param'], value => paramName);

        this.socket.emit('xyzMap', {
            [effectID]: {
                param: paramName,
                axis: axisName
            }
        });

        this.setState(({mapping, xyzMap}) => ({
            mapping: mapping.update('isMapping', value => false).update('axis', value => ''),
            xyzMap: xyzMap.mergeDeep(xyzMapMutable.asImmutable())
        }));
    }

    render() {
        return (
            <App
                message = {this.state.message}
                addEffectToChain = {this.addEffectToChain}
                parameterValues = {this.state.parameterValues}
                onParameterChange = {this.updateParameterValue}
                isMapping = {this.state.mapping.get('isMapping')}
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
