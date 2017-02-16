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
        this.toggleBypass = this.toggleBypass.bind(this);
        this.toggleSolo = this.toggleSolo.bind(this);
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

    createRoutes(effectsArray) {
        let routeObj = {input: 'output'};
        effectsArray.forEach((effect, index) => {
            const ID = effect.get('ID');
            if (index == 0) {
                routeObj.input = ID;
            }
            routeObj[ID] = effectsArray.get(index + 1) ? effectsArray.get(index + 1).get('ID') : 'output';
        });
        this.emit('route', routeObj);
    }

    addEffectToChain(effectType) {
        const usableIDs = this.effects.getIn(['effects', effectType, 'IDs']);
        usableIDs.forEach((curID, index) => {
            if (this.state.usedIDs.includes(curID)) {
                if (index == usableIDs.size - 1) {
                    alert(`Maximum number of ${effectType} effects reached.`);
                }
            } else {
                const newEffectsArray = this.state.effects.push(Immutable.fromJS({
                    type: effectType,
                    ID: curID,
                    isBypassed: false,
                    isSoloing: false
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

    //TODO: these two methods are almost exactly the same, combine them
    toggleBypass(effectID) {
        let isBypassed;
        let indexToUpdate;
        const effect = this.state.effects.forEach((effect, index) => {
            if (effect.get('ID') == effectID) {
                isBypassed = effect.get('isBypassed');
                indexToUpdate = index;
                return false;
            }
        });
        if (!isBypassed) {
            this.createRoutes(this.state.effects.delete(indexToUpdate));
        } else {
            this.createRoutes(this.state.effects);
        }
        this.setState(({effects}) => ({
            effects: effects.update(indexToUpdate, effect => effect.update('isBypassed', value => !isBypassed))
        }));
    }

    toggleSolo(effectID) {
        let isSoloing;
        let indexToUpdate;
        let effectsUpdated = this.state.effects.asMutable();
        effectsUpdated.forEach((effect, index) => {
            if (effect.get('ID') == effectID) {
                isSoloing = effect.get('isSoloing');
                indexToUpdate = index;
                return false;
            }
        });
        if (!isSoloing) {
            effectsUpdated.forEach((effect, index) => {
                if (effect.get('ID') != effectID) {
                    if (effect.get('isSoloing')) {
                        effect.update('isSoloing', value => false)
                    }
                } else {
                    effect.update('isSoloing', value => !isSoloing);
                }
            });
            this.createRoutes(Immutable.List([this.state.effects.get(indexToUpdate)]));
        } else {
            effectsUpdated.update(indexToUpdate, effect => effect.update('isSoloing', value => !isSoloing));
            this.createRoutes(this.state.effects);
        }
        console.log(effectsUpdated)
        this.setState({
            effects: effectsUpdated.asImmutable()
        });
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
                toggleBypass = {this.toggleBypass}
                toggleSolo = {this.toggleSolo}>
                {this.state.effects}
            </App>
        );
    }
}

export default AppContainer;
