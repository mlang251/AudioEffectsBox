import React from 'react';
import SignalChain from './SignalChain';
import EffectContainer from './EffectContainer';

/**
 * The SignalChainContainer module. Responsible for creating EffectContainer components and rendering it's 
 *     SignalChain child. Appears as a child component of App, child component is SignalChain.
 * @module SignalChainContainer
 * @see module:App
 * @see module:SignalChain
 * @see module:EffectContainer
 */

/** 
 * Class responsible for creating EffectContainer components and rendering it's SignalChain child.
 * @extends external:ReactPureComponent 
 */
class SignalChainContainer extends React.PureComponent {
    /** Create the SignalChainContainer component instance */
    constructor() {
        super();
    }

    /**
     * Creates an interable of EffectContainer components by iterating through props.effects and assigning props.
     * @returns {external:List} An Immutable List containing EffectContainer components
     */
    createEffects(effects) {
        return effects.map((effect, index) => {
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

    /**
     * Renders the SignalChain and passes along the iterable of EffectContainer components
     * @see module:SignalChain
     */
    render() {
        const gainEffect = Immutable.List([Immutable.Map({
            ID: 'gain',
            type: 'gain',
            isBypassed: false,
            isSoloing: false
        })]);
        return (
            <SignalChain 
                effects = {this.createEffects(this.props.effects)}
                gain = {this.createEffects(gainEffect)} />
        );
    }
}

/** The SignalChainContainer component */
export default SignalChainContainer;