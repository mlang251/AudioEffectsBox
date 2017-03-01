import React from 'react';
import SignalChain from './SignalChain';
import EffectContainer from './EffectContainer';

class SignalChainContainer extends React.PureComponent {
    constructor() {
        super();
    }

    createEffects() {
        return this.props.effects.map((effect, index) => {
            const {ID, type, isBypassed, isSoloing} = effect.toJS();
            return (
                <EffectContainer
                    key = {ID}
                    ID = {ID}
                    type = {type}
                    isBypassed = {isBypassed}
                    isSoloing = {isSoloing}
                    parameterValues = {this.props.parameterValues.get(ID)}
                    onParameterChange = {this.props.onParameterChange}
                    isMapping = {this.props.isMapping}
                    mapToParameter = {this.props.mapToParameter}
                    xyzMap = {this.props.xyzMap}
                    handleCloseButtonClick = {this.props.removeEffect} 
                    handleBypassButtonClick = {this.props.toggleBypass} 
                    handleSoloButtonClick = {this.props.toggleSolo} 
                    handleRemoveMappingClick = {this.props.removeMapping}
                    reorderButtonLeft = {index != 0}
                    reorderButtonRight = {index != this.props.effects.size - 1} 
                    handleReorderButtonClick = {this.props.reorderEffects} />
            );
        });
    }

    render() {
        return (
            <SignalChain effects = {this.createEffects()} />
        );
    }
}

export default SignalChainContainer;