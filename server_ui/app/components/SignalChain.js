import React from 'react';
import Radium from 'radium';
import Effect from './Effect';

const SignalChain = props => {
    const effectsArray = props.children;
    const effects = effectsArray.map((effect, i) => {
        //parameterValues will only work if there is one of each effect
        //TODO: need to assign each effect a unique ID upon creation, use this for routing messages too
        return (
            <Effect
                key = {i}
                type = {effect.type}
                parameterValues = {props.parameterValues[effect.type]}
                onParameterChange = {props.onParameterChange} />
        );
    });
    return (
        <div id = 'signalChain' style = {styles.div}>
            {effects}
        </div>
    )
};

export default Radium(SignalChain);

const styles = {
    div: {
        display: 'inline-block',
        height: 400,
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#000'
    }
}
