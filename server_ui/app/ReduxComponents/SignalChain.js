import React from 'react';
import Radium from 'radium';

/**
 * The SignalChain module. Responsible rendering a SignalChain component which is the location where effects modules
 *     are rendered. Appears as a child component of the SignalChainContainer component, child components are Effect components.
 * @module SignalChain
 * @see module:SignalChainContainer
 * @see module:Effect
 */

/** 
 * Class responsible for rendering the SignalChain component.
 * @extends external:ReactPureComponent 
 */
const SignalChain = ({effects}) => (
    <div id = 'signalChain' style = {styles.div}>
        {effects.forEach((effect, index) => {
            const effectType = effect.get('effectType');
            const effectID = effect.get('effectID');
            const isBypassed = effect.get('isBypassed');
            const isSoloing = effect.get('isSoloing');
            return (
                <EffectContainer
                    key = {effectID}
                    effectID = {effectID}
                    effectType = {effectType}
                    isBypassed = {isBypassed}
                    isSoloing = {isSoloing}
                    reorderButtonLeft = {index != 0}
                    reorderButtonRight = {index != effects.size - 1} />
            );
        })}
    </div>
);

/**
 * A style object whose members are passed to elements when rendering.
 * @type {Object}
 */
const styles = {
    div: {
        height: '100%',
        width: '100%',
        marginBottom: 25,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000'
    }
}

/** The SignalChain component */
export default Radium(SignalChain);
