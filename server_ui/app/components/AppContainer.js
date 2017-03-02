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
            }),
            interactionBox: Immutable.Map({
                coords: Immutable.List(),
                dimensions: Immutable.Map(),
                isConnected: false,
                isInBounds: false,
                isTracking: false
            }),
            elapsed: []
        }
        this.effects = Immutable.fromJS(effectsJSON)
        this.handleMessage = this.handleMessage.bind(this);
        this.addEffectToChain = this.addEffectToChain.bind(this);
        this.updateParameterValue = this.updateParameterValue.bind(this);
        this.toggleMapping = this.toggleMapping.bind(this);
        this.mapToParameter = this.mapToParameter.bind(this);
        this.receiveLeapData = this.receiveLeapData.bind(this);
        this.receiveLeapStatus = this.receiveLeapStatus.bind(this);
        this.removeEffect = this.removeEffect.bind(this);
        this.toggleBypass = this.toggleBypass.bind(this);
        this.toggleSolo = this.toggleSolo.bind(this);
        this.emit = this.emit.bind(this);
        this.removeMapping = this.removeMapping.bind(this);
        this.reorderEffects = this.reorderEffects.bind(this);
        this.sendData = this.sendData.bind(this);
        this.sendLeap = this.sendLeap.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentDidMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('message', this.handleMessage);
        this.socket.on('leapData', this.receiveLeapData);
        this.socket.on('leapStatusUpdate', this.receiveLeapStatus);
        this.emit('route', {input: 'output'});
        window.Perf = Perf;
    }

    sendData() {
        this.receiveLeapData([Math.random(), Math.random(), Math.random()])
    }

    clear() {
        clearInterval(this.intervalID);
        clearTimeout(this.timeoutID);
        const average = this.state.elapsed.reduce((accumulator, currentValue, index, array) => {
            if (index == array.length - 1) {
                return (accumulator + currentValue)/array.length;
            } else {
                return accumulator + currentValue;
            }
        }) 
        console.log(`average: ${average}`)
        this.setState({
            elapsed: []
        });
    }

    sendLeap() {
        this.intervalID = setInterval(this.sendData, 15);
        this.timeoutID = setTimeout(this.clear, 300);
    }

    emit(eventName, data) {
        this.socket.emit(eventName, data);
    }

    handleMessage(message) {
        this.setState({message: message});
    }

    receiveLeapStatus(message) {
        const {address, args} = message;
        switch (address) {
            case '/BoxDimensions':
                const dimensions = JSON.parse(args);
                this.setState(({interactionBox}) => ({
                    interactionBox: interactionBox.update('isConnected', value => true)
                        .update('dimensions', value => this.state.interactionBox.get('dimensions').merge(Immutable.fromJS(dimensions)))
                }));
                break;
            case '/BoundStatus':
                this.setState(({interactionBox}) => ({
                    interactionBox: interactionBox.update('isInBounds', value => args[0] ? true : false)
                }));
                break;
            case '/TrackingMode':
                this.setState(({interactionBox}) => ({
                    interactionBox: interactionBox.update('isTracking', value => args[0] ? true : false)
                }));
                break;
            default:
                console.log('OSC message from unknown address received on port 8010');
                break;
        }
    }

    receiveLeapData(data) {
        const start = performance.now();
        const coords = ['x', 'y', 'z'];
        for (let i = 0; i < data.length; i++) {
            const effectID = this.state.xyzMap.getIn([coords[i], 'effectID']);
            if (effectID) {
                const param = this.state.xyzMap.getIn([coords[i], 'param']);
                this.updateParameterValue(Immutable.Map({
                    effectID: effectID,
                    paramName: param,
                    paramValue: data[i]
                }), true);
            }
        };
        this.setState(({interactionBox}) => ({
            interactionBox: interactionBox.update('coords', value => Immutable.List(data))
        }));
        const end = performance.now();
        const elapsed = this.state.elapsed;
        elapsed.push(end-start);
        this.setState({
            elapsed: elapsed
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

    toggleBypass(effectID) {
        if (!this.state.effects.find(effect => effect.get('isSoloing'))) {
            let isBypassed;
            let indexToUpdate;
            const effectsRoute = Immutable.List().asMutable();
            this.state.effects.forEach((effect, index) => {
                if (effect.get('ID') != effectID) {
                    if (!effect.get('isBypassed')) {
                        effectsRoute.push(effect);
                    }
                } else {
                    isBypassed = effect.get('isBypassed');
                    indexToUpdate = index;
                    if (isBypassed) {
                        effectsRoute.push(effect);
                    }
                }
            });
            this.createRoutes(effectsRoute.asImmutable());
            this.setState(({effects}) => ({
                effects: effects.update(indexToUpdate, effect => effect.update('isBypassed', value => !isBypassed))
            }));
        }
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
                        effectsUpdated.update(index, effect => effect.update('isSoloing', value => false));
                    }
                } else {
                    effectsUpdated.update(index, effect => effect.update('isSoloing', value => !isSoloing));
                }
            });
            this.createRoutes(Immutable.List([this.state.effects.get(indexToUpdate)]));
        } else {
            effectsUpdated.update(indexToUpdate, effect => effect.update('isSoloing', value => !isSoloing));
            this.createRoutes(this.state.effects);
        }
        this.setState({
            effects: effectsUpdated.asImmutable()
        });
    }

    toggleMapping(axisName = false) {
        this.setState(({mapping}) => ({
            mapping: mapping.update('isMapping', value => !mapping.get('isMapping')).update('currentAxis', value => axisName ? axisName : '')
        }));
    }

    updateParameterValue(paramInfo, wasChangedByLeap) {
        const effectID = paramInfo.get('effectID');
        const paramName = paramInfo.get('paramName');
        const paramValue = paramInfo.get('paramValue');
        this.setState(({parameterValues}) => ({
            parameterValues: parameterValues.updateIn([effectID, paramName], value => paramValue)
        }));
        if (!wasChangedByLeap) {
            this.emit('updateParam', {
                effectID: effectID,
                paramName: paramName,
                paramValue: paramValue
            });
        }
    }

    mapToParameter(paramInfo) {
        const {effectID, paramName} = paramInfo.toJS();
        const axisName = this.state.mapping.get('currentAxis');
        let xyzMapMutable = this.state.xyzMap.asMutable();

        if (xyzMapMutable.getIn([axisName, 'effectID'])) {
            const {effectID, param} = xyzMapMutable.get(axisName).toJS();
            this.socket.emit('xyzMap', {
                effectID: effectID,
                param: param,
                axis: 'n'
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
            effectID: effectID,
            param: paramName,
            axis: axisName
        });

        this.toggleMapping();
        this.setState(({xyzMap}) => ({
            xyzMap: xyzMap.mergeDeep(xyzMapMutable.asImmutable())
        }));
    }

    removeMapping(axis, effectID, paramName) {
        this.emit('xyzMap', {
            effectID: effectID,
            param: paramName,
            axis: 'n'
        });
        this.setState(({xyzMap}) => ({
            xyzMap: xyzMap.updateIn([axis, 'effectID'], value => undefined).updateIn([axis, 'param'], value => undefined)
        }));
    }

    reorderEffects(effectID, direction) {
        let effectsList;
        if (direction == 'left') {
            effectsList = this.state.effects.asMutable().reverse();
        } else {
            effectsList = this.state.effects.asMutable();
        }
        effectsList = effectsList.sort((effectA, effectB) => {
            if (effectA.get('ID') == effectID) {
                return 1;
            } else {
                return 0;
            }
        });
        if (direction == 'left') {
            effectsList = effectsList.reverse();
        }
        const effectsUpdated = effectsList.asImmutable();
        this.createRoutes(effectsUpdated);
        this.setState({
            effects: effectsUpdated
        });
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
                toggleSolo = {this.toggleSolo}
                removeMapping = {this.removeMapping}
                reorderEffects = {this.reorderEffects}
                interactionBox = {this.state.interactionBox}
                effects = {this.state.effects}
                sendLeap = {this.sendLeap} />
        );
    }
}

export default AppContainer;
