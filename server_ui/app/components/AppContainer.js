import React from 'react';
import io from 'socket.io-client';
import Immutable from 'immutable';
import App from './App';
import effectsJSON from '../JSON/effects.json';
import defaults from '../JSON/defaults.json';
import Perf from 'react-addons-perf';

class AppContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            effects: Immutable.List(),
            usedIDs: Immutable.List(),
            parameterValues: Immutable.fromJS(defaults),
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
        this.effects = Immutable.fromJS(effectsJSON)
        this.handleMessage = this.handleMessage.bind(this);
        this.addEffectToChain = this.addEffectToChain.bind(this);
        this.updateParameterValue = this.updateParameterValue.bind(this);
        this.toggleMapping = this.toggleMapping.bind(this);
        this.mapToParameter = this.mapToParameter.bind(this);
        this.receiveLeapData = this.receiveLeapData.bind(this);
        this.removeEffect = this.removeEffect.bind(this);
        this.bypassEffect = this.bypassEffect.bind(this);
        this.emit = this.emit.bind(this);
    }

    componentDidMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('message', this.handleMessage);
        this.socket.on('leapData', this.receiveLeapData);
        this.emit('route', {input: 'output'});
        window.Perf = Perf;
    }

    emit(eventName, data) {
        this.socket.emit(eventName, data);
    }

    handleMessage(message) {
        this.setState({message: message});
    }

    receiveLeapData(data) {
        const coords = ['x', 'y', 'z'];
        data.forEach((coord, i) => {
            const {effectID, param} = this.state.xyzMap.get(coords[i]).toJS();
            if (effectID) {
                this.updateParameterValue(Immutable.Map({
                    effectID: effectID,
                    paramName: param,
                    paramValue: coord
                }));
            }
        });
    }

    createRoutes(effectsArray, bypassID) {
        let routeObj = {input: 'output'};
        effectsArray.forEach((effect, index) => {
            const ID = effect.get('ID');
            if (index == 0) {
                routeObj.input = ID;
            }
            if (ID != bypassID) {
                routeObj[ID] = effectsArray.get(index + 1) ? effectsArray.get(index + 1).get('ID') : 'output';
            }
        });
        this.emit('route', routeObj);
    }

    addEffectToChain(effectType) {
        const usableIDs = this.effects.getIn(['effects', effectType, 'IDs']);  //TODO: Make this Immutable
        usableIDs.forEach((curID, index) => {
            if (this.state.usedIDs.includes(curID)) {
                if (index == usableIDs.size - 1) {
                    alert(`Maximum number of ${effectType} effects reached.`);
                }
            } else {
                const newEffectsArray = this.state.effects.push(Immutable.Map({
                    type: effectType,
                    ID: curID,
                    isBypassed: false
                }));
                this.setState(({usedIDs, effects}) => ({
                    usedIDs: usedIDs.push(curID).sort(),
                    effects: newEffectsArray
                }));
                this.createRoutes(newEffectsArray);
                return false;
            }
        });
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

    toggleBypassEffect(effectID) {
        const isBypassed = this.state.effects.getIn([effectID, 'isBypassed']);
        if (!isBypassed) {
            const effectsFiltered = this.state.effects.filter((effect, index) => {
                return effect.get('ID') != effectID;
            });
        }
        this.setState(({effects}) => ({
            effects: effects.updateIn([effectID, 'isBypassed'], value => !isBypassed)
        }));
        this.createRoutes(effectsFiltered);
    }

    toggleMapping(axisName = false) {
        this.setState(({mapping}) => ({
            mapping: mapping.update('isMapping', value => !mapping.get('isMapping')).update('currentAxis', value => axisName ? axisName : '')
        }));
    }

    updateParameterValue(paramInfo) {
        const {effectID, paramName, paramValue} = paramInfo.toJS();
        this.setState(({parameterValues}) => ({
            parameterValues: parameterValues.updateIn([effectID, paramName], value => paramValue)
        }));
        this.emit('updateParam', paramInfo.toJS());
    }

    mapToParameter(paramInfo) {
        const {effectID, paramName} = paramInfo.toJS();
        const axisName = this.state.mapping.get('currentAxis');
        let xyzMapMutable = this.state.xyzMap.asMutable();

        if (xyzMapMutable.getIn([axisName, 'effectID'])) {
            const {effectID, param} = xyzMapMutable.get(axisName).toJS();
            this.emit('xyzMap', {
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

        this.emit('xyzMap', {
            [effectID]: {
                param: paramName,
                axis: axisName
            }
        });

        this.toggleMapping();
        this.setState(({xyzMap}) => ({
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
                removeEffect = {this.removeEffect}
                bypassEffect = {this.bypassEffect}>
                {this.state.effects}
            </App>
        );
    }
}

export default AppContainer;
